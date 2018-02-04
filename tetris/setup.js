const canvas = {};
canvas.element = document.getElementById('tetrisMap');
canvas.context = canvas.element.getContext('2d');
canvas.scale = function scale(width, height){
  canvas.context.scale(width, height);
}
canvas.restraints = {
  width: canvas.element.width,
  height: canvas.element.height
};

canvas.scale(30, 30);

let game = {
    board: getBoardMatrix(12, 19),
    dropCounter : 0,
    gears: {
      easy: {speed: 1000, maxScore: 1000, display: 'lvl: 1'},
      medium: {speed: 500, maxScore: 2200, display: 'lvl: 2'},
      hard: {speed: 300, maxScore: 3500, display: 'lvl: 3'},
      nightmare: {speed: 100, maxScore: 7000, display: 'lvl: 4'},
      hell: {speed: 50, maxScore: null, display: 'lvl: 5'},
    },
    currentPieceMatrix: null,
    isPaused: false,
    lastTime : 0,
    previewNextLetterMatrix: null,
    pos: {x: 0, y: 0},
    requestAF: null,
    score: 0,
    speed : 1000,
    user: {
      name: undefined,
      score: undefined
    },
};

const piecesColors = [
    null,
    '#550960',
    '#EB4B78',
    '#FA855D',
    '#FFE052',
    '#FF3281',
    '#FFF0D4',
    '#DDF714',
];

const piecesMatrix = {
  'I': [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
  ],

  'L': [
      [0, 2, 0],
      [0, 2, 0],
      [0, 2, 2],
  ],

  'J': [
      [0, 3, 0],
      [0, 3, 0],
      [3, 3, 0],
  ],

  'O': [
      [4, 4],
      [4, 4],
  ],

  'S': [
      [0, 5, 5],
      [5, 5, 0],
      [0, 0, 0],
  ],

  'T': [
      [0, 6, 0],
      [6, 6, 6],
      [0, 0, 0],
  ],

  'Z': [
      [7, 7, 0],
      [0, 7, 7],
      [0, 0, 0],
  ]
};

function getBoardMatrix(w, h) {
    const matrix = [];
    while (h--) {
        matrix.push(new Array(w).fill(0));
    }
    return matrix;
}

export {piecesMatrix, piecesColors, game, canvas};
