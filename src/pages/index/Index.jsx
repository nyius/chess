import React, { useEffect, useState, useContext } from 'react';

// Utils
import ParseFEN from '../../utilites/parseFEN';
import highlightAllColorSquares from '../../utilites/highlightAllColorSquares';
import clearBoardSquareColors from '../../utilites/clearBoardSquareColors';
import resetGame from '../../utilites/resetGame';

// Hooks
import useCreateChessNotationFromMove from '../../hooks/useCreateChessNotationFromMove';
import useCalculateMoves from '../../hooks/useCalculateMoves';
import useMakeAiMove from '../../hooks/useMakeAiMove';
import useMakeMove from '../../hooks/useMakeMove';

// Context
import BoardStateContext from '../../context/boardState/BoardStateContext';
import { setTurnNum } from '../../context/boardState/BoardStateActions';

// Components
import Square from '../../components/square/Square';
import Piece from '../../components/piece/Piece';

function Index() {
	const {
		fen,
		boardPieces,
		whoseTurnIsIt,
		dispatchBoardState,
		whiteCastle,
		blackCastle,
		gameMoves,
		allMovesWhite,
		allMovesBlack,
		piecesCheckingWhite,
		piecesCheckingBlack,
		piecesLookingAtWhiteKing,
		piecesLookingAtBlackKing,
		legalMovesWhite,
		legalMovesBlack,
		previousMove,
		evaluation,
		whitePieceCount,
		blackPieceCount,
	} = useContext(BoardStateContext);
	const [squares, setSquares] = useState([]);

	const { calculateMoves } = useCalculateMoves();
	const { createNotation } = useCreateChessNotationFromMove();
	const { makeAiMove } = useMakeAiMove();

	/**
	 * Handles creating the squares on the board
	 * @returns
	 */
	const createSquares = () => {
		const squares = [];
		let count = 0;

		for (let i = 1; i < 65; i++) {
			squares.push(count);

			// because the chessboard alternates colors each row, we can't just go light, dark, light dark
			// at the beginning of each row, it copies the color from the end of the previous row
			if (i % 8 == 0 && i > 1) {
				count += 2;
			} else {
				count++;
			}
		}

		setSquares(squares);
	};

	// Load the initial board FEN and create the board
	useEffect(() => {
		createSquares();
		ParseFEN(fen, dispatchBoardState);
		setTurnNum(dispatchBoardState, 1);
	}, []);

	// Calculate moves
	useEffect(() => {
		if (boardPieces.length > 0) {
			calculateMoves();
		}
	}, [boardPieces]);

	// Create notation/ set move
	useEffect(() => {
		if (previousMove) createNotation(previousMove);
		makeAiMove();
	}, [legalMovesWhite, legalMovesBlack]);

	/**
	 * Handles when a user clicks 'show all color moves'. Highlights every sqaure
	 * @param {*} e
	 */
	const highlightSquares = e => {
		const showAllBlackMoves = document.getElementById('cb-ab');
		const showAllWhiteMoves = document.getElementById('cb-aw');
		const showAllWhiteChecking = document.getElementById('cb-acw');
		const showAllBlackChecking = document.getElementById('cb-acb');
		const showWhiteChecking = document.getElementById('cb-cw');
		const showBlackChecking = document.getElementById('cb-cb');
		const showWhiteLegal = document.getElementById('cb-lw');
		const showBlackLegal = document.getElementById('cb-lb');

		if (showAllWhiteMoves.checked === true) {
			clearBoardSquareColors(dispatchBoardState);
			highlightAllColorSquares(allMovesWhite);
		} else if (showAllBlackMoves.checked === true) {
			clearBoardSquareColors(dispatchBoardState);
			highlightAllColorSquares(allMovesBlack);
		} else if (showAllWhiteChecking.checked === true) {
			clearBoardSquareColors(dispatchBoardState);
			highlightAllColorSquares(piecesLookingAtWhiteKing);
		} else if (showAllBlackChecking.checked === true) {
			clearBoardSquareColors(dispatchBoardState);
			highlightAllColorSquares(piecesLookingAtBlackKing);
		} else if (showWhiteChecking.checked === true) {
			clearBoardSquareColors(dispatchBoardState);
			highlightAllColorSquares(piecesCheckingWhite);
		} else if (showBlackChecking.checked === true) {
			clearBoardSquareColors(dispatchBoardState);
			highlightAllColorSquares(piecesCheckingBlack);
		} else if (showWhiteLegal.checked === true) {
			clearBoardSquareColors(dispatchBoardState);
			highlightAllColorSquares(legalMovesWhite);
		} else if (showBlackLegal.checked === true) {
			clearBoardSquareColors(dispatchBoardState);
			highlightAllColorSquares(legalMovesBlack);
		} else {
			clearBoardSquareColors(dispatchBoardState);
		}
	};

	//---------------------------------------------------------------------------------------------------//
	return (
		<div className="index-container">
			<div className="board-and-moves-container">
				<div className="eval-bar">
					<div className="white-bar" style={{ height: `${evaluation >= 0 ? evaluation : 0}%` }}></div>
					<div className="eval-count">
						{whitePieceCount - blackPieceCount > 0 && `+`}
						{whitePieceCount - blackPieceCount}
					</div>
				</div>
				{/* ------------ Chessboard ------------ */}
				<div className="chessboard">
					{/* ------------ Squares ------------ */}
					{squares.map((square, i) => {
						return (
							<Square key={i} squareNum={i} square={square}>
								{boardPieces[i] === ' ' ? '' : <Piece squareNum={i} piece={boardPieces[i]} />}
							</Square>
						);
					})}
				</div>

				<div className="moves-container">
					<div className="top-section">
						<div className="h1">Moves</div>
					</div>
					<div className="moves">
						{gameMoves.map((moves, i) => {
							return (
								<div className="move-row">
									<p>{i + 1}.</p>
									<p>{moves[0]}</p>
									<p>{moves[1]}</p>
								</div>
							);
						})}
					</div>
					<div className="botom-section">
						<div className="btn-dark" onClick={() => resetGame(dispatchBoardState, fen)}>
							Play Again
						</div>
					</div>
				</div>
			</div>

			<div className="bottom-info">
				<p> Whose Turn: {whoseTurnIsIt}</p>
				<p>White can castle: {whiteCastle?.map(castle => castle)} </p>
				<p>Black can castle: {blackCastle?.map(castle => castle)}</p>
			</div>
			<div className="checkboxes">
				<div className="checkbox-row">
					<input id="cb-lw" type="checkbox" value="w" onChange={e => highlightSquares(e)} /> Show all white legal moves
				</div>
				<div className="checkbox-row">
					<input id="cb-lb" type="checkbox" value="b" onChange={e => highlightSquares(e)} /> Show all black legal moves
				</div>
				<div className="checkbox-row">
					<input id="cb-aw" type="checkbox" value="w" onChange={e => highlightSquares(e)} /> Show all white moves
				</div>
				<div className="checkbox-row">
					<input id="cb-ab" type="checkbox" value="b" onChange={e => highlightSquares(e)} /> Show all black moves
				</div>
				<div className="checkbox-row">
					<input id="cb-acw" type="checkbox" value="w" onChange={e => highlightSquares(e)} /> Show all pieces looking at white king
				</div>
				<div className="checkbox-row">
					<input id="cb-acb" type="checkbox" value="b" onChange={e => highlightSquares(e)} /> Show all pieces looking at black king
				</div>
				<div className="checkbox-row">
					<input id="cb-cw" type="checkbox" value="w" onChange={e => highlightSquares(e)} /> Show pieces checking white king
				</div>
				<div className="checkbox-row">
					<input id="cb-cb" type="checkbox" value="b" onChange={e => highlightSquares(e)} /> Show pieces checking black king
				</div>
			</div>
		</div>
	);
}

export default Index;
