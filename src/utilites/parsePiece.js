import BlackQueen from '../assets/bq.svg';
import BlackKing from '../assets/bk.svg';
import BlackRook from '../assets/br.svg';
import BlackKnight from '../assets/bn.svg';
import BlackBishop from '../assets/bb.svg';
import BlackPawn from '../assets/bp.svg';
import WhiteQueen from '../assets/wq.svg';
import WhiteKing from '../assets/wk.svg';
import WhiteRook from '../assets/wr.svg';
import WhiteKnight from '../assets/wn.svg';
import WhiteBishop from '../assets/wb.svg';
import WhitePawn from '../assets/wp.svg';

/**
 * Handles reading the fen and returning the pieces to the context
 * @param {*} fen
 */
const parsePiece = piece => {
	// No spaces yet means we are setting up the board
	if (piece === 'r') {
		return BlackRook;
	} else if (piece === 'n') {
		return BlackKnight;
	} else if (piece === 'p') {
		return BlackPawn;
	} else if (piece === 'q') {
		return BlackQueen;
	} else if (piece === 'k') {
		return BlackKing;
	} else if (piece === 'b') {
		return BlackBishop;
	} else if (piece === 'R') {
		return WhiteRook;
	} else if (piece === 'N') {
		return WhiteKnight;
	} else if (piece === 'P') {
		return WhitePawn;
	} else if (piece === 'Q') {
		return WhiteQueen;
	} else if (piece === 'K') {
		return WhiteKing;
	} else if (piece === 'B') {
		return WhiteBishop;
	}
	// else if (!isNaN(Number(piece)) && piece !== ' ') {
	// 	for (let j = 0; j < Number(piece); j++) {
	// 		dispatchBoardState({
	// 			type: 'CREATE_BOARD',
	// 			payload: ' ',
	// 		});
	// 	}
	// }
};

export default parsePiece;
