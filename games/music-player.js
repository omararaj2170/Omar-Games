(function(){
  const src = '../music/1.mp3';
  const audio = document.createElement('audio');
  audio.src = src;
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0.35;
  document.body.appendChild(audio);

  const play = () => audio.play().catch(()=>{});
  play();
  ['click','keydown','touchstart'].forEach(evt=>window.addEventListener(evt, play, { once:true }));
})();
