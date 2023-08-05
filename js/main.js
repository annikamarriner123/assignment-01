  
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const stopBtn = document.getElementById("stopBtn");

function playAudio() {
  audio.play();
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
}

  
 // Generate the bird cards
 function generateBirdCards(birds) {
    const birdsContainer = document.getElementById("birds-container");
    birdsContainer.innerHTML = ""; // Clear previous cards
    
    birds.forEach((bird) => {
        //remove the spaces from the birds status and add a hiphen through replacing string 
        const birdStatusClass = bird.status.replace(/\s/g, "-").toLowerCase();
        const birdCard = document.createElement("article");
        birdCard.innerHTML = `
        <header>
        <img src="${bird.photo.source}" alt="${bird.photo.alt}">
        <p>Credit: ${bird.photo.credit}</p>
        <br>
        <hgroup>
        <h2>${bird.primary_name}</h2>
        </hgroup>
        
        <span class="circle ${birdStatusClass}"></span>${bird.status}
        
        </header>
        <h3>${bird.english_name}</h3>
        <dl>
        <dt>Scientific Name</dt>
        <dd>${bird.scientific_name}</dd>
        
        <dt>Order</dt>
        <dd>${bird.order}</dd>
        
        <dt>Family</dt>
        <dd>${bird.family}</dd>
        
        <dt>Length</dt>
        <dd>${bird.size.length.value} ${bird.size.length.units}</dd>
        
        <dt>Weight</dt>
        <dd>${bird.size.weight.value} ${bird.size.weight.units}</dd>
        
        </dl>
        
        `;
        birdsContainer.appendChild(birdCard);
    });

    document.getElementById("results-count").textContent = birds.length;
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


// Function to remove macrons from a string
function removeMacrons(input) {
    const macronMap = {
        'ā': 'a',
        'ē': 'e',
        'ī': 'i',
        'ō': 'o',
        'ū': 'u',
    };
    
    // Replace macron characters with non-macron counterparts
    return input.replace(/[āēīōū]/g, match => macronMap[match] || match);
}


// Filter function to filter the bird data based on user input
function filterBirds(searchInput) {
    // Remove macrons from the search input
    const normalizedSearchInput = removeMacrons(searchInput.normalize("NFC").toLowerCase());
    
    return originalBirdData.filter((bird) => {
        // Normalise the bird data to make the search case-insensitive and remove macrons
        const birdName = removeMacrons(bird.primary_name.toLowerCase());
        const englishName = removeMacrons(bird.english_name.toLowerCase());
        const scientificName = removeMacrons(bird.scientific_name.toLowerCase());
        const otherNames = bird.other_names.map((name) => removeMacrons(name.toLowerCase()));
        
        return (
            birdName.includes(normalizedSearchInput) ||
            englishName.includes(normalizedSearchInput) ||
            scientificName.includes(normalizedSearchInput) ||
            otherNames.includes(normalizedSearchInput)
            );
        });
    }
    
    //myString.normalize("NFC")
    
    
    fetch("birds.json")
    .then((response) => response.json())
    .then((data) => {
        // 'data' is the fetched bird data in JSON format
        // Use 'data' for further processing

        // Assuming the 'data' is an array of bird objects, you can sort it like this:
        const sortedBirds = sortBirds(data, "1");
        console.log(sortedBirds);
        // You can replace "1" with the selected sort option from your UI

        // Now you can use the sortedBirds array to update your UI or perform other operations.
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });


    // Sort function to sort the bird data based on the selected option
    function sortBirds(birds, sortOption) {
        switch (sortOption) {
            case "1":
            birds.sort((a, b) => a.size.weight.value - b.size.weight.value);
            break;
            case "2":
            birds.sort((a, b) => b.size.weight.value - a.size.weight.value);
            break;
            case "3":
            birds.sort((a, b) => a.size.length.value - b.size.length.value);
            break;
            case "4":
            birds.sort((a, b) => b.size.length.value - a.size.length.value);
            break;
            // Add more cases for other sorting options if needed
            // default:
            // break;
            default:
            break;
        }
        return birds;
    }
    
    
    function filterAndSortBirds() {
        const searchInput = document.getElementById("search").value.toLowerCase();
        const sortOption = document.getElementById("sort").value;
        const selectedStatus = document.getElementById("status-filter").value;
    
        let filteredBirds = originalBirdData;
        if (searchInput) {
            filteredBirds = filterBirds(searchInput);
        }
    
        if (selectedStatus !== "all") {
            filteredBirds = filteredBirds.filter((bird) => bird.status === selectedStatus);
        }
    
        if (sortOption !== "0") {
            filteredBirds = sortBirds(filteredBirds, sortOption);
        }
    
        generateBirdCards(filteredBirds, selectedStatus);
    }

    // Event listener to trigger the orderBirds function when the sorting option is changed
    document.getElementById("search").addEventListener("input", filterAndSortBirds);

    document.getElementById("sort").addEventListener("change", filterAndSortBirds);
    document.getElementById("status-filter").addEventListener("change", filterAndSortBirds);


    
    // Fetch bird data and display all birds when the page loads
    fetchBirdData();

    