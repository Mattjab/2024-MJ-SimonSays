"use strict";

// Function to generate a random color (red or blue)
function getRandomColor() {
    const colors = ["red", "blue"]; // Array of colors
    const randomIndex = Math.floor(Math.random() * colors.length); // Generate random index
    return colors[randomIndex]; // Return random color
}

// Function to display the message
function displayMessage(message) {
    const messageElement = document.getElementById('message'); // Get message element
    messageElement.innerText = message; // Set message text
}

// Function to start a round of the game
function startRound(round) {
    return new Promise((resolve, reject) => {
        const color = getRandomColor(); // Get random color for the round
        displayMessage(`Simon says: ${color}`); // Display the color Simon says

        // Event listeners for buttons
        const redButton = document.querySelector('.red');
        const blueButton = document.querySelector('.blue');

        function buttonClickHandler(event) {
            const clickedColor = event.target.classList.contains('red') ? 'red' : 'blue';
            if (clickedColor === color) {
                if (round < 20) { // If not the last round
                    resolve(`Correct! Round ${round + 1}`); // Resolve with success message
                } else {
                    resolve(`Congratulations! You completed all rounds!`); // Resolve with completion message
                }
            } else {
                reject("You picked the wrong answer!"); // Reject with wrong answer message
            }
            redButton.removeEventListener('click', buttonClickHandler);
            blueButton.removeEventListener('click', buttonClickHandler);
        }

        redButton.addEventListener('click', buttonClickHandler);
        blueButton.addEventListener('click', buttonClickHandler);

        // After 3 seconds, remove the event listeners and reject if no choice is made
        setTimeout(() => {
            redButton.removeEventListener('click', buttonClickHandler);
            blueButton.removeEventListener('click', buttonClickHandler);
            reject("Time's up! You didn't make a choice."); // Reject with timeout message
        }, 3000);
    });
}

// Function to play the game
function playGame() {
    let currentRound = 1; // Current round counter

    function playNextRound() {
        startRound(currentRound) // Start the current round
            .then(message => { // Handle success message
                displayMessage(message); // Display success message
                currentRound++; // Move to the next round
                if (currentRound <= 20) { // If not the last round
                    playNextRound(); // Play the next round
                }
            })
            .catch(error => displayMessage(error)); // Handle error message
    }

    playNextRound(); // Start playing the game
}

// Start the game when the page loads
window.onload = playGame; // Start the game when the page loads

    .then(() => {
        console.log('Your turn!');
        // Here you can add logic for the user's turn
    })
    .catch((error) => {
        console.error('Error occurred:', error);
    });
}

// Event listener for the start button
document.getElementById('start').addEventListener('click', startGame);
