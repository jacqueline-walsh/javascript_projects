const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// Array of words
let wordList = [];

// init word
let randomWord;

//  init score
let score = 0;

// init time
let time = 10;

// FUNCTIONS

// get list of words from api
async function getWords() {
    let response = await fetch('data.json');
    let data = await response.json();
    wordList = JSON.stringify(data);
    console.log(wordList);
}
getWords();

// get random word
function getRandomWord() {

}

// EVENT LISTENER
