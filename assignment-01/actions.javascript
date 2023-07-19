document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // Store the data in a variable
            window.items = data;
            displayItems(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function filterItems(category) {
    const filteredItems = (category === 'all')
        ? window.items
        : window.items.filter(item => item.category === category);
    displayItems(filteredItems);
}

function displayItems(items) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<h3>${item.name}</h3>
                             <p><strong>Category:</strong> ${item.category}</p>
                             <p>${item.description}</p>`;
        resultsDiv.appendChild(itemDiv);
    });
}

