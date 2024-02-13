import React, { useState, useContext } from 'react';
import parsePiece from '../../utilites/parsePiece';
import BoardStateContext from '../../context/boardState/BoardStateContext';
import checkDraggedPieceOwner from '../../utilites/checkDraggedPieceOwner';
import { setClickedPiece } from '../../context/boardState/BoardStateActions';

/**
 * Returns a JSX chess piece
 * @returns
 */
function Piece({ squareNum, piece }) {
	const { whoseTurnIsIt, dispatchBoardState, humanColor } = useContext(BoardStateContext);

	// Handles dragging a piece
	const drag = e => {
		// if (humanColor === whoseTurnIsIt) {
		// 	e.dataTransfer.setData('text', e.target.id);
		// }
		e.dataTransfer.setData('text', e.target.id);
	};

	// Handles clicking a piece
	const pieceClicked = e => {
		if (e.button === 0) setClickedPiece(dispatchBoardState, e.target.id);
	};

	//---------------------------------------------------------------------------------------------------//
	return <img id={squareNum + '-' + piece} src={parsePiece(piece)} className="piece" draggable={checkDraggedPieceOwner(piece, whoseTurnIsIt)} onDragStart={e => drag(e)} onMouseDown={pieceClicked} />;
}

export default Piece;
