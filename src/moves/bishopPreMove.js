import { diagonalMovement } from "./movHelpers.js";

export const bishopPreMove = (isWhite, pieceLocation, kingLocation = null, attack = false) => {
    return diagonalMovement(isWhite, pieceLocation, kingLocation, attack);
};