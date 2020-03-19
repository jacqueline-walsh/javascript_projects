const wordEl = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// Array of words
let words = [];

// init word
let randomWord;

//  init score
let score = 0;

// init time
let time = 10;

// set difficulty level from local storage or set to default medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty level from local storage
difficultySelect.value = difficulty;

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// FUNCTIONS
function getRandomWord() {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            words = data.wordlist;
            let randomNumber = Math.floor(Math.random() * words.length);
            randomWord = words[randomNumber];
            word.innerHTML = randomWord;
        });
}

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

// update Time
function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';
    if (time === 0) {
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}

// game over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out<h1>
        <p>Your final score is ${score}</p>
        <button onclick="window.location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}

getRandomWord();

// EVENT LISTENER

//  Typing out the word
text.addEventListener('input', e => {
    const insertedText = e.target.value;
    if (insertedText === randomWord) {
        getRandomWord();
        updateScore();

        // clear word
        e.target.value = '';

        if (difficulty === 'hard') {
            time += 2;
          } else if (difficulty === 'medium') {
            time += 3;
          } else {
            time += 5;
          }

        updateTime();
    }
});

// Settings btn click
settingsBtn.addEventListener('click', () => {
    settings.classList.toggle('hide');
})

// Set difficulty level
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);

});
