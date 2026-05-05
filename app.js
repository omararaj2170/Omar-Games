const WORD_API = "https://random-word-api.herokuapp.com/word?length=5";

const games = [
  { name: "wordle", needsWord: true },
  { name: "snake", needsWord: false },
  { name: "tic-tac-toe", needsWord: false },
  { name: "hangman", needsWord: true },
  { name: "minesweeper", needsWord: false },
  { name: "pong", needsWord: false },
  { name: "sudoku", needsWord: false },
  { name: "tetris", needsWord: false },
  { name: "flappy-bird", needsWord: false },
  { name: "memory-match", needsWord: false },
];

async function getWord() {
  const res = await fetch(WORD_API);
  if (!res.ok) throw new Error("Word API request failed");
  const data = await res.json();
  return Array.isArray(data) && data[0] ? String(data[0]).slice(0, 5).toLowerCase() : "-----";
}

async function renderGames() {
  const root = document.getElementById("games");
  const template = document.getElementById("game-card-template");

  for (const game of games) {
    const node = template.content.firstElementChild.cloneNode(true);
    const imagePath = `games/${game.name}/image.svg`;

    node.querySelector(".thumb").src = imagePath;
    node.querySelector(".thumb").alt = `${game.name} preview`;
    node.querySelector(".name").textContent = game.name;
    node.querySelector(".tag").textContent = game.needsWord ? "Word game" : "Arcade / puzzle";

    const wordEl = node.querySelector(".word");
    if (game.needsWord) {
      wordEl.textContent = "Loading 5-letter word...";
      try {
        const word = await getWord();
        wordEl.textContent = `Word: ${word} (API)`;
      } catch {
        wordEl.textContent = `Word: unavailable (API error)`;
      }
    } else {
      wordEl.textContent = "No word needed.";
    }

    root.appendChild(node);
  }
}

renderGames();
