'use strict';

// LABEL Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnKeys = document.querySelector('.btn--keys');
const listKeys = document.querySelector('.keys--list');
const btnRules = document.querySelector('.btn--rules');
const rulesEl = document.querySelector('.rules');

// LABEL Starting condition
let playing = true;
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// LABEL functions
function winnerCheck() {
  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.classList.add('hidden');
    document
      .querySelector(`.player--${activePlayer === 0 ? 1 : 0}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    btnRoll.innerHTML = `<i class="fas fa-bomb"></i>  game over`;
    btnHold.style.display = 'none';
    document.querySelector('main').classList.add('game--end');
  }
}
function playerChange() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
function roll() {
  if (playing) {
    // 1. Genereting a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.classList.add('roll');
    diceEl.src = `dice-${dice}.png`;
    setTimeout(() => {
      diceEl.classList.remove('roll');
    }, 500);
    // 3. Check for rolled 1: true, switch to next player
    if (dice !== 1) {
      // add dice to current scorre
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      winnerCheck();
      player0El.classList.add('wrong');
      player1El.classList.add('wrong');
      setTimeout(() => {
        player0El.classList.remove('wrong');
        player1El.classList.remove('wrong');
      }, 200);
      playerChange();
    }
  }
}
function hold() {
  if (playing) {
    scores[activePlayer] += currentScore;
    winnerCheck();
    playerChange();
  }
}
function newGame() {
  let winnerEl = document.querySelector('.player--winner');
  if (winnerEl) winnerEl.classList.remove('player--winner');
  if (player1El.classList.contains('player--1')) {
    player1El.classList.remove('player--active');
    player0El.classList.add('player--active');
  }
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  btnRoll.innerHTML = `<i class="fas fa-dice"></i>Бросок (R)`;
  btnHold.style.display = 'flex';
  document.querySelector('main').classList.remove('game--end');
}
// LABEL Game logic
btnRoll.addEventListener('click', roll);

btnHold.addEventListener('click', hold);

btnNew.addEventListener('click', newGame);

// LABEL Keys options
function keyListener(key, btn, func) {
  if (event.code === key) {
    func();
    btn.classList.add('active');
    setTimeout(() => {
      btn.classList.remove('active');
    }, 500);
  }
}
function headerBtns(btn, hidden) {
  btn.classList.toggle('active');
  hidden.classList.toggle('hidden');
}
document.addEventListener('keydown', event => {
  keyListener('KeyS', btnHold, hold);
  keyListener('KeyR', btnRoll, roll);
  keyListener('KeyN', btnNew, newGame);
  if (event.code === 'KeyA') {
    btnRules.classList.toggle('active');
    rulesEl.classList.toggle('hidden');
  }
  if (event.code === 'KeyC') {
    btnKeys.classList.toggle('active');
    rulesEl.classList.toggle('hidden');
  }
});

btnKeys.addEventListener('click', function (e) {
  headerBtns(btnKeys, listKeys);
});
btnRules.addEventListener('click', function (e) {
  headerBtns(btnRules, rulesEl);
});
