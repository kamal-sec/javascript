// Get query parameters from URL
const urlParams = new URLSearchParams(window.location.search);
const theme = urlParams.get("theme");
const level = parseInt(urlParams.get("level"));

const allContainer = document.getElementById("all");

// Function to create game cards dynamically
function createCards(gridSize) {
    allContainer.innerHTML = ""; // Clear existing cards
    allContainer.style.display = "grid";
    allContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    allContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    allContainer.style.gap = gridSize === 8 ? "8px" : "10px"; // Adjust gap for larger grids

    const totalCards = gridSize * gridSize;
    for (let i = 1; i <= totalCards; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = ""; // Placeholder content
        allContainer.appendChild(card);
    }
}

// Initialize the game board based on the selected level
function initializeGame(level) {
    let gridSize;

    // Determine grid size based on level
    if (level === 1) gridSize = 4; // Level 1: 4x4 grid
    else if (level === 2) gridSize = 6; // Level 2: 6x6 grid
    else if (level === 3) gridSize = 8; // Level 3: 8x8 grid
    else gridSize = 4; // Default to 4x4

    createCards(gridSize);
    console.log(`Game initialized with theme: ${theme}, level: ${level}`);
}

// Start the game based on level
initializeGame(level);
