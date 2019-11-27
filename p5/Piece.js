class Piece {
  constructor(x, y, isWhite, pic) {
    this.matrixPosition = createVector(x, y);
    this.pixelPosition = createVector(x * tileSize + tileSize /2, y * tileSize + tileSize /2);

    this.taken = false;
    this.isWhite = isWhite;
    this.pic = pic;
    this.movingThisPiece = false;
  }
  //render piece
  show() {
    if (!this.taken) {
      imageMode(CENTER);

      if (this.movingThisPiece) {
        image(this.pic, mouseX, mouseY, tileSize*1.1, tileSize*1.1);
      }
      
      else {
        image(this.pic, this.pixelPosition.x, this.pixelPosition.y, tileSize, tileSize);
      }
    }
  }
  move(x, y) {
    this.matrixPosition = createVector(x, y);
    this.pixelPosition = createVector(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
  }
}

class King extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    if (isWhite) {
      this.pic = images[3];
    }
    else {
      this.pic = images[2];
    }
  }

  clone() {
    const clone = new King(this.matrixPosition.x, this.matrixPosition.y, this.white);
    clone.taken = this.taken;
    return clone;
  }
}

class Queen extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    if (isWhite) {
      this.pic = images[9];
    }
    else {
      this.pic = images[8];
    }
  }

  clone() {
    const clone = new Queen(this.matrixPosition.x, this.matrixPosition.y, this.white);
    clone.taken = this.taken;
    return clone;
  }
}

class Rook extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    if (isWhite) {
      this.pic = images[11];
    }
    else {
      this.pic = images[10];
    }
  }

  clone() {
    const clone = new Rook(this.matrixPosition.x, this.matrixPosition.y, this.white);
    clone.taken = this.taken;
    return clone;
  }
}

class Bishop extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    if (isWhite) {
      this.pic = images[1];
    }
    else {
      this.pic = images[0];
    }
  }

  clone() {
    const clone = new Bishop(this.matrixPosition.x, this.matrixPosition.y, this.white);
    clone.taken = this.taken;
    return clone;
  }
}

class Knight extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    if (isWhite) {
      this.pic = images[5];
    }
    else {
      this.pic = images[4];
    }
  }

  clone() {
    const clone = new Knight(this.matrixPosition.x, this.matrixPosition.y, this.white);
    clone.taken = this.taken;
    return clone;
  }
}

class Pawn extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    if (isWhite) {
      this.pic = images[7];
    }
    else {
      this.pic = images[6];
    }
  }

  clone() {
    const clone = new Pawn(this.matrixPosition.x, this.matrixPosition.y, this.white);
    clone.taken = this.taken;
    return clone;
  }
}