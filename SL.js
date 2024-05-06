// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define red and blue colors
const redColor = '#FF0000';
const blueColor = '#0000FF';

// Arrays to store the Simon sequence and player sequence
const simonSequence = [];
let playerSequence = [];
let round = 0;
let isPlaying = false;

// Event listener for canvas clicks
canvas.addEventListener('click', handleCanvasClick);
// Event listener for start button click
document.getElementById('startButton').addEventListener('click', startGame);

// Function to start the game
function startGame() {
    if (!isPlaying) {
        isPlaying = true;
        round = 0;
        simonSequence.length = 0;
        playerSequence.length = 0;
        addStep();
        playSequence();
    }
}

// Function to add a step to the Simon sequence
function addStep() {
    const randomColor = Math.random() < 0.5 ? redColor : blueColor;
    simonSequence.push(randomColor);
    round++;
}

// Function to play the Simon sequence
function playSequence() {
    let index = 0;
    const intervalId = setInterval(() => {
        drawColor(simonSequence[index]);
        index++;
        if (index >= simonSequence.length) {
            clearInterval(intervalId);
            playerSequence.length = 0;
        }
    }, 1000);
}

// Function to handle canvas clicks
function handleCanvasClick(event) {
    if (isPlaying) {
        const x = event.offsetX;
        const y = event.offsetY;
        const clickedColor = getColorAtPosition(x, y);
        if (clickedColor) {
            drawColor(clickedColor);
            playerSequence.push(clickedColor);
            if (!checkSequence()) {
                endGame();
            } else if (playerSequence.length === simonSequence.length) {
                setTimeout(() => {
                    addStep();
                    playSequence();
                }, 1000);
            }
        }
    }
}

// Function to get color at a specific position on the canvas
function getColorAtPosition(x, y) {
    const imageData = ctx.getImageData(x, y, 1, 1).data;
    const rgb = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
    return rgb === redColor || rgb === blueColor ? rgb : null;
}

// Function to draw a color on the canvas
function drawColor(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to check if player sequence matches Simon sequence
function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== simonSequence[i]) {
            return false;
        }
    }
    return true;
}

// Function to end the game
function endGame() {
    isPlaying = false;
    alert(`Game over! Your score: ${round}`);
}

