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
let food = { x: getRandomPosition(), y: getRandomPosition() };
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

function drawGame() {
    // Dessin du fond
    ctx.fillStyle = "#001f3f"; // Bleu profond
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Dessin du quadrillage
    ctx.strokeStyle = "#004080"; // Bleu océan clair
    for (let x = 0; x < canvasSize; x += tileSize) {
        for (let y = 0; y < canvasSize; y += tileSize) {
            ctx.strokeRect(x, y, tileSize, tileSize);
        }
    }

    // Dessin du serpent
    ctx.fillStyle = "#00ff99"; // Vert clair pour le serpent
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, tileSize, tileSize));

    // Dessin de la nourriture
    ctx.fillStyle = "#ff5733"; // Orange pour contraster avec l'océan
    ctx.fillRect(food.x, food.y, tileSize, tileSize);

    // Mise à jour du score
    document.getElementById("score").textContent = score;
}

function drawGame() {
    // Dessin du fond
    ctx.fillStyle = "#001f3f"; // Bleu profond
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Dessin du quadrillage
    ctx.strokeStyle = "#004080"; // Bleu océan clair
    for (let x = 0; x < canvasSize; x += tileSize) {
        for (let y = 0; y < canvasSize; y += tileSize) {
            ctx.strokeRect(x, y, tileSize, tileSize);
        }
    }

    // Dessin du serpent
    ctx.fillStyle = "#00ff99"; // Vert clair pour le serpent
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, tileSize, tileSize));

    // Dessin de la nourriture
    ctx.fillStyle = "#ff5733"; // Orange pour contraster avec l'océan
    ctx.fillRect(food.x, food.y, tileSize, tileSize);

    // Mise à jour du score
    document.getElementById("score").textContent = score;
}


// Update Snake's position
function updateSnake() {
    const head = { x: snake[0].x + direction.x * tileSize, y: snake[0].y + direction.y * tileSize };

    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = { x: getRandomPosition(), y: getRandomPosition() };
    } else {
        snake.pop(); // Remove the tail if no food is eaten
    }

    snake.unshift(head); // Add new head
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
    food = { x: getRandomPosition(), y: getRandomPosition() };
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
