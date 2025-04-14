// Initialize game variables
let gameseq = []; // Array to hold the game's sequence
let userseq = []; // Array to hold the user's sequence input
let btns = ["yellow", "green", "red", "purple"]; // Define button colors
let started = false; // Track if the game has started
let level = 0; // Track the current level
let h2 = document.querySelector("h2"); // Reference to the level display
let score = 0; // To keep track of the score

// Add event listeners to all buttons but keep them disabled until the game starts
let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.disabled = true; // Disable buttons initially
}

// Start the game on keypress
document.addEventListener("keypress", function (event) {
    if (!started) {
        console.log("Game is started");
        started = true; // Set started to true
        enableButtons(); // Enable buttons when the game starts
        levelup(); // Call the levelup function
    } else {
        startOver(); // Allow user to start over on keypress after a game over
    }
});

// Function to enable button event listeners
function enableButtons() {
    for (let btn of allbtns) {
        btn.disabled = false; // Enable buttons for user input
        btn.addEventListener("click", btnPress); // Add click event for each button
    }
}

// Function to progress to the next level
function levelup() {
    level++; // Increase level
    h2.innerText = `Level ${level}`; // Update level display
    let random = Math.floor(Math.random() * 4); // Generate a random number from 0-3
    let randombtn = btns[random]; // Get a random button color
    let randbtn = document.querySelector(`.${randombtn}`); // Select the button
    gameseq.push(randombtn); // Add new color to the game sequence
    gameflash(randbtn); // Flash the button for the game sequence
}

// Function to flash the game button
function gameflash(btn) {
    btn.classList.add("flash"); // Add flash class
    setTimeout(function () {
        btn.classList.remove("flash"); // Remove flash class after timeout
    }, 300);
}

// Function to flash the button when clicked by the user
function userFlash(btn) {
    btn.classList.add("userflash"); // Add user flash class
    setTimeout(function () {
        btn.classList.remove("userflash"); // Remove user flash class after timeout
    }, 300);
}

// Function to handle button press by the user
function btnPress() {
    let btn = this; // Reference to the clicked button
    userFlash(btn); // Flash the user's button
    userseq.push(btn.classList[1]); // Add user's selection to sequence
    checkAnswer(userseq.length - 1); // Check the user's answer
}

// Function to check the user's answer
function checkAnswer(currentLevel) {
    // If the last button pressed is correct
    if (userseq[currentLevel] === gameseq[currentLevel]) {
        console.log("Correct!"); // Log correct answer
        if (userseq.length === gameseq.length) { // If the user completed the sequence
            userseq = []; // Reset user's sequence
            score++; // Increment score
            setTimeout(levelup, 1000); // Proceed to next level after delay
        }
    } else {
        console.log("Wrong! Game Over."); // Log incorrect answer
        showScore(); // Show the score
        startOver(); // Call startOver function
    }
}

// Function to show the score and reset the game
function showScore() {
    h2.innerText = `Game Over! Your score: ${score}. Press any key to play again!`; // Display the score and restart instruction
}

// Function to reset the game
function startOver() {
    started = false; // Reset started
    level = 0; // Reset level
    gameseq = []; // Clear game sequence
    userseq = []; // Clear user sequence
    score = 0; // Reset score to 0
    disableButtons(); // Disable buttons again
}

// Function to disable button event listeners
function disableButtons() {
    for (let btn of allbtns) {
        btn.disabled = true; // Disable buttons when game is over
        btn.removeEventListener("click", btnPress); // Remove click event listener
    }
}
