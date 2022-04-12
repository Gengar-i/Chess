import { linearMovement } from "./movHelpers.js";

export const rookPreMove = (isWhite, pieceLocation) => {
    linearMovement(isWhite, pieceLocation);
};