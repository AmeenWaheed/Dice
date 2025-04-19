'use strict';

// Update in the future add sounds and add winner name inside box
// const winSound = new Audio('sounds/win.mp3');
// const winnerName = document.getElementById(`name--${activePlayer}`).textContent;

// 🎯 Select DOM Elements
const scorePlayer1 = document.getElementById('score--0');
const scorePlayer2 = document.getElementById('score--1');
const playerName1 = document.getElementById('name--0');
const playerName2 = document.getElementById('name--1');
const currentPlayer1 = document.getElementById('current--0');
const currentPlayer2 = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const rollDice = document.querySelector('.btn--roll');
const holdDice = document.querySelector('.btn--hold');
const rollNew = document.querySelector('.btn--new');

const dice = document.querySelector('.dice');
const icon = document.querySelector('.icon');
const overlay = document.querySelector('.overlay');
const box = document.querySelector('.box-game-end');

// 🛠 Initial Game Setup
scorePlayer1.textContent = 0;
scorePlayer2.textContent = 0;
dice.classList.add('hidden');

// 🔢 Game State Variables
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// 👥 Ask for Player Names if default
// if (
//   playerName1.textContent === 'Player 1' &&
//   playerName2.textContent === 'Player 2'
// ) {
//   const player1 = prompt('Enter your name');
//   const player2 = prompt('Enter your name');
//   playerName1.textContent = player1;
//   playerName2.textContent = player2;
// }

// 📦 Functions to Show/Hide End Game Box
const openBox = function () {
  dice.classList.toggle('hidden');
  overlay.classList.remove('hidden');
  box.classList.remove('hidden');
};

const closeBox = function () {
  overlay.classList.add('hidden');
  box.classList.add('hidden');
};

// ❌ Close Box Events (click icon, overlay or Escape key)
icon.addEventListener('click', closeBox);
overlay.addEventListener('click', closeBox);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !box.classList.contains('hidden')) {
    closeBox();
  }
});

// 🔄 Switch Active Player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// 🎲 Roll Dice Button
rollDice.addEventListener('click', () => {
  if (playing) {
    const shuffleDice = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');
    dice.src = `dice-${shuffleDice}.png`;

    if (shuffleDice !== 1) {
      currentScore += shuffleDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// 🧊 Hold Score Button
holdDice.addEventListener('click', function () {
  if (playing) {
    // Add score to current player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 🎯 Check if player won
    if (scores[activePlayer] >= 100) {
      playing = false;

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      openBox(); // Show game end box
    } else {
      switchPlayer();
    }
  }
});

// 🔁 New Game Button
rollNew.addEventListener('click', () => {
  // Reset scores and current
  scores[0] = 0;
  scores[1] = 0;
  currentScore = 0;

  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  currentPlayer1.textContent = 0;
  currentPlayer2.textContent = 0;

  // Reset UI and state
  activePlayer = 0;
  playing = true;

  dice.src = `dice-1.png`;
  dice.classList.remove('hidden');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
});
