// DOM References and Constraints

const textElements = document.querySelectorAll(".decode-text");
const characters = "!@#$%^&*()-_=+<>/{}ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

const buttonMenu = document.querySelector("#buttonMenu");
const navLinks = document.querySelectorAll(".main-navigation a");

// Functions

function toggleMobileMenu() {
    const isOpen = buttonMenu.getAttribute("aria-expanded") === "true";

    buttonMenu.setAttribute("aria-expanded", String(!isOpen));
    buttonMenu.setAttribute("aria-label",
        isOpen ? "Open navigation" : "Close navigation"
    );
};

function closeMobileMenu() {
    buttonMenu.setAttribute("aria-expanded", "false");
    buttonMenu.setAttribute("aria-label", "Open navigation");
};

// Hover Text Decipher Animation
function decipherText(text) {
    // Randomises the characters of the hovered text,
    // until all match the original text again
    clearInterval(text.decipherInterval);

    const originalText = text.dataset.text || text.textContent;
    text.dataset.text = originalText;

    let iteration = 0;

    text.decipherInterval = setInterval(() => {
        text.textContent = originalText
            .split("")
            .map((character, index) => {
                if (index < iteration) return character;

                return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");

        iteration += 1 / 3;

        // Stops when all characters have been deciphered
        if (iteration >= originalText.length) {
            clearInterval(text.decipherInterval);
            text.textContent = originalText;
        }
    }, 20);
};

// Event Listeners

// Decipher Text Animation
textElements.forEach((text) => {
    text.addEventListener("mouseenter", () => {
        decipherText(text);
    });
});

// Open / Close Mobile Nav
buttonMenu.addEventListener("click", toggleMobileMenu);

navLinks.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
});