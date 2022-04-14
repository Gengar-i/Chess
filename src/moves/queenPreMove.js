import { diagonalMovement, linearMovement } from "./movHelpers.js";

export const queenPreMove = (isWhite, pieceLocation, kingLocation = null, attack = false) => {
    const diagonalMoves = diagonalMovement(isWhite, pieceLocation, kingLocation, attack);
    const linearMoves = linearMovement(isWhite, pieceLocation, kingLocation, attack);
    if (kingLocation) return diagonalMoves || linearMoves;
    if (attack) return diagonalMoves.concat(linearMoves); 
};