// Create a Chart.js pie chart for expense distribution
const expenseChartCanvas = document.getElementById("expense-chart");
let expenseChart;

// Update the pie chart
function updateExpenseChart() {
    const categories = {};
    transactions.forEach((t) => {
        if (t.category !== "Income") {
            categories[t.category] = (categories[t.category] || 0) + t.amount;
        }
    });

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    if (expenseChart) {
        expenseChart.destroy(); // Destroy the previous chart if it exists
    }

    expenseChart = new Chart(expenseChartCanvas, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#4BC0C0",
                        "#9966FF",
                    ],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            const label = context.label || "";
                            const value = context.raw || 0;
                            return `${label}: ${value.toFixed(2)}`;
                        },
                    },
                },
            },
        },
    });
}

// Call updateExpenseChart whenever a transaction is added or deleted
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
        updateExpenseChart(); // Update the chart after deleting a transaction
    });

    updateExpenseChart(); // Update the chart after adding a transaction
}
