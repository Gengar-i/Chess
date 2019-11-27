class Board {
    constructor() {
        this.whitePieces = [];
        this.blackPieces = [];
        this.setupPieces();
    }
    
    setupPieces() { 
    //white pieces
        this.whitePieces.push(new King(4, 7, true));
        this.whitePieces.push(new Queen(3, 7, true));
        this.whitePieces.push(new Bishop(2, 7, true));
        this.whitePieces.push(new Bishop(5, 7, true));
        this.whitePieces.push(new Knight(1, 7, true));
        this.whitePieces.push(new Knight(6, 7, true));
        this.whitePieces.push(new Rook(0, 7, true));
        this.whitePieces.push(new Rook(7, 7, true));
        this.whitePieces.push(new Pawn(4, 6, true));
        this.whitePieces.push(new Pawn(3, 6, true));
        this.whitePieces.push(new Pawn(2, 6, true));
        this.whitePieces.push(new Pawn(5, 6, true));
        this.whitePieces.push(new Pawn(1, 6, true));
        this.whitePieces.push(new Pawn(0, 6, true));
        this.whitePieces.push(new Pawn(6, 6, true));
        this.whitePieces.push(new Pawn(7, 6, true));
    
    // //black pieces
        this.blackPieces.push(new King(4, 0, false));
        this.blackPieces.push(new Queen(3, 0, false));
        this.blackPieces.push(new Bishop(2, 0, false));
        this.blackPieces.push(new Bishop(5, 0, false));
        this.blackPieces.push(new Knight(1, 0, false));
        this.blackPieces.push(new Knight(6, 0, false));
        this.blackPieces.push(new Rook(0, 0, false));
        this.blackPieces.push(new Rook(7, 0, false));
        this.blackPieces.push(new Pawn(4, 1, false));
        this.blackPieces.push(new Pawn(3, 1, false));
        this.blackPieces.push(new Pawn(2, 1, false));
        this.blackPieces.push(new Pawn(5, 1, false));
        this.blackPieces.push(new Pawn(1, 1, false));
        this.blackPieces.push(new Pawn(0, 1, false));
        this.blackPieces.push(new Pawn(6, 1, false));
        this.blackPieces.push(new Pawn(7, 1, false));  
}
    
    show() {
        for (let i = 0; i < this.whitePieces.length; i++) {
            this.whitePieces[i].show();
        }
        for (let i = 0; i < this.blackPieces.length; i++) {
            this.blackPieces[i].show();
        }
    }
    
    isPieceAt(x, y) {
        for (let i = 0; i < this.whitePieces.length; i++) {
          if (!this.whitePieces[i].taken && this.whitePieces[i].matrixPosition.x == x && this.whitePieces[i].matrixPosition.y == y) {
            return true;
          }
        }
        for (let i = 0; i < this.blackPieces.length; i++) {
          if (!this.blackPieces[i].taken && this.blackPieces[i].matrixPosition.x == x && this.blackPieces[i].matrixPosition.y == y) {
            return true;
          }
        }
        return false;
      }
    
    getPieceAt(x, y) {
        for (let i = 0; i < this.whitePieces.length; i++) {
          if (!this.whitePieces[i].taken && this.whitePieces[i].matrixPosition.x == x && this.whitePieces[i].matrixPosition.y == y) {
            return this.whitePieces[i];
          }
        }
        for (var i = 0; i < this.blackPieces.length; i++) {
          if (!this.blackPieces[i].taken && this.blackPieces[i].matrixPosition.x == x && this.blackPieces[i].matrixPosition.y == y) {
            return this.blackPieces[i];
          }
        }
        return null;
    }
    move(from, to) {
      let pieceToMove = this.getPieceAt(from.x, from.y);
      if (pieceToMove === null) {
        //"dupa";
        return;
      }
      pieceToMove.move(to.x, to.y, this);
    }
    clone() {
        const clone = new Board();
        for (let i = 0; i < this.whitePieces.length; i++) {
          clone.whitePieces[i] = this.whitePieces[i].clone();
        }
        for (let i = 0; i < this.blackPieces.length; i++) {
          clone.blackPieces[i] = this.blackPieces[i].clone();
        }
        return clone;
    }
}
