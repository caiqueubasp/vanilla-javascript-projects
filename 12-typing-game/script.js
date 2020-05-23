//

const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game

const words = [
  "sigh",
  "ball",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "pies",
  "winner",
  "great",
  "bad",
  "show",
  "like",
  "club",
  "navagation",
  "experience",
  "admit",
  "name",
  "system",
  "matrix",
  "latest",
  "never",
  "outside",
  "bed",
  "bring",
  "shine",
  "wolf",
  "dog",
  "apple",
  "berry",
  "Africa",
  "Brazil",
  "Europe",
  "India",
];

// Init word
let randmWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Init difficulty in local storage
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";

// Set difficulty select value
difficultySelect.value = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";

// Focus on text start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Genarate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// console.log(getRandomWord());

// Add word to DOM
function addWordToDOM() {
  randmWord = getRandomWord();
  word.innerHTML = randmWord;
}

// Update Score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
<h1> Time ran out </h1>
<p>Your final score is ${score}</p>
<button id="reload" onclick="location.reload()">Reload</button>
`;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// Event Listeners

// Typing
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randmWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Sttings btn click
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Setings btn click
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
