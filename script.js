
// Assignment 3: Blacksmith — The Tiny Forge

// PLAN:
// 1. Select the game elements and control buttons.
// 2. Create the heat and sword count variables.
// 3. Check the forge status.
// 4. Update the numbers, status, and forge image.
// 5. Add heat when the input is a valid positive whole number.
// 6. Make one sword if there is enough heat.
// 7. Reset the forge and clear the messages.
// 8. Add event listeners to the three buttons.

// 1. Select the game elements.

const forge = document.querySelector("#forge");
const heatValue = document.querySelector("#heat-value");
const swordCount = document.querySelector("#sword-count");
const forgeStatus = document.querySelector("#forge-status");
const forgeImage = document.querySelector("#forge-image");
const actionMessage = document.querySelector("#action-message");

// Select the control elements.

const heatInput = document.querySelector("#heat-input");
const addHeatButton = document.querySelector("#add-heat");
const makeSwordButton = document.querySelector("#make-sword");
const resetForgeButton = document.querySelector("#reset-forge");

// 2. Create the game variables.

let forgeHeat = 20;
let swordsMade = 0;

// 3. Check the forge status.

function getForgeStatus(heatValue) {
    if (heatValue < 30) {
        return "Too cold";
    } 
    else if (heatValue < 70) {
        return "Ready to forge";
    } 
    else {
        return "Roaring fire";
    }
}

// 4. Update the game display.

function updateForge() {
    heatValue.textContent = forgeHeat;
    swordCount.textContent = swordsMade;

    const status = getForgeStatus(forgeHeat);
    forgeStatus.textContent = status;

    // Remove old status classes.

    forge.classList.remove("is-cold", "is-ready", "is-roaring");

    // Update the image and status class.

    if (status === "Too cold") {
        forge.classList.add("is-cold");

        forgeImage.src = "assets/forge-cold.svg";
        forgeImage.alt = "A stone forge with dark coals and no flames.";
    } 
    else if (status === "Ready to forge") {
        forge.classList.add("is-ready");

        forgeImage.src = "assets/forge-ready.svg";
        forgeImage.alt = "A stone forge with a small orange fire.";
    } 
    else {
        forge.classList.add("is-roaring");

        forgeImage.src = "assets/forge-roaring.svg";
        forgeImage.alt = "A stone forge with tall bright flames and sparks.";
    }
}

// 5. Reset the forge.

function resetForge() {
    forgeHeat = 20;
    swordsMade = 0;

    // Clear the input and message.

    heatInput.value = "";
    actionMessage.textContent = "";

    updateForge();
}

// 6. Add heat to the forge.

function heatForge(amount) {
    forgeHeat += amount;

    // Keep the maximum heat at 100.

    if (forgeHeat > 100) {
        forgeHeat = 100;
    }

    actionMessage.textContent = "You added heat to the forge!";

    updateForge();
}

// 7. Make one sword.

function makeSword() {
    if (forgeHeat >= 30) {
        forgeHeat -= 30;
        swordsMade += 1;

        actionMessage.textContent = "You successfully made a sword!";
    } 
    else {
        actionMessage.textContent = "Not enough heat! Add more heat to make a sword.";
    }

    updateForge();
}

// 8. Add an event listener to the Add heat button.

addHeatButton.addEventListener("click", function() {

    // Read the input and convert it to a number.

    const amount = Number(heatInput.value);

    // Check if the input is a positive whole number.

    if (
        heatInput.value.trim() === "" ||
        !Number.isFinite(amount) ||
        !Number.isInteger(amount) ||
        amount <= 0
    ) {
        actionMessage.textContent = "Please enter a positive whole number.";

        return;
    }

    // Add heat if the input is valid.

    heatForge(amount);

    heatInput.value = "";
});

// 9. Add an event listener to the Make sword button.

makeSwordButton.addEventListener("click", function() {
    makeSword();
});

// 10. Add an event listener to the Reset forge button.

resetForgeButton.addEventListener("click", function() {
    resetForge();
});

// 11. Start the game.

resetForge();
