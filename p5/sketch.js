let game;
const tileSize = 100;
const images = [];

//initile only onces
function setup() {
    createCanvas(800, 800);
    
    for (let i = 1; i <= 12; i++) {
        images.push(loadImage("assets/Chess_" + i + ".png"));
    }
    game = new Board();
    console.log(game.whitePieces[0].matrixPosition.x)
    console.log(game.whitePieces[0].matrixPosition.y)
    console.log(game.whitePieces)
    
}
//drawing all the time.
function draw() {
    background('#555');
    showGrid();
    drawBoarding();
    game.show();

}
function drawBoarding () {
    stroke('#a16A4B');
    line(0,0,800,0);
    line(0,0,0,800);
    line(800,0,800,800);
    line(0,800,800,800);
}
//rendeing chessboard
function showGrid() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 == 1) {
            fill('#a16A4B');
        } 
        else {
            fill(360);
        }
        noStroke();
        rect(i * tileSize, j * tileSize, tileSize, tileSize);

    }
  }
}
//variables for moving
let moving = false;
let movingPiece;
let whitesMove = true;

//moving pieces
function mousePressed() {
    let x = floor(mouseX / tileSize);
    let y = floor(mouseY / tileSize);
    if(!game.gameOver()) {
        if (!moving) {
            movingPiece = game.getPieceAt(x,y);
            if(game.isPieceAt(x,y)) {
                // getting array with white or black pieces
                movingPiece.movingThisPiece = true;
            }
        }
        else {
            //moving piece
            movingPiece.move(x,y);
            movingPiece.movingThisPiece = false;
        }
        //reset moving
        moving = !moving;
    }
}