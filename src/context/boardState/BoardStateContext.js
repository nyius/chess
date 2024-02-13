import React, { useReducer, createContext, useEffect, useState } from 'react';
import BoardStateReducer from './BoardStateReducer';

const BoardStateContext = createContext();

export const BoardStateProvider = ({ children }) => {
	const initialState = {
		// regular starting position
		// fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w QKqk - 0 1',
		fen: 'rnbqkbnr/pppp2pp/5p2/1B2p2Q/4P3/2NP1N2/PPP2PPP/R1B2RK1 b kq - 0 1',
		boardPieces: [], // stores all of the pieces, ['r', ' ', 'b', ' ', 'p', 'p']
		whoseTurnIsIt: 'w', // whose turn it is
		whiteCastle: null, // if white has any castling
		blackCastle: null, // if black has any castling
		enPassant: '', // if any pawns moved that can be taked in enpessant
		halfmoves: '',
		fullmoves: '',
		clickedPiece: null, // holds the current clicked on piece
		legalMovesWhite: [], // Stores all legal white moves
		legalMovesBlack: [], // stores all legal black moves
		allMovesWhite: [], // Stores every move white pieces can make if they could see through other pieces
		allMovesBlack: [], // Stores every move blacks pieces can make if they could see through other pieces
		piecesCheckingWhite: [], // Stores pieces that are currently checking white (and its moves, 14-B-25, 14-B-18, 14-B-11, etc)
		piecesCheckingBlack: [], // Stores pieces that are currently checking black (and its moves, 14-B-25, 14-B-18, 14-B-11, etc)
		piecesLookingAtWhiteKing: [], // stores pieces that are looking at the white king
		piecesLookingAtBlackKing: [], // stores pieces that are looking at the black king
		protectedPiecesWhite: [], // stores white pieces that are protected
		protectedPiecesBlack: [], // stores black pieces that are protected
		protectedPawnSquaresWhite: [], // stores square that white pawns are protected
		protectedPawnSquaresBlack: [], // stores square that black pawns are protected
		gameMoves: [[]], // Stores each move made as an array, [[e4,e5], [d3,d5]]
		turnNum: 1, // the current turn
		whiteInCheck: false, // Stores if white is in check
		blackInCheck: false, // stores if black is in check
		whiteRightRookMoved: false, // stores if the rook has moved (removes castling right)
		whiteLeftRookMoved: false, // stores if the rook has moved (removes castling right)
		blackRightRookMoved: false, // stores if the rook has moved (removes castling right)
		blackLeftRookMoved: false, // stores if the rook has moved (removes castling right)
		whiteKingMoved: false, // stores if the white king has moved
		blackKingMoved: false, // stores if the black king has moved
		previousMove: null, // Stores the last move
		capturedPiece: null, // stores the last piece that was captured
		evaluation: 0, // stores the evaulation of the game (- numbers mean white is losing, + mean white is winning)
		humanColor: 'w', // Stores the color of the human player
		winner: null, // stores who won
		whitePieceCount: 0, // stores the total value of all whites pieces
		blackPieceCount: 0, // stores total value of all black pieces
	};

	const [state, dispatchBoardState] = useReducer(BoardStateReducer, initialState);

	return <BoardStateContext.Provider value={{ ...state, dispatchBoardState }}>{children}</BoardStateContext.Provider>;
};

export default BoardStateContext;
