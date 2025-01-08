// Show/hide dropdowns for Start, Themes, and Settings
const startBtn = document.getElementById("start-btn");
const dropdownStart = document.getElementById("dropdown-start");
const themesBtn = document.getElementById("themes-btn");
const dropdownThemes = document.getElementById("dropdown-themes");
const settingsBtn = document.getElementById("settings-btn");
const dropdownSettings = document.getElementById("dropdown-settings");

// Disable Start button initially
startBtn.disabled = true;
startBtn.style.opacity = "0.5";

// Theme Selection Logic
let selectedTheme = null;
const themeButtons = document.querySelectorAll("#dropdown-themes button");
const themeError = document.getElementById("theme-error");

themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Remove 'selected' class from all buttons
        themeButtons.forEach((btn) => btn.classList.remove("selected"));

        // Add 'selected' class to the clicked button
        button.classList.add("selected");

        // Store the selected theme
        selectedTheme = button.textContent;

        // Enable Start button after selecting a theme
        startBtn.disabled = false;
        startBtn.style.opacity = "1";

        // Hide error message if displayed
        themeError.style.display = "none";

        // Close the themes dropdown
        dropdownThemes.classList.add("hidden");
    });
});

// Dropdown visibility toggle
function toggleDropdown(dropdown) {
    dropdown.classList.toggle("hidden");
}

// Dropdown logic for Start, Themes, and Settings
startBtn.addEventListener("click", () => {
    if (!selectedTheme) {
        themeError.style.display = "block"; // Show error if no theme is selected
        return;
    }
    toggleDropdown(dropdownStart);
    dropdownThemes.classList.add("hidden");
    dropdownSettings.classList.add("hidden");
});

themesBtn.addEventListener("click", () => {
    toggleDropdown(dropdownThemes);
    dropdownStart.classList.add("hidden");
    dropdownSettings.classList.add("hidden");
});

settingsBtn.addEventListener("click", () => {
    toggleDropdown(dropdownSettings);
    dropdownStart.classList.add("hidden");
    dropdownThemes.classList.add("hidden");
});

// Level Selection Logic
const levelButtons = document.querySelectorAll(".dropdown-btn[data-level]");
levelButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // Ensure only one level can be selected
        levelButtons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");

        // Get the selected level
        const level = button.getAttribute("data-level");

        // Redirect to game.html with selected theme and level
        if (selectedTheme) {
            window.location.href = `/game.html?theme=${selectedTheme}&level=${level}`;
        }
    });
});

// Update volume slider value
const audioVolume = document.getElementById("audio-volume");
const volumeValue = document.getElementById("volume-value");

audioVolume.addEventListener("input", () => {
    volumeValue.textContent = audioVolume.value;
});
