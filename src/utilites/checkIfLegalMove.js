import { checkIfWhite, checkIfBlack } from './checkPieceOwner';
/**
 * When dropping a piece, this checks if the square it's bring dropped to is legal (returns true if it is)
 * @param {*} piece takes in a piece (like 36-p, 0-r, etc)
 * @param {*} newSquare takes in the square we drop on (num 18,2,63, etc)
 * @param {*} legalMovesWhite takes in the array with all whites legal moves
 * @param {*} legalMovesBlack takes in the array with all blacks legal moves
 * @returns
 */
const checkIfLegalMove = (piece, newSquare, legalMovesWhite, legalMovesBlack) => {
	const droppedPiece = piece + '-' + newSquare;
	const pieceName = piece.split('-')[1];

	if (checkIfWhite(pieceName)) {
		let legal;
		legalMovesWhite.map(move => {
			const legalMove = move.split(`-`)[0] + '-' + move.split(`-`)[1] + `-` + move.split(`-`)[2];

			if (legalMove === droppedPiece) {
				legal = true;
				return;
			}
		});
		return legal;
	}

	if (checkIfBlack(pieceName)) {
		let legal;
		legalMovesBlack.map(move => {
			const legalMove = move.split(`-`)[0] + '-' + move.split(`-`)[1] + `-` + move.split(`-`)[2];

			if (legalMove === droppedPiece) {
				legal = true;
				return;
			}
		});
		return legal;
	}
};

export default checkIfLegalMove;
