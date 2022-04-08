import { qAll } from "../helpers.js";
import { showPreMoves } from "./moves.js";
import { toggleChangeSideButton } from "../app.js";
import { startingPostions } from "../config/startingPositions.js";

// .replaceChild(attackingPiece, defendingdPiece);

let clickedPiece = null;
let statrtingPiece = null;
let blockChangeSide = false;
let whiteTurn = true;

const startingPostionsArray = startingPostions;

export const mouseEnter = (el, piece) => {
    if (piece.hasChildNodes()) {
        piece.classList.add("piece-hover");
    }
};

export const mouseLeave = (el, piece) => {
    if (piece.classList.contains("piece-hover")) piece.classList.remove("piece-hover");
};

export const pieceClick = (el, piece) => {
    const pieceType = piece.firstChild ? piece.firstChild.getAttribute("piece-type") : null;
    const regex = whiteTurn ? /white/ : /black/
    if ((pieceType && pieceType.match(regex)) || piece.classList.contains("piece-premove")) {
        const activePiece = qAll(".piece-box").find((piecev) => piecev.classList.contains("piece-clicked"));
        if (piece.classList.contains("piece-premove")) {
            clickedPiece = piece;
            const activePieceChild = activePiece.firstChild;
            const movedPiece = activePiece.removeChild(activePieceChild);
            piece.appendChild(movedPiece);
            qAll(".piece-box").forEach((square) => {
                if (square.hasChildNodes()) square.classList.add("piece-pointer");
                else square.classList.remove("piece-pointer");
            });
            if (!blockChangeSide) {
                toggleChangeSideButton(false);
                blockChangeSide = true;
            }
            const startingPieceLocation = statrtingPiece.getAttribute("id");
            startingPostionsArray.forEach((startingPiece) => {
                if (startingPiece.position === startingPieceLocation) startingPiece.isFirstMove = false
            });
            console.log(startingPostionsArray);
            whiteTurn = !whiteTurn;
        }
        if (activePiece) {
            qAll(".piece-box").forEach((piecev) => {
                piecev.classList.remove("piece-clicked");
                piecev.classList.remove("piece-premove");
            });
        }
        if (piece.hasChildNodes() && (clickedPiece !== piece || !activePiece)) {
            piece.classList.add("piece-clicked");
            statrtingPiece = piece;
            clickedPiece = piece;
            const pieceLocation = piece.getAttribute("id");
            showPreMoves(piece, pieceType, pieceLocation, startingPostionsArray);
        }
    }
};