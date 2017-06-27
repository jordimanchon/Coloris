function renderBoard(board, container) {
  for (var rowIndex = 0; rowIndex < board.height + 1; rowIndex++) {
    var row = $("<div>")
      .addClass("row");
    for (var columnIndex = 0; columnIndex < board.width; columnIndex++) {
      var column = $("<div>")
        .addClass("col-xs-6" + " x:" + columnIndex + "-y:" + rowIndex);
      row.append(column);
    }
    container.append(row);
  }
}

$(document).ready(function(){
  var board = new Board (6, 12);
  console.table(board.matrix);
  var container = $(".container");
  renderBoard(board, container);
});
