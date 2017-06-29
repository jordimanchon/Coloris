function Rules(moves) {
  this.totalMoves = moves;
  this.remainingMoves = this.moves;
  this.activeMove = [];
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
  this.activeMove.push(board.matrix[selectedCell.y][selectedCell.x]);
  //css.selectedCell
};

Rules.prototype.cleanMove = function() {
  this.activeMove = [];
};

Rules.prototype.endMove = function() {
  if (this.canMatch()) {
    this.cleanMove();
    this.remainingMoves --;
    //this.refreshBoard();
    if (!this.canMove()) {
      this.endTurn();
    }
  } else {
    this.activeMove.pop();
  }
  console.log(this.activeMove); //!!!!!!!!!!!!!!!!!!!!!
};
Rules.prototype.canMatch = function() {
  if (this.activeMove[0] === 'red') {
    if (this.activeMove[1] === 'green' || 'blue')
    return true;
  } else if (this.activeMove[0] === 'green') {
    if (this.activeMove[1] === 'red' || 'blue')
    return true;
  } else if (this.activeMove[0] === 'blue') {
    if (this.activeMove[1] === 'red' || 'green')
    return true;
  } else if (this.activeMove[0] === 'cyan') {
    if (this.activeMove[1] === 'magenta' || 'yellow')
    return true;
  } else if (this.activeMove[0] === 'magenta') {
    if (this.activeMove[1] === 'cyan' || 'yellow')
    return true;
  } else if (this.activeMove[0] === 'yellow') {
    if (this.activeMove[1] === 'cyan' || 'magenta')
    return true;
  } else {
    return false;
  }
};

Rules.prototype.matchColors = function() {};

Rules.prototype.refreshBoard = function() {};

// Rules.prototype.matchColors = function() {
//   //eliminar colores usados
//   //generar color nuevo
// };
//
// Rules.prototype.refreshBoard = function() {
//   this.matchColors();
//   //mover columnas
//   //rellenar huecos
//   //renderBoard()?
// };

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
