const bgm = document.getElementById('bgm');
const toggle = document.getElementById('toggle');
const gate = document.getElementById('audioGate');
const startAudio = document.getElementById('startAudio');

// Default track in games/music/
bgm.src = 'music/1.mp3';
bgm.volume = 0.45;

async function tryPlayMusic() {
  try {
    await bgm.play();
    gate.classList.add('hidden');
    removeUnlockListeners();
  } catch {
    gate.classList.remove('hidden');
  }
}

function removeUnlockListeners() {
  document.removeEventListener('pointerdown', onFirstInteraction);
  document.removeEventListener('keydown', onFirstInteraction);
  startAudio.removeEventListener('click', onFirstInteraction);
}

function onFirstInteraction() {
  tryPlayMusic();
}

// Attempt autoplay first.
tryPlayMusic();

// Fallback for browsers that block autoplay until user gesture.
document.addEventListener('pointerdown', onFirstInteraction);
document.addEventListener('keydown', onFirstInteraction);
startAudio.addEventListener('click', onFirstInteraction);

toggle.addEventListener('click', () => {
  bgm.muted = !bgm.muted;
});
