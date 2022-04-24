import { initialGame } from "./config/initialGame.js";
import { piecesImages } from "./config/piecesImages.js";
import { q, qAll } from "./helpers.js";
import {
    mouseEnter, mouseLeave, pieceClick, blockChangeSides, restart, undoMove, toggleUndoButton, contextmenu
} from "./src/listeners.js";

export let whiteSide = false; // start with false but with first render became true

export const toggleChangeSideButton = (unblock) => {
    const button = q("#change-sides");
    if (unblock) {
        button.classList.remove("disabled");
        button.disabled = false;
        return;
    }
    button.classList.add("disabled");
    button.disabled = true;
};

const resetGame = () => {
    toggleUndoButton(false);
    blockChangeSides(true);
    toggleChangeSideButton(true);
    restart();
    qAll(".piece-box").forEach((piece) => {
        if (piece.firstChild) piece.removeChild(piece.firstChild);
        piece.classList.remove("piece-pointer", "piece-clicked", "piece-premove", "piece-endmove", "piece-startmove");
        piece.removeEventListener("mouseenter", (el) => mouseEnter(el, piece));
        piece.removeEventListener("mouseleave", (el) => mouseLeave(el, piece));
        piece.removeEventListener("click", (el) => pieceClick(el, piece));
        piece.removeEventListener("contextmenu", (el) => contextmenu(el, piece));
    });
    const backdrop = q(".winner-backdrop");
    backdrop.classList.add("hidden");
    renderGame.renderPieces();
};

const renderSide = (reversed = false) => {
    const leftPanel = q(".left-panel");
    const bottomPanel = q(".bottom-panel");
    let numbers = ["8", "7", "6", "5", "4", "3", "2", "1"];
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    while (leftPanel.firstChild || bottomPanel.firstChild) {
        leftPanel.removeChild(leftPanel.firstChild);
        bottomPanel.removeChild(bottomPanel.firstChild);
    }
    const main = q("#main");
    if (main.classList) main.classList.remove("reversed");
    if (reversed) {
        q("#main").classList.add("reversed");
        numbers = numbers.reverse();
        letters = letters.reverse();
    }
    numbers.forEach((number) => {
        const div = document.createElement("div");
        div.classList.add("number");
        const text = document.createTextNode(number);
        div.appendChild(text);
        leftPanel.appendChild(div);
    });
    letters.forEach((letter) => {
        const div = document.createElement("div");
        div.classList.add("letter");
        const text = document.createTextNode(letter);
        div.appendChild(text);
        bottomPanel.appendChild(div);
    });
    whiteSide = !whiteSide
};

const renderGame = {
    renderPieces() {
        const gameSetup = initialGame;
        renderSide();
        this.placePiece(gameSetup);
        this.pieceAddEvents();
        this.blockDragEvent();
        toggleUndoButton(true);
    },
    placePiece(gameSetup) {
        for (const piecePosition in gameSetup) {
            const pieceType = gameSetup[piecePosition];
            const imgLocation = piecesImages[pieceType];
            const imgEl = document.createElement("img");
            imgEl.classList.add("piece");
            imgEl.setAttribute("piece-type", pieceType);
            imgEl.src = `${imgLocation}`;
            q(`#${piecePosition}`).append(imgEl);
        };
    },
    pieceAddEvents() {
        qAll(".piece-box").forEach((piece) => {
            if (piece.hasChildNodes()) {
                piece.classList.add("piece-pointer");
            }
            piece.addEventListener("mouseenter", (el) => mouseEnter(el, piece));
            piece.addEventListener("mouseleave", (el) => mouseLeave(el, piece));
            piece.addEventListener("click", (el) => pieceClick(el, piece));
            piece.addEventListener("contextmenu", (el) => contextmenu(el, piece));
        });
    },
    resetAddEvents() {

    },
    blockDragEvent() {
        qAll(".piece-box > img").forEach((img) => img.setAttribute("draggable", false));
    }
};

window.addEventListener('DOMContentLoaded', () => {
    renderGame.renderPieces();
});



q("#change-sides").addEventListener("click", () => renderSide(whiteSide));
q("#reset").addEventListener("click", () => {
    resetGame();
    resetGame();
});
q("#undo-move").addEventListener("click", () => {
    const piece = q(".piece-endmove");
    const activePiece = q(".piece-startmove");
    undoMove(piece, activePiece);
});
