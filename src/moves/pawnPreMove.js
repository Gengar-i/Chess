import { q, qAll } from "../../helpers.js";

export const pawnPreMove = (isWhite, pieceLocation, startingPostions) => {
    const isStartingPosition = startingPostions.find((sp) => sp.position === pieceLocation).isFirstMove;
    console.log(isStartingPosition);
    if (isStartingPosition) {
        const position = pieceLocation.split("");
        position[1] = Number(position[1]);
        const squares = isWhite
        ? qAll(`#${position[0] + (position[1] + 1)}, #${position[0] + (position[1] + 2)}`)
        : qAll(`#${position[0] + (position[1] - 1)}, #${position[0] + (position[1] - 2)}`);
        squares.forEach((square) => square.classList.add("piece-premove"));
    } else {
        const position = pieceLocation.split("");
        position[1] = Number(position[1]);
        const squares = isWhite
        ? qAll(`#${position[0] + (position[1] + 1)}`)
        : qAll(`#${position[0] + (position[1] - 1)}`);
        squares.forEach((square) => square.classList.add("piece-premove"));
    }
        // if () {
        //     q();
        //     
    // add + 1
};