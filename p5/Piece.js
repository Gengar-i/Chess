class Piece {
  constructor(x, y, isWhite, pic) {
    this.matrixPosition = createVector(x, y);
    this.pixelPosition = createVector(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);

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
  generateNewBoards(currentBoard) {
    const boards = []; //all boards created from moving this piece
    const moves = this.generateMoves(currentBoard); //all the posible moves this piece can do ,as vectors
    for (let i = 0; i < moves.length; i++) { //for each move
      boards[i] = currentBoard.clone(); //create a new board
      boards[i].move(this.matrixPosition, moves[i]); //move this piece to the mvoe location
    }
    return boards;
  } 
  withinBounds(x, y) {
    if (x >= 0 && y >= 0 && x < 8 && y < 8) {
      return true;
    }
    return false;
  }
  move(x, y, board) {
    const attacking = board.getPieceAt(x, y);
    if (attacking != null) {
      attacking.taken = true;
    }
    this.matrixPosition = createVector(x, y);
    this.pixelPosition = createVector(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);
  }
  attackingAllies(x, y, board) {
    const attacking = board.getPieceAt(x, y);
    if (attacking != null) {
      if (attacking.white == this.white) {
        return true;
      }
    }
    return false;
  }
  canMove(x, y) {
    if (!this.withinBounds(x, y)) {
      return false;
    }
    return true;
  }
  moveThroughPieces(x, y, board) {
    let stepDirectionX = x - this.matrixPosition.x;
    if (stepDirectionX > 0) {
      stepDirectionX = 1;
    } else if (stepDirectionX < 0) {
      stepDirectionX = -1;
    }
    let stepDirectionY = y - this.matrixPosition.y;
    if (stepDirectionY > 0) {
      stepDirectionY = 1;
    } else if (stepDirectionY < 0) {
      stepDirectionY = -1;
    }
    let tempPos = createVector(this.matrixPosition.x, this.matrixPosition.y);
    tempPos.x += stepDirectionX;
    tempPos.y += stepDirectionY;
    while (tempPos.x != x || tempPos.y != y) {

      if (board.getPieceAt(tempPos.x, tempPos.y) != null) {
        return true;
      }
      tempPos.x += stepDirectionX;
      tempPos.y += stepDirectionY;
    }

    return false;
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

//moving pieces

