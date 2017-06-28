function Board(width, height) {
  this.width = width;
  this.height = height;
  this.matrix = this._generateMatrix();
  this._generatePointsRow();
  this._generateRandomColors();
}

Board.prototype._generateMatrix = function() {
  var y = [];
  while (y.length < this.height) {
    var x = [];
    y.push(x);
    while (x.length < this.width) {
      x.push(null);
    }
  }
  return y;
};

Board.prototype._generatePointsRow = function() {
  var pointsRow = [];
    while (pointsRow.length < this.width) {
      pointsRow.push("silver");
    }
  var middleBoard = Math.ceil(this.height/2);
  this.matrix.splice(middleBoard, 0, pointsRow);
};

Board.prototype._generateRandomColors = function() {
  for (i = 0; i < this.matrix.length; i++) {
    for (j = 0; j < this.matrix[i].length; j++) {
      if (this.matrix[i][j] === null) {
        var randomColor = Math.ceil(Math.random()*6);
        switch (randomColor) {
          case 1: this.matrix[i][j] = "red"; break;
          case 2: this.matrix[i][j] = "yellow"; break;
          case 3: this.matrix[i][j] = "green"; break;
          case 4: this.matrix[i][j] = "cyan"; break;
          case 5: this.matrix[i][j] = "blue"; break;
          case 6: this.matrix[i][j] = "magenta"; break;
        }
      }
    }
  }
};
