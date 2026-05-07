const c=document.getElementById('game'),x=c.getContext('2d'),s=document.getElementById('score');
let d={x:70,y:170,w:34,h:34,vy:0,j:false},obs=[],t=0,sp=6,sc=0,dead=false;
function reset(){d.y=170;d.vy=0;d.j=false;obs=[];sp=6;sc=0;dead=false;loop();}
function spawn(){obs.push({x:c.width+20,w:20+Math.random()*30,h:30+Math.random()*40});}
function hit(a,b){return a.x<a2(b)&&a.x+a.w>b.x&&a.y<c.height-b.h&&a.y+a.h>c.height-b.h;}
const a2=b=>b.x+b.w;
addEventListener('keydown',e=>{if((e.code==='Space'||e.code==='ArrowUp')&&!d.j){d.vy=-12;d.j=true;} if(e.key.toLowerCase()==='r'&&dead) reset();});
function loop(){if(dead)return draw();t++;if(t%90===0)spawn();if(t%600===0)sp+=0.6;d.vy+=0.65;d.y+=d.vy;if(d.y>=170){d.y=170;d.vy=0;d.j=false;}obs.forEach(o=>o.x-=sp);obs=obs.filter(o=>o.x+o.w>0);for(const o of obs){if(hit(d,o)) dead=true;}sc++;draw();requestAnimationFrame(loop);} 
function draw(){x.fillStyle='#000';x.fillRect(0,0,c.width,c.height);x.strokeStyle='#666';x.beginPath();x.moveTo(0,205);x.lineTo(c.width,205);x.stroke();x.fillStyle=dead?'#888':'#ddd';x.fillRect(d.x,d.y,d.w,d.h);x.fillStyle='#5f5';obs.forEach(o=>x.fillRect(o.x,c.height-o.h,o.w,o.h));s.textContent=dead?`Game Over • Score ${sc} • Press R`: `Score ${sc}`;}
loop();
