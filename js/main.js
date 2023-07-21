{/* 
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
*/}

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