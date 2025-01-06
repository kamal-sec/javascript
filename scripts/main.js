// Buttons
let startBtn = document.querySelector("#start-btn");
let themesBtn = document.querySelector("#themes-btn");
let settingsBtn = document.querySelector("#settings-btn");
let themeerror = document.querySelector("#theme-error");
let themesList = document.querySelector("#dropdown-themes");

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

// themes selection
let selectedTheme = null;
let themeButtons = document.querySelectorAll("#dropdown-themes button");
for (let i = 0; i < themeButtons.length; i++) {
  themeButtons[i].addEventListener("click", () => {
    //add class selected to the clicked button
    themeButtons[i].classList.add("selected");
    selectedTheme = themeButtons[i].textContent;
    toggleVisibility(dropdownThemes);
    themeerror.style.display = "none";
  });
}

// Start Button
startBtn.addEventListener("click", () => {
  if (!selectedTheme) {
    themeerror.style.display = "block";
    return;
  }

  if (selectedTheme === "Football") {
    window.location.href = "football.html";
  } else if (selectedTheme === "Anime") {
    window.location.href = "anime.html";
  } else if (selectedTheme === "Animals") {
    window.location.href = "animals.html";
  } else if (selectedTheme === "Animation") {
    window.location.href = "animation.html";
  } else {
    alert("Invalid theme selected!");
  }
});
