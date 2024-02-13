import { centerSquares, centerSquaresFlank, centerSquaresValue, centerFlankSquaresValue } from './constants';
const checkSquareValue = square => {
	if (centerSquares.includes(square)) return centerSquaresValue;
	if (centerSquaresFlank.includes(square)) return centerFlankSquaresValue;
	return 1;
};

export default checkSquareValue;
