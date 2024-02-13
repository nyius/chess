import { setCastleMove, setUpdateBoard } from '../context/boardState/BoardStateActions';

const checkIfMoveWasCastle = (dispatchBoardState, piece, prevSquare, newSquare, whiteKingMoved, blackKingMoved) => {
	// If it was a king, check if we are castling
	if (piece === 'K' && !whiteKingMoved) {
		if (prevSquare === 60 && newSquare === 62) {
			setCastleMove(dispatchBoardState, prevSquare, newSquare, piece, 'K');
		} else if (prevSquare === 60 && newSquare === 58) {
			setCastleMove(dispatchBoardState, prevSquare, newSquare, piece, 'Q');
		} else {
			// Recreate boardPieces Array
			setUpdateBoard(dispatchBoardState, prevSquare, newSquare, piece);
		}
	} else if (piece === 'k' && !blackKingMoved) {
		if (prevSquare === 4 && newSquare === 6) {
			setCastleMove(dispatchBoardState, prevSquare, newSquare, piece, 'k');
		} else if (prevSquare === 4 && newSquare === 2) {
			setCastleMove(dispatchBoardState, prevSquare, newSquare, piece, 'q');
		} else {
			// Recreate boardPieces Array
			setUpdateBoard(dispatchBoardState, prevSquare, newSquare, piece);
		}
	} else {
		// Recreate boardPieces Array
		setUpdateBoard(dispatchBoardState, prevSquare, newSquare, piece);
	}
};

export default checkIfMoveWasCastle;
