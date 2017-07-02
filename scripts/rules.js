function Rules(moves) {
  this.totalMoves = moves;
  this.remainingMoves = this.moves;
  this.activeMove = [];
  this.deleteCells = [null, null];
  this.turn = 'player1';
  this.restartMoves();
}

Rules.prototype.restartMoves = function() {
  this.remainingMoves = this.totalMoves;
};

Rules.prototype.canMove = function() {
  if (this.remainingMoves > 0) return true;
};

Rules.prototype.canSelect = function() {
  if (this.canMove()) return true;
};

Rules.prototype.move = function(selectedCell) {
  //selectSound
  this.activeMove.push(board.matrix[selectedCell.y][selectedCell.x]);
  if (this.deleteCells[0] === null) {
    this.deleteCells[0] = [selectedCell.y, selectedCell.x];
  } else {
    this.deleteCells[1] = [selectedCell.y, selectedCell.x];
  }
  this.deleteCells.push(board.matrix);
};

Rules.prototype.cleanMove = function() {
  this.activeMove = [];
  this.deleteCells = [null, null];
};

Rules.prototype.endMove = function() {
  if (this.canMatch()) {
    this.refreshBoard();
    this.cleanMove();
    this.remainingMoves --;
    if (!this.canMove()) {
      this.endTurn();
    }
  } else {
    $('.selectedCell').removeClass('selectedCell');
    //errorSound
    this.cleanMove();
  }
  console.log(this.activeMove);
};
Rules.prototype.canMatch = function() {
  if (this.activeMove[0] === 'red') {
    if (this.activeMove[1] === 'green' || this.activeMove[1] === 'blue') return true;
  } else if (this.activeMove[0] === 'green') {
    if (this.activeMove[1] === 'red' || this.activeMove[1] === 'blue') return true;
  } else if (this.activeMove[0] === 'blue') {
    if (this.activeMove[1] === 'red' || this.activeMove[1] === 'green') return true;
  } else if (this.activeMove[0] === 'cyan') {
    if (this.activeMove[1] === 'magenta' || this.activeMove[1] === 'yellow') return true;
  } else if (this.activeMove[0] === 'magenta') {
    if (this.activeMove[1] === 'cyan' || this.activeMove[1] === 'yellow') return true;
  } else if (this.activeMove[0] === 'yellow') {
    if (this.activeMove[1] === 'cyan' || this.activeMove[1] === 'magenta') return true;
  } else { return false;
  }
};

Rules.prototype.matchColors = function() {
  //mixSound
  var newColor;
  switch (this.activeMove[0]) {
    case 'red':
      switch (this.activeMove[1]) {
        case 'green':
          newColor = 'yellow';
          break;
        case 'blue':
          newColor = 'magenta';
          break;
      }
      break;
    case 'green':
      switch (this.activeMove[1]) {
        case 'red':
          newColor = 'yellow';
          break;
        case 'blue':
          newColor = 'cyan';
          break;
      }
      break;
    case 'blue':
      switch (this.activeMove[1]) {
        case 'red':
          newColor = 'magenta';
          break;
        case 'green':
          newColor = 'cyan';
          break;
      }
      break;
    case 'cyan':
      switch (this.activeMove[1]) {
        case 'magenta':
          newColor = 'blue';
          break;
        case 'yellow':
          newColor = 'green';
          break;
      }
      break;
    case 'magenta':
      switch (this.activeMove[1]) {
        case 'cyan':
          newColor = 'blue';
          break;
        case 'yellow':
          newColor = 'red';
          break;
      }
      break;
    case 'yellow':
      switch (this.activeMove[1]) {
        case 'cyan':
          newColor = 'green';
          break;
        case 'magenta':
          newColor = 'red';
          break;
      }
      break;
  }
  board.matrix[this.deleteCells[0][0]].splice(this.deleteCells[0][1], 1, null);
  board.matrix[this.deleteCells[1][0]].splice(this.deleteCells[1][1], 1, newColor);
};

Rules.prototype.refreshBoard = function() {
  this.matchColors();
  var randomColor = Math.ceil(Math.random()*6);
  switch (randomColor) {
    case 1: randomColor = 'red'; break;
    case 2: randomColor = 'yellow'; break;
    case 3: randomColor = 'green'; break;
    case 4: randomColor = 'cyan'; break;
    case 5: randomColor = 'blue'; break;
    case 6: randomColor = 'magenta'; break;
  }
  if (this.turn === 'player1') {
    for (var i = this.deleteCells[0][0]; i < board.matrix.length; i++) { //desde la fila de la primera seleccionada hasta abajo
      for (var j = 0; j < board.matrix[i].length; j++) { //por todas las celdas de la fila
        if (board.matrix[i][j] === null) {
          for (var y = this.deleteCells[0][0]; y > 0; y--) {
              board.matrix[y][j] = board.matrix[y-1][j];
          }
        }
      }
    }
    board.matrix[0].splice(this.deleteCells[0][1], 1, randomColor);
  } else if (this.turn === 'player2') {
    for (var u = this.deleteCells[0][0]; u > 0; u--) { //desde la fila de la primera seleccionada hasta arriba
      for (var v = 0; v < board.matrix[u].length; v++) { //por todas las celdas de la fila
        if (board.matrix[u][v] === null) {
          for (var w = this.deleteCells[0][0]; w < board.matrix.length - 1; w++) {
              board.matrix[w][v] = board.matrix[w+1][v];
          }
        }
      }
    }
    board.matrix[12].splice(this.deleteCells[0][1], 1, randomColor);
  }
  console.table(board.matrix);
  this.reRenderBoard();
  this.nextMove();
};

Rules.prototype.endTurn = function() {
  switch (this.turn) {
    case 'player1':
      this.turn = 'player2';
      break;
    case 'player2':
      this.turn = 'player1';
      break;
  }
  this.restartMoves();
};

Rules.prototype.reRenderBoard = function () {
  $(".container > *").remove();
  renderBoard(board);
};

Rules.prototype.nextMove = function () {
  var cell = $('.color').not($('.silver'));
  var coin = $('.silver');
  if (game.canSelect()) {
    cell.on('click', function(c) {
      var selectedCell = $(this).data();
      var selected = $(this)
       .addClass('selectedCell');
      console.log(selectedCell);
      game.move(selectedCell);
      console.log(game.activeMove);
      if (game.activeMove.length === 2) {
        game.endMove();
      }
      console.log(game);
    });
  }
};
