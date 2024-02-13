import { pawnValue, kingValue, rookValue, queenValue, bishopValue, knightValue } from '../utilites/constants';

const checkPieceValue = piece => {
	if (piece === 'p' || piece === 'P') return pawnValue;
	if (piece === 'k' || piece === 'K') return kingValue;
	if (piece === 'r' || piece === 'R') return rookValue;
	if (piece === 'q' || piece === 'Q') return queenValue;
	if (piece === 'b' || piece === 'B') return bishopValue;
	if (piece === 'n' || piece === 'N') return bishopValue;
	if (piece === ' ') return 0;
	else return 0;
};

export default checkPieceValue;
