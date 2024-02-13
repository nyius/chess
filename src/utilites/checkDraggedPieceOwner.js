/**
 * Takes in a piece, and the turn, and returns if it's that pieces owners turn
 * @param {*} draggedPiece
 * @param {*} whoseTurnIsIt
 * @returns
 */
const checkDraggedPieceOwner = (draggedPiece, whoseTurnIsIt) => {
	// If the piece is lowercase, its blacks. if not, its white
	if (draggedPiece === draggedPiece.toLowerCase()) {
		if (whoseTurnIsIt === 'b') {
			return true;
		} else {
			return false;
		}
	} else {
		if (whoseTurnIsIt === 'w') {
			return true;
		} else {
			return false;
		}
	}
};

export default checkDraggedPieceOwner;
