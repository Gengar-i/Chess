import { q, qAll, letterPlace } from "../helpers.js";
import { showPreMoves } from "./moves.js";
import { toggleChangeSideButton } from "../app.js";
import { startingPostions } from "../config/startingPositions.js";
import { whiteSide } from "../app.js";
import { findCheck, hasNoPossibleMoves } from "./moves/movHelpers.js";

let clickedPiece = null;
let clonedRemovedPiece = null;
let startingPiece = null;
let whiteTurn = true;
let check = false;

let blockChangeSide = false;
let enPeasant = null;
let enPeasantUndo = null;

let startingPosItionsArray = JSON.parse(JSON.stringify(startingPostions));

export const restart = () => {
    whiteTurn = true;
    startingPosItionsArray = structuredClone(startingPostions);
};

export const mouseEnter = (el, piece) => {
    if (piece.hasChildNodes()) {
        piece.classList.add("piece-hover");
    }
};

export const mouseLeave = (el, piece) => {
    if (piece.classList.contains("piece-hover")) piece.classList.remove("piece-hover");
};

export const contextmenu = (el, piece) => {
    el.preventDefault();
    if (!piece.classList.contains("piece-contextmenu")) piece.classList.add("piece-contextmenu");
    else piece.classList.remove("piece-contextmenu");
};

//piece = clicked tile
//activePiece = previously clicked tile
export const pieceClick = (el, piece) => {
    //remove contextMenuColor
    qAll(".piece-box").forEach((piecev) => piecev.classList.remove("piece-contextmenu"));
    const pieceType = piece.firstChild ? piece.firstChild.getAttribute("piece-type") : null;
    const pieceColor = whiteTurn ? "white" : "black";
    if ((pieceType && pieceType.includes(pieceColor)) || piece.classList.contains("piece-premove") || piece.classList.contains("piece-attack")) {
        const activePiece = qAll(".piece-box").find((piecev) => piecev.classList.contains("piece-clicked"));
        if (piece.classList.contains("piece-attack")) {
            clickedPiece = piece;

            //attack
            attack(piece, activePiece, enPeasant);
            toggleUndoButton(false);
            if (canUpgradePawn(piece)) upgradePawn(piece, activePiece);
            
            //other
            enPeasant = null;

            //end actions
            updatePointers();
            highlightLastMove(piece, activePiece);
            updateStartingPostions();
            changeTurn();

            if (checkIfEndGame(checkIfCheck())) {
                return endGame();
            }
        }
        if (piece.classList.contains("piece-premove")) {
            clickedPiece = piece;

            //move
            move(piece, activePiece); 
            if (canUpgradePawn(piece)) upgradePawn(piece, activePiece);

            //castling
            if (piece.classList.contains("long-castling") || piece.classList.contains("short-castling")) castling(piece.classList.contains("long-castling"));

            //other
            toggleUndoButton(false);
            enPeasant = null;
            blockChangeSides();
            
            checkForEnPeasant(piece, activePiece);

            ////end actions
            updatePointers();
            highlightLastMove(piece, activePiece);
            updateStartingPostions();
            changeTurn();
            if (checkIfEndGame(checkIfCheck())) {
                return endGame();
            }
        }
        if (activePiece) {
            //unclick
            qAll(".piece-box").forEach((piecev) => {
                piecev.classList.remove("piece-clicked", "piece-premove", "piece-attack", "check-king", "long-castling", "short-castling");
            });
        }
        if (piece.hasChildNodes() && (clickedPiece !== piece || !activePiece)) {
            enPeasantUndo = null;
            clonedRemovedPiece = null;
            toggleUndoButton(true);
            piece.classList.add("piece-clicked");
            startingPiece = piece;
            clickedPiece = piece;
            const pieceLocation = piece.getAttribute("id");
            showPreMoves(pieceType, pieceLocation, startingPosItionsArray, enPeasant, checkIfCheck());
        }
    }
};

const move = (piece, activePiece) => {
    const activePieceChild = activePiece.firstChild;
    const movedPiece = activePiece.removeChild(activePieceChild);
    piece.appendChild(movedPiece);
};

const attack = (piece, activePiece, enPeasant = null) => {
    let attackingSquare = null;
    if (enPeasant) attackingSquare = q(`#${enPeasant[1]}`);
    if (attackingSquare === piece) {
        enPeasantUndo = enPeasant ? [...enPeasant] : null;
        clonedRemovedPiece = enPeasant[0].firstChild.cloneNode();
        enPeasant[0].removeChild(enPeasant[0].firstChild);
        move(piece, activePiece);
    } else {
        const activePieceChild = activePiece.firstChild;
        clonedRemovedPiece = clickedPiece.firstChild.cloneNode();
        piece.replaceChild(activePieceChild, clickedPiece.firstChild);
    }
};

const checkIfCheck = () => {
    const lastMoveSquare = q(".piece-endmove");
    if (lastMoveSquare) {
        const check = findCheck(lastMoveSquare);
        return check;
    }
    return false;
};

export const undoMove = (piece, activePiece, removedChild = null) => {
    //stupidest idea to develop this :|
    const pieceChild = piece.firstChild;
    if (enPeasantUndo) enPeasantUndo[0].appendChild(clonedRemovedPiece);
    if (clonedRemovedPiece && !enPeasantUndo) piece.appendChild(clonedRemovedPiece);
    if (removedChild) activePiece.appendChild(removedChild);
    else activePiece.appendChild(pieceChild);
    changeTurn();
    updatePointers();
    qAll(".piece-box").forEach((square) => {
        square.classList.remove("piece-endmove");
        square.classList.remove("piece-startmove");
    });
    toggleUndoButton(true);
    updateStartingPostions(true);
    enPeasant = enPeasantUndo ? enPeasantUndo : null;
    enPeasantUndo = null;
    clonedRemovedPiece = null;
};

const highlightLastMove = (piece, activePiece) => {
    qAll(".piece-box").forEach((square) => {
        square.classList.remove("piece-endmove");
        square.classList.remove("piece-startmove");
    });
    piece.classList.add("piece-endmove");
    activePiece.classList.add("piece-startmove");
};

const updatePointers = () => {
    qAll(".piece-box").forEach((square) => {
        if (square.hasChildNodes()) square.classList.add("piece-pointer");
        else square.classList.remove("piece-pointer");
    });
};

const canUpgradePawn = (piece) => {
    if (piece.firstChild.getAttribute("piece-type").includes("pawn")) {
        const squareNumber = Number(piece.getAttribute("id").slice("")[1]);
        return squareNumber === 1 || squareNumber === 8;
    }
    return false;
};

const upgradePawn = (piece, activePiece) => {
    const upgrade = q(".upgrade");
    //add new children (remove listeners)
    const upgradeArray = [...upgrade.children];
    if (upgradeArray.length !== 0) {
        upgradeArray.forEach((child) => {
            upgrade.removeChild(child);
        });
    }
    for (let i=0; i<5; i++) {
        const child = document.createElement("div");
        if (i !== 4) {
            child.classList.add("img-container", "pointer");
            const img = document.createElement("img");
            img.classList.add("piece");
            img.setAttribute("draggable", false);
            child.appendChild(img);
        } else {
            child.classList.add("close-upgrade", "pointer");
            const x = document.createTextNode("X");
            child.appendChild(x);
        }
        upgrade.appendChild(child);
    }
    //square updage
    const closeUpgradeButton = q(".close-upgrade");
    const upgradeImg = qAll(".upgrade img");
    upgrade.classList.remove("hidden");
    toggleUndoButton(true);

    //remove piece which upgrade
    const pieceFirstChild = piece.firstChild;
    const removedChild = piece.removeChild(pieceFirstChild);

    //adding images
    upgradeImg.forEach((img, index) => {
        switch(index) {
            case 0:
                img.setAttribute("piece-type", whiteTurn ? "white-queen" : "black-queen");
                img.src = whiteTurn ? "./pieces/white-queen.png" : "./pieces/black-queen.png";
                break;
            case 1:
                img.setAttribute("piece-type", whiteTurn ? "white-knight" : "black-knight");
                img.src = whiteTurn ? "./pieces/white-knight.png" : "./pieces/black-knight.png";
                break;
            case 2:
                img.setAttribute("piece-type", whiteTurn ? "white-rook" : "black-rook");
                img.src = whiteTurn ? "./pieces/white-rook.png" : "./pieces/black-rook.png";
                break;
            case 3:
                img.setAttribute("piece-type", whiteTurn ? "white-bishop" : "black-bishop");
                img.src = whiteTurn ? "./pieces/white-bishop.png" : "./pieces/black-bishop.png";
                break;
        }
    });
    //add event listeners
    upgradeImg.forEach((img) => {
        img.addEventListener("click", () => {
            const clonedImg = img.cloneNode();
            piece.appendChild(clonedImg);
            toggleUndoButton(true);
            closeUpgrade();
        });
    })
    closeUpgradeButton.addEventListener("click", () => {
        enPeasantUndo = null;
        undoMove(piece, activePiece, removedChild);
        closeUpgrade();
    });

    //postion of modal
    const letterSquare = piece.getAttribute("id").slice("")[0];
    const upgradeShift = letterPlace(letterSquare);
    const height = window.innerHeight;
    const width = window.innerWidth;
    let transformY = 0;
    let transformX = 0;
    if (whiteSide) {
        if (width <= 770 || height <= 700) {
            transformY = whiteTurn ? 0 : 140;
            transformX = upgradeShift * 40;
        } else {
            transformY = whiteTurn ? 0 : 290;
            transformX = upgradeShift * 80;
        }
    } else {
        if (width <= 770 || height <= 700) {
            transformY = whiteTurn ? 140 : 0;
            transformX = upgradeShift * -40;
        } else {
            transformY = whiteTurn ? 290 : 0;
            transformX = upgradeShift * -80;
        }
    }
    upgrade.style.transform = `translate(${transformX}px, ${transformY}px)`;
};

//close modal for upgrading pawn
const closeUpgrade = () => {
    const upgrade = q(".upgrade");
    upgrade.classList.add("hidden");
};

const updateStartingPostions = (isUndo = false) => {
    const startingPieceLocation = startingPiece.getAttribute("id");
    startingPosItionsArray.forEach((startingPiece) => {
        if (startingPiece.position === startingPieceLocation) isUndo ? startingPiece.isFirstMove = true : startingPiece.isFirstMove = false
    });
};

const changeTurn = () => whiteTurn = !whiteTurn;

export const blockChangeSides = (reset = false) => {
    if (reset) {
        blockChangeSide = false;
        return;
    }
    if (!blockChangeSide) {
        toggleChangeSideButton(false);
        blockChangeSide = true;
    }
};

const checkForEnPeasant = (startSquare, endSquare) => {
    const startNumber = Number(startSquare.getAttribute("id").split("")[1]);
    const endNumber = Number(endSquare.getAttribute("id").split("")[1]);
    const letter = startSquare.getAttribute("id").split("")[0];
    const pieceType = startSquare.firstChild && startSquare.firstChild.getAttribute("piece-type");
    if (pieceType) {
        if (pieceType.includes("pawn") && (Math.abs(startNumber - endNumber) === 2)) {
            const perfectPlace = whiteTurn ? (startNumber - 1) : (startNumber + 1);
            enPeasant = [];
            enPeasant.push(startSquare, letter + perfectPlace);
        } else {
            enPeasant = null;
        }
    }
};

//enable disable Undon button
export const toggleUndoButton = (disable) => {
    const undoButton = q("#undo-move");
    if (disable) {
        undoButton.disabled = true;
        undoButton.classList.add("disabled")
    } else {
        undoButton.disabled = false;
        undoButton.classList.remove("disabled")
    }
};

const castling = (long) => {
    const updateRook = (place, desirePlace) => {
        const rook = q(place);
        const removedrook = rook.removeChild(rook.firstChild);
        q(desirePlace).appendChild(removedrook);
    };
    if (whiteTurn) {
        if (long) updateRook("#a1", "#d1");
        else updateRook("#h1", "#f1");
    } else {
        if (long) updateRook("#a8", "#d8");
        else updateRook("#h8", "#f8");
    }
};

//end-game
const checkIfEndGame = (check) => {
    if (check) {
        return hasNoPossibleMoves(whiteTurn, check, startingPosItionsArray, enPeasant);
    }
    return false;
};

const blockUI = () => {
    const backdrop = q(".winner-backdrop");
    backdrop.classList.remove("hidden");
    toggleUndoButton(true);
    whiteTurn ? backdrop.firstChild.innerText = "black wins!" : backdrop.firstChild.innerText = "white wins!";
};

const endGame = () => {
    qAll(".piece-box").forEach((piecev) => {
        piecev.classList.remove("piece-clicked", "piece-premove", "piece-attack", "check-king", "long-castling", "short-castling");
    });
    blockUI();
};
