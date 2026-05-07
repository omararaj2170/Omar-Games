const game = document.getElementById('game');
const scoreEl = document.getElementById('score');
const cvs = document.createElement('canvas');
cvs.width = 300; cvs.height = 600;
game.appendChild(cvs);
const ctx = cvs.getContext('2d');
const COLS=10, ROWS=20, BLOCK=30;
const arena = Array.from({length:ROWS},()=>Array(COLS).fill(0));
const colors = [null,'#00f0f0','#0000f0','#f0a000','#f0f000','#00f000','#a000f0','#f00000'];
const pieces='TJLOSZI';
let score=0, drop=0, over=false;
const player={pos:{x:0,y:0}, matrix:null};
function createPiece(type){
  if(type==='T') return [[0,0,0],[1,1,1],[0,1,0]];
  if(type==='O') return [[2,2],[2,2]];
  if(type==='L') return [[0,3,0],[0,3,0],[0,3,3]];
  if(type==='J') return [[0,4,0],[0,4,0],[4,4,0]];
  if(type==='I') return [[0,5,0,0],[0,5,0,0],[0,5,0,0],[0,5,0,0]];
  if(type==='S') return [[0,6,6],[6,6,0],[0,0,0]];
  return [[7,7,0],[0,7,7],[0,0,0]];
}
function collide(){
  return player.matrix.some((row,y)=>row.some((v,x)=>v && (arena[y+player.pos.y]?.[x+player.pos.x]!==0)));
}
function merge(){player.matrix.forEach((row,y)=>row.forEach((v,x)=>{if(v) arena[y+player.pos.y][x+player.pos.x]=v;}));}
function sweep(){
  let rows=0;
  outer: for(let y=ROWS-1;y>=0;y--){
    for(let x=0;x<COLS;x++) if(arena[y][x]===0) continue outer;
    arena.splice(y,1); arena.unshift(Array(COLS).fill(0)); y++; rows++;
  }
  if(rows){ score += [0,100,300,500,800][rows]||rows*250; }
}
function rotate(m){return m[0].map((_,i)=>m.map(r=>r[i]).reverse());}
function playerReset(){
  player.matrix=createPiece(pieces[(Math.random()*pieces.length)|0]);
  player.pos.y=0; player.pos.x=((COLS/2)|0)-((player.matrix[0].length/2)|0);
  if(collide()) over=true;
}
function draw(){
  ctx.fillStyle='#111'; ctx.fillRect(0,0,cvs.width,cvs.height);
  drawMatrix(arena,{x:0,y:0}); drawMatrix(player.matrix,player.pos);
  scoreEl.textContent = over ? `Game over • Score: ${score} (R to restart)` : `Score: ${score}`;
}
function drawMatrix(m,o){m.forEach((row,y)=>row.forEach((v,x)=>{if(v){ctx.fillStyle=colors[v];ctx.fillRect((x+o.x)*BLOCK,(y+o.y)*BLOCK,BLOCK-1,BLOCK-1);}}));}
function tick(t=0){
  if(over){draw(); return;}
  if(t-drop>500){player.pos.y++; if(collide()){player.pos.y--; merge(); sweep(); playerReset();} drop=t;}
  draw(); requestAnimationFrame(tick);
}
addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft'){player.pos.x--; if(collide())player.pos.x++;}
  if(e.key==='ArrowRight'){player.pos.x++; if(collide())player.pos.x--;}
  if(e.key==='ArrowDown'){player.pos.y++; if(collide()){player.pos.y--; merge(); sweep(); playerReset();}}
  if(e.key==='ArrowUp'){const p=player.pos.x; player.matrix=rotate(player.matrix); if(collide()) player.pos.x=p;}
  if(e.key.toLowerCase()==='r'&&over){arena.forEach(r=>r.fill(0)); score=0; over=false; playerReset(); requestAnimationFrame(tick);} 
});
playerReset(); requestAnimationFrame(tick);
