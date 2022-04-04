'use strict';

//Selecting 
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn--roll');
const newDice = document.querySelector('.btn--new');
const holDice = document.querySelector('.btn--hold');

let stateOfGame = true;
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
//Starting Conditions
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

const switchPlayer = function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}
//Rolling the Dice
const rolling = function () {
    //Random Dice Roll
    if (stateOfGame) {
        const dice1 = Math.trunc(Math.random() * 6) + 1;

        //Display dice
        dice.classList.remove('hidden');
        dice.src = `dice-${dice1}.png`

        // Check if 1 is rolled
        if (dice1 !== 1) {
            //Add dice to current score
            currentScore += dice1;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //Switch to next Player
            switchPlayer();
        }
    }
}


//Holding the Score
const holding = function () {
    //1.Add current score
    if (stateOfGame) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        //2.Check if more than 100
        if (scores[activePlayer] >= 50) {
            //Finish game
            stateOfGame = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }

    }
}
    ``
//Resetting
const resetting = function () {
    stateOfGame = true;
    currentScore = 0;
    activePlayer = 0;
    for (let i = 0; i < scores.length; i++) {
        scores[i] = 0;
    }
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;
    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player1.classList.remove('player--active');
    player0.classList.add('player--active');

}

rollDice.addEventListener('click', rolling);
holDice.addEventListener('click', holding);
newDice.addEventListener('click', resetting)