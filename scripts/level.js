// Get level from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const level = parseInt(urlParams.get("level"));

const allContainer = document.getElementById("all");

// Function to create game cards
function createCards(containerId, gridSize) {
    const cardsContainer = document.createElement("div");
    cardsContainer.id = containerId;
    cardsContainer.style.display = "grid";
    cardsContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    cardsContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
    cardsContainer.style.gap = "10px";

    const totalCards = gridSize * gridSize;
    for (let i = 1; i <= totalCards; i++) {
        const card = document.createElement("div");
        card.className = "card";
        card.textContent = i; // Placeholder card content
        card.style.border = "1px solid #ccc";
        card.style.textAlign = "center";
        card.style.padding = "20px";
        card.style.background = "#fff";
        card.style.cursor = "pointer";
        cardsContainer.appendChild(card);
    }

    allContainer.appendChild(cardsContainer);
}

// Initialize game based on level
function initializeGame(level) {
    let gridSize;

    if (level === 1) gridSize = 4; // Level 1 (4x4)
    else if (level === 2) gridSize = 6; // Level 2 (6x6)
    else if (level === 3) gridSize = 8; // Level 3 (8x8)

    createCards("cards-container", gridSize);
}

initializeGame(level);
