const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete-card');
const addContainer = document.getElementById('add-container');

// keep track of current card
let currentActiveCard = 0;

// store DOM cards
const cardsEl = [];

// store card data
const cardsData = getCardsData();

// const cardsData = [
//     {
//         question: 'What must a variable begin with?',
//         answer: 'A letter, $ or _'
//     },
//     {
//         question: 'What is a variable?',
//         answer: 'Container for a piece of data'
//     },
//     {
//         question: 'Example of Case Sensitive varaible',
//         answer: 'thisIsAVariable'
//     }    
// ];

// FUNCTIONS

// loop through data and create all cards
function createCards() {
    cardsData.forEach((data, index) => {
        createCard(data, index);
    });
}

// create a single card in the DOM
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class = "inner-card">
            <div class="inner-card-front">
                <p>
                    ${data.question}
                </p>
            </div>
            <div class="inner-card-back">
                <p>
                    ${data.answer}
                </p>
            </div>            
        </div>
    `;

    // create event listener for card
    card.addEventListener('click', () => {
        card.classList.toggle('show-answer');
    });

    // Add to DOM Cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);
    updateCurrentText();

}

// show number of cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1} / ${cardsEl.length}`;
}

// retrieve data from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// add card to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();

// EVENT LISTENERS

nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length -1;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentText();
});

//  Show add container
showBtn.addEventListener('click', () => addContainer.classList.add('show'));

//  Hide add container
hideBtn.addEventListener('click', () => addContainer.classList.remove('show'));

// Add card
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;

    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };

        createCard(newCard);

        questionEl.value = '';
        answerEl.value = '';
        
        addContainer.classList.remove('show');

        cardsData.push(newCard);

        setCardsData(cardsData);
    }
});

// clear card button
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});

// // Delete single card button
deleteBtn.addEventListener('click', () => {
    let cards = getCardsData();
    const i = currentActiveCard;
    cards.splice(i, 1);
    setCardsData(cards);    
});



        

    
