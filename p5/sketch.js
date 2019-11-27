let game;
const tileSize = 100;
const whitesMove = true;
const images = [];

function setup() {
    createCanvas(800, 800);
    
    for (let i = 1; i <= 12; i++) {
        images.push(loadImage("assets/Chess_" + i + ".png"));
    }
    game = new Board();
}
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
