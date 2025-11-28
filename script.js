let inventory = [];

// Load data from localStorage on page open
window.onload = function () {
    const saved = localStorage.getItem("penInventory");
    if (saved) {
        inventory = JSON.parse(saved);
        renderTable();
    }
};

function saveData() {
    localStorage.setItem("penInventory", JSON.stringify(inventory));
}

function addItem() {
    const name = document.getElementById("penName").value.trim();
    const count = parseInt(document.getElementById("penCount").value);
    const cost = parseFloat(document.getElementById("penCost").value);

    if (!name || isNaN(count) || isNaN(cost)) {
        alert("Please fill all fields correctly.");
        return;
    }

    inventory.push({
        name: name,
        count: count,
        cost: cost
    });

    saveData();
    renderTable();

    document.getElementById("penName").value = "";
    document.getElementById("penCount").value = "";
    document.getElementById("penCost").value = "";
}

function deleteItem(index) {
    inventory.splice(index, 1);
    saveData();
    renderTable();
}

function renderTable() {
    const table = document.getElementById("inventoryTable");
    table.innerHTML = "";

    inventory.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.count}</td>
                <td>₹${item.cost}</td>
                <td>₹${item.count * item.cost}</td>
                <td><button class="delete-btn" onclick="deleteItem(${index})">X</button></td>
            </tr>
        `;
        table.innerHTML += row;
    });
}
