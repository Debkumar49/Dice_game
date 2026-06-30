'use strict';

// Selecting elements
const score0El = document.getElementById('score_0');
const score1El = document.getElementById('score_1');
const current0El = document.getElementById('current_0');
const current1El = document.getElementById('current_1');

const player0El = document.querySelector('.player_0');
const player1El = document.querySelector('.player_1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnRules = document.querySelector('.rules');
const btnCloseModal = document.querySelector('.modal_close');

// Game state
let scores, currentScore, activePlayer, playing;

const WINNING_SCORE = 100;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current_${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (!playing) return;

  // 1. Generate a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for rolled 1
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current_${activePlayer}`).textContent = currentScore;
  } else {
    // Switch to next player
    switchPlayer();
  }
});

// Holding functionality
btnHold.addEventListener('click', function () {
  if (!playing) return;

  // 1. Add current score to active player's overall score
  scores[activePlayer] += currentScore;
  document.getElementById(`score_${activePlayer}`).textContent = scores[activePlayer];

  // 2. Check if player's score is >= 100 (WIN)
  if (scores[activePlayer] >= WINNING_SCORE) {
    playing = false;
    diceEl.classList.add('hidden');

    document
      .querySelector(`.player_${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player_${activePlayer}`)
      .classList.remove('player--active');
  } else {
    // 3. Switch to the next player
    switchPlayer();
  }
});

// New game
btnNew.addEventListener('click', init);

// Rules modal
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnRules.addEventListener('click', openModal);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Start with rules modal hidden
closeModal();

// Initialize game
init();
