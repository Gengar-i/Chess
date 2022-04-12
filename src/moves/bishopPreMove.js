import { diagonalMovement } from "./movHelpers.js";

export const bishopPreMove = (isWhite, pieceLocation) => {
    diagonalMovement(isWhite, pieceLocation);
};