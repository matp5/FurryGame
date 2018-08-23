var Game = require('./game.js');

var game = new Game();

document.addEventListener('keydown', function(event){
  game.turnFurry(event);
});
$('#furryButton').on('click', function() {
  $('.box').css('left', '-100%');
  $(this).css('display', 'none');
  $(this).prev().css('display', 'none');
  $('#score').css("visibility", "visible")
  $('#board').css('visibility', 'visible')
  game.showFurry();
  game.showCoin();
  game.startGame();
});
