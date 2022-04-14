import { q, qAll, changeLetter, isOpponent } from "../../helpers.js";

export const pawnPreMove = (isWhite, pieceLocation, isFirstMove, enPeasant, kingLocation = null, attack = false) => {
    const letter = pieceLocation.split("")[0];
    const number = Number(pieceLocation.split("")[1]);
    //moves
    const plusOneMove = isWhite ? q(`#${letter + (number + 1)}`) : q(`#${letter + (number - 1)}`);

    //attaks
    const attackIdSquares = [changeLetter(letter, 1, false), changeLetter(letter, 1, true)].filter((letter) => letter.match(/[a-h]/));
    const attackLocationSquares = isWhite
        ? [attackIdSquares[0] + (number + 1), attackIdSquares[1] + (number + 1)] 
        : [attackIdSquares[0] + (number - 1), attackIdSquares[1] + (number - 1)];
    const attackLocation = isWhite
        ? qAll(`#${attackIdSquares[0] + (number + 1)}, #${attackIdSquares[1] + (number + 1)}`)
        : qAll(`#${attackIdSquares[0] + (number - 1)}, #${attackIdSquares[1] + (number - 1)}`);
    if (kingLocation) return attackLocation.some((square) => square === kingLocation);
    if (attack) return attackLocation;
    const enPeasantSquare = enPeasant ? q(`#${enPeasant[1]}`) : null;
    if (attackLocation.some((a) => a.hasChildNodes() && isOpponent(a, isWhite) || a === enPeasantSquare)) {
        attackLocation.forEach((square) => {
            if (square.hasChildNodes() || square === enPeasantSquare) {
                if (kingLocation && square === kingLocation) check = true;
                square.classList.add("piece-attack");
            }
        });
    }
    const collide = plusOneMove && plusOneMove.firstChild;
    if (!collide) {
        if (isFirstMove) {
            const plusOneOrTwoMove = isWhite
                ? qAll(`#${letter + (number + 1)}, #${letter + (number + 2)}`)
                : qAll(`#${letter + (number - 1)}, #${letter + (number - 2)}`);
            plusOneOrTwoMove.forEach((square) => square.classList.add("piece-premove"));
        } else {
            plusOneMove.classList.add("piece-premove");
        }
    }
};