const initialState = [
  ['red', 'blue', 'red', 'blue'],
  ['green', 'green', 'yellow', 'yellow'],
  ['purple', 'purple', 'orange', 'orange'],
  ['pink', 'pink', 'cyan', 'cyan'],
  ['gray', 'gray', 'brown', 'brown'],
  ['magenta', 'magenta', 'blue', 'red'],
  ['yellow', 'green', 'red', 'blue'],
  ['cyan', 'orange', 'gray', 'magenta'],
  ['brown', 'pink', 'purple', 'green'],
  ['gray', 'pink', 'orange', 'cyan'],
  ['brown', 'magenta', 'yellow', 'purple'],
  [], []
];

let bottles = JSON.parse(JSON.stringify(initialState));
let history = [];
let selected = null;

const gameEl = document.getElementById("game");

function render() {
  gameEl.innerHTML = "";
  bottles.forEach((bottle, idx) => {
    const bottleEl = document.createElement("div");
    bottleEl.className = "bottle";
    if (selected === idx) bottleEl.classList.add("selected");

    bottle.forEach((color, i) => {
      const layerEl = document.createElement("div");
      layerEl.className = "layer";
      layerEl.style.backgroundColor = color;
      bottleEl.appendChild(layerEl);
    });

    bottleEl.onclick = () => onClickBottle(idx);
    gameEl.appendChild(bottleEl);
  });
}

function onClickBottle(index) {
  if (selected === null) {
    selected = index;
  } else {
    if (selected !== index) {
      if (tryMove(selected, index)) {
        history.push(JSON.parse(JSON.stringify(bottles)));
      }
    }
    selected = null;
  }
  render();
}

function tryMove(from, to) {
  const src = bottles[from];
  const dst = bottles[to];
  if (src.length === 0 || dst.length >= 4) return false;

  const movingColor = src[src.length - 1];
  let moveCount = 1;
  for (let i = src.length - 2; i >= 0; i--) {
    if (src[i] === movingColor) moveCount++;
    else break;
  }

  const space = 4 - dst.length;
  if (dst.length > 0 && dst[dst.length - 1] !== movingColor) return false;

  const actualMove = Math.min(moveCount, space);
  for (let i = 0; i < actualMove; i++) {
    dst.push(src.pop());
  }
  return true;
}

function undo() {
  if (history.length > 0) {
    bottles = history.pop();
    selected = null;
    render();
  }
}

function reset() {
  bottles = JSON.parse(JSON.stringify(initialState));
  history = [];
  selected = null;
  render();
}

render();
