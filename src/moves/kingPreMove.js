import { q, qAll, isOpponent } from "../../helpers.js";
import { kingMovement } from "./movHelpers.js";
import { pawnPreMove } from "./pawnPreMove.js";
import { knightPreMove } from "./knightPreMove.js";
import { bishopPreMove } from "./bishopPreMove.js";
import { rookPreMove } from "./rookPreMove.js";
import { queenPreMove } from "./queenPreMove.js";

export const kingPreMove = (isWhite, pieceLocation) => {
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
    kingCanMove.forEach((square) => {
        if (square.firstChild && isOpponent(square, isWhite)) square.classList.add("piece-attack");
        else if (!square.firstChild) square.classList.add("piece-premove");
    });
};