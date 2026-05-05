import json
from pathlib import Path
from urllib.request import Request, urlopen

WORD_API = "https://random-word-api.herokuapp.com/word?length=5"
ROOT = Path("games")
ROOT.mkdir(exist_ok=True)

games = [
    {"name": "wordle", "needs_word": True},
    {"name": "snake", "needs_word": False},
    {"name": "tic-tac-toe", "needs_word": False},
    {"name": "hangman", "needs_word": True},
    {"name": "minesweeper", "needs_word": False},
    {"name": "pong", "needs_word": False},
    {"name": "sudoku", "needs_word": False},
    {"name": "tetris", "needs_word": False},
    {"name": "flappy-bird", "needs_word": False},
    {"name": "memory-match", "needs_word": False},
]

colors = ["#1f2937", "#0f766e", "#7c3aed", "#dc2626", "#ea580c", "#0284c7", "#16a34a", "#be123c", "#4f46e5", "#334155"]
svg_template = """<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512'>
  <rect width='100%' height='100%' fill='{bg}'/>
  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='42' font-family='Arial, sans-serif' fill='white'>{title}</text>
</svg>
"""

# Fetch one 5-letter word per game that needs a word.
word_slots = sum(1 for game in games if game["needs_word"])
req = Request(f"{WORD_API}&number={word_slots}", headers={"User-Agent": "Mozilla/5.0"})

try:
    with urlopen(req, timeout=20) as response:
        fetched_words = json.loads(response.read().decode("utf-8"))
except Exception:
    fetched_words = ["apple", "brave", "cloud", "dream", "eagle"][:word_slots]


manifest = {"word_api": WORD_API, "games": []}
word_index = 0

for i, game in enumerate(games):
    name = game["name"]
    folder = ROOT / name
    folder.mkdir(parents=True, exist_ok=True)

    (folder / "image.svg").write_text(svg_template.format(bg=colors[i], title=name), encoding="utf-8")

    game_manifest = {
        "name": name,
        "image": f"games/{name}/image.svg",
        "needs_word": game["needs_word"],
    }

    if game["needs_word"]:
        word = fetched_words[word_index][:5].lower()
        word_index += 1
        (folder / "word.txt").write_text(word + "\n", encoding="utf-8")
        game_manifest["word"] = word
        game_manifest["word_api"] = WORD_API

    manifest["games"].append(game_manifest)

(ROOT / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print("Created 10 game folders and fetched API words for word-based games.")
