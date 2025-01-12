const startBtn = document.querySelector("#start-btn");
const dropdownStart = document.querySelector("#dropdown-start");
const themesBtn = document.querySelector("#themes-btn");
const dropdownThemes = document.querySelector("#dropdown-themes");
const themeButtons = document.querySelectorAll("#dropdown-themes button");
const levelButtons = document.querySelectorAll(".dropdown-btn[data-level]");

let selectedTheme = null;

// Initially disable Start button
startBtn.disabled = true;
startBtn.style.opacity = "0.5";

// Theme Selection Logic
for (let i = 0; i < themeButtons.length; i++) {
    themeButtons[i].addEventListener("click", () => {
        selectedTheme = themeButtons[i].textContent.toLowerCase(); // Get selected theme

        // Highlight selected theme
        for (let j = 0; j < themeButtons.length; j++) {
            themeButtons[j].style.backgroundColor = ""; // Reset
        }
        themeButtons[i].style.backgroundColor = "lightblue"; // Selected theme

        // Enable Start button
        startBtn.disabled = false;
        startBtn.style.opacity = "1";

        // Close themes dropdown
        dropdownThemes.style.display = "none";
    });
}

// Open Themes Dropdown
themesBtn.addEventListener("click", () => {
    dropdownThemes.style.display =
        dropdownThemes.style.display === "none" ? "block" : "none";
});

// Start Button Logic
startBtn.addEventListener("click", () => {
    if (selectedTheme) {
        dropdownStart.style.display = "block"; // Show levels dropdown
    } else {
        alert("Please select a theme before starting the game.");
    }
});

// Level Selection Logic
for (let i = 0; i < levelButtons.length; i++) {
    levelButtons[i].addEventListener("click", () => {
        const level = levelButtons[i].getAttribute("data-level");

        // Redirect to game.html with theme and level
        if (selectedTheme) {
            window.location.href = `/game.html?theme=${selectedTheme}&level=${level}`;
        }
    });
};

const settingsBtn = document.querySelector("#settings-btn");
const dropdownSettings = document.querySelector("#dropdown-settings");
const audio = document.querySelector("audio");
const audioVolume = document.getElementById("audio-volume");
const volumeValue = document.getElementById("volume-value");
const volumeIcon = document.getElementById("volume-icon");

// Toggle dropdown visibility
settingsBtn.addEventListener("click", () => {
    const rect = settingsBtn.getBoundingClientRect();
    dropdownSettings.style.top = `${rect.bottom + window.scrollY}px`;
    dropdownSettings.style.left = `${rect.left}px`;
    dropdownSettings.style.display =
        dropdownSettings.style.display === "block" ? "none" : "block";
});

// Update audio volume
audioVolume.addEventListener("input", () => {
    const volume = audioVolume.value / 100;
    audio.volume = volume;
    volumeValue.textContent = `${audioVolume.value}%`;

    // Change icon based on volume level
    if (volume === 0) {
        volumeIcon.textContent = "🔇";
    } else if (volume <= 0.5) {
        volumeIcon.textContent = "🔉";
    } else {
        volumeIcon.textContent = "🔊";
    }
});

// Set default volume
audio.volume = audioVolume.value / 100;
