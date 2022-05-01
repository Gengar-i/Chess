import { q, qAll, changeLetter, isOpponent, letterPlace } from "../../helpers.js";
import { showPreMoves } from "../moves.js";
import { pawnPreMove } from "./pawnPreMove.js";
import { knightPreMove } from "./knightPreMove.js";
import { bishopPreMove } from "./bishopPreMove.js";
import { rookPreMove } from "./rookPreMove.js";
import { queenPreMove } from "./queenPreMove.js";
import { kingPreMove } from "./kingPreMove.js";

const iteration = (pieceLocation, increment = true, letterson = true) => {
    const array = [];
    const letter = pieceLocation.split("")[0];
    const number = Number(pieceLocation.split("")[1]);
    for (let i = 1; i <= 7; i++) {
        if (letterson) {
            increment ? array.push(changeLetter(letter, i, true)) : array.push(changeLetter(letter, i, false));
        } else {
            increment ? array.push(number + i) : array.push(number - i);
        }
    }
    if (letterson) {
        return array.map((lett) => (lett.match(/[a-h]/)) ? lett : null);
    }
    return array.map((num) => (num >= 1 && num <= 8) ? num : null);
};

const addMoves = (squares1, squares2, squares3, squares4, isWhite, kingLocation, checkMoves, attack, findPossibleCheckMoves) => {
    let hasNotCheckMove = true;
    const squares = [...squares1, ...squares2, ...squares3, ...squares4];
    const querySquares = squares.map((square, index) => ((index + 1 !== squares.length) ? "#" + square + ", " : "#" + square)).join("");
    const movementSquares = querySquares ? qAll(querySquares) : [];
    if (kingLocation) return movementSquares.some((square) => square === kingLocation);
    if (attack) return movementSquares;
    movementSquares.forEach((square) => {
        if (checkMoves) {
            if (checkMoves.includes(square)) {
                if (square.firstChild && isOpponent(square, isWhite)) square.classList.add("piece-attack");
                else if (!square.firstChild) square.classList.add("piece-premove");
                hasNotCheckMove = false;
            }
        } else {
            if (square.firstChild && isOpponent(square, isWhite)) square.classList.add("piece-attack");
            else if (!square.firstChild) square.classList.add("piece-premove");
        }
    });
    if (findPossibleCheckMoves) return hasNotCheckMove;
};

export const diagonalMovement = (isWhite, pieceLocation, kingLocation, checker, checkMoves, attack, findPossibleCheckMoves) => {
    const addDiagonalSquares = (letters, numbers) => {
        const array = [];
        for (let i = 0; i < 7 ; i++) {
            if (letters[i] && numbers[i]) array.push(letters[i] + numbers[i]);
        }
        const findenIndexen = array.findIndex((tile) => {
            const tilemans = q(`#${tile}`);
            const color = isWhite ? "black" : "white";
            const isKing = tilemans.firstChild && tilemans.firstChild.getAttribute("piece-type").includes(`${color}-king`);
            return tilemans.firstChild && !isKing;
        });
        if (findenIndexen !== -1) {
            return array.slice(0, findenIndexen + 1);
        }
        return array;
    };
    const numbersPos = iteration(pieceLocation, true, false);
    const numbersNeg = iteration(pieceLocation, false, false);
    const letterPos = iteration(pieceLocation, true);
    const letterNeg = iteration(pieceLocation, false); 
    const squares1 = addDiagonalSquares(letterPos, numbersPos);
    const squares2 = addDiagonalSquares(letterPos, numbersNeg);
    const squares3 = addDiagonalSquares(letterNeg, numbersPos);
    const squares4 = addDiagonalSquares(letterNeg, numbersNeg);
    if (checker) return findDiagonalSquares(pieceLocation, kingLocation);
    return addMoves(squares1, squares2, squares3, squares4, isWhite, kingLocation, checkMoves, attack, findPossibleCheckMoves);
};

export const linearMovement = (isWhite, pieceLocation, kingLocation, checker, checkMoves, attack, findPossibleCheckMoves) => {
    const letter = pieceLocation.split("")[0];
    const number = Number(pieceLocation.split("")[1]);
    const addLinearSquares = (iterableArr, char) => {
        const array = [];
        for (let i = 0; i < 7 ; i++) {
            if (isNaN(char)) {
                if (char && iterableArr[i]) array.push(char + iterableArr[i]);
            } else {
                if (iterableArr[i] && char) array.push(iterableArr[i] + char);
            }
        }
        const findenIndexen = array.findIndex((tile) => {
            const tilemans = q(`#${tile}`);
            const color = isWhite ? "black" : "white";
            const isKing = tilemans.firstChild && tilemans.firstChild.getAttribute("piece-type").includes(`${color}-king`);
            return tilemans.firstChild && !isKing;
        });
        if (findenIndexen !== -1) {
            return array.slice(0, findenIndexen + 1);
        }
        return array;
    };
    const letterPos = iteration(pieceLocation, true);
    const numbersPos = iteration(pieceLocation, true, false);
    const letterNeg = iteration(pieceLocation, false);
    const numbersNeg = iteration(pieceLocation, false, false);
    const squares1 = addLinearSquares(numbersPos, letter); //up
    const squares2 = addLinearSquares(letterPos, number); //right
    const squares3 = addLinearSquares(numbersNeg, letter, false); //bottom
    const squares4 = addLinearSquares(letterNeg, number, false); //left
    if (checker) return findLinearSquares(pieceLocation, kingLocation);
    return addMoves(squares1, squares2, squares3, squares4, isWhite, kingLocation, checkMoves, attack, findPossibleCheckMoves);
};

export const kingMovement = (pieceLocation) => {
    const letter = pieceLocation.split("")[0];
    const number = Number(pieceLocation.split("")[1]);
    const letters = [changeLetter(letter, 1, false), changeLetter(letter, 1, true)]
        .map((letter) => (letter.match(/[a-h]/)) ? letter : null);
    const numbers = [number + 1, number - 1]
        .map((number) => (number >= 1 && number <= 8) ? number : null);
    const squares = [];
    if (letters[0] && numbers[0]) squares.push(letters[0] + numbers[0]);
    if (letters[1] && numbers[1]) squares.push(letters[1] + numbers[1]);
    if (letters[0] && numbers[1]) squares.push(letters[0] + numbers[1]);
    if (letters[1] && numbers[0]) squares.push(letters[1] + numbers[0]);
    if (letter && numbers[0]) squares.push(letter + numbers[0]);
    if (letter && numbers[1]) squares.push(letter + numbers[1]);
    if (letters[0] && number) squares.push(letters[0] + number);
    if (letters[1] && number) squares.push(letters[1] + number);
    const querySquares = squares.map((square, index) => ((index + 1 !== squares.length) ? "#" + square + ", " : "#" + square)).join("");
    const knightSquares = querySquares ? qAll(querySquares) : [];
    return knightSquares;
};

export const findCheck = (pieceSquare) => {
    if (pieceSquare.firstChild) {
        const lastMovePiece = pieceSquare.firstChild.getAttribute("piece-type");
        const isWhite = pieceSquare.firstChild.getAttribute("piece-type").includes("white");
        const kingImg = isWhite ? q(`[piece-type="black-king"]`) : q(`[piece-type="white-king"]`);
        const kingLocation = kingImg.parentNode;
        const pieceLocation = pieceSquare.getAttribute("id");

        //possible check moves
        return showPreMoves(lastMovePiece, pieceLocation, [], null, false, kingLocation);
    }
    return false;
};

const findDiagonalSquares = (checkerLocation, kingLocation) => {
    const kingId = kingLocation.getAttribute("id");
    const pieceLetter = checkerLocation.split("")[0];
    const pieceNumber = Number(checkerLocation.split("")[1]);
    const kingLetter = kingId.split("")[0];
    const kingNumber = Number(kingId.split("")[1]);

    let positiveLetters = true;
    let positiveNumbers = true;
    if (letterPlace(pieceLetter) > letterPlace(kingLetter)) positiveLetters = false;
    if (pieceNumber > kingNumber) positiveNumbers = false;

    const letters = iteration(checkerLocation, positiveLetters);
    const numbers = iteration(checkerLocation, positiveNumbers, false);
    let moves = [];
    for (let i = 0; i < 7 ; i++) {
        if (letters[i] && numbers[i]) {
            const squareId = letters[i] + numbers[i];
            if (kingId !== squareId) moves.push(squareId);
        }
    };
    const querySquares = moves.map((square, index) => ((index + 1 !== moves.length) ? "#" + square + ", " : "#" + square)).join("");
    const movementSquares = querySquares ? qAll(querySquares) : [];
    return movementSquares;
};

const findLinearSquares = (checkerLocation, kingLocation) => {
    const kingId = kingLocation.getAttribute("id");
    const pieceLetter = checkerLocation.split("")[0];
    const pieceNumber = Number(checkerLocation.split("")[1]);
    const kingLetter = kingId.split("")[0];
    const kingNumber = Number(kingId.split("")[1]);
    let horizontallyCheck = (pieceNumber === kingNumber);
    let positive = true;
    if (horizontallyCheck) {
        if (letterPlace(pieceLetter) > letterPlace(kingLetter)) positive = false
    } else {
        if (pieceNumber > kingNumber) positive = false;
    }
    
    let letters = [];
    let numbers = [];
    if (horizontallyCheck) letters = iteration(checkerLocation, positive);
    else numbers = iteration(checkerLocation, positive, false);
    let moves = [];
    for (let i = 0; i < 7 ; i++) {
        if (!horizontallyCheck) {
            if (pieceLetter && numbers[i]) {
                const squareId = pieceLetter + numbers[i];
                if (kingId !== squareId) moves.push(squareId);
            }
        } else {
            if (letters[i] && pieceNumber) {
                const squareId = letters[i] + pieceNumber;
                if (kingId !== squareId) moves.push(squareId);
            }
        }
    };
    const querySquares = moves.map((square, index) => ((index + 1 !== moves.length) ? "#" + square + ", " : "#" + square)).join("");
    const movementSquares = querySquares ? qAll(querySquares) : [];
    return movementSquares;
};

export const hasNoPossibleMoves = (whiteTurn, check, startingPostions, enPeasant) => {
    let cannotMove = [];
    const color = whiteTurn ? "white" : "black";
    const checkingPiece = q(".piece-endmove");
    const checkingPiecePostion = checkingPiece.getAttribute("id");
    const checkingPieceType = checkingPiece.firstChild.getAttribute("piece-type");
    const isWhiteChecking = checkingPieceType.includes("white");
    const king = isWhiteChecking ? q(`[piece-type="black-king"]`) : q(`[piece-type="white-king"]`);

    const checkSquaresWithoutPostion = showPreMoves(checkingPieceType, checkingPiecePostion, [], null, false, king.parentNode, true);
    const checkSquares = [...checkSquaresWithoutPostion, q(`#${checkingPiecePostion}`)];
    [...qAll(`[piece-type^="${color}"]`)].forEach((piece) => {
        const position = piece.parentNode.getAttribute("id");
        const pieceType = piece.getAttribute("piece-type");
        const isStartingPosition = startingPostions.find((sp) => sp.position === position);
        const isFirstMove = isStartingPosition ? isStartingPosition.isFirstMove : false;
        if (position) {
            if (pieceType.includes("pawn")) {
                const pawnHasNoMove = pawnPreMove(pieceType.includes("white"), position, isFirstMove, enPeasant, null, checkSquares, false, true);
                cannotMove.push(pawnHasNoMove);
            }
            if (pieceType.includes("knight")) {
                const knightHasNoMove = knightPreMove(pieceType.includes("white"), position, null, checkSquares, false, true);
                cannotMove.push(knightHasNoMove);
            }
            if (pieceType.includes("bishop")) {
                const bishopHasNoMove = bishopPreMove(pieceType.includes("white"), position, null, false, checkSquares, false, true);
                cannotMove.push(bishopHasNoMove);
            }
            if (pieceType.includes("rook")) {
                const rookHasNoMove = rookPreMove(pieceType.includes("white"), position, null, false, checkSquares, false, true);
                cannotMove.push(rookHasNoMove);
            }
            if (pieceType.includes("queen")) {
                const queenHasNoMove = queenPreMove(pieceType.includes("white"), position, null, false, checkSquares, false, true);
                cannotMove.push(queenHasNoMove);
            }
            if (pieceType.includes("king")) {
                const kingPossibleMoves = kingPreMove(pieceType.includes("white"), position, startingPostions, true);
                if (kingPossibleMoves.length > 0) cannotMove.push(false)
                else cannotMove.push(true)
            }
        }
    });
    
    const hasMove = cannotMove.includes(false);
    return !hasMove;
};

export const connectedWithKing = (type, pieceLocation, isFirstMove) => {
    if (type.includes("king")) return false;
    const isWhite = type.includes("white");
    const king = isWhite ? q(`[piece-type="white-king"]`) : q(`[piece-type="black-king"]`);
    const kingLocation = king.parentNode.getAttribute("id");
    const letter = pieceLocation.split("")[0];
    const number = Number(pieceLocation.split("")[1]);
    const kingLetter = kingLocation.split("")[0];
    const kingNumber = Number(kingLocation.split("")[1]);
    const sameLetter = letter === kingLetter;
    const sameNumber = number === kingNumber;
    const isPawn = type.includes("pawn");
    const diagonalKingInDanger = (squares) => {
        const isOnLine = squares.some((tile) => tile.includes(pieceLocation));
        if (!isOnLine) return false;
        const movement = [];
        squares.forEach((square) => movement.push(q(`#${square}`)));
        const firstPiece = movement.find((square) => square.firstChild);
        const secondPiece = movement.find((square) => (square.firstChild && square !== firstPiece));
        if (!(firstPiece.getAttribute("id") === pieceLocation)) return false;
        if (!secondPiece) return false;
        if (!isOpponent(secondPiece, isWhite)) return false;
        const opponentPawn = secondPiece.firstChild.getAttribute("piece-type");
        const isBishopOrQueen = type.includes("queen") || type.includes("bishop");
        const bishopOrQueen = opponentPawn.includes("queen") || opponentPawn.includes("bishop");
        if (!bishopOrQueen) return false;
        const filteredFirstPiece = movement.filter((square) => square !== firstPiece);
        const index = filteredFirstPiece.findIndex((tile) => tile === secondPiece);
        const slicedMovement = filteredFirstPiece.slice(0, index + 1);
        if (isPawn) {
            const findFirstPieceIndex = movement.findIndex((tile) => tile === firstPiece);
            const sliced = movement.slice(findFirstPieceIndex + 1)[0];
            if (sliced.firstChild) {
                if (sliced.firstChild && isOpponent(sliced, isWhite)) sliced.classList.add("piece-attack");
            }
        }
        if (isBishopOrQueen) {
            slicedMovement.forEach((square) => {
                if (square) {
                    if (square.firstChild && isOpponent(square, isWhite)) square.classList.add("piece-attack");
                    else if (!square.firstChild) square.classList.add("piece-premove");
                }
            });
        }
        return true;
    };
    if (sameLetter) {
        const positiveNumber = number < kingNumber;
        const pawnToKingLenght = Math.abs(number - kingNumber) - 1;
        let isKingOnLine = true;
        if (pawnToKingLenght) {
            const pawnToKingLocations = [];
            for (let i = 1; i <= pawnToKingLenght; i++) {
                const position = positiveNumber ? letter + (number + i) : letter + (kingNumber + i);
                const tile = q(`#${position}`)
                pawnToKingLocations.push(tile);
            }
            isKingOnLine = pawnToKingLocations.every((tile) => !tile.firstChild);
        }
        if (!isKingOnLine) return false;
        // find if first enemy piece is queen/rook
        const pawnToEndLocations = [];
        const pawnToEndLenght = positiveNumber ? number - 1 : 8 - number;
        for (let i = 1; i <= pawnToEndLenght; i++) {
            const position = positiveNumber ? letter + (number - i) : letter + (number + i);
            const tile = q(`#${position}`)
            pawnToEndLocations.push(tile);
        }
        const pawn = pawnToEndLocations.find((tile) => tile.firstChild);
        if (!pawn) return false;
        if (!isOpponent(pawn, isWhite)) return false;
        const opponentPawn = pawn.firstChild.getAttribute("piece-type");
        const isRookOrQueen = type.includes("queen") || type.includes("rook");
        const rookOrQueen = opponentPawn.includes("queen") || opponentPawn.includes("rook");
        const index = pawnToEndLocations.findIndex((tile) => tile.firstChild);
        const pawnToEndLocationsSliced = pawnToEndLocations.slice(0, index + 1);
        if (!rookOrQueen) return false;
        if (isRookOrQueen) {
            pawnToEndLocationsSliced.forEach((square) => {
                if (square.firstChild && isOpponent(square, isWhite)) square.classList.add("piece-attack");
                else if (!square.firstChild) square.classList.add("piece-premove");
            });
        }
        if (isPawn) {
            const plusOneMove = isWhite ? q(`#${letter + (number + 1)}`) : q(`#${letter + (number - 1)}`);
            const collide = plusOneMove && plusOneMove.firstChild;
            if (!collide) {
                if (isFirstMove) {
                    const plusOneOrTwoMove = isWhite
                        ? qAll(`#${letter + (number + 1)}, #${letter + (number + 2)}`)
                        : qAll(`#${letter + (number - 1)}, #${letter + (number - 2)}`);
                    plusOneOrTwoMove.forEach((square) => {
                        if (!square.firstChild) square.classList.add("piece-premove");
                    });
                } else {
                    plusOneMove.classList.add("piece-premove");
                }
            }
        }
        return true;
    }
    if (sameNumber) {
        const positiveLetter = letterPlace(letter) < letterPlace(kingLetter);
        const pawnToKingLenght = Math.abs(letterPlace(letter) - letterPlace(kingLetter)) - 1;
        let isKingOnLine = true;
        if (pawnToKingLenght) {
            const pawnToKingLocations = [];
            for (let i = 1; i <= pawnToKingLenght; i++) {
                const position = positiveLetter ? changeLetter(letter, i, true) + number : changeLetter(kingLetter, i, true) + number;
                const tile = q(`#${position}`);
                pawnToKingLocations.push(tile);
            }
            isKingOnLine = pawnToKingLocations.every((tile) => !tile.firstChild);
        }
        if (!isKingOnLine) return false;
        // find if first enemy piece is queen/rook
        const pawnToEndLocations = [];
        const pawnToEndLenght = positiveLetter ? letterPlace(letter) : 8 - (letterPlace(letter) + 1);
        for (let i = 1; i <= pawnToEndLenght; i++) {
            const position = positiveLetter ? changeLetter(letter, i, false) + number : changeLetter(letter, i, true) + number;
            const tile = q(`#${position}`)
            pawnToEndLocations.push(tile);
        }
        const pawn = pawnToEndLocations.find((tile) => tile.firstChild);
        if (!pawn) return false;
        if (!isOpponent(pawn, isWhite)) return false;
        const opponentPawn = pawn.firstChild.getAttribute("piece-type");
        const isRookOrQueen = type.includes("queen") || type.includes("rook");
        const rookOrQueen = opponentPawn.includes("queen") || opponentPawn.includes("rook");
        const index = pawnToEndLocations.findIndex((tile) => tile.firstChild);
        const pawnToEndLocationsSliced = pawnToEndLocations.slice(0, index + 1);
        if (!rookOrQueen) return false;
        if (isRookOrQueen) {
            pawnToEndLocationsSliced.forEach((square) => {
                if (square.firstChild && isOpponent(square, isWhite)) square.classList.add("piece-attack");
                else if (!square.firstChild) square.classList.add("piece-premove");
            });
        }
        return true;
    }
    //diagonal scenario
    if (!sameLetter && !sameNumber) {
        const positiveNumber = number > kingNumber;
        const positiveLetter = letterPlace(letter) > letterPlace(kingLetter);
        const letterPos = iteration(kingLocation, true);
        const numbersPos = iteration(kingLocation, true, false);
        const letterNeg = iteration(kingLocation, false);
        const numbersNeg = iteration(kingLocation, false, false);
        const addDiagonalSquares = (letters, numbers) => {
            const array = [];
            for (let i = 0; i < 7 ; i++) {
                if (letters[i] && numbers[i]) array.push(letters[i] + numbers[i]);
            }
            return array;
        }
        //up-right
        if (positiveNumber && positiveLetter) {
            const squares1 = addDiagonalSquares(letterPos, numbersPos);
            return diagonalKingInDanger(squares1); 
        }
        //up-left
        else if (positiveNumber && !positiveLetter) {
            const squares3 = addDiagonalSquares(letterNeg, numbersPos);
            return diagonalKingInDanger(squares3);
        }
        //down-right
        else if (!positiveNumber && positiveLetter) {
            const squares2 = addDiagonalSquares(letterPos, numbersNeg);
            return diagonalKingInDanger(squares2);
        }
        //down-left
        else {
            const squares4 = addDiagonalSquares(letterNeg, numbersNeg);
            return diagonalKingInDanger(squares4);  
        }
    }
    return false;
};
