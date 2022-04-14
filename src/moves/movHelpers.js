import { q, qAll, changeLetter, isOpponent } from "../../helpers.js";
import { showPreMoves } from "../moves.js";

const iteration = (array, pieceLocation, increment = true, letterson = true) => {
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

const addMoves = (squares1, squares2, squares3, squares4, isWhite, kingLocation, attack) => {
    const squares = [...squares1, ...squares2, ...squares3, ...squares4];
    const querySquares = squares.map((square, index) => ((index + 1 !== squares.length) ? "#" + square + ", " : "#" + square)).join("");
    const movementSquares = querySquares ? qAll(querySquares) : [];
    if (kingLocation) return movementSquares.some((square) => square === kingLocation);
    if (attack) return movementSquares;
    movementSquares.forEach((square) => {
        if (square.firstChild && isOpponent(square, isWhite)) square.classList.add("piece-attack");
        else if (!square.firstChild) square.classList.add("piece-premove");
    });
};

export const diagonalMovement = (isWhite, pieceLocation, kingLocation, attack) => {
    const addDiagonalSquares = (array, letters, numbers) => {
        for (let i = 0; i < 7 ; i++) {
            if (letters[i] && numbers[i]) array.push(letters[i] + numbers[i]);
        }
        const findenIndexen = array.findIndex((tile) => {
            const tilemans = q(`#${tile}`);
            return tilemans.firstChild;
        });
        if (findenIndexen !== -1) {
            const oponent = isOpponent(q(`#${array[findenIndexen]}`), isWhite);
            return oponent ? array.slice(0, findenIndexen + 1) : array.slice(0, findenIndexen);
        }
        return array;
    };
    let numbersPos = [];
    let numbersNeg = [];
    let letterPos = [];
    let letterNeg = [];
    letterPos = iteration(letterPos, pieceLocation, true);
    numbersPos = iteration(numbersPos, pieceLocation, true, false);
    letterNeg = iteration(letterNeg, pieceLocation, false);
    numbersNeg = iteration(numbersNeg, pieceLocation, false, false);
    let squares1 = [];
    let squares2 = [];
    let squares3 = [];
    let squares4 = [];
    squares1 = addDiagonalSquares(squares1, letterPos, numbersPos);
    squares2 = addDiagonalSquares(squares2, letterPos, numbersNeg);
    squares3 = addDiagonalSquares(squares3, letterNeg, numbersPos);
    squares4 = addDiagonalSquares(squares4, letterNeg, numbersNeg);
    kingLocation, attack
    return addMoves(squares1, squares2, squares3, squares4, isWhite, kingLocation, attack);
};

export const linearMovement = (isWhite, pieceLocation, kingLocation, attack) => {
    const letter = pieceLocation.split("")[0];
    const number = Number(pieceLocation.split("")[1]);
    const addLinearSquares = (array, iterableArr, char, positive = true) => {
        for (let i = 0; i < 7 ; i++) {
            if(isNaN(char)) {
                if (char && iterableArr[i]) array.push(char + iterableArr[i]);
            } else {
                if (iterableArr[i] && char) array.push(iterableArr[i] + char);
            }
        }
        const findenIndexen = array.findIndex((tile) => {
            const tilemans = q(`#${tile}`);
            return tilemans.firstChild;
        });
        if (findenIndexen !== -1) {
            const oponent = isOpponent(q(`#${array[findenIndexen]}`), isWhite);
            return oponent ? array.slice(0, findenIndexen + 1) : array.slice(0, findenIndexen);
        }
        return array;
    };
    let numbersPos = [];
    let numbersNeg = [];
    let letterPos = [];
    let letterNeg = [];
    letterPos = iteration(letterPos, pieceLocation, true);
    numbersPos = iteration(numbersPos, pieceLocation, true, false);
    letterNeg = iteration(letterNeg, pieceLocation, false);
    numbersNeg = iteration(numbersNeg, pieceLocation, false, false);
    let squares1 = [];
    let squares2 = [];
    let squares3 = [];
    let squares4 = [];
    squares1 = addLinearSquares(squares1, numbersPos, letter); //up
    squares2 = addLinearSquares(squares2, letterPos, number); //right
    squares3 = addLinearSquares(squares3, numbersNeg, letter, false); //bottom
    squares4 = addLinearSquares(squares4, letterNeg, number, false); //left
    return addMoves(squares1, squares2, squares3, squares4, isWhite, kingLocation, attack);
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