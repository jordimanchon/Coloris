var board = new Board(6, 12);
var game = new Rules(3);
var trueHeight = board.height + 1;

function renderBoard(board) {
  var container = $('.container');
  for (var rowIndex = 0; rowIndex < trueHeight; rowIndex++) {
    var row = $('<div>')
    .addClass('row');
    for (var columnIndex = 0; columnIndex < board.width; columnIndex++) {
      var color = board.matrix[rowIndex][columnIndex];
      var column = $('<div>')
      .addClass('col-xs-6 ' + 'color ' + color)
      .attr('x', columnIndex)
      .attr('y', rowIndex)
      .data({x: columnIndex, y: rowIndex, color: color})
      .css({
        'width': '0',
        'height': '0',
        'padding': 'calc(90vh / ' + trueHeight + ' * 0.3)',
        'margin': 'calc(90vh / ' + trueHeight + ' * 0.2)'
      });
      row.append(column);
    }
    container.append(row);
  }
}

$(document).ready(function(){
  console.table(board.matrix); // !!!!!!!!!!!!!
  renderBoard(board);

  //counters

  var cell = $('.color').not($('.silver'));
  var coin = $('.silver');
  if (game.canSelect()) {
    cell.on('click', function(c) {
      var selectedCell = $(this).data();
      var selected = $(this)
       .addClass('selectedCell');
      console.log(selectedCell); // !!!!!!!!!!!!!
      game.move(selectedCell);
      console.log(game.activeMove); // !!!!!!!!!!!!!
      if (game.activeMove.length === 2) {
        game.endMove();
      }
      console.log(game);
    });
  }
});
