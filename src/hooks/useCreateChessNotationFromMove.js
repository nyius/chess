import { useContext } from 'react';
import BoardStateContext from '../context/boardState/BoardStateContext';
import { setMove } from '../context/boardState/BoardStateActions';
import { chessSquaresNotation } from '../utilites/constants';

const useCreateChessNotationFromMove = () => {
	const { dispatchBoardState, whoseTurnIsIt, blackInCheck, whiteInCheck, capturedPiece } = useContext(BoardStateContext);

	/**
	 * Hanles turning a move into proper chess notation (e4, exd5, Nf3, etc)
	 * @param {*} piece
	 */
	const createNotation = piece => {
		const newSquare = Number(piece.split('-')[2]);
		const previousSquare = Number(piece.split('-')[0]);
		const movedPiece = piece.split(`-`)[1];
		const turn = whoseTurnIsIt === 'w' ? 'b' : 'w';

		if (blackInCheck || whiteInCheck) {
			setMove(dispatchBoardState, chessSquaresNotation[newSquare] + '+', turn);
		} else if (movedPiece === 'P') {
			let moveNotation = chessSquaresNotation[newSquare];

			if (capturedPiece) moveNotation = chessSquaresNotation[previousSquare].split('')[0] + 'x' + moveNotation;
			if (blackInCheck) moveNotation = moveNotation + '+';

			setMove(dispatchBoardState, moveNotation, turn);
		} else if (movedPiece === 'N') {
			let moveNotation = chessSquaresNotation[newSquare];

			// prettier-ignore
			if (capturedPiece) moveNotation = 'N' + 'x' + moveNotation;
			if (!capturedPiece) moveNotation = 'N' + moveNotation;
			if (blackInCheck) moveNotation = moveNotation + '+';

			setMove(dispatchBoardState, moveNotation, turn);
		} else if (movedPiece === 'Q') {
			let moveNotation = chessSquaresNotation[newSquare];

			// prettier-ignore
			if (capturedPiece) moveNotation = 'Q' + 'x' + moveNotation;
			if (!capturedPiece) moveNotation = 'Q' + moveNotation;
			if (blackInCheck) moveNotation = moveNotation + '+';

			setMove(dispatchBoardState, moveNotation, turn);
		} else if (movedPiece === 'R') {
			let moveNotation = chessSquaresNotation[newSquare];

			if (capturedPiece) moveNotation = 'R' + 'x' + moveNotation;
			if (!capturedPiece) moveNotation = 'R' + moveNotation;
			if (blackInCheck) moveNotation = moveNotation + '+';

			setMove(dispatchBoardState, moveNotation, turn);
		} else if (movedPiece === 'B') {
			let moveNotation = chessSquaresNotation[newSquare];

			if (capturedPiece) moveNotation = 'B' + 'x' + moveNotation;
			if (!capturedPiece) moveNotation = 'B' + moveNotation;
			if (blackInCheck) moveNotation = moveNotation + '+';

			setMove(dispatchBoardState, moveNotation, turn);
		} else if (movedPiece === 'K') {
			let moveNotation = chessSquaresNotation[newSquare];

			if (capturedPiece) moveNotation = 'K' + 'x' + moveNotation;
			if (!capturedPiece) moveNotation = 'K' + moveNotation;
			if (previousSquare === 60 && newSquare === 62) moveNotation = moveNotation = `O-O`;
			if (previousSquare === 60 && newSquare === 58) moveNotation = moveNotation = `O-O-O`;

			setMove(dispatchBoardState, moveNotation, turn);
		} else if (movedPiece === 'p') {
			let moveNotation = chessSquaresNotation[newSquare];

			if (capturedPiece) moveNotation = chessSquaresNotation[previousSquare].split('')[0] + 'x' + moveNotation;
			if (blackInCheck) moveNotation = moveNotation + '+';

			setMove(dispatchBoardState, moveNotation, turn);
		} else if (movedPiece === 'n') {
			let moveNotation = chessSquaresNotation[newSquare];

			if (capturedPiece) moveNotation = 'N' + 'x' + moveNotation;
			if (!capturedPiece) moveNotation = 'N' + moveNotation;
			if (blackInCheck) moveNotation = moveNotation + '+';

			setMove(dispatchBoardState, moveNotation, turn);
		} else if (movedPiece === 'q') {
			let moveNotation = chessSquaresNotation[newSquare];

			if (capturedPiece) moveNotation = 'Q' + 'x' + moveNotation;
			if (!capturedPiece) moveNotation = 'Q' + moveNotation;
			if (blackInCheck) moveNotation = moveNotation + '+';

			setMove(dispatchBoardState, moveNotation, turn);
		} else if (movedPiece === 'r') {
			let moveNotation = chessSquaresNotation[newSquare];

			if (capturedPiece) moveNotation = 'R' + 'x' + moveNotation;
			if (!capturedPiece) moveNotation = 'R' + moveNotation;
			if (blackInCheck) moveNotation = moveNotation + '+';

			setMove(dispatchBoardState, moveNotation, turn);
		} else if (movedPiece === 'b') {
			let moveNotation = chessSquaresNotation[newSquare];

			if (capturedPiece) moveNotation = 'B' + 'x' + moveNotation;
			if (!capturedPiece) moveNotation = 'B' + moveNotation;
			if (blackInCheck) moveNotation = moveNotation + '+';

			setMove(dispatchBoardState, moveNotation, turn);
		} else if (movedPiece === 'k') {
			let moveNotation = chessSquaresNotation[newSquare];

			if (capturedPiece) moveNotation = 'K' + 'x' + moveNotation;
			if (!capturedPiece) moveNotation = 'K' + moveNotation;
			if (previousSquare === 4 && newSquare === 6) moveNotation = moveNotation = `O-O`;
			if (previousSquare === 4 && newSquare === 2) moveNotation = moveNotation = `O-O-O`;

			setMove(dispatchBoardState, moveNotation, turn);
		} else {
			setMove(dispatchBoardState, chessSquaresNotation[newSquare], turn);
		}
	};

	return { createNotation };
};

export default useCreateChessNotationFromMove;
