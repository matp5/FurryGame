var Coin = require('./coin.js');
var Furry = require('./furry');

//punkt 5
function Game() {
  this.board = document.querySelectorAll('#board div');
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;
//punkt 6
}

Game.prototype.index = function (x, y) {
    return x + (y * 10);
}
//punkt 7
Game.prototype.showFurry = function() {
  //this.hideVisibileFurry(); nie działa, dopiero w startGame zaskoczyło, działało z pętlą for
  this.board[this.index(this.furry.x, this.furry.y)].classList.add("furry");
}

Game.prototype.showCoin = function() {
  this.board[this.index(this.coin.x, this.coin.y)].classList.add("coin");
}
//punkt 8
Game.prototype.startGame = function() {
  var self = this;

  this.idSetInterval = setInterval(function() {
  self.hideVisibileFurry();
  self.moveFurry();
}, 350);


}
//punkt 9
Game.prototype.moveFurry = function() {
  if(this.furry.direction === 'right') {
    this.furry.x = this.furry.x + 1;
  } else if(this.furry.direction === 'left') {
    this.furry.x = this.furry.x - 1;
  } else if(this.furry.direction === 'down') {
    this.furry.y = this.furry.y + 1;
  } else if(this.furry.direction === 'up') {
    this.furry.y = this.furry.y - 1;
  }
  this.showFurry();
  this.checkCoinCollision();
  this.gameOver();
}
//punkt 10
Game.prototype.hideVisibileFurry = function() {
  document.querySelector('.furry').classList.remove('furry');
//   for (var i = 0; i < this.board.length; i++) {
//     this.board[i].classList.remove("furry");
// } jest to opcja ktora ma dzialac w funkcji showFurry a nie w startGame
}
//punkt 11
Game.prototype.turnFurry = function(event) {
  switch (event.which) {
    case 37:
      this.furry.direction = "left";
      break;
    case 38:
    this.furry.direction = "up";
      break;
    case 39:
      this.furry.direction = "right";
      break;
    case 40:
      this.furry.direction = "down";
      break;
  }
}

//punkt 12
Game.prototype.checkCoinCollision = function() {
  if (this.furry.x === this.coin.x && this.coin.y == this.furry.y) {
    document.querySelector('div.coin').classList.remove('coin');
    this.score++;
    document.querySelector('#score strong').innerText = this.score;
    this.coin = new Coin();
    this.showCoin();
  }
}
//punkt 13
Game.prototype.gameOver = function() {
  if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
    clearInterval(this.idSetInterval);
    game.hideVisibileFurry();
    document.querySelector('#score div').innerText = 'YOU LOSE';
  }
}

module.exports = Game;
