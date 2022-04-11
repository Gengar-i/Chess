import { q, qAll, changeLetter, isOpponent } from "../../helpers.js";

export const pawnPreMove = (isWhite, pieceLocation) => {
    const letter = pieceLocation.split("")[0];
    const number = Number(pieceLocation.split("")[1]);
    const squares = null;
    squares.forEach((square) => {
        if (square.firstChild && isOpponent(square, isWhite)) square.classList.add("piece-attack");
        else if (!square.firstChild) square.classList.add("piece-premove");
    });
};
