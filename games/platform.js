const games=[
  ['wordle','Wordle'],['snake','Snake'],['tic-tac-toe','Tic-Tac-Toe'],['hangman','Hangman'],['minesweeper','Minesweeper'],['pong','Pong'],['sudoku','Sudoku'],['tetris','Tetris'],['flappy-bird','Flappy Bird'],['memory-match','Memory Match'],['dino-runner','Dino Runner'],
  ...Array.from({length:50},(_,i)=>[`arcade-${String(i+1).padStart(2,'0')}`, document.querySelector(`#name-${i+1}`)?.textContent || `Arcade ${i+1}`])
];
const customNames = ["Neon Click Rush","Meteor Dodge","Number Hunter","Color Match","Quick Tap","Orbit Avoider","Memory Flip","Shape Sort","Word Scramble","Speed Counter","Pixel Jumper","Lane Switch","Bubble Pop","Target Shot","Tile Recall","Reaction Duel","Coin Catch","Pattern Pulse","Math Sprint","Shadow Step","Block Break","Star Collector","Code Cracker","Rhythm Tap","Sky Drift","Laser Dash","Gravity Hop","Treasure Pick","Signal Sync","Flash Finder","Ring Runner","Gem Guard","Maze Blink","Arrow Storm","Bit Builder","Time Twist","Echo Tap","Rocket Rescue","Lucky Door","Grid Escape","Cloud Climb","Path Painter","Bomb Diffuse","Knight Move","Comet Catch","Wire Connect","Spin Stop","Cipher Guess","Wave Rider","Final Sprint"];
for(let i=11;i<games.length;i++) games[i][1]=customNames[i-11];
const grid=document.getElementById('grid');
games.forEach(([slug,name])=>{const a=document.createElement('a');a.className='card';a.href=`${slug}/index.html`;a.innerHTML=`<img src='${slug}/image.svg' alt='${name}'><h3>${name}</h3><p>${slug}</p>`;grid.appendChild(a);});
const audio=new Audio('music/1.mp3');audio.loop=true;audio.volume=.35;const play=()=>audio.play().catch(()=>{});play();addEventListener('click',play,{once:true});document.getElementById('toggle').onclick=()=>audio.muted=!audio.muted;
