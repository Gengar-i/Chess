import { linearMovement } from "./movHelpers.js";

export const rookPreMove = (isWhite, pieceLocation, kingLocation = null, attack = false) => {
    return linearMovement(isWhite, pieceLocation, kingLocation, attack);
};