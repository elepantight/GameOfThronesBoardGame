// Predefined empty variables, obtaining elements for future DOM-manipulation, and event listeners to call functions.
var root = document.getElementById('game');
var messageHolder = document.getElementById('message-holder');
var diceButton = document.getElementById('dice');
var activePlayer;
var notActivePlayer;
var player1progress = document.getElementById('player1-pos');
var player2progress = document.getElementById('player2-pos');
var boardTiles = new Array(31);
document.addEventListener('DOMContentLoaded', getLocalStorage);
diceButton.addEventListener('click', checkTurn);

//Initialization of player 1 and player 2 objects. Which will be updated during the gameplay.
var player1 = {
  id: "1",
  name: "Player 1",
  position: 0,
  turn: true,
};

var player2 = {
  id: "2",
  name: "Player 2",
  position: 0,
  turn: false,
};

function getLocalStorage() {
  let charInfo = JSON.parse(localStorage.getItem('char'));
  let localCharInfo = JSON.parse(localStorage.getItem('localChar'));
  console.log(charInfo);
  for (let i = 0; i < charInfo.length; i++) {
    Object.assign(player1, {name: charInfo[0].name});
    Object.assign(player2, {name: charInfo[1].name});
    Object.assign(player1, {img: localCharInfo[0].img});
    Object.assign(player2, {img: localCharInfo[1].img});
  }
}

//Function to check the turn and switch turn.
function checkTurn() {
  if (player1.turn === true) {
    activePlayer = player1;
    notActivePlayer = player2;
    player1.turn = false;
    player2.turn = true;
    runDice(activePlayer);
  } else {
    activePlayer = player2;
    notActivePlayer = player1;
    player2.turn = false;
    player1.turn = true;
    runDice(activePlayer);
  }
}

// Function to generate a random number from the dice and then call the function movePlayer based on the activePlayer object and the number from the dice.
function runDice(activePlayer) {
  let diceSound = document.getElementById("dice-sound");
  diceSound.currentTime = 0;
  diceSound.play();
  let sides = 6;
  let randomNum = Math.floor(Math.random() * sides) + 1;
  diceButton.setAttribute("disabled", "");
  diceButton.innerHTML = randomNum;
  setTimeout(() => {
    diceButton.removeAttribute("disabled");
    diceButton.innerHTML = "Roll dice";
  }, 1000);
  movePlayer(activePlayer, randomNum);
}

// Function to move the player, based on the current player object and the result number from the dice. The Switch is used to differentiate the different numbers from the dice, based on the game rules.
function movePlayer(activePlayer, randomNum) {
  switch (activePlayer.position + randomNum) {
    case 6:
        activePlayer.turn = true;
        notActivePlayer.turn = false;
        let position = activePlayer.position + randomNum;
        activePlayer.position = position;
        message(`${activePlayer.name} gets 6 and get an extra turn`);
      break;
      case 10:
        activePlayer.position = activePlayer.position - 5;
        message(`${activePlayer.name} goes 5 steps back`);
        console.log(activePlayer.position);
      break;
      case 14:
        activePlayer.position = activePlayer.position -5;
        message(`${activePlayer.name} goes 5 steps back`);
      break;
      case 18:
        activePlayer.position = activePlayer.position - 7;
        message(`${activePlayer.name} goes 7 steps back`);
      break;
      case 23:
          activePlayer.position = activePlayer.position - 2;
          message(`${activePlayer.name} goes 2 steps back`);
      break;
      case 28:
            activePlayer.position = activePlayer.position - 7;
            message(`${activePlayer.name} goes 7 steps back`);
      break;
      default:
            activePlayer.position = activePlayer.position + randomNum;
            message(`${activePlayer.name} goes ${randomNum} steps forward`);
            break;
  }
  renderGame();
}

// Function to render the game based on the number of tiles. 
function renderGame() {
    root.innerHTML = "";
    for (let i = 1; i < boardTiles.length; i++) {
        let tile = document.createElement('div');
        if (player1.position === i) {
            tile.innerHTML += `<div class="player" style="background-image: url('${player1.img}');"></div>`;
        }
        if (player2.position === i) {
            tile.innerHTML += `<div class="player" style="background-image: url('${player2.img}');"></div>`;
        }
        tile.classList.add("game__box");
        root.appendChild(tile);
    }

    if (player1.position >= 30) {
        localStorage.setItem('Winner', JSON.stringify(player1));
        window.location.href = "winner.html";
    }
    if (player2.position >= 30) {
        localStorage.setItem('Winner', JSON.stringify(player2));
        window.location.href = "winner.html";
    }
    showPosition();
}


function showPosition() {
  player1progress.innerHTML = `Player 1 position: ${player1.position} / 30`;
  player2progress.innerHTML = `Player 2 position: ${player2.position} / 30`;
}

// Function to display messages.
function message(text) {
    let message = document.createElement('div');
    message.classList.add('class', 'message');
    message.classList.add('animated');
    message.classList.add('class', 'fadeIn');
    message.innerHTML = text;
    messageHolder.appendChild(message);
  
  setTimeout(() => {
    message.remove();
  }, 4000);
  }
  renderGame();
