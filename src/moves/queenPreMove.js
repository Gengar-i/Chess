import { diagonalMovement, linearMovement } from "./movHelpers.js";

export const queenPreMove = (isWhite, pieceLocation, kingLocation = null, checker = false, checkMoves = null, attack = false) => {
    const diagonalMoves = diagonalMovement(isWhite, pieceLocation, kingLocation, checker, checkMoves, attack);
    const linearMoves = linearMovement(isWhite, pieceLocation, kingLocation, checker, checkMoves, attack);
    if (kingLocation) return diagonalMoves || linearMoves;
    if (attack) return diagonalMoves.concat(linearMoves);
};