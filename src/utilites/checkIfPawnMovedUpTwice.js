import { whitePawnStartingRow, blackPawnStartingRow } from './constants';
import { setEnPassant } from '../context/boardState/BoardStateActions';

/**
 * Handles setting pawn enpassant
 * @param {*} dispatchBoardState
 * @param {*} piece
 * @param {*} prevSquare
 * @param {*} newSquare
 */
const checkIfPawnMovedUpTwice = (dispatchBoardState, piece, prevSquare, newSquare) => {
	if (piece === 'P') {
		if (whitePawnStartingRow.includes(prevSquare) && prevSquare - newSquare === 16) {
			setEnPassant(dispatchBoardState, newSquare);
		} else {
			setEnPassant(dispatchBoardState, '');
		}
	} else if (piece === 'p') {
		if (blackPawnStartingRow.includes(prevSquare) && newSquare - prevSquare === 16) {
			setEnPassant(dispatchBoardState, newSquare);
		} else {
			setEnPassant(dispatchBoardState, '');
		}
	} else {
		setEnPassant(dispatchBoardState, '');
	}
};

export default checkIfPawnMovedUpTwice;
