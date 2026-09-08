const textElements = document.querySelectorAll(".decode-text");
const characters = "!@#$%^&*()-_=+<>/{}ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

textElements.forEach((text) => {
    let interval;

    text.addEventListener("mouseenter", () => {
        clearInterval(interval);

        const originalText = text.dataset.text || text.textContent;
        text.dataset.text = originalText;

        let iteration = 0;

        interval = setInterval(() => {
            text.textContent = originalText
                .split("")
                .map((character, index) => {
                    if (index < iteration) return character;

                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join("");

            iteration += 1 / 3;

            // Will stop the interval once all characters have been deciphered
            if (iteration >= originalText.length) {
                clearInterval(interval);
                text.textContent = originalText;
            }
        }, 20);
    });
});
