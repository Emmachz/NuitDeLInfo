// DOM Elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game Constants
const tileSize = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

// Game Variables
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let foods = [
    { x: getRandomPosition(), y: getRandomPosition() },
    { x: getRandomPosition(), y: getRandomPosition() },
    { x: getRandomPosition(), y: getRandomPosition() },
    { x: getRandomPosition(), y: getRandomPosition() }
];
let score = 0;

// Game Loop
function gameLoop() {
    if (checkCollision()) {
        alert(`Game Over! Your score: ${score}`);
        resetGame();
        return;
    }

    updateSnake();
    drawGame();
    setTimeout(gameLoop, 100);
}

// Draw everything
function drawGame() {
    // Draw the background
    ctx.fillStyle = "#001f3f"; // Deep blue
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Draw the grid
    ctx.strokeStyle = "#004080"; // Light ocean blue
    for (let x = 0; x < canvasSize; x += tileSize) {
        for (let y = 0; y < canvasSize; y += tileSize) {
            ctx.strokeRect(x, y, tileSize, tileSize);
        }
    }

    // Draw the snake
    ctx.fillStyle = "#00ff99"; // Light green for snake
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, tileSize, tileSize));

    // Draw the foods
    ctx.fillStyle = "#ff5733"; // Orange for contrasting food
    foods.forEach(food => ctx.fillRect(food.x, food.y, tileSize, tileSize));

    // Update the score
    document.getElementById("score").textContent = score;
}

// Update Snake's position
function updateSnake() {
    const head = { x: snake[0].x + direction.x * tileSize, y: snake[0].y + direction.y * tileSize };

    // Check if any food is eaten
    foods = foods.map(food => {
        if (head.x === food.x && head.y === food.y) {
            score++;
            // Create new food at a random position
            return { x: getRandomPosition(), y: getRandomPosition() };
        } else {
            return food;
        }
    });

    snake.unshift(head); // Add new head
    if (!foods.some(food => head.x === food.x && head.y === food.y)) {
        snake.pop(); // Remove the tail if no food is eaten
    }
}

// Check for collisions
function checkCollision() {
    const head = snake[0];
    // Check wall collision
    if (head.x < 0 || head.y < 0 || head.x >= canvasSize || head.y >= canvasSize) {
        return true;
    }
    // Check self collision
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Get random position for food
function getRandomPosition() {
    return Math.floor(Math.random() * (canvasSize / tileSize)) * tileSize;
}

// Reset Game
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    foods = [
        { x: getRandomPosition(), y: getRandomPosition() },
        { x: getRandomPosition(), y: getRandomPosition() },
        { x: getRandomPosition(), y: getRandomPosition() },
        { x: getRandomPosition(), y: getRandomPosition() }
    ];
    score = 0;
}

// Event Listener for Keyboard Input
document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Start the game
gameLoop();
