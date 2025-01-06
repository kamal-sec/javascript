document.addEventListener("DOMContentLoaded", () => {
    const allContainer = document.getElementById("all");

    // Function to create buttons
    function createButtons() {
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttons-container";

        const buttons = [
            { id: "Start", text: "Start Game" },
            { id: "Restart", text: "Restart" },
            { id: "Silent", text: "Silent" },
        ];

        buttons.forEach((button) => {
            const btn = document.createElement("button");
            btn.id = button.id;
            btn.innerText = button.text;
            buttonsContainer.appendChild(btn);
        });

        allContainer.appendChild(buttonsContainer);
    }

    // Function to create game cards
    function createCards(containerId, totalCards) {
        const cardsContainer = document.createElement("div");
        cardsContainer.id = containerId;

        for (let i = 1; i <= totalCards; i++) {
            const card = document.createElement("div");
            card.id = i; // Fixed issue here
            cardsContainer.appendChild(card);
        }

        allContainer.appendChild(cardsContainer);
    }

    // Function to create game information
    function createGameInfo() {
        const gameInfoContainer = document.createElement("div");
        gameInfoContainer.id = "game-info";

        const infoFields = [
            { label: "match", type: "number", id: "match" },
            { label: "moves", type: "number", id: "moves" },
            { label: "left", type: "number", id: "left" },
            { label: "time", type: "time", id: "time" },
            { label: "top score", type: "number", id: "topscore" },
        ];

        infoFields.forEach((field) => {
            const infoDiv = document.createElement("div");

            const label = document.createElement("label");
            label.setAttribute("for", field.id);
            label.innerText = `${field.label}:`; // Fixed issue here

            const input = document.createElement("input");
            input.type = field.type;
            input.id = field.id;

            infoDiv.appendChild(label);
            infoDiv.appendChild(input);
            gameInfoContainer.appendChild(infoDiv);
        });

        allContainer.appendChild(gameInfoContainer);
    }

    // Initialize the game layout
    function initializeGame() {
        createButtons(); // Create buttons
        createCards("cards-easy", 16); // Create easy cards (16 cards)
        // Uncomment below if you want to create medium and hard levels
        // createCards("cards-medium", 36); // Create medium cards (36 cards)
        // createCards("cards-hard", 48); // Create hard cards (48 cards)
        createGameInfo(); // Create game information
    }

    initializeGame();
});
