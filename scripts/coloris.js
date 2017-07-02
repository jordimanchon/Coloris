var board = new Board(6, 12);
var game = new Rules(3);
var trueHeight = board.height + 1;

function renderStart() {
  var startPage = $('<div>');
  var logo = $('<img>')
    .attr('src', './images/logo.png')
    .css({
      'width': '30vw',
      'margin': '20vh auto',
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center'
    });
  var buttonRow = $('<div>')
    ;
  var startButton = $('<button>')
    .addClass('btn')
    .attr('id', 'btn-start')
    .attr('type', 'button')
    .html('<span class="glyphicon glyphicon-play" aria-hidden="true"></span>')
    .css({
      'background': 'rgb(160, 255, 160)',
      'margin': '0 auto',
      'border-radius': '50%',
      'padding': 'calc(90vh / ' + trueHeight + ' * 0.3)',
      'width': '0',
      'height': '0',
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center'
    });
  var footer = $('<footer>')
    .html('by jordi<strong>manchón</strong>')
    .css({
      'font-size': '0.9rem',
      'position': 'absolute',
      'left': '50%',
      'bottom': '10vh',
      'transform': 'translate(-50%, 0%)'
    });
  buttonRow.append(startButton);
  startPage.append(logo, buttonRow);
  $('.container').append(startPage, footer);
}

function renderBoard(board) {
  for (var rowIndex = 0; rowIndex < trueHeight; rowIndex++) {
    var row = $('<div>')
    .addClass('row');
    for (var columnIndex = 0; columnIndex < board.width; columnIndex++) {
      var color = board.matrix[rowIndex][columnIndex];
      var column = $('<div>')
      .addClass('col-xs-6 ' + 'color ' + color)
      .data({x: columnIndex, y: rowIndex, color: color})
      .css({
        'width': '0',
        'height': '0',
        'padding': 'calc(90vh / ' + trueHeight + ' * 0.3)',
        'margin': 'calc(90vh / ' + trueHeight + ' * 0.2)'
      });
      row.append(column);
    }
    $('.container').append(row);
  }
}

$(document).ready(function(){
  renderStart();

  //counters

  $('#btn-start').click(function(){
    $('.container').empty();
    console.table(board.matrix);
    renderBoard(board);
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
  });

});
