const header = document.querySelector(".header");
const yes = document.querySelector(".yes-button");
const no = document.querySelector(".no-button");

let i = 0;

const phrase = ["Lies.", "I don't believe u.", "Really??", "r u 100% sure??",
    "Ok jokes over not funny.", ":("
];

no.addEventListener("click", ()=> {
    const computedStyle = parseFloat(window.getComputedStyle(yes).fontSize);

    yes.style.fontSize = `${computedStyle * 1.5}px`

    no.textContent = phrase[i];
    i++;

    if (i >= phrase.length) {
        i = 0;
    }
});

yes.addEventListener("click", ()=> {
    header.remove();
    yes.remove();
    no.remove();
});