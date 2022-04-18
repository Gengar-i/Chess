import { q } from "../helpers.js";
import { pawnPreMove } from "./moves/pawnPreMove.js";
import { knightPreMove } from "./moves/knightPreMove.js";
import { bishopPreMove } from "./moves/bishopPreMove.js";
import { rookPreMove } from "./moves/rookPreMove.js";
import { queenPreMove } from "./moves/queenPreMove.js";
import { kingPreMove } from "./moves/kingPreMove.js";
import { initialGame } from "../config/initialGame.js";

// given kingLocation we want to know if there is check so returning true of false depending on where piece can attack
export const showPreMoves = (type, pieceLocation, startingPostions, enPeasant, isCheck, kingLocation = null) => {
    const isStartingPosition = startingPostions.find((sp) => sp.position === pieceLocation);
    const isFirstMove = isStartingPosition ? isStartingPosition.isFirstMove : false;
    console.log(isCheck);
    if (!isCheck) {
        if (type.includes("pawn")) {
            if (kingLocation) return pawnPreMove(type.includes("white"), pieceLocation, isFirstMove, enPeasant, kingLocation);
            pawnPreMove(type.includes("white"), pieceLocation, isFirstMove, enPeasant);
        }
        if (type.includes("knight")) {
            if (kingLocation) return knightPreMove(type.includes("white"), pieceLocation, kingLocation);
            knightPreMove(type.includes("white"), pieceLocation);
        }
        if (type.includes("bishop")) {
            if (kingLocation) return bishopPreMove(type.includes("white"), pieceLocation, kingLocation);
            bishopPreMove(type.includes("white"), pieceLocation);
        }
        if (type.includes("rook")) {
            if (kingLocation) return rookPreMove(type.includes("white"), pieceLocation, kingLocation);
            rookPreMove(type.includes("white"), pieceLocation);
        }
        if (type.includes("queen")) {
            if (kingLocation) return queenPreMove(type.includes("white"), pieceLocation, kingLocation);
            queenPreMove(type.includes("white"), pieceLocation);
        }
        if (type.includes("king")) {
            if (kingLocation) return false;
            kingPreMove(type.includes("white"), pieceLocation, startingPostions);
        }
    }
    if (isCheck) {
        const isWhite = type.includes("white");
        const king = isWhite ? q(`[piece-type="white-king"]`) : q(`[piece-type="black-king"]`) ;
        king.classList.add("check-king");
    }
};