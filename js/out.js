/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Coin = __webpack_require__(2);
var Furry = __webpack_require__(3);

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Coin() {
  this.x = Math.floor(Math.random() * 10);
  this.y = Math.floor(Math.random() * 5);
}

module.exports = Coin;


/***/ }),
/* 3 */
/***/ (function(module, exports) {


//punkt 4
function Furry () {
  this.x = 0;
  this.y = 0;
  this.direction = 'right';
}

module.exports = Furry


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzJhYWZmNGY3MDhmNjA5NThiOWMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29pbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9mdXJyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7O0FDaEJEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHVCQUF1QjtBQUMzQztBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDOUZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiIuL2pzL291dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDMyYWFmZjRmNzA4ZjYwOTU4YjljIiwidmFyIEdhbWUgPSByZXF1aXJlKCcuL2dhbWUuanMnKTtcclxuXHJcbnZhciBnYW1lID0gbmV3IEdhbWUoKTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihldmVudCl7XHJcbiAgZ2FtZS50dXJuRnVycnkoZXZlbnQpO1xyXG59KTtcclxuJCgnI2Z1cnJ5QnV0dG9uJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgJCgnLmJveCcpLmNzcygnbGVmdCcsICctMTAwJScpO1xyXG4gICQodGhpcykuY3NzKCdkaXNwbGF5JywgJ25vbmUnKTtcclxuICAkKHRoaXMpLnByZXYoKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAkKCcjc2NvcmUnKS5jc3MoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKVxuICAkKCcjYm9hcmQnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpXG4gIGdhbWUuc2hvd0Z1cnJ5KCk7XG4gIGdhbWUuc2hvd0NvaW4oKTtcbiAgZ2FtZS5zdGFydEdhbWUoKTtcclxufSk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBDb2luID0gcmVxdWlyZSgnLi9jb2luLmpzJyk7XHJcbnZhciBGdXJyeSA9IHJlcXVpcmUoJy4vZnVycnknKTtcclxuXHJcbi8vcHVua3QgNVxyXG5mdW5jdGlvbiBHYW1lKCkge1xyXG4gIHRoaXMuYm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjYm9hcmQgZGl2Jyk7XHJcbiAgdGhpcy5mdXJyeSA9IG5ldyBGdXJyeSgpO1xyXG4gIHRoaXMuY29pbiA9IG5ldyBDb2luKCk7XHJcbiAgdGhpcy5zY29yZSA9IDA7XHJcbi8vcHVua3QgNlxyXG59XHJcblxyXG5HYW1lLnByb3RvdHlwZS5pbmRleCA9IGZ1bmN0aW9uICh4LCB5KSB7XHJcbiAgICByZXR1cm4geCArICh5ICogMTApO1xyXG59XHJcbi8vcHVua3QgN1xyXG5HYW1lLnByb3RvdHlwZS5zaG93RnVycnkgPSBmdW5jdGlvbigpIHtcclxuICAvL3RoaXMuaGlkZVZpc2liaWxlRnVycnkoKTsgbmllIGR6aWHFgmEsIGRvcGllcm8gdyBzdGFydEdhbWUgemFza29jennFgm8sIGR6aWHFgmHFgm8geiBwxJl0bMSFIGZvclxyXG4gIHRoaXMuYm9hcmRbdGhpcy5pbmRleCh0aGlzLmZ1cnJ5LngsIHRoaXMuZnVycnkueSldLmNsYXNzTGlzdC5hZGQoXCJmdXJyeVwiKTtcclxufVxyXG5cclxuR2FtZS5wcm90b3R5cGUuc2hvd0NvaW4gPSBmdW5jdGlvbigpIHtcclxuICB0aGlzLmJvYXJkW3RoaXMuaW5kZXgodGhpcy5jb2luLngsIHRoaXMuY29pbi55KV0uY2xhc3NMaXN0LmFkZChcImNvaW5cIik7XHJcbn1cclxuLy9wdW5rdCA4XHJcbkdhbWUucHJvdG90eXBlLnN0YXJ0R2FtZSA9IGZ1bmN0aW9uKCkge1xyXG4gIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgdGhpcy5pZFNldEludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgc2VsZi5oaWRlVmlzaWJpbGVGdXJyeSgpO1xyXG4gIHNlbGYubW92ZUZ1cnJ5KCk7XHJcbn0sIDM1MCk7XHJcblxyXG5cclxufVxyXG4vL3B1bmt0IDlcclxuR2FtZS5wcm90b3R5cGUubW92ZUZ1cnJ5ID0gZnVuY3Rpb24oKSB7XHJcbiAgaWYodGhpcy5mdXJyeS5kaXJlY3Rpb24gPT09ICdyaWdodCcpIHtcclxuICAgIHRoaXMuZnVycnkueCA9IHRoaXMuZnVycnkueCArIDE7XHJcbiAgfSBlbHNlIGlmKHRoaXMuZnVycnkuZGlyZWN0aW9uID09PSAnbGVmdCcpIHtcclxuICAgIHRoaXMuZnVycnkueCA9IHRoaXMuZnVycnkueCAtIDE7XHJcbiAgfSBlbHNlIGlmKHRoaXMuZnVycnkuZGlyZWN0aW9uID09PSAnZG93bicpIHtcclxuICAgIHRoaXMuZnVycnkueSA9IHRoaXMuZnVycnkueSArIDE7XHJcbiAgfSBlbHNlIGlmKHRoaXMuZnVycnkuZGlyZWN0aW9uID09PSAndXAnKSB7XHJcbiAgICB0aGlzLmZ1cnJ5LnkgPSB0aGlzLmZ1cnJ5LnkgLSAxO1xyXG4gIH1cclxuICB0aGlzLnNob3dGdXJyeSgpO1xyXG4gIHRoaXMuY2hlY2tDb2luQ29sbGlzaW9uKCk7XHJcbiAgdGhpcy5nYW1lT3ZlcigpO1xyXG59XHJcbi8vcHVua3QgMTBcclxuR2FtZS5wcm90b3R5cGUuaGlkZVZpc2liaWxlRnVycnkgPSBmdW5jdGlvbigpIHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnVycnknKS5jbGFzc0xpc3QucmVtb3ZlKCdmdXJyeScpO1xyXG4vLyAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ib2FyZC5sZW5ndGg7IGkrKykge1xyXG4vLyAgICAgdGhpcy5ib2FyZFtpXS5jbGFzc0xpc3QucmVtb3ZlKFwiZnVycnlcIik7XHJcbi8vIH0gamVzdCB0byBvcGNqYSBrdG9yYSBtYSBkemlhbGFjIHcgZnVua2NqaSBzaG93RnVycnkgYSBuaWUgdyBzdGFydEdhbWVcclxufVxyXG4vL3B1bmt0IDExXHJcbkdhbWUucHJvdG90eXBlLnR1cm5GdXJyeSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgc3dpdGNoIChldmVudC53aGljaCkge1xyXG4gICAgY2FzZSAzNzpcclxuICAgICAgdGhpcy5mdXJyeS5kaXJlY3Rpb24gPSBcImxlZnRcIjtcclxuICAgICAgYnJlYWs7XHJcbiAgICBjYXNlIDM4OlxyXG4gICAgdGhpcy5mdXJyeS5kaXJlY3Rpb24gPSBcInVwXCI7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSAzOTpcclxuICAgICAgdGhpcy5mdXJyeS5kaXJlY3Rpb24gPSBcInJpZ2h0XCI7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgY2FzZSA0MDpcclxuICAgICAgdGhpcy5mdXJyeS5kaXJlY3Rpb24gPSBcImRvd25cIjtcclxuICAgICAgYnJlYWs7XHJcbiAgfVxyXG59XHJcblxyXG4vL3B1bmt0IDEyXHJcbkdhbWUucHJvdG90eXBlLmNoZWNrQ29pbkNvbGxpc2lvbiA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmICh0aGlzLmZ1cnJ5LnggPT09IHRoaXMuY29pbi54ICYmIHRoaXMuY29pbi55ID09IHRoaXMuZnVycnkueSkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmNvaW4nKS5jbGFzc0xpc3QucmVtb3ZlKCdjb2luJyk7XHJcbiAgICB0aGlzLnNjb3JlKys7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2NvcmUgc3Ryb25nJykuaW5uZXJUZXh0ID0gdGhpcy5zY29yZTtcclxuICAgIHRoaXMuY29pbiA9IG5ldyBDb2luKCk7XHJcbiAgICB0aGlzLnNob3dDb2luKCk7XHJcbiAgfVxyXG59XHJcbi8vcHVua3QgMTNcclxuR2FtZS5wcm90b3R5cGUuZ2FtZU92ZXIgPSBmdW5jdGlvbigpIHtcclxuICBpZiAodGhpcy5mdXJyeS54IDwgMCB8fCB0aGlzLmZ1cnJ5LnggPiA5IHx8IHRoaXMuZnVycnkueSA8IDAgfHwgdGhpcy5mdXJyeS55ID4gOSkge1xyXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLmlkU2V0SW50ZXJ2YWwpO1xyXG4gICAgZ2FtZS5oaWRlVmlzaWJpbGVGdXJyeSgpO1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Njb3JlIGRpdicpLmlubmVyVGV4dCA9ICdZT1UgTE9TRSc7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvZ2FtZS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBDb2luKCkge1xyXG4gIHRoaXMueCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICB0aGlzLnkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb2luO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2NvaW4uanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbi8vcHVua3QgNFxyXG5mdW5jdGlvbiBGdXJyeSAoKSB7XHJcbiAgdGhpcy54ID0gMDtcclxuICB0aGlzLnkgPSAwO1xyXG4gIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGdXJyeVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2pzL2Z1cnJ5LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=