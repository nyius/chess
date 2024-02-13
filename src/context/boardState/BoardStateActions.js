export const setBlackLeftRookMoved = dispatchBoardState => {
	dispatchBoardState({
		type: 'SET_BLACK_LEFT_ROOK_MOVED',
	});
};
export const setBlackRightRookMoved = dispatchBoardState => {
	dispatchBoardState({
		type: 'SET_BLACK_RIGHT_ROOK_MOVED',
	});
};
export const setWhiteLeftRookMoved = dispatchBoardState => {
	dispatchBoardState({
		type: 'SET_WHITE_LEFT_ROOK_MOVED',
	});
};
export const setWhiteRightRookMoved = dispatchBoardState => {
	dispatchBoardState({
		type: 'SET_WHITE_RIGHT_ROOK_MOVED',
	});
};
export const setWhiteKingMoved = dispatchBoardState => {
	dispatchBoardState({
		type: 'SET_WHITE_KING_MOVED',
	});
};
export const setBlackKingMoved = dispatchBoardState => {
	dispatchBoardState({
		type: 'SET_BLACK_KING_MOVED',
	});
};
export const setResetClickedPiece = dispatchBoardState => {
	dispatchBoardState({
		type: 'SET_CLICKED_PIECE',
		payload: null,
	});
};
export const setMove = (dispatchBoardState, newSquare, whoseTurnIsIt) => {
	dispatchBoardState({
		type: 'SET_MOVE',
		payload: {
			move: newSquare,
			whoseTurnIsIt,
		},
	});
};
export const setChangeTurns = (dispatchBoardState, whoseTurnIsIt) => {
	dispatchBoardState({
		type: 'SET_TURN',
		payload: whoseTurnIsIt === 'w' ? 'b' : 'w',
	});
};
export const setUpdateBoard = (dispatchBoardState, prevSquare, newSquare, piece) => {
	dispatchBoardState({
		type: 'UPDATE_BOARD',
		payload: {
			prevSquare,
			newSquare,
			piece,
		},
	});
};
export const setCastleMove = (dispatchBoardState, prevSquare, newSquare, piece, castleSide) => {
	dispatchBoardState({
		type: 'SET_CASTLE_MOVE',
		payload: {
			prevSquare,
			newSquare,
			piece,
			castleSide,
		},
	});
};
export const setWhiteLegalMoves = (dispatchBoardState, legalMovesWhite) => {
	dispatchBoardState({
		type: 'SET_LEGAL_MOVES_WHITE',
		payload: legalMovesWhite,
	});
};
export const setBlackLegalMoves = (dispatchBoardState, legalMovesBlack) => {
	dispatchBoardState({
		type: 'SET_LEGAL_MOVES_BLACK',
		payload: legalMovesBlack,
	});
};
export const setProtectedPiecesWhite = (dispatchBoardState, protectedPiecesWhite) => {
	dispatchBoardState({
		type: 'SET_PROTECTED_PIECES_WHITE',
		payload: protectedPiecesWhite,
	});
};
export const setProtectedPiecesBlack = (dispatchBoardState, protectedPiecesBlack) => {
	dispatchBoardState({
		type: 'SET_PROTECTED_PIECES_BLACK',
		payload: protectedPiecesBlack,
	});
};
export const setPawnProtectedSquaresWhite = (dispatchBoardState, protectedPawnSquaresWhite) => {
	dispatchBoardState({
		type: 'SET_PAWN_PROTECTED_SQUARES_WHITE',
		payload: protectedPawnSquaresWhite,
	});
};
export const setPawnProtectedSquaresBlack = (dispatchBoardState, protectedPawnSquaresBlack) => {
	dispatchBoardState({
		type: 'SET_PAWN_PROTECTED_SQUARES_BLACK',
		payload: protectedPawnSquaresBlack,
	});
};
export const setAllWhiteMoves = (dispatchBoardState, allMovesWhite) => {
	dispatchBoardState({
		type: 'SET_ALL_MOVES_WHITE',
		payload: allMovesWhite,
	});
};
export const setAllBlackMoves = (dispatchBoardState, allMovesBlack) => {
	dispatchBoardState({
		type: 'SET_ALL_MOVES_BLACK',
		payload: allMovesBlack,
	});
};
export const setClickedPiece = (dispatchBoardState, piece) => {
	dispatchBoardState({
		type: 'SET_CLICKED_PIECE',
		payload: piece,
	});
};
export const setWhiteCheck = (dispatchBoardState, checkState) => {
	dispatchBoardState({
		type: 'SET_WHITE_CHECK',
		payload: checkState,
	});
};
export const setBlackCheck = (dispatchBoardState, checkState) => {
	dispatchBoardState({
		type: 'SET_BLACK_CHECK',
		payload: checkState,
	});
};
export const setPiecesCheckingWhite = (dispatchBoardState, piecesCheckingWhite) => {
	dispatchBoardState({
		type: 'SET_PIECES_CHECKING_WHITE',
		payload: piecesCheckingWhite,
	});
};
export const setPiecesCheckingBlack = (dispatchBoardState, piecesCheckingBlack) => {
	dispatchBoardState({
		type: 'SET_PIECES_CHECKING_BLACK',
		payload: piecesCheckingBlack,
	});
};
export const setPiecesLookingAtWhiteKing = (dispatchBoardState, piecesLookingAtWhiteKing) => {
	dispatchBoardState({
		type: 'SET_PIECES_LOOKING_AT_WHITE_KING',
		payload: piecesLookingAtWhiteKing,
	});
};
export const setPiecesLookingAtBlackKing = (dispatchBoardState, piecesLookingAtBlackKing) => {
	dispatchBoardState({
		type: 'SET_PIECES_LOOKING_AT_BLACK_KING',
		payload: piecesLookingAtBlackKing,
	});
};
export const setEnPassant = (dispatchBoardState, square) => {
	dispatchBoardState({
		type: 'SET_EN_PASSANT',
		payload: square,
	});
};
export const setEnPassantCapture = (dispatchBoardState, enPassant) => {
	dispatchBoardState({
		type: 'SET_EN_PASSANT_CAPTURE',
		payload: enPassant,
	});
};
export const setPreviousMove = (dispatchBoardState, piece, newSquare, prevSquare, opponentPiece) => {
	let previousMove = prevSquare + '-' + piece + '-' + newSquare + '-' + (opponentPiece ? opponentPiece : ' ');
	dispatchBoardState({
		type: 'SET_PREVIOUS_MOVE',
		payload: previousMove,
	});
};
export const setCapturedPiece = (dispatchBoardState, capturedPiece) => {
	dispatchBoardState({
		type: 'SET_CAPTURED_PIECE',
		payload: capturedPiece === ' ' ? null : capturedPiece,
	});
};
export const setTurnNum = (dispatchBoardState, turnNum) => {
	dispatchBoardState({
		type: 'SET_TURN_NUM',
		payload: turnNum,
	});
};
export const setWinner = (dispatchBoardState, winner) => {
	dispatchBoardState({
		type: 'SET_WINNER',
		payload: winner,
	});
};
export const setPieceCount = (dispatchBoardState, whitePieceCount, blackPieceCount) => {
	dispatchBoardState({
		type: 'SET_PIECE_COUNT',
		payload: {
			whitePieceCount,
			blackPieceCount,
		},
	});
};
export const setEvaluation = (dispatchBoardState, evaluation) => {
	dispatchBoardState({
		type: 'SET_EVAL',
		payload: evaluation,
	});
};
export const setResetBoard = (dispatchBoardState, evaluation) => {
	dispatchBoardState({
		type: 'SET_RESET_BOARD',
	});
};
