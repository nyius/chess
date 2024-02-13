import { useContext } from 'react';
import BoardStateContext from '../context/boardState/BoardStateContext';

import checkIfLegalMove from '../utilites/checkIfLegalMove';
import checkIfMoveWasCastle from '../utilites/checkIfMoveWasCastle';
import checkIfPawnMovedUpTwice from '../utilites/checkIfPawnMovedUpTwice';
import clearBoardSquareColors from '../utilites/clearBoardSquareColors';
import checkIfEnPassantCapture from '../utilites/checkIfEnPassantCapture';

import moveAudio from '../assets/audio/move.wav';

import {
	setChangeTurns,
	setCapturedPiece,
	setPreviousMove,
	setWhiteLeftRookMoved,
	setWhiteRightRookMoved,
	setBlackLeftRookMoved,
	setBlackRightRookMoved,
	setResetClickedPiece,
	setWhiteKingMoved,
	setBlackKingMoved,
} from '../context/boardState/BoardStateActions';

const useMakeMove = () => {
	const { dispatchBoardState, legalMovesWhite, legalMovesBlack, enPassant, boardPieces, whoseTurnIsIt, blackLeftRookMoved, blackRightRookMoved, whiteLeftRookMoved, whiteRightRookMoved, whiteKingMoved, blackKingMoved } =
		useContext(BoardStateContext);

	const movePieceAudio = new Audio(moveAudio);
	movePieceAudio.volume = 0.3;

	/**
	 * Handles making a move
	 * @param {*} piece
	 * @param {*} droppedPiece
	 * @param {*} newSquare
	 * @param {*} prevSquare
	 */
	const makeMove = (piece, droppedPiece, newSquare, prevSquare, opponentPiece) => {
		// Check if the square we drop on is one of our legal moves
		if (checkIfLegalMove(droppedPiece, newSquare, legalMovesWhite, legalMovesBlack)) {
			// Check if the piece was dropped on its starting square (in that case do nothing)
			if (newSquare !== prevSquare) {
				// Play move audio
				movePieceAudio.play();

				checkIfMoveWasCastle(dispatchBoardState, piece, prevSquare, newSquare);

				// If a pawn moved twice, it becomes vulnerable to enpassant
				checkIfPawnMovedUpTwice(dispatchBoardState, piece, prevSquare, newSquare);

				// check if a pawn was captured VIA en passant
				checkIfEnPassantCapture(dispatchBoardState, piece, prevSquare, newSquare, enPassant);

				// Set the move
				setPreviousMove(dispatchBoardState, piece, newSquare, prevSquare, opponentPiece);

				// Set captured piece (if there was one)
				setCapturedPiece(dispatchBoardState, boardPieces[newSquare]);

				// Change turns
				setChangeTurns(dispatchBoardState, whoseTurnIsIt);

				// Rest the clicked piece
				setResetClickedPiece(dispatchBoardState);

				// Clear any board colors
				clearBoardSquareColors(dispatchBoardState);

				const newSquareEl = document.getElementById(`square` + `-` + prevSquare);
				const prevSquareEl = document.getElementById(`square` + `-` + newSquare);
				const newSquareElClass = document.getElementsByClassName(`new-square`);
				const prevSquareElClass = document.getElementsByClassName(`prev-square`);

				for (let squares = newSquareElClass, i = 0, l = newSquareElClass.length; l > i; i++) {
					squares[0].classList.remove('new-square');
				}

				for (let squares = prevSquareElClass, i = 0, l = prevSquareElClass.length; l > i; i++) {
					squares[0].classList.remove('prev-square');
				}

				newSquareEl.classList.add('new-square');
				prevSquareEl.classList.add('prev-square');

				// If it was a rooks first move, set that state (no longer able to castle that side)
				if (piece === 'r' && prevSquare === 0 && !blackLeftRookMoved) {
					setBlackLeftRookMoved(dispatchBoardState);
				}
				if (piece === 'r' && prevSquare === 7 && !blackRightRookMoved) {
					setBlackRightRookMoved(dispatchBoardState);
				}
				if (piece === 'R' && prevSquare === 56 && !whiteLeftRookMoved) {
					setWhiteLeftRookMoved(dispatchBoardState);
				}
				if (piece === 'R' && prevSquare === 63 && !whiteRightRookMoved) {
					setWhiteRightRookMoved(dispatchBoardState);
				}
				if (piece === 'K' && !whiteKingMoved) {
					setWhiteKingMoved(dispatchBoardState);
				}
				if (piece === 'k' && !blackKingMoved) {
					setBlackKingMoved(dispatchBoardState);
				}

				// Recreate fen from boardPieces array
			}
		}
	};

	return { makeMove };
};

export default useMakeMove;
