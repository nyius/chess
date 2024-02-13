class PieceCl {
	constructor(movements, infiniteMove, canMoveVertical, canMoveHorizontal, canMoveDiagonal, canCheckKing, canProtectPieces, canMoveBackwards, canEnPassant, canCastle) {
		this.movements = movements;
		this.infiniteMove = infiniteMove;
		this.canMoveVertical = canMoveVertical;
		this.canMoveHorizontal = canMoveHorizontal;
		this.canMoveDiagonal = canMoveDiagonal;
		this.canCheckKing = canCheckKing;
		this.canProtectPieces = canProtectPieces;
		this.canMoveBackwards = canMoveBackwards;
		this.canEnPassant = canEnPassant;
		this.canCastle = canCastle;
	}

	test = () => {
		console.log(`hi`);
	};
}

export default PieceCl;
