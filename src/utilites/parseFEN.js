/**
 * Handles reading the fen and returning the pieces to the context
 * @param {*} fen
 */
const parseFEN = (fen, dispatchBoardState) => {
	let spaceCount = 0;

	// Clear the board before looping over the new fen
	dispatchBoardState({
		type: 'RESET_BOARD',
	});

	// Split the FEN
	const splitFEN = fen.split(' ');

	// Loop over each piece in the FEN
	for (let i in splitFEN[0]) {
		let piece = fen[i];

		// No spaces yet means we are setting up the board
		if (!isNaN(Number(piece)) && piece !== ' ') {
			for (let j = 0; j < Number(piece); j++) {
				dispatchBoardState({
					type: 'CREATE_BOARD',
					payload: ' ',
				});
			}
		} else if (piece !== '/') {
			dispatchBoardState({
				type: 'CREATE_BOARD',
				payload: piece,
			});
		}
	}

	if (splitFEN[1]) {
		// 1 space means we are looking at whose turn it is
		if (splitFEN[1] === 'b') {
			dispatchBoardState({
				type: 'SET_TURN',
				payload: 'b',
			});
		} else if (splitFEN[1] === 'w') {
			dispatchBoardState({
				type: 'SET_TURN',
				payload: 'w',
			});
		}
	}

	// 2nd space means we are looking at castling rights
	let whiteCastle = [];
	let blackCastle = [];

	if (splitFEN[2]) {
		if (splitFEN[2] !== '-') {
			for (let i in splitFEN[2]) {
				let castleColor = splitFEN[2][i];

				if (castleColor === 'K') {
					whiteCastle.push('K');
				} else if (castleColor === 'Q') {
					whiteCastle.push('Q');
				} else if (castleColor === 'k') {
					blackCastle.push('k');
				} else if (castleColor === 'q') {
					blackCastle.push('q');
				}
			}
		}
	}

	dispatchBoardState({
		type: 'SET_CASTLE',
		payload: {
			whiteCastle,
			blackCastle,
		},
	});

	// 3rd space means pieces that can be taken with enpessant
	if (splitFEN[3]) {
		if (splitFEN[3] !== '-') {
			dispatchBoardState({
				type: 'SET_ENPESSANT',
				payload: splitFEN[3],
			});
		}
	}

	// 4th space means halfmoves. This is for the 50 move draw rule
	if (splitFEN[4]) {
		dispatchBoardState({
			type: 'SET_HALFMOVES',
			payload: Number(splitFEN[4]),
		});
	}

	// 5th space means fullmoves. How many turns there have been
	if (splitFEN[5]) {
		dispatchBoardState({
			type: 'SET_FULLMOVES',
			payload: Number(splitFEN[5]),
		});
	}
};

export default parseFEN;
