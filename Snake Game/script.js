const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const box = 20; // grid size
const canvasSize = 400;

let snake;
let direction;
let food;
let score;
let gameInterval;

// Initialize Game
function initGame() {
    snake = [
        { x: 9 * box, y: 10 * box }
    ];

    direction = "RIGHT";

    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    score = 0;
    scoreElement.innerText = score;

    clearInterval(gameInterval);
    gameInterval = setInterval(draw, 120);
}

// Draw Everything
function draw() {
    ctx.fillStyle = "#9bbc0f";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "#0f380f" : "#306230";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = "#0f380f";
    ctx.fillRect(food.x, food.y, box, box);

    // Old head
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    // Wall collision
    if (
        headX < 0 || 
        headY < 0 || 
        headX >= canvasSize || 
        headY >= canvasSize || 
        collision(headX, headY, snake)
    ) {
        clearInterval(gameInterval);
        alert("Game Over! Your Score: " + score);
        return;
    }

    let newHead = { x: headX, y: headY };

    // Food collision
    if (headX === food.x && headY === food.y) {
        score++;
        scoreElement.innerText = score;

        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    snake.unshift(newHead);
}

// Self Collision
function collision(x, y, array) {
    for (let i = 0; i < array.length; i++) {
        if (x === array[i].x && y === array[i].y) {
            return true;
        }
    }
    return false;
}

// Controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
    }
    if (event.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
    }
    if (event.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT";
    }
    if (event.key === "ArrowDown" && direction !== "UP") {
        direction = "DOWN";
    }
});

// Restart
restartBtn.addEventListener("click", initGame);

initGame();