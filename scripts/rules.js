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
  if (this.canMove()) {
    return true;
  }
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
  console.log(this.activeMove); //!!!!!!!!!!!!!!!!!!!!!
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

// Rules.prototype._transposeMatrix = function() {
//   for (var row = 0; row < board.matrix.length; row++) {
//     for (var column = row+1; column < board.matrix.length; column++) {
//       var temp = board.matrix[row][column];
//       board.matrix[row][column] = board.matrix[column][row];
//       board.matrix[column][row] = temp;
//     }
//   }
// };

Rules.prototype.refreshBoard = function() {
  this.matchColors();
  // for (var i = 0; i < board.matrix.length; i++) {
  //   while (board.matrix[i].length > 6) {
  //     board.matrix[i].pop();
  //  }
  //}

  console.table(board.matrix);

    //recorrer board.matrix y si hay null pa arriba o pa abajo
  //?puntos
  //board._generateRandomColors()
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
