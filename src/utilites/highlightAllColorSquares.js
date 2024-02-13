const squareColor = '#8c895d';
const squareInnerBorder = '0 0 0rem .8rem rgba(255,255,255,0.5) inset';

const highlightAllColorSquares = colorArr => {
	const setSquareColor = id => {
		const selectedSquare = document.getElementById(id);

		if (selectedSquare) {
			selectedSquare.style.backgroundColor = squareColor;
			selectedSquare.style.boxShadow = squareInnerBorder;
		}
	};

	if (typeof colorArr[0] === 'object') {
		colorArr.map(innerArr => {
			innerArr.map(square => {
				const squareToHighlight = 'square-' + square.split('-')[2];
				setSquareColor(squareToHighlight);
			});
		});
	} else {
		colorArr.map(square => {
			const squareToHighlight = 'square-' + square.split('-')[2];
			setSquareColor(squareToHighlight);
		});
	}
};

export default highlightAllColorSquares;
