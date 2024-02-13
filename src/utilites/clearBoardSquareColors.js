/**
 * Clears all of the board square colors
 */
const clearBoardSquareColors = dispatchBoardState => {
	for (let i = 0; i < 64; i++) {
		const eachSquare = document.getElementById(`square-` + i);
		if (eachSquare) eachSquare.style = '';
	}

	const redSquares = document.getElementsByClassName('right-clicked-square');
	for (let squares = redSquares, i = 0, l = redSquares.length; l > i; i++) {
		squares[0].classList.remove('right-clicked-square');
	}
};

export default clearBoardSquareColors;
