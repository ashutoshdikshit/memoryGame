memoryApp.controller('gameCtrl', gameCtrl);

gameCtrl.$inject = ['$timeout'];

function gameCtrl($timeout) {
  var vm = this;

  vm.numberArray = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15];
  vm.tiles = [];
  vm.tempCardValue = [];
  vm.tempCardId = [];
  vm.matchedCards = 0;
  vm.trys= 0;
  vm.tilesFound = 0;
  vm.gameProgress = '0%';

  vm.shuffleCards = shuffleCards;
  vm.createBoard = createBoard;
  vm.flipTile =  flipTile;
  vm.flipBack = flipBack;
  vm.calcProgress = calcProgress;

  vm.createBoard();

  function shuffleCards(arr) {
    var len =  arr.length, t, i;
    while (len) {
      i = Math.floor(Math.random() * len--);
      t = arr[len];
      arr[len] = arr[i];
      arr[i] = t;
    }
    console.log(arr);
    return arr;
  }

  function createBoard() {
    vm.matchedCards = 0;
    var tilesMarkup = '';
    vm.tiles = vm.shuffleCards(vm.numberArray);
  }

  function flipTile(elm, tile) {
    if(elm.currentTarget.innerHTML == '' && vm.tempCardValue.length < 2) {
        elm.currentTarget.innerHTML = vm.tiles[tile];

        if(vm.tempCardValue.length == 0) {
          vm.tempCardValue.push(vm.tiles[tile]);
          vm.tempCardId.push(elm.currentTarget.id);
          vm.trys++;
        }

        else if(vm.tempCardValue.length == 1) {
          vm.trys++;
          vm.tempCardValue.push(vm.tiles[tile]);
          vm.tempCardId.push(elm.currentTarget.id);
          if(vm.tempCardValue[0] == vm.tempCardValue[1]) {
            vm.matchedCards += 2;
            var tile1 = document.getElementById(vm.tempCardId[0]);
            var tile2 = document.getElementById(vm.tempCardId[1]);
            tile1.style.backgroundColor = "#59822c";
            tile2.style.backgroundColor = "#59822c";
            vm.tilesFound += 2;
            calcProgress();
            vm.tempCardValue = [];
            vm.tempCardId = [];
            if(vm.matchedCards == vm.tiles.length) {
              alert("all tiles flipped");
              createBoard();
            }
          }
          else {
            $timeout(function() {flipBack()}, 1000);
          }
        }
    }
  }

  function flipBack() {
    var tile1 = document.getElementById(vm.tempCardId[0]);
    var tile2 = document.getElementById(vm.tempCardId[1]);

    tile1.innerHTML = "";
    tile2.innerHTML = "";

    vm.tempCardValue = [];
    vm.tempCardId = [];
  }

  function calcProgress() {
    var totalTiles = vm.tiles.length;
    vm.gameProgress = Math.round((vm.tilesFound/totalTiles) * 100) + "%";
    var elm = document.getElementById('progressBar');
    elm.style.width = vm.gameProgress;
  }
}