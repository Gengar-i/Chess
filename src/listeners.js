import { qAll } from "../helpers.js";
import { showPreMoves } from "./moves.js";

let clickedPiece = null;

export const mouseEnter = (el, piece) => {
    if (piece.hasChildNodes()) {
        piece.classList.add("piece-hover");
    }
};

export const mouseLeave = (el, piece) => {
    if (piece.classList.contains("piece-hover")) piece.classList.remove("piece-hover");
};

export const pieceClick = (el, piece, whiteSide) => {
    const activePiece = qAll(".piece-box").some((piecev) => piecev.classList.contains("piece-clicked"));
    if (activePiece) qAll(".piece-box").forEach((piecev) => piecev.classList.remove("piece-clicked"));
    if (piece.hasChildNodes() && (clickedPiece !== piece || !activePiece)) {
        piece.classList.add("piece-clicked");
        clickedPiece = piece;
        const pieceType = piece.childNodes[0].getAttribute("piece-type");
        const pieceLocation = piece.getAttribute("id");
        showPreMoves(piece, pieceType, pieceLocation, whiteSide);
    }
};