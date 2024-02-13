import React, { useState, useContext, useEffect } from 'react';

// Context ---------------------------
import BoardStateContext from '../../context/boardState/BoardStateContext';

// Utils ------------------------------
import { highlightLegalSquare } from '../../utilites/highlightLegalSquare';
import clearBoardSquareColors from '../../utilites/clearBoardSquareColors';
import useMakeMove from '../../hooks/useMakeMove';

/**
 * Handles displaying the square, and if its light or dark
 * @param {*} param0
 * @returns
 */
function Square({ squareNum, square, children }) {
	const [hoverSquare, setHoverSquare] = useState(false);
	const { makeMove } = useMakeMove();
	const selectedSquare = document.getElementById(`square` + `-` + squareNum);

	const { clickedPiece, dispatchBoardState, legalMovesWhite, legalMovesBlack, rightClickedSquares } = useContext(BoardStateContext);

	// Stying for the square
	const style = {
		backgroundColor: hoverSquare ? 'green' : '',
	};

	// Allows a square to be dropped on
	const allowDrop = e => {
		e.preventDefault();
		setHoverSquare(true);
	};

	/**
	 * Stop highlighting a square when not dragging over it
	 * @param {*} e
	 */
	const dragExit = e => {
		setHoverSquare(false);
		highlightLegalSquare(clickedPiece, legalMovesWhite, legalMovesBlack);
	};

	/**
	 * Handles dropping a piece after dragging it
	 * @param {*} e
	 */
	const drop = e => {
		e.preventDefault();
		let droppedPiece = e.dataTransfer.getData('text');

		const prevSquare = Number(droppedPiece.split('-')[0]);
		const piece = droppedPiece.split('-')[1];
		let newSquare, opponentPiece;

		// when dragging and dropping, when we release on a 'piece', sometimes the target id isn't the square but the piece
		// so we need to go up and get the parent square to find its id
		if (e.target.id.includes('square')) {
			newSquare = Number(e.target.id.split('-')[1]);
		} else {
			newSquare = Number(e.target.parentElement.id.split('-')[1]);
			opponentPiece = e.target.id.split(`-`)[1];
		}

		// Reset hover colors
		setHoverSquare(false);
		makeMove(piece, droppedPiece, newSquare, prevSquare, opponentPiece);
	};

	/**
	 * Handles clicking on an empty square, clears board colors
	 * @param {*} e
	 */
	const squareClick = e => {
		if (e.target.id.includes('square')) clearBoardSquareColors(dispatchBoardState);
	};

	/**
	 * Handles right clicking on a square
	 * @param {*} e
	 */
	const handleRightClick = e => {
		e.preventDefault();

		if (selectedSquare?.classList.contains('right-clicked-square')) {
			selectedSquare.classList.remove('right-clicked-square');
		} else {
			selectedSquare.classList.add('right-clicked-square');
		}
	};

	const addSquareNotation = () => {
		if (squareNum === 0) return <div className="square-num">8</div>;
		if (squareNum === 8) return <div className="square-num">7</div>;
		if (squareNum === 16) return <div className="square-num">6</div>;
		if (squareNum === 24) return <div className="square-num">5</div>;
		if (squareNum === 32) return <div className="square-num">4</div>;
		if (squareNum === 40) return <div className="square-num">3</div>;
		if (squareNum === 48) return <div className="square-num">2</div>;
		if (squareNum === 56) return (<><div className="square-num">1</div> <div className="square-letter">A</div></>); //prettier-ignore
		if (squareNum === 57) return <div className="square-letter">B</div>;
		if (squareNum === 58) return <div className="square-letter">C</div>;
		if (squareNum === 59) return <div className="square-letter">D</div>;
		if (squareNum === 60) return <div className="square-letter">E</div>;
		if (squareNum === 61) return <div className="square-letter">F</div>;
		if (squareNum === 62) return <div className="square-letter">G</div>;
		if (squareNum === 63) return <div className="square-letter">H</div>;
	};

	// Listen for a clicked Piece. Use to show legal moves
	useEffect(() => {
		if (clickedPiece && squareNum === Number(clickedPiece.split('-')[0])) {
			clearBoardSquareColors(dispatchBoardState);

			// Make current selected square blue
			const selectedSquare = document.getElementById(`square-` + squareNum);
			selectedSquare.style.backgroundColor = 'blue';

			// highlight the legal moves for a clicked piece
			highlightLegalSquare(clickedPiece, legalMovesWhite, legalMovesBlack);
		}
	}, [clickedPiece]);

	//---------------------------------------------------------------------------------------------------//
	return (
		<div
			id={`square-` + squareNum}
			className={`square-${square % 2 ? 'dark' : 'light'}`}
			onDrop={e => drop(e)}
			onDragOver={e => allowDrop(e)}
			onDragLeave={e => dragExit(e)}
			style={style}
			onClick={squareClick}
			onContextMenu={e => handleRightClick(e)}
		>
			<div className="square-num">{squareNum}</div>
			{addSquareNotation()}

			{children}
		</div>
	);
}

export default Square;
