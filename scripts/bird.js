// In the name of Allah.
const bird = document.getElementById('bird');
const scoreDiv = document.querySelector('.score');
const gameOverDiv = document.querySelectorAll('.game-over');
const startGameTxt = document.querySelector('#start-game');

//Events:

const gameOverEvent = new Event('gameOver');
const scoreEvent = new Event('score');
const hitEvent = new Event('hit');
const swooshEvent = new Event('swoosh');


let bird_top = 50;
let gravity = 10;
let velocity = 0; // if velocity < 0 bird's head is down. Else, bird's head is up.
let score = 0;
let state = 'mid';
let gameState = true; // true means the game is running, false means gameover.
let birdGravityInterval;
let pipeInterval;
let isGameStarted = false; // Game doesn't start until first space is pressed.

window.onload = function () {
    birdGravityInterval = setInterval(() => {
        if (isGameStarted === true) {
            velocity -= gravity / 30;
            if (velocity < 0) {
                state = 'down';
                if (velocity < -6.6 && velocity > -6.9) {
                    document.dispatchEvent(swooshEvent);
                }
            } else if (velocity === 0) {
                state = 'mid';
            } else {
                state = 'up';
            }
            bird.src = `./images/bluebird-${state}flap.png`;
            bird.style.transform = `rotate(${(-velocity) * 6}deg) scale(0.7)`;
            bird_top -= velocity;
            bird.style.top = `${bird_top}%`;
            if (bird_top <= -1 || bird_top >= 94) {
                document.dispatchEvent(gameOverEvent);
            }
        }
    },

        25);

    pipeInterval = setInterval(() => {

        if (isGameStarted === true) {
            let firstPipeHeight = Math.random() * 400 + 50; // generate a number between 50 and 450
            const pipe = new Pipe(firstPipeHeight);
            pipe.paintPipeUI;
        }

    }, 2500);

};

document.onkeydown = function (e) {
    e = e || window.event;
    if (isGameStarted === false) {
        isGameStarted = true;
        startGameTxt.style.display = 'none';
    }
    if (e.key === ' ' && gameState === true) {
        e.preventDefault(); // so the space button does not scroll down the screen.
        velocity = 3.5;
        bird_top -= velocity;
        bird.style.top = `${bird_top}%`;
        var audio = new Audio("audio/wing.ogg");
        audio.volume = 0.02;
        audio.play();
    } else { // gameover.
        e.preventDefault();
        window.location.reload();
    }

};

document.addEventListener('gameOver', () => {
    clearInterval(birdGravityInterval);
    clearInterval(pipeInterval);
    gameState = false;
    let audio = new Audio("audio/die.ogg");
    audio.volume = 0.02
    audio.play();

    gameOverDiv.forEach((gameover) => { gameover.style.display = 'inline'; });
});
document.addEventListener('score', () => {
    score++;
    let audio = new Audio("audio/point.ogg");
    audio.volume = 0.02
    audio.play();
    showScore();

});
document.addEventListener('hit', () => {
    clearInterval(birdGravityInterval);
    clearInterval(pipeInterval);
    gameState = false;
    let audio = new Audio("audio/hit.ogg");
    audio.volume = 0.02
    audio.play();
    gameOverDiv.forEach((gameover) => { gameover.style.display = 'inline'; });

});

document.addEventListener('swoosh', () => {
    let audio = new Audio("audio/swoosh.ogg");
    audio.volume = 0.02
    audio.play();
});

function showScore() {
    scoreDiv.innerHTML = ``;

    let tmpScore = score;
    while (tmpScore > 0) {

        let lsb = tmpScore % 10;
        console.log(tmpScore);
        scoreDiv.innerHTML = ` <img src="./images/${lsb}.png" alt=""> ` + scoreDiv.innerHTML;
        tmpScore = parseInt(tmpScore / 10);
    }
}