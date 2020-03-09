const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// FUNCTIONS

// Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert('Please enter a text and amount');
    }  else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

// Generate random id
function generateID() {
    return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM List
function addTransactionDOM(transaction) {
    // Get sign
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    // add class based on value
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// Update the balance, income and expense
function updateValues() {
    const amounts = transactions.map(transaction => 
    transaction.amount);
    // Calculate total balance
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    
    // Insert Balance into DOM
    if (total < 0) {
        balance.innerHTML = `<span style="color:red;">€${total}</span>`;
    } else {
        balance.innerHTML = `<span style="color:black;">€${total}</span>`;
    }

    // Calculate income
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => (acc +=item), 0).toFixed(2);
    
    // Insert income into DOM
    money_plus.innerText = `€${income}`;

    // Calculate expenses
    const expense = Math.abs(amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc +=item), 0)).toFixed(2);

    // Insert expense into DOM
    money_minus.innerText = `€${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init();
}

// Update transactions to local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
    list.innerHTML = '';
    transactions.forEach(addTransactionDOM);
    updateValues();
}

init(); 

// EVENT LISTENERS
form.addEventListener('submit', addTransaction);