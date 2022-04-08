import { pawnPreMove } from "./moves/pawnPreMove.js";
import { initialGame } from "../config/initialGame.js";

export const showPreMoves = (piece, type, pieceLocation, startingPostions) => {
    // if whiteSide true white goes up
    // const startingPosition = pieceLocation === initialGame;
    if (type.match(/pawn/)) {
        //go +2 or +1 or attack or enPasant
        pawnPreMove(type.match(/white/), pieceLocation, startingPostions);
    }
};