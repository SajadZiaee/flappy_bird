const gameScreen = document.getElementById('game-screen');

class Pipe {
    constructor(firstPipeHeight) {
        this.firstPipeHeight = firstPipeHeight;
        this.left = 100;
        this.scored = false;

    }
    get paintPipeUI() {

        let secondPipeHeight = 540 - this.firstPipeHeight;
        const newPipeUp = document.createElement('div');
        const newPipeDown = document.createElement('div');
        newPipeUp.classList = 'pipe-up';
        newPipeDown.classList = 'pipe-down';
        newPipeUp.style.height = `${this.firstPipeHeight}px`;
        newPipeDown.style.height = `${secondPipeHeight}px`;
        gameScreen.appendChild(newPipeDown);
        gameScreen.appendChild(newPipeUp);
        let interval = setInterval(() => {
            newPipeUp.style.left = `${this.left}%`;
            newPipeDown.style.left = `${this.left}%`;
            this.left -= 1.5;

            if (this.left < -11) {
                gameScreen.removeChild(newPipeUp);
                gameScreen.removeChild(newPipeDown);
                clearInterval(interval);

            }
            if (gameState === false) {
                clearInterval(interval);
            }
            if (this.left >= 7 && this.left <= 26) { //check intersection with the bird.

                let birdPosition = ((bird.style.top).replace('%', '') * 7.2);
                // 7.2 = 720 (screen height) / 100 : because top is in percents.
                if ((birdPosition < parseFloat(newPipeUp.style.height) || birdPosition > (690 - parseFloat(newPipeDown.style.height)) && gameState === true)) {
                    document.dispatchEvent(hitEvent);
                }


            } else if (this.left < 7 && this.scored === false && gameState === true) {
                this.scored = true;
                document.dispatchEvent(scoreEvent);

            }
        }, 25
        );

    }
}