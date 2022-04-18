import { q, qAll, isOpponent } from "../../helpers.js";
import { kingMovement } from "./movHelpers.js";
import { pawnPreMove } from "./pawnPreMove.js";
import { knightPreMove } from "./knightPreMove.js";
import { bishopPreMove } from "./bishopPreMove.js";
import { rookPreMove } from "./rookPreMove.js";
import { queenPreMove } from "./queenPreMove.js";

export const kingPreMove = (isWhite, pieceLocation, startingPostions) => {
    //removes all incorrect moves
    const opponentColor = isWhite ? "black" : "white";
    const opponentKing = q(`[piece-type="${opponentColor}-king"]`);
    const opponentKingLocationId = opponentKing.parentNode.getAttribute("id");
    const knightSquares = kingMovement(pieceLocation);
    const oponentKingSquares = kingMovement(opponentKingLocationId);
    let getAllOpponentsMoves = [];
    [...qAll(`[piece-type="${opponentColor}-pawn"]`)].forEach((child) => {
        const position = child.parentNode.getAttribute("id");
        const attackMoves = pawnPreMove(!isWhite, position, null, null, false, true);
        attackMoves.forEach((attack) => {if(attack) getAllOpponentsMoves.push(attack);});
    });
    [...qAll(`[piece-type="${opponentColor}-knight"]`)].forEach((child) => {
        const position = child.parentNode.getAttribute("id");
        const attackMoves = knightPreMove(!isWhite, position, false, true);
        attackMoves.forEach((attack) => {if(attack) getAllOpponentsMoves.push(attack);});
    });
    [...qAll(`[piece-type="${opponentColor}-bishop"]`)].forEach((child) => {
        const position = child.parentNode.getAttribute("id");
        const attackMoves = bishopPreMove(!isWhite, position, false, true);
        attackMoves.forEach((attack) => {if(attack) getAllOpponentsMoves.push(attack);});
    });
    [...qAll(`[piece-type="${opponentColor}-rook"]`)].forEach((child) => {
        const position = child.parentNode.getAttribute("id");
        const attackMoves = rookPreMove(!isWhite, position, false, true);
        attackMoves.forEach((attack) => {if(attack) getAllOpponentsMoves.push(attack);});
    });
    [...qAll(`[piece-type="${opponentColor}-queen"]`)].forEach((child) => {
        const position = child.parentNode.getAttribute("id");
        const attackMoves = queenPreMove(!isWhite, position, false, true);
        attackMoves.forEach((attack) => {if(attack) getAllOpponentsMoves.push(attack);});
    });
    const kingMovesWithoutKing = knightSquares.filter((square) => !getAllOpponentsMoves.includes(square));
    const kingCanMove = kingMovesWithoutKing.filter((square) => !oponentKingSquares.includes(square));

    //castling
    let shortCastling = false;
    let longCastling = false;
    if (startingPostions) {
        const rooks = isWhite ? qAll(`[piece-type="white-rook"]`) : qAll(`[piece-type="black-rook"]`);
        if (rooks.length) {
            let leftRook = null;
            let rightRook = null;
            rooks.forEach((rook) => {
                const id = rook.parentNode.getAttribute("id");
                if (isWhite) {
                    if (id === "a1") leftRook = id;
                    if (id === "h1") rightRook = id;
                } else {
                    if (id === "a8") leftRook = id;
                    if (id === "h8") rightRook = id;
                }
            });
            const startingPositionKing = startingPostions.find((sp) => sp.position === pieceLocation);
            const startingPositionLeftRook = startingPostions.find((sp) => sp.position === leftRook);
            const startingPositionRightRook = startingPostions.find((sp) => sp.position === rightRook);
            const isStartingPositionKing = startingPositionKing ? startingPositionKing.isFirstMove : false;
            const isStartingPositionLeftRook = startingPositionLeftRook ? startingPositionLeftRook.isFirstMove : false;
            const isStartingPositionRightRook = startingPositionRightRook ? startingPositionRightRook.isFirstMove : false;
            if (isStartingPositionKing && isStartingPositionRightRook) shortCastling = true;
            if (isStartingPositionKing && isStartingPositionLeftRook) longCastling = true;
        }
    }
    if (longCastling) {
        const longIds = isWhite ? "#b1, #c1, #d1" : "#b8, #c8, #d8";
        const longCastlingSquares = [...qAll(longIds)];
        const readyForCastling = longCastlingSquares.every((square) => (!square.firstChild && !getAllOpponentsMoves.includes(square)));
        if (readyForCastling) longCastlingSquares[1].classList.add("piece-premove", "long-castling");
    }
    if (shortCastling) {
        const shortIds = isWhite ? "#f1, #g1" : "#f8, #g8";
        const shortCastlingSquares = [...qAll(shortIds)];
        const readyForCastling = shortCastlingSquares.every((square) => (!square.firstChild && !getAllOpponentsMoves.includes(square)));
        if (readyForCastling) shortCastlingSquares[1].classList.add("piece-premove", "short-castling");
    }

    //moves
    kingCanMove.forEach((square) => {
        if (square.firstChild && isOpponent(square, isWhite)) square.classList.add("piece-attack");
        else if (!square.firstChild) square.classList.add("piece-premove");
    });
};