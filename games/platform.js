const bgm = document.getElementById('bgm');
const toggle = document.getElementById('toggle');
const gate = document.getElementById('audioGate');
const startAudio = document.getElementById('startAudio');

// Put your own music file in games/music and set this path.
bgm.src = 'music/theme.mp3';
bgm.volume = 0.45;

async function unlockAndPlay() {
  try {
    await bgm.play();
    gate.classList.add('hidden');
  } catch {
    gate.classList.remove('hidden');
  }
}

unlockAndPlay();

function startFromInteraction() {
  unlockAndPlay();
}

document.addEventListener('click', startFromInteraction, { once: true });
startAudio.addEventListener('click', startFromInteraction);

toggle.addEventListener('click', () => {
  bgm.muted = !bgm.muted;
});
