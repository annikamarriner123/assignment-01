 // Generate the bird cards
 function generateBirdCards(birds) {
  const birdsContainer = document.getElementById("birds-container");
  birdsContainer.innerHTML = ""; // Clear previous cards

  birds.forEach((bird) => {
      const birdCard = document.createElement("article");
      birdCard.innerHTML = `
          <header>
              <img src="${bird.photo.source}" alt="${bird.photo.alt}">
              <p>Credit: ${bird.photo.credit}</p>
              <br>
              <hgroup>
                 <h2>${bird.primary_name}</h2>
              </hgroup>

              <span class="status ${bird.status.toLowerCase()}">${bird.status}</span>
              
          </header>
          <h3>${bird.english_name}</h3>
          <dl>
              <dt>Scientific Name</dt>
              <dd>${bird.scientific_name}</dd>
              
              <dt>Order</dt>
              <dd>${bird.order}</dd>
              
              <dt>Family</dt>
              <dd>${bird.family}</dd>
              
              <dt>Size</dt>
              <dd>${bird.size.value} ${bird.size.units}</dd>
          </dl>
      `;
      birdsContainer.appendChild(birdCard);
  });
}

let originalBirdData = []; // To store the original bird data fetched from the JSON file

// Fetch function to retrieve bird data from "images.json" and save it for later use
function fetchBirdData() {
  fetch("images.json")
      .then((response) => response.json())
      .then((birdData) => {
          originalBirdData = birdData.birds;
          filterAndSortBirds(); // Call filterAndSortBirds after fetching data to display all birds initially
      })
      .catch((error) => console.error("Error fetching bird data:", error));
}

// Filter function to filter the bird data based on user input
function filterBirds(searchInput) {
  return originalBirdData.filter((bird) => {
      const birdName = bird.primary_name.toLowerCase();
      const englishName = bird.english_name.toLowerCase();
      const scientificName = bird.scientific_name.toLowerCase();
      const otherNames = bird.other_names.map((name) => name.toLowerCase());

      return (
          birdName.includes(searchInput) ||
          englishName.includes(searchInput) ||
          scientificName.includes(searchInput) ||
          otherNames.includes(searchInput)
      );
  });
}

// Sort function to sort the bird data based on the selected option
function sortBirds(birds, sortOption) {
  switch (sortOption) {
      case "1":
          birds.sort((a, b) => a.size.value - b.size.value);
          break;
      case "2":
          birds.sort((a, b) => b.size.value - a.size.value);
          break;
      case "3":
          birds.sort((a, b) => a.size.value - b.size.value);
          break;
      case "4":
          birds.sort((a, b) => b.size.value - a.size.value);
          break;
      default:
          break;
  }
  return birds;
}

// Main function to filter and sort birds based on user input and dropdown selection
function filterAndSortBirds() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const sortOption = document.getElementById("sort").value;

  let filteredBirds = originalBirdData;
  if (searchInput) {
      filteredBirds = filterBirds(searchInput);
  }

  if (sortOption !== "0") {
      filteredBirds = sortBirds(filteredBirds, sortOption);
  }

  generateBirdCards(filteredBirds);
}

// Event listeners to trigger the filterAndSort
document.getElementById("search").addEventListener("input", filterAndSortBirds);
        document.getElementById("sort").addEventListener("change", filterAndSortBirds);

        // Fetch bird data and display all birds when the page loads
        fetchBirdData();