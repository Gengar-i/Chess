import { diagonalMovement, linearMovement } from "./movHelpers.js";

export const queenPreMove = (isWhite, pieceLocation, kingLocation = null, checker = false, checkMoves = null, attack = false, findPossibleCheckMoves = false) => {
    const diagonalMoves = diagonalMovement(isWhite, pieceLocation, kingLocation, checker, checkMoves, attack, findPossibleCheckMoves);
    const linearMoves = linearMovement(isWhite, pieceLocation, kingLocation, checker, checkMoves, attack, findPossibleCheckMoves);
    if (findPossibleCheckMoves) diagonalMoves && linearMoves;
    if (checker) {
        const kingId = kingLocation.getAttribute("id");
        const kingLetter = kingId.split("")[0];
        const kingNumber = Number(kingId.split("")[1]);
        const pieceLetter = pieceLocation.split("")[0];
        const pieceNumber = Number(pieceLocation.split("")[1]);
        if (kingLetter === pieceLetter || kingNumber === pieceNumber) return linearMoves;
        else return diagonalMoves;
    }
    if (kingLocation) return diagonalMoves || linearMoves;
    if (attack) return diagonalMoves.concat(linearMoves);
};