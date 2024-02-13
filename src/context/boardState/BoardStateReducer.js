function BoardStateReducer(state, action) {
	switch (action.type) {
		case 'PARSE_FEN':
			return '';
		case 'CREATE_BOARD':
			return {
				...state,
				boardPieces: [...state.boardPieces, action.payload],
			};
		case 'RESET_BOARD':
			return {
				...state,
				fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w QKqk - 0 1',
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
				piecesLookingAtWhiteKing: [],
				piecesLookingAtBlackKing: [],
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
		case 'UPDATE_BOARD':
			const newBoardPieces = [...state.boardPieces];
			newBoardPieces[action.payload.prevSquare] = ' ';
			newBoardPieces[action.payload.newSquare] = action.payload.piece;

			return {
				...state,
				boardPieces: newBoardPieces,
			};
		case 'SET_TURN':
			return {
				...state,
				whoseTurnIsIt: action.payload,
			};
		case 'SET_CLICKED_PIECE':
			return {
				...state,
				clickedPiece: action.payload,
			};
		case 'SET_CASTLE':
			return {
				...state,
				whiteCastle: action.payload.whiteCastle,
				blackCastle: action.payload.blackCastle,
			};
		case 'SET_ENPESSANT':
			return {
				...state,
				enpessant: action.payload,
			};
		case 'SET_HALFMOVES':
			return {
				...state,
				halfmoves: action.payload,
			};
		case 'SET_FULLMOVES':
			return {
				...state,
				fullmoves: action.payload,
			};
		case 'SET_LEGAL_MOVES_WHITE':
			return {
				...state,
				legalMovesWhite: action.payload,
			};
		case 'SET_LEGAL_MOVES_BLACK':
			return {
				...state,
				legalMovesBlack: action.payload,
			};
		case 'SET_ALL_MOVES_WHITE':
			return {
				...state,
				allMovesWhite: action.payload,
			};
		case 'SET_ALL_MOVES_BLACK':
			return {
				...state,
				allMovesBlack: action.payload,
			};
		case 'SET_BLACK_LEFT_ROOK_MOVED':
			const blackCastleLeftArrCopy = state.blackCastle.filter(side => side !== 'q');

			return {
				...state,
				blackLeftRookMoved: true,
				blackCastle: blackCastleLeftArrCopy,
			};
		case 'SET_BLACK_RIGHT_ROOK_MOVED':
			const blackCastleRightArrCopy = state.blackCastle.filter(side => side !== 'k');

			return {
				...state,
				blackRightRookMoved: true,
				blackCastle: blackCastleRightArrCopy,
			};
		case 'SET_WHITE_LEFT_ROOK_MOVED':
			let whiteCastleLeftArrCopy = state.whiteCastle.filter(side => side !== 'Q');

			return {
				...state,
				whiteLeftRookMoved: true,
				whiteCastle: whiteCastleLeftArrCopy,
			};
		case 'SET_WHITE_RIGHT_ROOK_MOVED':
			const whiteCastleRightArrCopy = state.whiteCastle.filter(side => side !== 'K');

			return {
				...state,
				whiteRightRookMoved: true,
				whiteCastle: whiteCastleRightArrCopy,
			};
		case 'SET_MOVE':
			const newGameMoves = [...state.gameMoves];

			if (action.payload.whoseTurnIsIt === 'w') {
				newGameMoves[state.turnNum - 1] = [action.payload.move];
			} else if (action.payload.whoseTurnIsIt === 'b') {
				newGameMoves[state.turnNum - 1]?.push(action.payload.move);
			}

			return {
				...state,
				gameMoves: newGameMoves,
				turnNum: action.payload.whoseTurnIsIt === 'w' ? state.turnNum : state.turnNum + 1,
			};
		case 'SET_WHITE_CHECK':
			return {
				...state,
				whiteInCheck: action.payload,
			};
		case 'SET_BLACK_CHECK':
			return {
				...state,
				blackInCheck: action.payload,
			};
		case 'SET_PIECES_CHECKING_WHITE':
			return {
				...state,
				piecesCheckingWhite: action.payload,
			};
		case 'SET_PIECES_CHECKING_BLACK':
			return {
				...state,
				piecesCheckingBlack: action.payload,
			};
		case 'SET_PIECES_LOOKING_AT_WHITE_KING':
			return {
				...state,
				piecesLookingAtWhiteKing: action.payload,
			};
		case 'SET_PIECES_LOOKING_AT_BLACK_KING':
			return {
				...state,
				piecesLookingAtBlackKing: action.payload,
			};
		case 'SET_PROTECTED_PIECES_WHITE':
			return {
				...state,
				protectedPiecesWhite: action.payload,
			};
		case 'SET_PROTECTED_PIECES_BLACK':
			return {
				...state,
				protectedPiecesBlack: action.payload,
			};
		case 'SET_PAWN_PROTECTED_SQUARES_WHITE':
			return {
				...state,
				protectedPawnSquaresWhite: action.payload,
			};
		case 'SET_PAWN_PROTECTED_SQUARES_BLACK':
			return {
				...state,
				protectedPawnSquaresBlack: action.payload,
			};
		case 'SET_WHITE_KING_MOVED':
			return {
				...state,
				whiteKingMoved: true,
				whiteCastle: [],
			};
		case 'SET_BLACK_KING_MOVED':
			return {
				...state,
				blackKingMoved: true,
				blackCastle: [],
			};
		case 'SET_EN_PASSANT':
			return {
				...state,
				enPassant: action.payload,
			};
		case 'SET_EN_PASSANT_CAPTURE':
			const newBoardPiecesEnPassant = [...state.boardPieces];
			newBoardPiecesEnPassant[action.payload] = ' ';

			return {
				...state,
				boardPieces: newBoardPiecesEnPassant,
				enPassant: '',
			};
		case 'SET_PREVIOUS_MOVE':
			return {
				...state,
				previousMove: action.payload,
			};
		case 'SET_CAPTURED_PIECE':
			return {
				...state,
				capturedPiece: action.payload,
			};
		case 'SET_TURN_NUM':
			return {
				...state,
				turnNum: action.payload,
			};
		case 'SET_WINNER':
			return {
				...state,
				winner: action.payload,
			};
		case 'SET_PIECE_COUNT':
			return {
				...state,
				whitePieceCount: action.payload.whitePieceCount,
				blackPieceCount: action.payload.blackPieceCount,
			};
		case 'SET_EVAL':
			return {
				...state,
				evaluation: action.payload,
			};
		case 'SET_CASTLE_MOVE':
			const newBoardPiecesCastle = [...state.boardPieces];
			let newWhiteCastle = [...state.whiteCastle];
			let newBlackCastle = [...state.blackCastle];
			let newWhiteRightRookMoved = state.whiteRightRookMoved;
			let newWhiteLeftRookMoved = state.whiteLeftRookMoved;
			let newBlackRightRookMoved = state.blackRightRookMoved;
			let newBlackLeftRookMoved = state.blackLeftRookMoved;

			newBoardPiecesCastle[action.payload.prevSquare] = ' ';

			if (action.payload.castleSide === 'K') {
				newBoardPiecesCastle[action.payload.newSquare] = action.payload.piece;
				newBoardPiecesCastle[61] = 'R';
				newBoardPiecesCastle[63] = ' ';
				newWhiteCastle = [];
				newWhiteRightRookMoved = true;
				newWhiteLeftRookMoved = true;
			} else if (action.payload.castleSide === 'Q') {
				newBoardPiecesCastle[action.payload.newSquare] = action.payload.piece;
				newBoardPiecesCastle[59] = 'R';
				newBoardPiecesCastle[56] = ' ';
				newWhiteCastle = [];
				newWhiteRightRookMoved = true;
				newWhiteLeftRookMoved = true;
			} else if (action.payload.castleSide === 'k') {
				newBoardPiecesCastle[action.payload.newSquare] = action.payload.piece;
				newBoardPiecesCastle[5] = 'r';
				newBoardPiecesCastle[7] = ' ';
				newBlackCastle = [];
				newBlackRightRookMoved = true;
				newBlackLeftRookMoved = true;
			} else if (action.payload.castleSide === 'q') {
				newBoardPiecesCastle[action.payload.newSquare] = action.payload.piece;
				newBoardPiecesCastle[3] = 'r';
				newBoardPiecesCastle[0] = ' ';
				newBlackCastle = [];
				newBlackRightRookMoved = true;
				newBlackLeftRookMoved = true;
			}

			return {
				...state,
				boardPieces: newBoardPiecesCastle,
				whiteCastle: newWhiteCastle,
				blackCastle: newBlackCastle,
				whiteRightRookMoved: newWhiteRightRookMoved,
				whiteLeftRookMoved: newWhiteLeftRookMoved,
				blackRightRookMoved: newBlackRightRookMoved,
				blackLeftRookMoved: newBlackLeftRookMoved,
			};
		default:
			return state;
	}
}

export default BoardStateReducer;
