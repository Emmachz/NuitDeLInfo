// DOM Elements

alert(`
    Le Recyclage et les Couleurs des Bacs de Tri
    
    Le tri des déchets est essentiel pour recycler efficacement. Voici les principales couleurs des bacs et leur signification :
    
    Bleu : Carton et papier (journaux, boîtes).
    Vert : Verre (bouteilles, bocaux).
    Jaune : Plastique et métaux (bouteilles, canettes).
    Rouge : Déchets non recyclables ou spéciaux (éponges, textiles souillés).
    En triant vos déchets correctement, vous aidez à préserver les ressources et à réduire la pollution. Respectez les couleurs pour un recyclage efficace !` );const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game Constants
const tileSize = 50;
const canvasSize = 600;
canvas.width = canvasSize;
canvas.height = canvasSize;

// Load images for foods
const foodImages = [
    loadImage('bottle-plastic.webp'), // Plastique
    loadImage('glass.png'),            // Verre
    loadImage('cardboard.png'),        // Carton
    loadImage('sponge.png')            // Éponge
];

// Load images for background tiles
const backgroundImages = [
    loadImage('mer1.jpg'), // Image 1 for background
    loadImage('mer2.jpeg')  // Image 2 for background
];

// Snake Colors - Correspond to recycling rules
// Blue - Carton, Green - Verre, Yellow - Plastique, Red - Éponge
const snakeColors = ["blue", "green", "yellow", "red"];
let currentSnakeColorIndex = 0;

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

// Define food-color matches according to recycling rules
const foodColorMatch = {
    "yellow": foodImages[0],  // Plastique - Yellow
    "green": foodImages[1],   // Verre - Green
    "blue": foodImages[2],    // Carton - Blue
    "red": foodImages[3]      // Éponge - Red
};

// Game Loop
function gameLoop() {
    if (checkCollision()) {
        setTimeout(() => {
            alert(`Game Over! Your score: ${score} 
Le Recyclage et les Couleurs des Bacs de Tri

Le tri des déchets est essentiel pour recycler efficacement. Voici les principales couleurs des bacs et leur signification :

Bleu : Carton et papier (journaux, boîtes).
Vert : Verre (bouteilles, bocaux).
Jaune : Plastique et métaux (bouteilles, canettes).
Rouge : Déchets non recyclables ou spéciaux (éponges, textiles souillés).
En triant vos déchets correctement, vous aidez à préserver les ressources et à réduire la pollution. Respectez les couleurs pour un recyclage efficace !` );
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
    // Draw the background as a checkerboard with images
    for (let x = 0; x < canvasSize; x += tileSize) {
        for (let y = 0; y < canvasSize; y += tileSize) {
            // Alternate between the two images
            const imageIndex = (x / tileSize + y / tileSize) % 2;
            ctx.drawImage(backgroundImages[imageIndex], x, y, tileSize, tileSize);
        }
    }

    // Draw the snake
    ctx.fillStyle = snakeColors[currentSnakeColorIndex]; // Use the current snake color
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
    foods = foods.filter(food => {
        if (head.x === food.x && head.y === food.y) {
            // Check if the snake's current color matches the food type
            const currentSnakeColor = snakeColors[currentSnakeColorIndex];
            const matchingImage = foodColorMatch[currentSnakeColor];
            
            if (food.image !== matchingImage) {
                // If colors do not match, game over
                alert(`Game Over! You tried to eat the wrong type of recycling. Your score: ${score}`);
                resetGame();
                gameLoop();
                return false; // Remove this food since it's eaten
            }

            // If the correct food is eaten
            score++;
            foodEaten = true; // Mark that food has been eaten

            // Change the snake's color to the next one in the list
            currentSnakeColorIndex = (currentSnakeColorIndex + 1) % snakeColors.length;

            return false; // Remove this food from the array
        }
        return true; // Keep the food if it hasn't been eaten
    });

    snake.unshift(head); // Add new head
    // Only remove the tail if no food was eaten, otherwise the snake grows
    if (!foodEaten) {
        snake.pop();
    }

    // Check if all foods have been eaten
    if (foods.length === 0) {
        setTimeout(() => {
            alert(`Congratulations! You successfully sorted all recyclables with a score of ${score}`);
            resetGame();
            gameLoop(); // Restart the game after reset
        }, 10);
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
    currentSnakeColorIndex = 0; // Reset snake color to the initial color
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
