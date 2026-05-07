const base=['wordle','snake','tic-tac-toe','hangman','minesweeper','pong','sudoku','tetris','flappy-bird','memory-match','dino-runner'];
for(let i=1;i<=50;i++) base.push(`arcade-${String(i).padStart(2,'0')}`);
const grid=document.getElementById('grid');
for(const name of base){
  const a=document.createElement('a');a.className='card';a.href=`${name}/index.html`;
  const img=(name.startsWith('arcade-'))?'snake/image.svg':`${name}/image.svg`;
  a.innerHTML=`<img src='${img}' alt='${name}'><h3>${name}</h3>`;grid.appendChild(a);
}
const audio=new Audio('music/1.mp3');audio.loop=true;audio.volume=.35;
const play=()=>audio.play().catch(()=>{});play();
addEventListener('click',play,{once:true});addEventListener('keydown',play,{once:true});
document.getElementById('toggle').onclick=()=>audio.muted=!audio.muted;
