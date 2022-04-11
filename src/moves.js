import { pawnPreMove } from "./moves/pawnPreMove.js";
import { initialGame } from "../config/initialGame.js";

export const showPreMoves = (piece, type, pieceLocation, startingPostions, enPeasant) => {
    const isStartingPosition = startingPostions.find((sp) => sp.position === pieceLocation);
    const isFirstMove = isStartingPosition ? isStartingPosition.isFirstMove : false;
    if (type.includes("pawn")) {
        pawnPreMove(type.includes("white"), pieceLocation, isFirstMove, enPeasant);
    }
    if (type.includes("knight")) {
        knightPreMove(type.includes("white"), pieceLocation);
    }
};