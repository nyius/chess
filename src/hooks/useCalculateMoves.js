import React, { useContext } from 'react';

// Context
import BoardStateContext from '../context/boardState/BoardStateContext';

import {
	leftEdge,
	rightEdge,
	secondFromLeftEdge,
	secondFromRightEdge,
	whitePawnStartingRow,
	blackPawnStartingRow,
	north,
	south,
	east,
	west,
	northEast,
	northWest,
	southEast,
	southWest,
	BlackKing,
	WhiteKing,
	BlackRook,
	WhiteRook,
	BlackBishop,
	WhiteBishop,
	BlackPawn,
	WhitePawn,
	BlackQueen,
	WhiteQueen,
	Whiteknight,
	Blackknight,
	pawnValue,
	bishopValue,
	queenValue,
	rookValue,
	knightValue,
	kingValue,
} from '../utilites/constants';
import { checkIfBlack, checkIfWhite, checkIfFriendlyPiece, checkIfOpponentPiece } from '../utilites/checkPieceOwner';
import {
	setBlackLegalMoves,
	setWhiteLegalMoves,
	setBlackCheck,
	setWhiteCheck,
	setWinner,
	setPieceCount,
	setEvaluation,
	setProtectedPiecesBlack,
	setProtectedPiecesWhite,
	setPawnProtectedSquaresBlack,
	setPawnProtectedSquaresWhite,
} from '../context/boardState/BoardStateActions';

const useCalculateMoves = () => {
	const { boardPieces, dispatchBoardState, whiteCastle, blackCastle, whiteRightRookMoved, whiteLeftRookMoved, blackRightRookMoved, blackLeftRookMoved, whoseTurnIsIt, enPassant } = useContext(BoardStateContext);

	let currentPieceObject, currentPieceName, currentSquareNum, direction, whiteInCheck, blackInCheck, protectedPiece, friendlyPieceFound, opponentPieceFound, checkingPieceFail;
	let xRayArr = [];
	let checkingArr = [];
	let whiteLegalMoves = [];
	let blackLegalMoves = [];
	let whitePiecesBlockingCheck = [];
	let blackPiecesBlockingCheck = [];
	let whitePiecesCheckingBlack = [];
	let whitePawnProtectedSquares = [];
	let blackPiecesCheckingWhite = [];
	let blackPawnProtectedSquares = [];
	let whiteProtectedPieces = [];
	let blackProtectedPieces = [];
	let xRayDefender = [];
	let xRayPiece = 0;
	let foundFriendlyXray = false;
	let kingLocationFound = false;
	let friendlyBlockingPieceFound = false;

	const calculateBoardValues = () => {
		let whitePieceCount = 0;
		let blackPieceCount = 0;

		boardPieces.map(piece => {
			if (piece === 'r') {
				blackPieceCount += rookValue;
			}
			if (piece === 'b') {
				blackPieceCount += bishopValue;
			}
			if (piece === 'q') {
				blackPieceCount += queenValue;
			}
			if (piece === 'n') {
				blackPieceCount += knightValue;
			}
			if (piece === 'p') {
				blackPieceCount += pawnValue;
			}
			if (piece === 'k') {
				blackPieceCount += kingValue;
			}

			if (piece === 'R') {
				whitePieceCount += rookValue;
			}
			if (piece === 'B') {
				whitePieceCount += bishopValue;
			}
			if (piece === 'Q') {
				whitePieceCount += queenValue;
			}
			if (piece === 'N') {
				whitePieceCount += knightValue;
			}
			if (piece === 'P') {
				whitePieceCount += pawnValue;
			}
			if (piece === 'K') {
				whitePieceCount += kingValue;
			}
		});
		// -39 is 0%, +39 is 100%, 0 is 50%
		const evaluation = whitePieceCount - blackPieceCount;
		let total = Math.round(((evaluation - -9 + 1) / (9 - -9 + 1)) * 100);

		setPieceCount(dispatchBoardState, whitePieceCount, blackPieceCount);
		setEvaluation(dispatchBoardState, total);
	};

	const checkForCheckmate = () => {
		if (whoseTurnIsIt === 'w') {
			if (whiteLegalMoves.length === 0) {
				console.log(`White Loses!`);
				setWinner(dispatchBoardState, 'b');
			}
		} else if (whoseTurnIsIt === 'b') {
			if (blackLegalMoves.length === 0) {
				console.log(`Black loses!`);
				setWinner(dispatchBoardState, 'w');
			}
		}
	};

	const isCurrentPieceOnEdgeAndMovingIntoIt = () => {
		if ((leftEdge.includes(currentSquareNum) && (direction === west || direction === northWest || direction === southWest)) || (rightEdge.includes(currentSquareNum) && (direction === east || direction === northEast || direction === southEast)))
			return true;
	};

	const isSquareOnEdgeAndNotVerticalMove = squareToCheckNum => {
		if ((leftEdge.includes(squareToCheckNum) && direction !== north && direction !== south) || (rightEdge.includes(squareToCheckNum) && direction !== north && direction !== south)) {
			return true;
		}
	};

	const checkIfPieceIsProtecting = squareToCheckNum => {
		const pieceToCheck = boardPieces[squareToCheckNum];
		const moveToAdd = currentSquareNum + '-' + currentPieceName + '-' + squareToCheckNum + '-' + boardPieces[squareToCheckNum];

		if (checkIfFriendlyPiece(currentPieceName, pieceToCheck) && !protectedPiece) {
			if ((checkIfWhite(currentPieceName) && !whiteProtectedPieces.includes(squareToCheckNum)) || (checkIfBlack(currentPieceName) && !blackProtectedPieces.includes(squareToCheckNum))) {
				if (checkIfBlack(currentPieceName)) blackProtectedPieces.push(squareToCheckNum);
				if (checkIfWhite(currentPieceName)) whiteProtectedPieces.push(squareToCheckNum);
			}
			protectedPiece = true;
		}
	};

	const checkIfOpponentKingXray = squareToCheckNum => {
		const pieceToCheck = boardPieces[squareToCheckNum];

		if (pieceToCheck !== ' ') {
			if (checkIfOpponentPiece(currentPieceName, pieceToCheck)) {
				if (((checkIfBlack(currentPieceName) && pieceToCheck === 'K') || (checkIfWhite(currentPieceName) && pieceToCheck === 'k')) && xRayPiece === 1) {
					xRayArr.push(squareToCheckNum);

					if (checkIfBlack(currentPieceName)) whitePiecesBlockingCheck.push([...xRayArr]);
					if (checkIfWhite(currentPieceName)) blackPiecesBlockingCheck.push([...xRayArr]);
				} else if ((checkIfBlack(currentPieceName) && pieceToCheck !== 'K') || (checkIfWhite(currentPieceName) && pieceToCheck !== 'k')) {
					xRayPiece++;
					xRayArr.push(squareToCheckNum);
				}
			}
		} else if (pieceToCheck === ' ') {
			xRayArr.push(squareToCheckNum);
		}
	};

	const checkIfPieceIsChecking = (squareToCheckNum, moveToAdd) => {
		const pieceToCheck = boardPieces[squareToCheckNum];
		checkingArr.push(moveToAdd);

		if (currentPieceObject.canCheckKing) {
			if (checkIfBlack(currentPieceName)) {
				if (pieceToCheck !== ' ' && pieceToCheck !== 'K' && !checkingPieceFail) {
					checkingPieceFail = true;
				} else if (pieceToCheck === 'K' && !checkingPieceFail) {
					blackPiecesCheckingWhite.push(checkingArr);
					whiteInCheck = true;
					setWhiteCheck(dispatchBoardState, true);
				}
			} else if (checkIfWhite(currentPieceName)) {
				if (pieceToCheck !== ' ' && pieceToCheck !== 'k' && !checkingPieceFail) {
					checkingPieceFail = true;
				} else if (pieceToCheck === 'k' && !checkingPieceFail) {
					whitePiecesCheckingBlack.push(checkingArr);
					blackInCheck = true;
					setBlackCheck(dispatchBoardState, true);
				}
			}
		}
	};

	const checkIfPieceIsBlockingCheck = () => {
		let foundPiece = false;
		for (let i = 0; i < (checkIfWhite(currentPieceName) ? whitePiecesBlockingCheck.length : blackPiecesBlockingCheck.length); i++) {
			const piece = checkIfWhite(currentPieceName) ? whitePiecesBlockingCheck[i] : blackPiecesBlockingCheck[i];

			for (let j = 0; j < piece.length; j++) {
				const pieceSquareToCheck = Number(piece[j]);

				if (pieceSquareToCheck === currentSquareNum) {
					foundPiece = piece;
					break;
				}
			}
		}
		return foundPiece;
	};

	const checkIfPieceCanBlockCheck = squareToCheckNum => {
		let foundPiece = false;
		const pieceToCheck = boardPieces[squareToCheckNum];

		for (let i = 0; i < (checkIfWhite(currentPieceName) ? blackPiecesCheckingWhite.length : whitePiecesCheckingBlack.length); i++) {
			const opponentPieceMoves = checkIfWhite(currentPieceName) ? blackPiecesCheckingWhite[i] : whitePiecesCheckingBlack[i];

			for (let j = 0; j < opponentPieceMoves.length; j++) {
				const opponentPieceSquare = Number(opponentPieceMoves[j].split(`-`)[0]);
				const opponentMoveSquare = Number(opponentPieceMoves[j].split(`-`)[2]);

				if (pieceToCheck === 'k' || pieceToCheck === 'K') {
					kingLocationFound = true;
				}

				if (checkIfFriendlyPiece(currentPieceName, pieceToCheck)) {
					friendlyBlockingPieceFound = true;
				}

				if ((squareToCheckNum === opponentMoveSquare || squareToCheckNum === opponentPieceSquare) && !kingLocationFound && !friendlyBlockingPieceFound) {
					for (let k = 0; k < (checkIfWhite(currentPieceName) ? blackLegalMoves.length : whiteLegalMoves.length); k++) {
						const opponentPieceLegalMove = checkIfWhite(currentPieceName) ? blackLegalMoves[k] : whiteLegalMoves[k];
						const opponentLegalMoveSquare = Number(opponentPieceLegalMove.split(`-`)[2]);

						if (opponentLegalMoveSquare === squareToCheckNum || squareToCheckNum === opponentPieceSquare) {
							foundPiece = true;
							break;
						}
					}
				}
			}
			return foundPiece;
		}
	};

	const checkIfLegalMove = (squareToCheckNum, moveToAdd) => {
		const pieceToCheck = boardPieces[squareToCheckNum];
		let pieceIsBlockingCheckSquares = checkIfPieceIsBlockingCheck();

		if ((checkIfBlack(currentPieceName) && blackInCheck) || (checkIfWhite(currentPieceName) && whiteInCheck)) {
			if (checkIfPieceCanBlockCheck(squareToCheckNum)) {
				if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
				if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
			}
		} else if (pieceIsBlockingCheckSquares) {
			if (pieceIsBlockingCheckSquares.includes(squareToCheckNum)) {
				if (checkIfOpponentPiece(currentPieceName, pieceToCheck)) {
					if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
					if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
				} else if (pieceToCheck === ' ') {
					if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
					if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
				}
			}
		} else {
			if (checkIfFriendlyPiece(currentPieceName, pieceToCheck)) {
				friendlyPieceFound = true;
			} else if (pieceToCheck === ' ' && !friendlyPieceFound && !opponentPieceFound) {
				if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
				if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
			} else if (checkIfOpponentPiece(currentPieceName, pieceToCheck) && !opponentPieceFound && !friendlyPieceFound) {
				opponentPieceFound = true;
				if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
				if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
			}
		}
	};

	const checkIfLegalVerticalPawnMove = (squareToCheckNum, moveToAdd, doubleMove) => {
		const pieceToCheck = boardPieces[squareToCheckNum];
		let pieceIsBlockingCheckSquares = checkIfPieceIsBlockingCheck();

		if ((checkIfBlack(currentPieceName) && blackInCheck) || (checkIfWhite(currentPieceName) && whiteInCheck)) {
			if (checkIfPieceCanBlockCheck(squareToCheckNum) && pieceToCheck === ' ' && !pieceIsBlockingCheckSquares) {
				if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
				if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
			}
		} else if (pieceIsBlockingCheckSquares) {
			if (pieceIsBlockingCheckSquares.includes(squareToCheckNum)) {
				if (checkIfOpponentPiece(currentPieceName, pieceToCheck)) {
					if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
					if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
				} else if (pieceToCheck === ' ') {
					if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
					if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
				}
			}
		} else {
			if (doubleMove) {
				const pieceToCheckBefore = boardPieces[checkIfBlack(currentPieceName) ? squareToCheckNum - 8 : squareToCheckNum + 8];
				if (pieceToCheckBefore === ' ' && pieceToCheck === ' ') {
					if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
					if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
				}
			} else {
				if (pieceToCheck === ' ') {
					if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
					if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
				}
			}
		}
	};

	const checkIfPawnCanCapture = (squareToCheckNum, moveToAdd) => {
		const pieceToCheck = boardPieces[squareToCheckNum];
		let pieceIsBlockingCheckSquares = checkIfPieceIsBlockingCheck();

		if (pieceIsBlockingCheckSquares) {
			if ((checkIfBlack(currentPieceName) && blackInCheck) || (checkIfWhite(currentPieceName) && whiteInCheck)) {
			} else {
				if (pieceIsBlockingCheckSquares.includes(squareToCheckNum)) {
					for (let i = 0; i < (checkIfWhite(currentPieceName) ? blackPiecesCheckingWhite.length : whitePiecesCheckingBlack.length); i++) {
						const opponentPieceMoves = checkIfWhite(currentPieceName) ? blackPiecesCheckingWhite[i] : whitePiecesCheckingBlack[i];

						for (let j = 0; j < opponentPieceMoves.length; j++) {
							const opponentPieceSquare = Number(opponentPieceMoves[j].split(`-`)[0]);
							const opponentMoveSquare = Number(opponentPieceMoves[j].split(`-`)[2]);

							if (squareToCheckNum === opponentMoveSquare || squareToCheckNum === opponentPieceSquare) {
								if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
								if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
								break;
							}
						}
					}
				}
			}
		} else if ((checkIfBlack(currentPieceName) && blackInCheck) || (checkIfWhite(currentPieceName) && whiteInCheck)) {
			if (checkIfPieceCanBlockCheck(squareToCheckNum) && checkIfOpponentPiece(currentPieceName, pieceToCheck)) {
				if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
				if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
			}
		} else {
			if (checkIfOpponentPiece(currentPieceName, pieceToCheck)) {
				if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
				if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
			} else if (pieceToCheck === ' ' && (currentSquareNum === enPassant + 1 || currentSquareNum === enPassant - 1)) {
				if (checkIfBlack(currentPieceName)) blackLegalMoves.push(currentSquareNum + `-` + currentPieceName + `-` + (enPassant + 8) + '-' + ' ');
				if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(currentSquareNum + `-` + currentPieceName + `-` + (enPassant - 8) + '-' + ' ');
			}
		}
	};

	const checkIfLegalKingMove = (squareToCheckNum, moveToAdd) => {
		let friendPiece = moveToAdd.split('-')[3];
		let moveFail = false;

		for (let i = 0; i < (checkIfWhite(currentPieceName) ? blackLegalMoves.length : whiteLegalMoves.length); i++) {
			const opponentMoveToSquare = checkIfBlack(currentPieceName) ? Number(whiteLegalMoves[i].split('-')[2]) : Number(blackLegalMoves[i]?.split('-')[2]);
			const opponentCurrentSquare = checkIfBlack(currentPieceName) ? Number(whiteLegalMoves[i].split('-')[0]) : Number(blackLegalMoves[i]?.split('-')[0]);
			const opponentPiece = checkIfBlack(currentPieceName) ? whiteLegalMoves[i].split('-')[1] : blackLegalMoves[i]?.split('-')[1];

			if ((checkIfWhite(currentPieceName) && opponentPiece === 'p' && opponentMoveToSquare - opponentCurrentSquare === 8) || (checkIfBlack(currentPieceName) && opponentPiece === 'P' && opponentCurrentSquare - opponentMoveToSquare === 8)) {
			} else if (
				(checkIfWhite(currentPieceName) && opponentPiece === 'p' && opponentMoveToSquare - opponentCurrentSquare === 16) ||
				(checkIfBlack(currentPieceName) && opponentPiece === 'P' && opponentCurrentSquare - opponentMoveToSquare === 16)
			) {
			} else {
				if (squareToCheckNum == opponentMoveToSquare) moveFail = true;
			}
		}

		if (checkIfFriendlyPiece(currentPieceName, friendPiece)) {
			moveFail = true;
		}

		for (let i = 0; i < (checkIfWhite(currentPieceName) ? blackPawnProtectedSquares.length : whitePawnProtectedSquares.length); i++) {
			const opponentMoveToSquare = checkIfBlack(currentPieceName) ? Number(whitePawnProtectedSquares[i]) : Number(blackPawnProtectedSquares[i]);
			if (squareToCheckNum == opponentMoveToSquare) moveFail = true;
		}

		for (let i = 0; i < (checkIfWhite(currentPieceName) ? blackProtectedPieces.length : whiteProtectedPieces.length); i++) {
			const opponentMoveToSquare = checkIfBlack(currentPieceName) ? whiteProtectedPieces[i] : blackProtectedPieces[i];
			if (squareToCheckNum == opponentMoveToSquare) moveFail = true;
		}

		for (let i = 0; i < (checkIfWhite(currentPieceName) ? blackPiecesCheckingWhite.length : whitePiecesCheckingBlack.length); i++) {
			for (let j = 0; j < (checkIfWhite(currentPieceName) ? blackPiecesCheckingWhite[i].length : whitePiecesCheckingBlack[i].length); j++) {
				const opponentMoveToSquare = checkIfBlack(currentPieceName) ? Number(whitePiecesCheckingBlack[i][j].split('-')[2]) : Number(blackPiecesCheckingWhite[i][j].split('-')[2]);

				if (squareToCheckNum == opponentMoveToSquare) moveFail = true;
			}
		}

		if (!moveFail) {
			if (checkIfBlack(currentPieceName)) blackLegalMoves.push(moveToAdd);
			if (checkIfWhite(currentPieceName)) whiteLegalMoves.push(moveToAdd);
		}
	};

	const checkIfKingCanCastle = () => {
		if (checkIfWhite(currentPieceName) && (whiteCastle.includes('K') || whiteCastle.includes('Q'))) {
			if (boardPieces[61] === ' ' && boardPieces[62] === ' ' && !whiteRightRookMoved && !whiteInCheck) whiteLegalMoves.push(`60-K-62`);
			if (boardPieces[59] === ' ' && boardPieces[58] === ' ' && boardPieces[57] === ' ' && !whiteLeftRookMoved && !whiteInCheck) whiteLegalMoves.push(`60-K-58`);
		} else if (checkIfBlack(currentPieceName) && (blackCastle.includes('k') || blackCastle.includes('q'))) {
			if (boardPieces[5] === ' ' && boardPieces[6] === ' ' && !blackRightRookMoved && !blackInCheck) blackLegalMoves.push(`4-k-6`);
			if (boardPieces[3] === ' ' && boardPieces[2] === ' ' && boardPieces[1] === ' ' && !blackLeftRookMoved && !blackInCheck) blackLegalMoves.push(`4-k-2`);
		}
	};

	const infiniteMove = () => {
		if (currentPieceObject.infiniteMove) {
			currentPieceObject.movements.map(dir => {
				xRayArr.push(currentSquareNum);
				xRayDefender.push(currentSquareNum);
				direction = dir;

				for (let squareToCheckNum = currentSquareNum + direction; squareToCheckNum >= 0 && squareToCheckNum <= 63; squareToCheckNum += direction) {
					const moveToAdd = currentSquareNum + '-' + currentPieceName + '-' + squareToCheckNum + '-' + boardPieces[squareToCheckNum];

					if (isCurrentPieceOnEdgeAndMovingIntoIt()) break;

					checkIfLegalMove(squareToCheckNum, moveToAdd);
					checkIfPieceIsProtecting(squareToCheckNum);
					checkIfOpponentKingXray(squareToCheckNum);
					checkIfPieceIsChecking(squareToCheckNum, moveToAdd);

					if (isSquareOnEdgeAndNotVerticalMove(squareToCheckNum, moveToAdd)) break;
				}

				xRayArr = [];
				xRayDefender = [];
				xRayPiece = 0;
				checkingArr = [];
				protectedPiece = false;
				checkingPieceFail = false;
				friendlyPieceFound = false;
				opponentPieceFound = false;
				foundFriendlyXray = false;
				kingLocationFound = false;
				friendlyBlockingPieceFound = false;
			});
		}
	};

	const knightMove = () => {
		if (currentPieceName === 'n' || currentPieceName === 'N') {
			currentPieceObject.movements.map(dir => {
				direction = dir;
				const squareToCheckNum = currentSquareNum + direction;
				const moveToAdd = currentSquareNum + '-' + currentPieceName + '-' + squareToCheckNum + '-' + boardPieces[squareToCheckNum];

				if (squareToCheckNum >= 0 && squareToCheckNum <= 63) {
					if (direction === -10 || direction === 6) {
						if (!leftEdge.includes(currentSquareNum) && !secondFromLeftEdge.includes(currentSquareNum)) {
							checkIfLegalMove(squareToCheckNum, moveToAdd);
							checkIfPieceIsProtecting(squareToCheckNum);
							checkIfPieceIsChecking(squareToCheckNum, moveToAdd);
						}
					} else if (direction === -17 || direction === 15) {
						if (!leftEdge.includes(currentSquareNum)) {
							checkIfLegalMove(squareToCheckNum, moveToAdd);
							checkIfPieceIsProtecting(squareToCheckNum);
							checkIfPieceIsChecking(squareToCheckNum, moveToAdd);
						}
					} else if (direction === 10 || direction === -6) {
						if (!rightEdge.includes(currentSquareNum) && !secondFromRightEdge.includes(currentSquareNum)) {
							checkIfLegalMove(squareToCheckNum, moveToAdd);
							checkIfPieceIsProtecting(squareToCheckNum);
							checkIfPieceIsChecking(squareToCheckNum, moveToAdd);
						}
					} else if (direction === -15 || direction === 17) {
						if (!rightEdge.includes(currentSquareNum)) {
							checkIfLegalMove(squareToCheckNum, moveToAdd);
							checkIfPieceIsProtecting(squareToCheckNum);
							checkIfPieceIsChecking(squareToCheckNum, moveToAdd);
						}
					}
				}

				checkingPieceFail = false;
				checkingArr = [];
				protectedPiece = false;
				friendlyPieceFound = false;
				opponentPieceFound = false;
				kingLocationFound = false;
				friendlyBlockingPieceFound = false;
			});
		}
	};

	const pawnMove = () => {
		if (currentPieceName === 'p' || currentPieceName === 'P') {
			currentPieceObject.movements.map(dir => {
				direction = dir;
				const squareToCheckNum = currentSquareNum + direction;
				const moveToAdd = currentSquareNum + '-' + currentPieceName + '-' + squareToCheckNum + '-' + boardPieces[squareToCheckNum];

				if (squareToCheckNum >= 0 && squareToCheckNum <= 63) {
					if ((checkIfBlack(currentPieceName) && direction === south) || (checkIfWhite(currentPieceName) && direction === north)) {
						checkIfLegalVerticalPawnMove(squareToCheckNum, moveToAdd, false);
					} else if (
						(checkIfBlack(currentPieceName) && direction === south * 2 && blackPawnStartingRow.includes(currentSquareNum)) ||
						(checkIfWhite(currentPieceName) && direction === north * 2 && whitePawnStartingRow.includes(currentSquareNum))
					) {
						checkIfLegalVerticalPawnMove(squareToCheckNum, moveToAdd, true);
					} else if (
						!isCurrentPieceOnEdgeAndMovingIntoIt() &&
						((checkIfBlack(currentPieceName) && (direction === southEast || direction === southWest)) || (checkIfWhite(currentPieceName) && (direction === northEast || direction === northWest)))
					) {
						checkIfPawnCanCapture(squareToCheckNum, moveToAdd);
						checkIfPieceIsProtecting(squareToCheckNum);
						checkIfPieceIsChecking(squareToCheckNum, moveToAdd);

						if (checkIfBlack(currentPieceName)) blackPawnProtectedSquares.push(squareToCheckNum);
						if (checkIfWhite(currentPieceName)) whitePawnProtectedSquares.push(squareToCheckNum);
					}
				}

				checkingPieceFail = false;
				checkingArr = [];
				protectedPiece = false;
				friendlyPieceFound = false;
				opponentPieceFound = false;
				kingLocationFound = false;
				friendlyBlockingPieceFound = false;
			});
		}
	};

	const kingMove = () => {
		if (currentPieceName === 'k' || currentPieceName === 'K') {
			currentPieceObject.movements.map(dir => {
				direction = dir;
				const squareToCheckNum = currentSquareNum + direction;
				const moveToAdd = currentSquareNum + '-' + currentPieceName + '-' + squareToCheckNum + '-' + boardPieces[squareToCheckNum];

				if (squareToCheckNum >= 0 && squareToCheckNum <= 63) {
					if (isCurrentPieceOnEdgeAndMovingIntoIt()) return;

					checkIfLegalKingMove(squareToCheckNum, moveToAdd);
					checkIfPieceIsProtecting(squareToCheckNum);

					if (isSquareOnEdgeAndNotVerticalMove(squareToCheckNum, moveToAdd)) return;
				}

				protectedPiece = false;
			});
			checkIfKingCanCastle();
		}
	};

	const calculatePieceMoves = () => {
		infiniteMove();
		knightMove();
		pawnMove();
		kingMove();
	};

	const calculateBlackMoves = () => {
		boardPieces.map((piece, i) => {
			currentSquareNum = i;
			currentPieceName = piece;

			if (piece === 'r') {
				currentPieceObject = BlackRook;
				calculatePieceMoves();
			}
			if (piece === 'b') {
				currentPieceObject = BlackBishop;
				calculatePieceMoves();
			}
			if (piece === 'q') {
				currentPieceObject = BlackQueen;
				calculatePieceMoves();
			}
			if (piece === 'n') {
				currentPieceObject = Blackknight;
				calculatePieceMoves();
			}
			if (piece === 'k') {
				currentPieceObject = BlackKing;
				calculatePieceMoves();
			}
			if (piece === 'p') {
				currentPieceObject = BlackPawn;
				calculatePieceMoves();
			}
		});
	};

	const calculateWhiteMoves = () => {
		boardPieces.map((piece, i) => {
			currentSquareNum = i;
			currentPieceName = piece;

			if (piece === 'R') {
				currentPieceObject = WhiteRook;
				calculatePieceMoves();
			}
			if (piece === 'B') {
				currentPieceObject = WhiteBishop;
				calculatePieceMoves();
			}
			if (piece === 'Q') {
				currentPieceObject = WhiteQueen;
				calculatePieceMoves();
			}
			if (piece === 'N') {
				currentPieceObject = Whiteknight;
				calculatePieceMoves();
			}
			if (piece === 'K') {
				currentPieceObject = WhiteKing;
				calculatePieceMoves();
			}
			if (piece === 'P') {
				currentPieceObject = WhitePawn;
				calculatePieceMoves();
			}
		});
	};

	const calculateMoves = () => {
		if (whoseTurnIsIt === 'w') {
			calculateBlackMoves();
			calculateWhiteMoves();
		} else if (whoseTurnIsIt === 'b') {
			calculateWhiteMoves();
			calculateBlackMoves();
		}
		console.log(blackLegalMoves);
		checkForCheckmate();

		setWhiteLegalMoves(dispatchBoardState, whiteLegalMoves);
		setBlackLegalMoves(dispatchBoardState, blackLegalMoves);

		setProtectedPiecesWhite(dispatchBoardState, whiteProtectedPieces);
		setProtectedPiecesBlack(dispatchBoardState, blackProtectedPieces);
		setPawnProtectedSquaresWhite(dispatchBoardState, whitePawnProtectedSquares);
		setPawnProtectedSquaresBlack(dispatchBoardState, blackPawnProtectedSquares);

		calculateBoardValues();
	};

	return { calculateMoves };
};

export default useCalculateMoves;
