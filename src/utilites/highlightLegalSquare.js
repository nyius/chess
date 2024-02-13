import { checkIfWhite, checkIfBlack } from './checkPieceOwner';
const legalSquareColor = '#819ba6';
const legalSquareInnerBorder = '0 0 0rem .8rem rgba(255,255,255,0.5) inset';

export const highlightLegalSquare = (clickedPiece, legalMovesWhite, legalMovesBlack) => {
	const setSquareColor = id => {
		const selectedSquare = document.getElementById(id);

		if (selectedSquare) {
			selectedSquare.style.backgroundColor = legalSquareColor;
			selectedSquare.style.boxShadow = legalSquareInnerBorder;
		}
	};

	// White
	if (checkIfWhite(clickedPiece)) {
		legalMovesWhite.map(move => {
			const legalMove = move.split(`-`)[0] + `-` + move.split(`-`)[1];

			if (legalMove === clickedPiece) {
				const squareToHighlight = 'square-' + move.split('-')[2];
				setSquareColor(squareToHighlight);
			}
		});
	}

	// Black
	if (checkIfBlack(clickedPiece)) {
		legalMovesBlack.map(move => {
			const legalMove = move.split(`-`)[0] + `-` + move.split(`-`)[1];

			if (legalMove === clickedPiece) {
				const squareToHighlight = 'square-' + move.split('-')[2];
				setSquareColor(squareToHighlight);
			}
		});
	}
};
