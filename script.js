const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");
const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT";
let food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box
};

document.addEventListener("keydown", changeDirection);

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
        context.fillStyle = (i === 0) ? "white" : "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);

        context.strokeStyle = "white";
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
        // Générer une nouvelle nourriture
        food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
        // Ne pas retirer la dernière partie du serpent pour l'allonger
    } else {
        // Retirer la dernière partie du serpent
        snake.pop();
    }

    const newHead = { x: snakeX, y: snakeY };

    if (
        snakeX < -2 || 
        snakeY < -2 || 
        snakeX >= canvas.width || 
        snakeY >= canvas.height || 
        collision(newHead, snake)
    ) {
        clearInterval(game);
        return alert("Game Over");
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

const game = setInterval(draw, 100);
