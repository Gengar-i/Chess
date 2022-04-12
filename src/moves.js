import { pawnPreMove } from "./moves/pawnPreMove.js";
import { knightPreMove } from "./moves/knightPreMove.js";
import { bishopPreMove } from "./moves/bishopPreMove.js";
import { rookPreMove } from "./moves/rookPreMove.js";
import { queenPreMove } from "./moves/queenPreMove.js";
import { kingPreMove } from "./moves/kingPreMove.js";
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
    if (type.includes("bishop")) {
        bishopPreMove(type.includes("white"), pieceLocation);
    }
    if (type.includes("rook")) {
        rookPreMove(type.includes("white"), pieceLocation);
    }
    if (type.includes("queen")) {
        queenPreMove(type.includes("white"), pieceLocation);
    }
    if (type.includes("king")) {
        kingPreMove(type.includes("white"), pieceLocation);
    }
};