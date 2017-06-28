var board = new Board(6, 6);
var trueHeight = board.height + 1;

function renderBoard(board) {
  var container = $(".container");
  for (var rowIndex = 0; rowIndex < trueHeight; rowIndex++) {
    var row = $("<div>")
    .addClass("row");
    for (var columnIndex = 0; columnIndex < board.width; columnIndex++) {
      var color = board.matrix[rowIndex][columnIndex];
      var column = $("<div>")
      .addClass("col-xs-6 " + color)
      .attr("x", columnIndex)
      .attr("y", rowIndex)
      .css({
        "width": "calc(90vh / " + trueHeight + " * 0.6)",
        "height": "0",
        "padding-bottom": "calc(90vh / " + trueHeight + " * 0.6)",
        "margin": "calc(90vh / " + trueHeight + " * 0.2)"
      });
      row.append(column);
    }
    container.append(row);
  }
}

$(document).ready(function(){
  console.table(board.matrix); // !!!!!!!!!!!!!
  renderBoard(board);
});
