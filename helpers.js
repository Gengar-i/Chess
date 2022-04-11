export const q = (name) => document.querySelector(name);
export const qAll = (name) => [...document.querySelectorAll(name)];
export const changeLetter = (letter, amount, increment) => {
    const letterCharCode = letter.charCodeAt();
    let sum = null;
    if (increment) sum = letterCharCode + amount;
    else sum = letterCharCode - amount;
    return String.fromCharCode(sum);
};
export const letterPlace = (letter) => {
    const letterCharCode = letter.charCodeAt();
    return letterCharCode - 97;
};

export const isOpponent = (node, isWhite) => {
    const opponent = node.firstChild.getAttribute("piece-type");
    return isWhite ? opponent.includes("black") : opponent.includes("white");
};