 // Array to hold the sequence of colors
let sequence = [];
// Variable to keep track of the user's progress in the sequence
let userSequence = [];
// Variable to track the level of the game
let level = 0;

// Function to start the game
function startGame() {
    sequence = [];
    userSequence = [];
    level = 0;
    nextSequence();
}

// Function to generate the next color in the sequence
function nextSequence() {
    // Increment the level
    level++;
    // Generate a random number between 0 and 3 to represent colors
    let randomNumber = Math.floor(Math.random() * 4);
    // Map the random number to a color and add it to the sequence
    let colors = ['green', 'red', 'yellow', 'blue'];
    let randomColor = colors[randomNumber];
    sequence.push(randomColor);
    // Display the sequence to the user
    showSequence();
}

// Function to display the sequence to the user
function showSequence() {
    // Loop through the sequence array and display each color with a delay
    sequence.forEach((color, index) => {
        setTimeout(() => {
            flashColor(color);
        }, (index + 1) * 1000);
    });
}

// Function to flash a color
function flashColor(color) {
    // Get the button element corresponding to the color
    let button = document.getElementById(color);
    // Add a class to apply a temporary style change
    button.classList.add('active');
    // Remove the class after a short delay to revert to the original style
    setTimeout(() => {
        button.classList.remove('active');
    }, 500);
}

// Function to handle user clicks
function handleClick(element) {
    // Get the id of the clicked button
    let color = element.id;
    // Add the color to the user's sequence
    userSequence.push(color);
    // Check if the user's sequence matches the sequence so far
    checkSequence();
}

// Function to check if the user's sequence matches the sequence so far
function checkSequence() {
    for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== sequence[i]) {
            // If there's a mismatch, end the game
            alert('Game Over! Try again.');
            return;
        }
    }
    // If the sequences match and the user has completed the sequence, go to the next level
    if (userSequence.length === sequence.length) {
        setTimeout(() => {
            nextSequence();
            userSequence = [];
        }, 1000);
    }
}
