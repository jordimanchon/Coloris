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
    .css({
      'margin': '0 auto',
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center'
    });
  var tutorialButton = $('<button>')
    .addClass('btn')
    .attr('id', 'btn-tutorial')
    .attr('type', 'button')
    .html('<p>?</p>')
    .css({
      'background': 'rgb(255, 160, 255)',
      'margin': '0 2vw',
      'border-radius': '50%',
      'padding': 'calc(90vh / ' + trueHeight + ' * 0.3)',
      'width': '0',
      'height': '0',
      'color': 'white',
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center',
      'font-size': '1.2rem'
    });
  var startButton = $('<button>')
    .addClass('btn')
    .attr('id', 'btn-start')
    .attr('type', 'button')
    .html('<span class="glyphicon glyphicon-play" aria-hidden="true"></span>')
    .css({
      'background': 'rgb(160, 255, 160)',
      'margin': '0 2vw',
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
  buttonRow.append(tutorialButton, startButton);
  startPage.append(logo, buttonRow);
  $('.container').append(startPage, footer);
}

function renderTutorial() {
  var tutorial = $('<div>')
    .css({

    });
  var redCoin = $('<div>')
    .addClass('col-xs-6 red')
    .css({
      'width': '0',
      'height': '0',
      'padding': 'calc(90vh / ' + trueHeight + ' * 0.3)',
      'margin': 'calc(90vh / ' + trueHeight + ' * 0.2)'
    });
  var greenCoin = $('<div>')
    .addClass('col-xs-6 green')
    .css({
      'width': '0',
      'height': '0',
      'padding': 'calc(90vh / ' + trueHeight + ' * 0.3)',
      'margin': 'calc(90vh / ' + trueHeight + ' * 0.2)'
    });
  var blueCoin = $('<div>')
    .addClass('col-xs-6 blue')
    .css({
      'width': '0',
      'height': '0',
      'padding': 'calc(90vh / ' + trueHeight + ' * 0.3)',
      'margin': 'calc(90vh / ' + trueHeight + ' * 0.2)'
    });
  var primaryColorsRow = $('<div>')
    .addClass('row');
  primaryColorsRow.append(redCoin, greenCoin, blueCoin);
  var primaryColors = $('<div>')
    .html('<p>Mix pairs of primary colors together…</p>')
    .css({
      'text-align': 'center',
      'margin-top': '6vh'
    })
    .append(primaryColorsRow);
  var cyanCoin = $('<div>')
    .addClass('col-xs-6 cyan')
    .css({
      'width': '0',
      'height': '0',
      'padding': 'calc(90vh / ' + trueHeight + ' * 0.3)',
      'margin': 'calc(90vh / ' + trueHeight + ' * 0.2)'
    });
  var magentaCoin = $('<div>')
    .addClass('col-xs-6 magenta')
    .css({
      'width': '0',
      'height': '0',
      'padding': 'calc(90vh / ' + trueHeight + ' * 0.3)',
      'margin': 'calc(90vh / ' + trueHeight + ' * 0.2)'
    });
  var yellowCoin = $('<div>')
    .addClass('col-xs-6 yellow')
    .css({
      'width': '0',
      'height': '0',
      'padding': 'calc(90vh / ' + trueHeight + ' * 0.3)',
      'margin': 'calc(90vh / ' + trueHeight + ' * 0.2)'
    });
  var secondaryColorsRow = $('<div>')
  .addClass('row')
  .append(cyanCoin, magentaCoin, yellowCoin);
  var secondaryColors = $('<div>')
    .html('<p>…or pairs of secondary colors.</p>')
    .css({
      'text-align': 'center',
      'margin-top': '6vh'
    })
    .append(secondaryColorsRow);
  var silverCoin = $('<div>')
    .addClass('col-xs-6 silver')
    .css({
      'width': '0',
      'height': '0',
      'padding': 'calc(90vh / ' + trueHeight + ' * 0.3)',
      'margin': 'calc(90vh / ' + trueHeight + ' * 0.2)'
    });
  var silverCoinsRow = $('<div>')
    .addClass('row')
    .append(silverCoin);
  var silverCoins = $('<div>')
    .html('<p>Get the silver coins!</p>')
    .css({
      'text-align': 'center',
      'margin-top': '6vh'
    })
    .append(silverCoinsRow);
  var buttons = $('<div>')
    .css({
      'margin': '12vh auto',
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center'
    });
  var startButton = $('<button>')
    .addClass('btn')
    .attr('id', 'btn-start')
    .attr('type', 'button')
    .html('<span class="glyphicon glyphicon-play" aria-hidden="true"></span>')
    .css({
      'background': 'rgb(160, 255, 160)',
      'margin': '0 2vw',
      'border-radius': '50%',
      'padding': 'calc(90vh / ' + trueHeight + ' * 0.3)',
      'width': '0',
      'height': '0',
      'display': 'flex',
      'justify-content': 'center',
      'align-items': 'center'
    })
    .click(function(){
      $('.container').empty();
      renderBoard(board);
      var cell = $('.color').not($('.silver'));
      var coin = $('.silver');
      if (game.canSelect()) {
        cell.on('click', function(c) {
          var selectedCell = $(this).data();
          var selected = $(this)
           .addClass('selectedCell');
          game.move(selectedCell);
          if (game.activeMove.length === 2) {
            game.endMove();
          }
        });
      }
    });
  buttons.append(startButton);
  tutorial.append(primaryColors, secondaryColors, silverCoins, buttons);
  $('.container').append(tutorial);
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

  $('#btn-tutorial').click(function(){
    $('.container').empty();
    renderTutorial();
  });

  $('#btn-start').click(function(){
    $('.container').empty();
    console.table(board.matrix); //!!!!!!!!!!!!!!!!!!!!!!!!!
    renderBoard(board);
    var cell = $('.color').not($('.silver'));
    var coin = $('.silver');
    if (game.canSelect()) {
      cell.on('click', function(c) {
        var selectedCell = $(this).data();
        var selected = $(this)
         .addClass('selectedCell');
        console.log(selectedCell); //!!!!!!!!!!!!!!!!!!!!!!!!!
        game.move(selectedCell);
        console.log(game.activeMove); //!!!!!!!!!!!!!!!!!!!!!!!!!
        if (game.activeMove.length === 2) {
          game.endMove();
        }
        console.log(game); //!!!!!!!!!!!!!!!!!!!!!!!!!
      });
    }
  });

});
