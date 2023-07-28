/* Format for reference
<article>
<header>
    <img />
    <hgroup>
        <h2>Maori Name</h2>
        <p>Credit</p>
    </hgroup>
    <span class="status color"></span>
</header>
<h3>English name</h3>
<dl>
    <dt>Key</dt>
    <dd>Value</dd>
    
    <dt>Key</dt>
    <dd>Value</dd>
</dl>
</article> 
*/

function generateBirdHTML(bird) {
  const article = document.createElement("article");
  const header = document.createElement("header");
  const img = document.createElement("img");
  const hgroup = document.createElement("hgroup");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const statusSpan = document.createElement("span");
  const h3 = document.createElement("h3");
  const dl = document.createElement("dl");
  
  // Set content and attributes
  img.src = bird.photo.source;
  h2.textContent = bird.primary_name;
  p.textContent = `Credit: ${bird.photo.credit}`;
  statusSpan.className = `status ${bird.status.toLowerCase()}`;
  h3.textContent = bird.english_name;
  
  // Insert scientific name, order, family
  const namesArray = ["scientific_name", "order", "family"]
  for (let i = 0; i < namesArray.length; i++) {
    const name = namesArray[i];
    const value = bird[name];
    const dt = document.createElement("dt");
    // Capitalise the first letter of the name and replace underscores with spaces
    dt.textContent = name.charAt(0).toUpperCase() + name.slice(1).replace("_", " ");
    const dd = document.createElement("dd");
    dd.textContent = value;
    dl.appendChild(dt);
    dl.appendChild(dd);
  }
  
  // Loop through the bird size properties and add them to the definition list (dl)
  for (const key in bird.size) {
    if (bird.size.hasOwnProperty(key)) {
      const dt = document.createElement("dt");
      dt.textContent = key;
      const dd = document.createElement("dd");
      dd.textContent = `${bird.size[key].value} ${bird.size[key].units}`;
      dl.appendChild(dt);
      dl.appendChild(dd);
    }
  }
  
  // Build the HTML structure
  hgroup.appendChild(h2);
  hgroup.appendChild(p);
  header.appendChild(img);
  header.appendChild(hgroup);
  header.appendChild(statusSpan);
  article.appendChild(header);
  article.appendChild(h3);
  article.appendChild(dl);
  
  return article;
}

// Function to fetch the JSON data from a local file
async function fetchBirdsData() {
  try {
    const response = await fetch("images.json"); 
    if (!response.ok) {
      throw new Error("Failed to fetch birds data.");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching birds data:", error);
    return null;
  }
}

// Main function to generate HTML for birds from the fetched JSON data
async function generateBirdsHTML() {
  const container = document.getElementById("birds-container"); // Get the main container
  
  const birdsData = await fetchBirdsData();
  if (birdsData && birdsData.birds && Array.isArray(birdsData.birds)) {
    console.log("Your code works so far! Keep it up.")
    const birdsArray = birdsData.birds;
    
    birdsArray.forEach((bird) => {
      const birdHTML = generateBirdHTML(bird);
      container.appendChild(birdHTML);
    });
  } else {
    console.error("Invalid birds data format.");
  }
}

// Call the main function to generate the birds' HTML
generateBirdsHTML();




let originalBirdData = []; // To store the original bird data fetched from the JSON file

// Fetch function to retrieve bird data from "images.json" and save it for later use
function fetchBirdData() {
    fetch("images.json")
        .then((response) => response.json())
        .then((birdData) => {
            originalBirdData = birdData.birds;
            filterBirds(); // Call filterBirds after fetching data to display all birds initially
        })
        .catch((error) => console.error("Error fetching bird data:", error));
}

// Generate function to display bird cards
function generateBirdCards(birds) {
    const birdsContainer = document.getElementById("birds-container");
    birdsContainer.innerHTML = ""; // Clear previous cards

    birds.forEach((bird) => {
        const birdCard = document.createElement("div");
        birdCard.className = "bird-card";
        birdCard.innerHTML = `
            <img src="${bird.photo.source}" alt="${bird.photo.alt}">
            <h2>${bird.primary_name}</h2>
            <p><b>English Name : ${bird.english_name}</p>
            <p>Scientific Name : ${bird.scientific_name}</p>
            <p>Order : ${bird.order}</p>
            <p>Family : ${bird.family}</p>
            <p>Conservation Status : ${bird.conservation_status}</p>
            <p>Size : ${bird.size.value} ${bird.size.units}</p>
            <p>Status : ${bird.status}</p>
            <p>Credit : ${bird.photo.credit}</p>

        `;
        birdsContainer.appendChild(birdCard);
    });
}

// Filter function to separate original and filtered data and call the generate function
function filterBirds() {
    const searchInput = document.getElementById("search").value.toLowerCase();
    
    if (searchInput === "") {
        generateBirdCards(originalBirdData); // Display all birds when search input is empty
    } else {
        const filteredBirds = originalBirdData.filter((bird) => {
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

        generateBirdCards(filteredBirds); // Display filtered birds
    }
}

// Event listener to trigger the filterBirds function on user input
document.getElementById("search").addEventListener("input", filterBirds);

// Fetch bird data and display all birds when the page loads
fetchBirdData();

