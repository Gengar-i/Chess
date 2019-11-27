const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let x = 0;
let y = 0;

//render white border
ctx.beginPath();
ctx.strokeStyle = 'white';
ctx.moveTo(x,y);
ctx.lineTo(x+815,y);
ctx.lineTo(x+815,y+81);
ctx.lineTo(x,y+820);
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
// piece class
class Piece {
    constructor(x,y,src) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = src;
    }
    draw() {
        this.image.onload = () => {
            ctx.drawImage(this.image, this.x, this.y, 100, 100);
        };
    }
}

//render black pieces
const bKing = new Piece(405, 5,'./pieces/black-king.svg');
bKing.draw();
const bQueen = new Piece(305, 5,'./pieces/black-queen.svg');
bQueen.draw();
const bRock1 = new Piece(5, 5,'./pieces/black-rock.svg');
bRock1.draw();
const bRock2 = new Piece(705, 5,'./pieces/black-rock.svg');
bRock2.draw();
const bKnight1 = new Piece(105, 5,'./pieces/black-knight.svg');
bKnight1.draw();
const bKnight2 = new Piece(605, 5,'./pieces/black-knight.svg');
bKnight2.draw();
const bBishop1 = new Piece(205, 5,'./pieces/black-bishop.svg');
bBishop1.draw();
const bBishop2 = new Piece(505, 5,'./pieces/black-bishop.svg');
bBishop2.draw();
const bPawn1 = new Piece(5, 105,'./pieces/black-pawn.svg');
bPawn1.draw();
const bPawn2 = new Piece(105, 105,'./pieces/black-pawn.svg');
bPawn2.draw();
const bPawn3 = new Piece(205, 105,'./pieces/black-pawn.svg');
bPawn3.draw();
const bPawn4 = new Piece(305, 105,'./pieces/black-pawn.svg');
bPawn4.draw();
const bPawn5 = new Piece(405, 105,'./pieces/black-pawn.svg');
bPawn5.draw();
const bPawn6 = new Piece(505, 105,'./pieces/black-pawn.svg');
bPawn6.draw();
const bPawn7 = new Piece(605, 105,'./pieces/black-pawn.svg');
bPawn7.draw();
const bPawn8 = new Piece(705, 105,'./pieces/black-pawn.svg');
bPawn8.draw();

// render white pieces
const wKing = new Piece(405, 705,'./pieces/white-king.svg');
wKing.draw();
const wQueen = new Piece(305, 705,'./pieces/white-queen.svg');
wQueen.draw();
const wRock1 = new Piece(5, 705,'./pieces/white-rock.svg');
wRock1.draw();
const wRock2 = new Piece(705, 705,'./pieces/white-rock.svg');
wRock2.draw();
const wKnight1 = new Piece(105, 705,'./pieces/white-knight.svg');
wKnight1.draw();
const wKnight2 = new Piece(605, 705,'./pieces/white-knight.svg');
wKnight2.draw();
const wBishop1 = new Piece(205, 705,'./pieces/white-bishop.svg');
wBishop1.draw();
const wBishop2 = new Piece(505, 705,'./pieces/white-bishop.svg');
wBishop2.draw();
const wPawn1 = new Piece(5, 605,'./pieces/white-pawn.svg');
wPawn1.draw();
const wPawn2 = new Piece(105, 605,'./pieces/white-pawn.svg');
wPawn2.draw();
const wPawn3 = new Piece(205, 605,'./pieces/white-pawn.svg');
wPawn3.draw();
const wPawn4 = new Piece(305, 605,'./pieces/white-pawn.svg');
wPawn4.draw();
const wPawn5 = new Piece(405, 605,'./pieces/white-pawn.svg');
wPawn5.draw();
const wPawn6 = new Piece(505, 605,'./pieces/white-pawn.svg');
wPawn6.draw();
const wPawn7 = new Piece(605, 605,'./pieces/white-pawn.svg');
wPawn7.draw();
const wPawn8 = new Piece(705, 605,'./pieces/white-pawn.svg');
wPawn8.draw();

//getting position
canvas.addEventListener('click', move, false)
const cLeft = canvas.offsetLeft;
const cTop = canvas.offsetTop;


// handling pieces moving 
function move(event) {
    const posx = event.pageX - cLeft;
    const posy = event.pageY - cTop;
    console.log(x,y);
    if(posx >= this.x && posy >= this.y && posx <= this.x && posy <= this.y) {
        console.log('doesnt work')
    }
}



