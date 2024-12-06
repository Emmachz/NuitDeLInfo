// DOM Elements
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game Constants
const tileSize = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

// Load images for foods
const foodImages = [
    loadImage('bottle-plastic.webp'),
    loadImage('glass.png'),
    loadImage('cardboard.png'),
    loadImage('tooth-brush.png')
];

// Game Variables
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let foods = [
    { x: getRandomPosition(), y: getRandomPosition(), image: foodImages[0] },
    { x: getRandomPosition(), y: getRandomPosition(), image: foodImages[1] },
    { x: getRandomPosition(), y: getRandomPosition(), image: foodImages[2] },
    { x: getRandomPosition(), y: getRandomPosition(), image: foodImages[3] }
];
let score = 0;

// Game Loop
function gameLoop() {
    if (checkCollision()) {
        setTimeout(() => {
            alert(`Game Over! Your score: ${score}`);
            resetGame();
            gameLoop(); // Restart the game after reset
        }, 10);
        return;
    }

    updateSnake();
    drawGame();
    setTimeout(gameLoop, 100);
}

// Draw everything
function drawGame() {
    // Draw the background as a checkerboard
    for (let x = 0; x < canvasSize; x += tileSize) {
        for (let y = 0; y < canvasSize; y += tileSize) {
            if ((x / tileSize + y / tileSize) % 2 === 0) {
                ctx.fillStyle = "#006994"; // Lighter ocean blue
            } else {
                ctx.fillStyle = "#004f73"; // Darker ocean blue
            }
            ctx.fillRect(x, y, tileSize, tileSize);
        }
    }

    // Draw the snake
    ctx.fillStyle = "#00ff99"; // Light green for snake
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, tileSize, tileSize));

    // Draw the foods (as images)
    foods.forEach(food => {
        ctx.drawImage(food.image, food.x, food.y, tileSize, tileSize);
    });

    // Update the score
    document.getElementById("score").textContent = score;
}

// Update Snake's position
function updateSnake() {
    const head = { x: snake[0].x + direction.x * tileSize, y: snake[0].y + direction.y * tileSize };

    // Check if any food is eaten
    let foodEaten = false;
    foods = foods.map(food => {
        if (head.x === food.x && head.y === food.y) {
            score++;
            foodEaten = true; // Mark that food has been eaten
            // Create new food at a random position with the same image
            return { x: getRandomPosition(), y: getRandomPosition(), image: food.image };
        } else {
            return food;
        }
    });

    snake.unshift(head); // Add new head
    // Only remove the tail if no food was eaten, otherwise the snake grows
    if (!foodEaten) {
        snake.pop();
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

// Load image
function loadImage(src) {
    const img = new Image();
    img.src = src;
    return img;
}

// Reset Game
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    foods = [
        { x: getRandomPosition(), y: getRandomPosition(), image: foodImages[0] },
        { x: getRandomPosition(), y: getRandomPosition(), image: foodImages[1] },
        { x: getRandomPosition(), y: getRandomPosition(), image: foodImages[2] },
        { x: getRandomPosition(), y: getRandomPosition(), image: foodImages[3] }
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
