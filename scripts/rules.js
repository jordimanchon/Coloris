function Rules(moves) {
  this.totalMoves = moves;
  this.remainingMoves = this.moves;
  this.activeMove = [];
  this.turn = '';
}


Rules.prototype.restartMoves = function() {
  this.remainingMoves = this.totalMoves;
};

Rules.prototype.cleanMove = function() {
  this.activeMove = [];
};

Rules.prototype.canMove = function() {
  if (this.remainingMoves > 0)
    return true;
};

Rules.prototype.isNearerThanCoin = function() {
  //definir:there is coin and is further;
};

Rules.prototype.canSelect = function() {
  if (canMove()) {
    if (isNearerThanCoin()) {
      //css.selected
      return true;
    }
  }
};

Rules.prototype.move = function() {};

Rules.prototype.canMatch = function() {};

Rules.prototype.matchColors = function() {};

Rules.prototype.endMove = function() {};

Rules.prototype.refreshBoard = function() {};

Rules.prototype.pass = function() {
  //button event spacebar
  if (this.activeMove === []) {
    this.endTurn();
  }
};

Rules.prototype.endTurn = function() {
  this.turn = (this.turn === 'player1') ? this.turn = 'player2': this.turn = 'player1';
};
