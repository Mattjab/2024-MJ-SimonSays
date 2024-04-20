// Function to generate a random choice
function getRandomChoice() {
    const choices = ["Do", "Don't Do"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Function to display the message
function displayMessage(message) {
    const messageElement = document.getElementById('message');
    messageElement.innerText = message;
}

// Function to start the game
function startGame() {
    return new Promise((resolve, reject) => {
        const correctChoice = getRandomChoice();
        displayMessage(`Simon says: ${correctChoice}`);
        
        // Event listeners for buttons
        document.getElementById('doBtn').addEventListener('click', () => {
            if (correctChoice === "Do") {
                resolve("You did it! Good job!");
            } else {
                reject("Oops! Simon didn't say to do that!");
            }
        });

        document.getElementById('dontDoBtn').addEventListener('click', () => {
            if (correctChoice === "Don't Do") {
                resolve("You didn't do it! Well done!");
            } else {
                reject("Oops! Simon didn't say not to do that!");
            }
        });
    });
}

// Start the game when the page loads
window.onload = () => {
    // Start the game and handle success or failure
    startGame()
        .then(message => displayMessage(message))
        .catch(error => displayMessage(error));
};

