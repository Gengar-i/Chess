const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let x = 0;
let y = 0;

//render white border
ctx.beginPath();
ctx.strokeStyle = 'white';
ctx.moveTo(x,y);
ctx.lineTo(x+810,y);
ctx.lineTo(x+810,y+810);
ctx.lineTo(x,y+810);
ctx.lineTo(x,y)
ctx.lineWidth = 10;
ctx.stroke();

//render cheesBoard
x+=5;
y+=5;
for(let i=0; i<8; i++) {  
    for(let j=0; j<8; j++) {
        if(i%2 ===0 && j%2===0) { 
            ctx.fillStyle = 'white'; 
            ctx.fillRect(x+(j*100), y+(i*100), 100, 100);
        }
        else if(i%2 ===0 && j%2===1){
            ctx.fillStyle = '#a16A4B';
            ctx.fillRect(x+(j*100), y+(i*100), 100, 100);
        }
        else if(i%2 ===1 && j%2===1){
            ctx.fillStyle = 'white';
            ctx.fillRect(x+(j*100), y+(i*100), 100, 100);
        }
        else if(i%2 ===1 && j%2===0){
            ctx.fillStyle = '#a16A4B';
            ctx.fillRect(x+(j*100), y+(i*100), 100, 100);
        }
    }
}

// render black pieces
//king
    const bKing = new Image();
    bKing.src = './pieces/black-king.svg';
    bKing.onload = () => {
        ctx.drawImage(bKing, 405, 5, 100, 100);
    };
//queen
    const bQueen = new Image();
    bQueen.src = './pieces/black-queen.svg';
    bQueen.onload = () => {
        ctx.drawImage(bQueen, 305, 5, 100, 100);
    };
//rock
    const bRock = new Image();
    bRock.src = './pieces/black-rock.svg';
    bRock.onload = () => {
        ctx.drawImage(bRock, 5, 5, 100, 100);
        ctx.drawImage(bRock, 705, 5, 100, 100);
    };
//knight
    const bKnight = new Image();
    bKnight.src = './pieces/black-knight.svg';
    bKnight.onload = () => {
        ctx.drawImage(bKnight, 105, 5, 100, 100);
        ctx.drawImage(bKnight, 605, 5, 100, 100);
    };
//bishop
    const bBishop = new Image();
    bBishop.src = './pieces/black-bishop.svg';
    bBishop.onload = () => {
        ctx.drawImage(bBishop, 205, 5, 100, 100);
        ctx.drawImage(bBishop, 505, 5, 100, 100);
    };
//pawn
    const bPawn = new Image();
    bPawn.src = './pieces/black-pawn.svg';
    bPawn.onload = () => {
        for(let i=0; i<8; i++) {
            ctx.drawImage(bPawn, 5+(i*100), 105, 100, 100);
        }
    };


// render white pieces
//king
    const wKing = new Image();
    wKing.src = './pieces/white-king.svg';
    wKing.onload = () => {
        ctx.drawImage(wKing, 405, 705, 100, 100);
    };
//queen
    const wQueen = new Image();
    wQueen.src = './pieces/white-queen.svg';
    wQueen.onload = () => {
        ctx.drawImage(wQueen, 305, 705, 100, 100);
    };
//rock
    const wRock = new Image();
    wRock.src = './pieces/white-rock.svg';
    wRock.onload = () => {
        ctx.drawImage(wRock, 5, 705, 100, 100);
        ctx.drawImage(wRock, 705, 705, 100, 100);
    };
//knight
    const wKnight = new Image();
    wKnight.src = './pieces/white-knight.svg';
    wKnight.onload = () => {
    ctx.drawImage(wKnight, 105, 705, 100, 100);
    ctx.drawImage(wKnight, 605, 705, 100, 100);
    };
//bishop
    const wBishop = new Image();
    wBishop.src = './pieces/white-bishop.svg';
    wBishop.onload = () => {
    ctx.drawImage(wBishop, 205, 705, 100, 100);
    ctx.drawImage(wBishop, 505, 705, 100, 100);
    };
//pawn
    const wPawn = new Image();
    wPawn.src = './pieces/white-pawn.svg';
    wPawn.onload = () => {
        for(let i=0; i<8; i++) {
            ctx.drawImage(wPawn, 5+(i*100), 605, 100, 100);
        }
    };

//handling moving
function animate () {
    wPawn.addEventListener('click', move, false)
}
animate();

function move () {
    console.log('click');
}