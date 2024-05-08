// Variables
const holes = document.querySelectorAll('.mole-hole');
const scoreBoard = document.querySelector('#score');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#startButton');
let lastHole;
let timeUp = false;
let score = 0;

// Create and add the custom mallet cursor element
const malletCursor = document.createElement('img');
malletCursor.src = 'images/mallet.png'; // Adjust the path to your mallet image
malletCursor.id = 'mallet-cursor';
document.body.appendChild(malletCursor);

// Update mallet cursor position to follow the mouse correctly
function moveMalletCursor(e) {
    const malletWidth = malletCursor.offsetWidth;
    const malletHeight = malletCursor.offsetHeight;
    malletCursor.style.left = `${e.pageX - malletWidth / 2}px`;
    malletCursor.style.top = `${e.pageY - malletHeight / 2}px`;
}

// Rotate mallet cursor when clicking
function swingMallet() {
    malletCursor.classList.add('swing');
    setTimeout(() => malletCursor.classList.remove('swing'), 200);
}

// Random time for moles to stay up
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// Random hole for the mole to pop up from
function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

// Make moles pop up randomly
function peep() {
    const time = randomTime(250, 1000); // Time for moles to stay up
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}

// Start the game
function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 30000); // Game runs for 30 seconds
}

// Handle mole whacking
function whack(e) {
    if (!e.isTrusted) return; // Prevent cheating
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

// Event listeners
moles.forEach(mole => mole.addEventListener('click', whack));
startButton.addEventListener('click', startGame);
document.body.addEventListener('mousemove', moveMalletCursor);
document.body.addEventListener('click', swingMallet);
