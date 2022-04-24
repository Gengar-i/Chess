import { q, qAll, changeLetter, isOpponent } from "../../helpers.js";

export const knightPreMove = (isWhite, pieceLocation, kingLocation = null, checkSquares = null, attack = false) => {
    const letter = pieceLocation.split("")[0];
    const number = Number(pieceLocation.split("")[1]);
    const letters = [changeLetter(letter, 2, false), changeLetter(letter, 1, false), changeLetter(letter, 1, true), changeLetter(letter, 2, true)]
        .map((letter) => (letter.match(/[a-h]/)) ? letter : null);
    const numbers = [number + 2, number + 1, number - 1, number - 2]
        .map((number) => (number >= 1 && number <= 8) ? number : null);
    const squares = [];
    if (letters[0] && numbers[1]) squares.push(letters[0] + numbers[1]);
    if (letters[1] && numbers[0]) squares.push(letters[1] + numbers[0]);
    if (letters[2] && numbers[0]) squares.push(letters[2] + numbers[0]);
    if (letters[3] && numbers[1]) squares.push(letters[3] + numbers[1]);
    if (letters[3] && numbers[2]) squares.push(letters[3] + numbers[2]);
    if (letters[2] && numbers[3]) squares.push(letters[2] + numbers[3]);
    if (letters[1] && numbers[3]) squares.push(letters[1] + numbers[3]);
    if (letters[0] && numbers[2]) squares.push(letters[0] + numbers[2]);
    const querySquares = squares.map((square, index) => ((index + 1 !== squares.length) ? "#" + square + ", " : "#" + square)).join("");
    const knightSquares = querySquares ? qAll(querySquares) : [];
    if (kingLocation) return knightSquares.some((square) => square === kingLocation);
    if (attack) return knightSquares;
    knightSquares.forEach((square) => {
        if (checkSquares) {
            if (checkSquares.includes(square)) {
                if (square.firstChild && isOpponent(square, isWhite)) square.classList.add("piece-attack");
                else if (!square.firstChild) square.classList.add("piece-premove");
            }
        } else {
            if (square.firstChild && isOpponent(square, isWhite)) square.classList.add("piece-attack");
            else if (!square.firstChild) square.classList.add("piece-premove");
        }
    });
};
