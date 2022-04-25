import { diagonalMovement } from "./movHelpers.js";

export const bishopPreMove = (isWhite, pieceLocation, kingLocation = null, checker = false, checkMoves = null, attack = false, findPossibleCheckMoves = false) => {
    return diagonalMovement(isWhite, pieceLocation, kingLocation, checker, checkMoves, attack, findPossibleCheckMoves);
};