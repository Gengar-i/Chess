import { pawnPreMove } from "./moves/pawnPreMove.js";
import { initialGame } from "../config/initialGame.js";

export const showPreMoves = (piece, type, pieceLocation, whiteSide) => {
    // if whiteSide true white goes up
    const startingPosition = pieceLocation === initialGame;
    console.log(piece);
    if (type.match(/pawn/)) {
        if (startingPosition) {
            //go +2 or +1 or attack or enPasant
            pawnPreMove(true, type.match(/white/), whiteSide, pieceLocation);
        } else {
            pawnPreMove(false, !!type.match(/white/), whiteSide, pieceLocation);
        }
            // +1 or attack enPasant
    }
    
};