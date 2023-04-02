'use strict';

//Model variables
const btnclose = document.querySelector('.modal_close');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const openmodalbtn = document.querySelector('.rules');
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnclose.addEventListener('click', closeModal);

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};
document.addEventListener('keydown', function (e) {
    // console.log(e.key);

    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
openmodalbtn.addEventListener('click', openModal);


const score0E1 = document.querySelector('#score_0');
const score1E1 = document.getElementById('score_1');/*Another way to select id */
const player0E1 = document.querySelector('.player_0');
const player1E1 = document.querySelector('.player_1');
const current0E1 = document.getElementById('current_0');
const current1E1 = document.getElementById('current_1');

const diceE1 = document.querySelector('.dice');
const btnnew = document.querySelector('.btn--new');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');


let scores, currentscore, activeplayer, playing;

//starting Conditions
const init = function () {
    scores = [0, 0];
    currentscore = 0;
    activeplayer = 0;
    playing = true;

    score0E1.textContent = 0;
    score1E1.textContent = 0;
    current0E1.textContent = 0;
    current1E1.textContent = 0;
    diceE1.classList.add('hidden');
    player0E1.classList.remove('player--winner');
    player1E1.classList.remove('player--winner');
    player0E1.classList.add('player--active');
    player1E1.classList.remove('player--active');

};
init();

const switchplayer = function () {
    document.getElementById(`current_${activeplayer}`).textContent = 0;
    currentscore = 0;
    activeplayer = activeplayer === 0 ? 1 : 0;
    player0E1.classList.toggle('player--active');//add the clss if not present remove it if present
    player1E1.classList.toggle('player--active');
};

btnroll.addEventListener('click', function () {
    if (playing) {
        //1.Generating a randomm dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2. Display Dice
        diceE1.classList.remove('hidden');
        diceE1.src = `dice-${dice}.png`;//changing the file name for appropiate dice

        //3. Check for rolled 1
        if (dice !== 1) {
            currentscore += dice;
            document.getElementById(`current_${activeplayer}`).textContent = currentscore;

        }
        else {
            //switch player to next player
            switchplayer();

        }
    }
});
btnhold.addEventListener('click', function () {
    //1.Add current score to active player's score
    if (playing) {

        scores[activeplayer] += currentscore;//storing the value to score array by selecting the player
        document.getElementById(`score_${activeplayer}`).textContent = scores[activeplayer];


        //2. check if the player's score is >100
        if (scores[activeplayer] >= 100) {
            playing = false;
            diceE1.classList.add('hidden');
            document.querySelector(`.player_${activeplayer}`).classList.add('player--winner');
            // document.querySelector(`.player_${activeplayer}`).classList.remove('player--active');
        }
        else {
            switchplayer();
        }

    }
});
btnnew.addEventListener('click', init);