const playBtn = document.querySelector('.startGame'); // Play
const hands = [...document.querySelectorAll('.userChoice i')]; // Paper, rock, scisors
const cpuHand = document.querySelector('.cpuRandom i'); // CPU option
const userPoint = document.querySelector('.scoreboard div:nth-child(3)'); // User points
const cpuPoint = document.querySelector('.scoreboard div:nth-child(4)'); // CPU points
const descriptionRound = document.querySelector('.description'); // Round status information
const resultOfGame = document.querySelector('.resultInfo'); // Information about winner of the round / game.


const variant = {
    userVariant: 0,
    cpuVariant: 0
}

const options = ['paper', 'rock', 'scissors'];



const userVariant = (e) => {
    variant.userVariant = e.target.dataset.variant;
    hands.forEach(hand => hand.classList.remove('activeOptions'));
    e.target.classList.add('activeOptions');
    // console.log(variant.userVariant);
}

const cpuVariant = () => {
    let randomOption = Math.floor((Math.random() * 3) + 1);
    variant.cpuVariant = randomOption;
    
    if (randomOption === 1) {
        cpuHand.setAttribute('class', 'fas fa-hand-paper');
    } else if (randomOption === 2) {
        cpuHand.setAttribute('class', 'fas fa-hand-rock');
    } else {
        cpuHand.setAttribute('class', 'fas fa-hand-scissors');
    }

    return randomOption;
}

const comparison = (user, cpu) => {
    if (user == cpu) {
        resultOfGame.textContent = 'Result: Draw!';
    } else if ((user == 1 && cpu === 2) || (user == 2 && cpu === 3) || (user == 3 && cpu === 1)) {
        resultOfGame.textContent = 'Result: You won!';
        userPoint.textContent++;
    } else {
        resultOfGame.textContent = 'Result: You lost!';
        cpuPoint.textContent++;
    }
}

const endingGame = (user, cpu) => {
    if (userPoint.textContent == 5) {
        document.querySelector('.info').textContent = ` End of game! You won ${user} to ${cpu}.`;
        document.querySelector('.info').style.textAlign = 'center';
        descriptionRound.textContent = '';
        resultOfGame.textContent = '';
        playBtn.setAttribute('disabled', 'disabled');
    }
    if (cpuPoint.textContent == 5) {
        document.querySelector('.info').textContent = ` End of game! You lost ${user} to ${cpu}.`;
        document.querySelector('.info').style.textAlign = 'center';
        descriptionRound.textContent = '';
        resultOfGame.textContent = '';
        playBtn.setAttribute('disabled', 'disabled');
    }
}

const game = () => {
    if (variant.userVariant === 0) {
        descriptionRound.textContent = 'User has not selected any options!';
        return;
    } else {
        cpuVariant();
        descriptionRound.textContent = `Your choice is ${options[variant.userVariant - 1]}. Computer selected ${options[variant.cpuVariant - 1]}.`;
    }

    comparison(variant.userVariant, variant.cpuVariant);
    endingGame(userPoint.textContent, cpuPoint.textContent);

    // cpuVariant();
}



hands.forEach(hand => hand.addEventListener('click', userVariant));
playBtn.addEventListener('click', game);

