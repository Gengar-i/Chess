import { diagonalMovement, linearMovement } from "./movHelpers.js";

export const queenPreMove = (isWhite, pieceLocation) => {
    diagonalMovement(isWhite, pieceLocation);
    linearMovement(isWhite, pieceLocation);
};