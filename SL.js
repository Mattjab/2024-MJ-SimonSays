// Function to generate a random color (red or blue)
function getRandomColor() {
    const colors = ['red', 'blue'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Function to play the sequence
function playSequence(sequence) {
    return new Promise((resolve, reject) => {
        let i = 0;
        const interval = setInterval(() => {
            if (i >= sequence.length) {
                clearInterval(interval);
                resolve();
            } else {
                const color = sequence[i];
                const button = document.getElementById(color);
                button.classList.add('active');
                setTimeout(() => {
                    button.classList.remove('active');
                    i++;
                }, 500);
            }
        }, 1000);
    });
}

// Function to start the game
function startGame() {
    const sequence = [];
    for (let i = 0; i < 5; i++) { // Change 5 to increase difficulty
        sequence.push(getRandomColor());
    }
    playSequence(sequence)
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
