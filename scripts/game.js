import { getThemeImages } from "./theme.js";

// Get query parameters for theme and level
const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get("theme"); // Selected theme
const level = parseInt(urlParams.get("level")); // Selected level

const allContainer = document.getElementById("all");

// Function to create game cards dynamically
function createCards(gridSize, images) {
    allContainer.innerHTML = ""; // Clear existing cards
    allContainer.style.display = "grid";
    allContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`; // Set grid columns
    allContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`; // Set grid rows
    allContainer.style.gap = "10px";

    const totalCards = gridSize * gridSize;

    for (let i = 0; i < totalCards; i++) {
        const card = document.createElement("div");
        card.className = "card";

        // Assign an image from the theme
        const img = document.createElement("img");
        img.src = images[i % images.length]; // Cycle through the theme's images
        img.alt = `Card ${i + 1}`;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";

        card.appendChild(img); // Add the image to the card
        allContainer.appendChild(card); // Add the card to the container
    }
}

// Initialize the game board based on the selected level and theme
function initializeGame(level, theme) {
    let gridSize;
    const images = getThemeImages(theme); // Get images for the selected theme

    if (!images || images.length === 0) {
        console.error("No images found for theme:", theme);
        return;
    }

    // Determine grid size based on level
    if (level === 1) gridSize = 4; // Level 1 (4x4)
    else if (level === 2) gridSize = 6; // Level 2 (6x6)
    else if (level === 3) gridSize = 8; // Level 3 (8x8)
    else gridSize = 4; // Default to 4x4

    // Create the cards with the chosen theme and grid size
    createCards(gridSize, images);
    console.log(`Game initialized with theme: ${theme}, level: ${level}`);
}

// Call the function to initialize the game
initializeGame(level, theme);
