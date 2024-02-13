import { setEnPassantCapture } from '../context/boardState/BoardStateActions';

/**
 * Handles capturing a piece VIA enpassant
 * @param {*} dispatchBoardState
 * @param {*} piece
 * @param {*} prevSquare
 * @param {*} newSquare
 * @param {*} enPassant
 */
const checkIfEnPassantCapture = (dispatchBoardState, piece, prevSquare, newSquare, enPassant) => {
	if (
		piece === 'P' &&
		(newSquare === prevSquare - 7 || newSquare === prevSquare - 9) &&
		newSquare === enPassant - 8
	) {
		setEnPassantCapture(dispatchBoardState, enPassant);
	} else if (
		piece === 'p' &&
		(newSquare === prevSquare + 7 || newSquare === prevSquare + 9) &&
		newSquare === enPassant + 8
	) {
		setEnPassantCapture(dispatchBoardState, enPassant);
	}
};

export default checkIfEnPassantCapture;
