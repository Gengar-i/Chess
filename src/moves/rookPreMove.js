import { linearMovement } from "./movHelpers.js";

export const rookPreMove = (isWhite, pieceLocation, kingLocation = null, checker = false, checkMoves = null, attack = false, findPossibleCheckMoves = false) => {
    return linearMovement(isWhite, pieceLocation, kingLocation, checker, checkMoves, attack, findPossibleCheckMoves);
};