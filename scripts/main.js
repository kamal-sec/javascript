// Buttons
let startBtn = document.querySelector("#start-btn");
let themesBtn = document.querySelector("#themes-btn");
let settingsBtn = document.querySelector("#settings-btn");

// Dropdowns
let dropdownStart = document.querySelector("#dropdown-start");
let dropdownThemes = document.querySelector("#dropdown-themes");
let dropdownSettings = document.querySelector("#dropdown-settings");

// Toggle visibility function
function toggleVisibility(element) {
    if (element.classList.contains("hidden")) {
        element.classList.remove("hidden");
        element.classList.add("active");
    } else {
        element.classList.add("hidden");
        element.classList.remove("active");
    }
}

// Event listeners for buttons
startBtn.addEventListener("click", () => {
    toggleVisibility(dropdownStart);
    dropdownThemes.classList.add("hidden");
    dropdownSettings.classList.add("hidden");
});

themesBtn.addEventListener("click", () => {
    toggleVisibility(dropdownThemes);
    dropdownStart.classList.add("hidden");
    dropdownSettings.classList.add("hidden");
});

settingsBtn.addEventListener("click", () => {
    toggleVisibility(dropdownSettings);
    dropdownStart.classList.add("hidden");
    dropdownThemes.classList.add("hidden");
});

// Update Volume Value
let audioVolume = document.querySelector("#audio-volume");
let volumeValue = document.querySelector("#volume-value");

audioVolume.addEventListener("input", () => {
    volumeValue.textContent = audioVolume.value;
});
