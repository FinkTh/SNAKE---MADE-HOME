document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    const box = 20;
    let snake = [{ x: 10 * box, y: 10 * box }];
    let direction = "RIGHT";

    let food = {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };

    let score = 0;
    let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;
    document.getElementById('bestScore').textContent = 'Best: ' + String(bestScore).padStart(2, '0');

    document.getElementById('startButton').addEventListener('click', startGame);
    document.getElementById('tryAgainButton').addEventListener('click', function() {
        location.reload();
    });

    function startGame() {
        document.getElementById('startButton').style.display = 'none';
        document.addEventListener('keydown', changeDirection);
        game = setInterval(draw, 100);
    }

    function changeDirection(event) {
        const key = event.key;
        if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
        else if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
        else if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        else if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < snake.length; i++) {
            context.fillStyle = (i === 0) ? 'white' : 'white';
            context.fillRect(snake[i].x, snake[i].y, box, box);
            context.strokeStyle = 'white';
            context.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        context.fillStyle = "darkblue";
        context.fillRect(food.x, food.y, box, box);

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction === "LEFT") snakeX -= box;
        if (direction === "UP") snakeY -= box;
        if (direction === "RIGHT") snakeX += box;
        if (direction === "DOWN") snakeY += box;

        if (snakeX === food.x && snakeY === food.y) {
            score++;
            document.getElementById('score').textContent = String(score).padStart(2, '0');
            food = {
                x: Math.floor(Math.random() * (canvas.width / box)) * box,
                y: Math.floor(Math.random() * (canvas.height / box)) * box
            };
        } else {
            snake.pop();
        }

        const newHead = { x: snakeX, y: snakeY };

        if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
            clearInterval(game);
            document.getElementById('gameOverMessage').classList.remove('hidden');

            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem('bestScore', bestScore);
            }

            document.getElementById('bestScore').textContent = 'Best: ' + String(bestScore).padStart(2, '0');
            return;
        }

        snake.unshift(newHead);
    }

    function collision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }
});
