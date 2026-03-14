let gameseq = [];
let userseq = [];
let btns = ["leopard", "tiger", "lion", "cheetah"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

// Load the sound for correct clicks
const correctSound = new Audio('sound-images/correct sound.mp3');

// Load the mistake sound
const mistakeSound = new Audio('sound-images/error sound.mp3');

// Show the popup with instructions
const popup = document.getElementById("popup");
const closeBtn = document.querySelector(".close-btn");

document.addEventListener("DOMContentLoaded", () => {
    popup.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

// Start game on keypress
document.addEventListener("keypress", function() {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

// Function to flash the button for the game sequence
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
}

// Function to flash the button for the user sequence
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250); // Adjust duration as needed
}

// Function to move to the next level
function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor); // Add the new color to the game sequence
    console.log("Game Sequence:", gameseq);

    gameFlash(randBtn); // Flash the button for the new sequence color
}
// Check if the player's sequence is correct
function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
         if (userseq.length === gameseq.length) {
             setTimeout(levelUp, 1000); // Move to the next level after a short delay
              correctSound.play();   //play correct sound when player makes a correct step
            }
         } else {
            // Play mistake sound when the player makes a mistake
            mistakeSound.play();
                
            h2.innerHTML = `Game over! Your score was <b>${level}</b>. Press any key to start`;
        
      // Add red flash effect by toggling the error-flash class
            const body = document.querySelector("body");
            body.classList.add("errorflash");
            setTimeout(() => body.classList.remove("errorflash"), 1000); // Adjust duration as needed
        
            
                reset(); // Reset the game after a game over
            }
}

// Function to handle button clicks
function btnpress() {
    let btn = this;
    userFlash(btn);
    let userColor = btn.getAttribute("id");

    userseq.push(userColor); // Add the clicked color to the user sequence
    checkAns(userseq.length - 1);
}

// Add click event listeners to buttons
let allbtn = document.querySelectorAll(".btn");
for (let btn of allbtn) {
    btn.addEventListener("click", btnpress);
}

// Reset the game after a game over
function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

