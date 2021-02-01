var count = 0;

var cells;

// ブロックのパターン
var blocks = {
  i: {
    class: "i",
    pattern: [
      [1, 1, 1, 1]
    ]
  },
  o: {
    class: "o",
    pattern: [
      [1, 1], 
      [1, 1]
    ]
  },
  t: {
    class: "t",
    pattern: [
      [0, 1, 0], 
      [1, 1, 1]
    ]
  },
  s: {
    class: "s",
    pattern: [
      [0, 1, 1], 
      [1, 1, 0]
    ]
  },
  z: {
    class: "z",
    pattern: [
      [1, 1, 0], 
      [0, 1, 1]
    ]
  },
  j: {
    class: "j",
    pattern: [
      [1, 0, 0], 
      [1, 1, 1]
    ]
  },
  l: {
    class: "l",
    pattern: [
      [0, 0, 1], 
      [1, 1, 1]
    ]
  }
};

loadTable();

// キーボードイベントを監視する
document.addEventListener("keydown", onKeyDown);

// キー入力によってそれぞれの関数を呼び出す
function onKeyDown(event) {
  if (event.keyCode === 37) {
    moveLeft();
  } else if (event.keyCode === 39) {
    moveRight();
  }
}

setInterval(function() {
  // ブロックが積み上がり切っていないかのチェック
  for (var row = 0; row < 1; row++) {
    for (var col = 0; col < 10; col++) {
      if (cells[2][col].className !== "") {
        alert("game over");
      }
    }
  }
  if(hasFallingBlocks()) {
    fallBlocks();
  } else {
    deleteRow();
    generateBlock();
  }
}, 300);

function loadTable() {
  cells = [];
  var td_array = document.getElementsByTagName("td"); // 200個の要素を持つ配列
  var index = 0;
  for (var row = 0; row < 20; row++) {
      cells[row] = []; // 配列のそれぞれの要素を配列にする(2次元配列にする)
      for (var col = 0; col < 10; col++) {
          cells[row][col] = td_array[index];
          index++;
      }
  }
}

function fallBlocks() {
  // 1. 底についていないか？
  for (var col = 0; col < 10; col++) {
      if (cells[19][col].blockNum === fallingBlockNum) {
          isFalling = false;
          return; // 一番下の行にブロックがいるので落とさない
      }
  }
  // 2. 1マス下に別のブロックがないか？
  for (var row = 18; row >= 0; row--) {
      for (var col = 0; col < 10; col++) {
          if (cells[row][col].blockNum === fallingBlockNum) {
              if (cells[row + 1][col].className !== "" && cells[row + 1][col].blockNum !== fallingBlockNum){
                  isFalling = false;
                  return; // 一つ下のマスにブロックがいるので落とさない
              }
          }
      }
  }
  // 下から二番目の行から繰り返しクラスを下げていく
  for (var row = 18; row >= 0; row--) {
      for (var col = 0; col < 10; col++) {
          if (cells[row][col].blockNum === fallingBlockNum) {
              cells[row + 1][col].className = cells[row][col].className;
              cells[row + 1][col].blockNum = cells[row][col].blockNum;
              cells[row][col].className = "";
              cells[row][col].blockNum = null;
          }
      }
  }
}

var fallingBlockNum = 0;
function generateBlock() {
  // ランダムにブロックを生成する
  // 1. ブロックパターンからランダムに一つパターンを選ぶ
  var keys = Object.keys(blocks);
  var nextBlockKey = keys[Math.floor(Math.random() * keys.length)];
  var nextBlock = blocks[nextBlockKey];
  var nextFallingBlockNum = fallingBlockNum + 1;
  // 2. 選んだパターンをもとにブロックを配置する
  var pattern = nextBlock.pattern;
  for (var row = 0; row < pattern.length; row++) {
      for (var col = 0; col < pattern[row].length; col++) {
          if (pattern[row][col]) {
              cells[row][col + 3].className = nextBlock.class;
              cells[row][col + 3].blockNum = nextFallingBlockNum;
          }
      }
  }
  // 3. 落下中のブロックがあるとする
  isFalling = true;
  fallingBlockNum = nextFallingBlockNum;
}

var isFalling = false;
function hasFallingBlocks() {
  return isFalling;
}

function deleteRow() {
  // そろっている行を消す
  for (var row = 19; row >= 0; row--) {
    var canDelete = true;
    for (var col = 0; col < 10; col++) {
      if (cells[row][col].className === "") {
        canDelete = false;
      }
    }
    if (canDelete) {
      // 1行消す
      for (var a = 0; a < 10; a++) {
        cells[row][a].className = "";
      }
      // 上の行のブロックをすべて1マス落とす
      for (var downRow = row - 1; row >= 0; downRow--) {
        for (var b = 0; b < 10; b++) {
          cells[downRow + 1][b].className = cells[downRow][b].className;
          cells[downRow + 1][b].blockNum = cells[downRow][b].blockNum;
          cells[downRow][b].className = "";
          cells[downRow][b].blockNum = null;
        }
      }
    }
  }
}

function moveRight() {
  // ブロックを右に移動させる
  for (var row = 0; row < 20; row++) {
    for (var col = 9; col >= 0; col--) {
      if (cells[row][col].blockNum === fallingBlockNum) {
        cells[row][col + 1].className = cells[row][col].className;
        cells[row][col + 1].blockNum = cells[row][col].blockNum;
        cells[row][col].className = "";
        cells[row][col].blockNum = null;
      }
    }
  }
}

function moveLeft() {
  // ブロックを左に移動させる
  for (var row = 0; row < 20; row++) {
    for (var col = 0; col < 10; col++) {
      if (cells[row][col].blockNum === fallingBlockNum) {
        cells[row][col - 1].className = cells[row][col].className;
        cells[row][col - 1].blockNum = cells[row][col].blockNum;
        cells[row][col].className = "";
        cells[row][col].blockNum = null;
      }
    }
  }
}