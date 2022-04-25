import { q } from "../helpers.js";
import { pawnPreMove } from "./moves/pawnPreMove.js";
import { knightPreMove } from "./moves/knightPreMove.js";
import { bishopPreMove } from "./moves/bishopPreMove.js";
import { rookPreMove } from "./moves/rookPreMove.js";
import { queenPreMove } from "./moves/queenPreMove.js";
import { kingPreMove } from "./moves/kingPreMove.js";
import { initialGame } from "../config/initialGame.js";

// given kingLocation we want to know if there is check so returning true of false depending on where piece can attack
// given checker we want to get all the square we can move to prevent check while checked
export const showPreMoves = (type, pieceLocation, startingPostions, enPeasant, isCheck, kingLocation = null, checker = false) => {
    const isStartingPosition = startingPostions.find((sp) => sp.position === pieceLocation);
    const isFirstMove = isStartingPosition ? isStartingPosition.isFirstMove : false;
    if (!isCheck) {
        if (type.includes("pawn")) {
            if (checker && kingLocation) return [];
            if (kingLocation) return pawnPreMove(type.includes("white"), pieceLocation, isFirstMove, enPeasant, kingLocation);
            pawnPreMove(type.includes("white"), pieceLocation, isFirstMove, enPeasant);
        }
        if (type.includes("knight")) {
            if (checker && kingLocation) return [];
            if (kingLocation) return knightPreMove(type.includes("white"), pieceLocation, kingLocation);
            knightPreMove(type.includes("white"), pieceLocation);
        }
        if (type.includes("bishop")) {
            if (kingLocation || checker) return bishopPreMove(type.includes("white"), pieceLocation, kingLocation, checker);
            bishopPreMove(type.includes("white"), pieceLocation);
        }
        if (type.includes("rook")) {
            if (kingLocation || checker) return rookPreMove(type.includes("white"), pieceLocation, kingLocation, checker);
            rookPreMove(type.includes("white"), pieceLocation);
        }
        if (type.includes("queen")) {
            if (kingLocation || checker) return queenPreMove(type.includes("white"), pieceLocation, kingLocation, checker);
            queenPreMove(type.includes("white"), pieceLocation);
        }
        if (type.includes("king")) {
            if (kingLocation) return false;
            kingPreMove(type.includes("white"), pieceLocation, startingPostions);
        }
    }
    if (isCheck) {
        const isWhite = type.includes("white");
        const king = isWhite ? q(`[piece-type="white-king"]`) : q(`[piece-type="black-king"]`);
        king.parentNode.classList.add("check-king");
        if (type.includes("king")) {
            kingPreMove(type.includes("white"), pieceLocation, startingPostions);
        }
        const checkingPiece = q(".piece-endmove");
        const checkingPiecePostion = checkingPiece.getAttribute("id");
        const checkingPieceType = checkingPiece.firstChild.getAttribute("piece-type");
        const checkSquaresWithoutPostion = showPreMoves(checkingPieceType, checkingPiecePostion, [], null, false, king.parentNode, true);
        const checkSquares = [...checkSquaresWithoutPostion, q(`#${checkingPiecePostion}`)];
        if (type.includes("pawn")) {
            pawnPreMove(type.includes("white"), pieceLocation, isFirstMove, enPeasant, null, checkSquares);
        }
        if (type.includes("knight")) {
            knightPreMove(type.includes("white"), pieceLocation, null, checkSquares);
        }
        if (type.includes("bishop")) {
            bishopPreMove(type.includes("white"), pieceLocation, null, false, checkSquares);
        }
        if (type.includes("rook")) {
            rookPreMove(type.includes("white"), pieceLocation, null, false, checkSquares);
        }
        if (type.includes("queen")) {
            queenPreMove(type.includes("white"), pieceLocation, null, false, checkSquares);
        }
        if (type.includes("king")) {
            kingPreMove(type.includes("white"), pieceLocation, startingPostions);
        }
    }
};