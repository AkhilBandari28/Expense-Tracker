// script.js

const form = document.getElementById("transaction-form");
const transactionsTable = document.querySelector("#transactions-table tbody");
const totalIncomeEl = document.getElementById("total-income");
const totalExpensesEl = document.getElementById("total-expenses");
const netIncomeEl = document.getElementById("net-income");
const incomeInput = document.getElementById("income-input");
const setIncomeBtn = document.getElementById("set-income-btn");

let transactions = [];
let totalIncome = 0;

// Set Total Income from user input
setIncomeBtn.addEventListener("click", () => {
    const incomeValue = parseFloat(incomeInput.value);
    if (!isNaN(incomeValue) && incomeValue >= 0) {
        totalIncome = incomeValue;
        totalIncomeEl.textContent = totalIncome.toFixed(2);
        updateNetIncome();
        incomeInput.value = ""; // Clear the input field
    } else {
        alert("Please enter a valid income amount.");
    }
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);

    const transaction = { date, description, category, amount };
    transactions.push(transaction);

    addTransactionToTable(transaction);
    updateSummary();

    form.reset();
});

function addTransactionToTable(transaction) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${transaction.date}</td>
        <td>${transaction.description}</td>
        <td>${transaction.category}</td>
        <td>${transaction.amount.toFixed(2)}</td>
        <td><button class="delete-btn">Delete</button></td>
    `;
    transactionsTable.appendChild(row);

    row.querySelector(".delete-btn").addEventListener("click", () => {
        transactions = transactions.filter((t) => t !== transaction);
        row.remove();
        updateSummary();
    });
}

function updateSummary() {
    const expenses = transactions
        .filter((t) => t.category !== "Income")
        .reduce((sum, t) => sum + t.amount, 0);

    totalExpensesEl.textContent = expenses.toFixed(2);
    updateNetIncome();
}

function updateNetIncome() {
    const netIncome = totalIncome - parseFloat(totalExpensesEl.textContent);
    netIncomeEl.textContent = netIncome.toFixed(2);
}
