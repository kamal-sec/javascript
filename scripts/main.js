let themesBtn = document.querySelector("#themes-btn");
let themesList = document.querySelector("#themes");

themesBtn.addEventListener("click", () => {
    if (themesList.style.display === "none" || themesList.style.display === "") {
        themesList.style.display = "flex"; // Show themes as a flex layout
    } else {
        themesList.style.display = "none"; // Hide themes
    }
});

let startBtn = document.querySelector("#start-btn");
let container = document.querySelector("#container");

startBtn.addEventListener("click", () => {
    if (!document.querySelector("#create-levels-btn")) {
        let levelBtn = document.createElement("button");
        levelBtn.id = "create-levels-btn";
        levelBtn.innerText = "Levels";

        // Apply button styles directly
        levelBtn.style.width = "100%";
        levelBtn.style.background = "linear-gradient(to right, #ff7e5f, #feb47b)";
        levelBtn.style.color = "white";
        levelBtn.style.border = "none";
        levelBtn.style.padding = "15px 20px";
        levelBtn.style.fontSize = "1.2rem";
        levelBtn.style.fontWeight = "bold";
        levelBtn.style.cursor = "pointer";
        levelBtn.style.borderRadius = "30px";
        levelBtn.style.textAlign = "center";
        levelBtn.style.transition = "transform 0.3s, box-shadow 0.3s, background-color 0.3s ease";

        levelBtn.addEventListener("mouseenter", () => {
            levelBtn.style.transform = "translateY(-3px)";
            levelBtn.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
        });

        levelBtn.addEventListener("mouseleave", () => {
            levelBtn.style.transform = "translateY(0)";
            levelBtn.style.boxShadow = "none";
        });

        levelBtn.addEventListener("click", () => {
            if (!document.querySelector("#levels-container")) {
                let levels = document.createElement("div");
                levels.id = "levels-container";

                // Apply levels container styles directly
                levels.style.display = "flex";
                levels.style.flexDirection = "column";
                levels.style.alignItems = "center";
                levels.style.gap = "9px";
                levels.style.marginTop = "15px";
                levels.style.width = "100%";

                for (let i = 1; i <= 3; i++) {
                    let levelChild = document.createElement("button");
                    levelChild.innerText = `Level ${i}`;
                    levelChild.style.width = "100%";
                    levelChild.style.border = "none";
                    levelChild.style.padding = "12px 20px";
                    levelChild.style.background = "linear-gradient(to right, #43cea2, #185a9d)";
                    levelChild.style.color = "white";
                    levelChild.style.borderRadius = "30px";
                    levelChild.style.fontSize = "1.2rem";
                    levelChild.style.cursor = "pointer";
                    levelChild.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
                    levelChild.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";

                    levelChild.addEventListener("mouseenter", () => {
                        levelChild.style.transform = "scale(1.05)";
                        levelChild.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
                    });

                    levelChild.addEventListener("mouseleave", () => {
                        levelChild.style.transform = "scale(1)";
                        levelChild.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                    });

                    levels.appendChild(levelChild);
                }

                container.appendChild(levels);
            }
        });

        container.appendChild(levelBtn);
    }
});
