import React, { useContext } from 'react';
import BoardStateContext from '../context/boardState/BoardStateContext';
import useMakeMove from './useMakeMove';
import checkPieceValue from '../utilites/checkPieceValue';
import checkSquareValue from '../utilites/checkSquareValue';
import { checkIfBlack, checkIfWhite, checkIfFriendlyPiece, checkIfOpponentPiece } from '../utilites/checkPieceOwner';

function useMakeAiMove() {
	const {
		dispatchBoardState,
		humanColor,
		whoseTurnIsIt,
		legalMovesBlack,
		legalMovesWhite,
		whiteCastle,
		blackCastle,
		evaluation,
		whitePieceCount,
		blackPieceCount,
		protectedPiecesWhite,
		protectedPiecesBlack,
		protectedPawnSquaresWhite,
		protectedPawnSquaresBlack,
		previousMove,
		boardPieces,
	} = useContext(BoardStateContext);
	const { makeMove } = useMakeMove();
	let allMoves = [];
	let move, opponentMovePiece;
	const movesObj = {};

	// Helpers ---------------------------------------------------------------------------------------------------//
	const getPieceTradeValue = (friend, opponent) => {
		const friendlyPiece = friend ? friend : move.split('-')[1];
		const opponentPiece = opponent ? opponent : move.split('-')[3];

		const friendlyPieceValue = checkPieceValue(friendlyPiece);
		const opponentPieceValue = checkPieceValue(opponentPiece);

		if (opponentPiece === ' ') return 0;
		return friendlyPieceValue - opponentPieceValue;
	};

	const checkIfOpponentPieceIsProtected = (pieceToCheck, squareToCheck) => {
		if ((checkIfBlack(pieceToCheck) && protectedPiecesWhite.includes(squareToCheck)) || (checkIfWhite(pieceToCheck) && protectedPiecesBlack.includes(squareToCheck))) return true;
	};

	const checkIfOpponentSquareIsProtected = (pieceToCheck, squareToCheck) => {
		const legalMovesToCheck = checkIfBlack(pieceToCheck) ? legalMovesWhite : legalMovesBlack;

		for (let i = 0; i < legalMovesToCheck.length; i++) {
			const opponentMoveSquare = Number(legalMovesToCheck[i].split('-')[2]);
			opponentMovePiece = legalMovesToCheck[i].split('-')[1];

			if (opponentMoveSquare === squareToCheck) return true;
		}
	};

	const checkIfFriendlyPieceIsProtected = (pieceToCheck, squareToCheck) => {
		if ((checkIfBlack(pieceToCheck) && protectedPiecesBlack.includes(squareToCheck)) || (checkIfWhite(pieceToCheck) && protectedPiecesWhite.includes(squareToCheck))) return true;
	};

	const checkIfFriendlySquareIsProtected = (pieceToCheck, squareToCheck) => {
		const legalMovesToCheck = checkIfBlack(pieceToCheck) ? legalMovesBlack : legalMovesWhite;

		for (let i = 0; i < legalMovesToCheck.length; i++) {
			const friendlyMoveSquare = Number(legalMovesToCheck[i].split('-')[2]);
			const friendlyMovePiece = legalMovesToCheck[i].split('-')[1];

			if (friendlyMoveSquare === squareToCheck) return true;
		}
	};

	const checkIfOpponentSquareIsProtectedByPawn = (pieceToCheck, squareToCheck) => {
		if ((checkIfBlack(pieceToCheck) && protectedPawnSquaresWhite.includes(squareToCheck)) || (checkIfWhite(pieceToCheck) && protectedPawnSquaresBlack.includes(squareToCheck))) return true;
	};

	const checkIfFriendlySquareIsProtectedByPawn = (pieceToCheck, squareToCheck) => {
		if ((checkIfBlack(pieceToCheck) && protectedPawnSquaresBlack.includes(squareToCheck)) || (checkIfWhite(pieceToCheck) && protectedPawnSquaresWhite.includes(squareToCheck))) return true;
	};

	const addPoints = points => {
		movesObj[move] += points;
	};

	// Point Givers ---------------------------------------------------------------------------------------------------//
	const givePointsByOpponentPieceValue = (currentPiece, opponentPiece, newSquare) => {
		if (opponentPiece !== ' ' && getPieceTradeValue() < 0) {
			if (checkIfOpponentPieceIsProtected(currentPiece, newSquare) || checkIfOpponentSquareIsProtectedByPawn(currentPiece, newSquare)) {
				addPoints(Math.abs(getPieceTradeValue() + 1)); // if protected, who cares take it
			} else {
				addPoints(Math.abs(getPieceTradeValue()) + 5); // if not protected, definitely take it
			}
		} else if (opponentPiece !== ' ' && getPieceTradeValue() === 0) {
			if (checkIfOpponentPieceIsProtected(currentPiece, newSquare) || checkIfOpponentSquareIsProtectedByPawn(currentPiece, newSquare)) {
				addPoints(2); // if protected, we can trade if we want but nothing amazing
			} else {
				addPoints(Math.abs(getPieceTradeValue()) + 5); // if not protected, definitely take it
			}
		} else if (opponentPiece !== ' ' && getPieceTradeValue() > 0) {
			if (checkIfOpponentPieceIsProtected(currentPiece, newSquare) || checkIfOpponentSquareIsProtectedByPawn(currentPiece, newSquare)) {
				addPoints(-(Math.abs(getPieceTradeValue()) + 5)); // if its protected, probably a bad move as we are losing
			} else {
				addPoints(-(Math.abs(getPieceTradeValue()) + 3)); // if its not protected, probably a bad move as we are losing
			}
		}
	};

	const givePointsByRecapture = (newSquare, currentPiece, opponentPiece) => {
		if (previousMove) {
			const pieceCapturedLastMove = previousMove.split(`-`)[3];
			const pieceCapturedLastMoveSquare = Number(previousMove.split(`-`)[2]);

			if (checkIfFriendlyPiece(currentPiece, pieceCapturedLastMove)) {
				if (newSquare === pieceCapturedLastMoveSquare) {
					if (checkPieceValue(currentPiece) > checkPieceValue(opponentPiece)) {
						if (checkIfOpponentPieceIsProtected(currentPiece, newSquare) || checkIfOpponentSquareIsProtectedByPawn(currentPiece, newSquare)) {
							addPoints(-(checkPieceValue(currentPiece) - checkPieceValue(opponentPiece) + 3)); // if its protected, probably a bad move and we are losing
						} else {
							addPoints(Math.abs(getPieceTradeValue()) + 2); // if not protected, probably recapture
						}
					}
					if (checkPieceValue(currentPiece) < checkPieceValue(opponentPiece)) {
						if (checkIfOpponentPieceIsProtected(currentPiece, newSquare) || checkIfOpponentSquareIsProtectedByPawn(currentPiece, newSquare)) {
							addPoints(Math.abs(getPieceTradeValue())); // if protected, probably still a good move to take it
						} else {
							addPoints(Math.abs(getPieceTradeValue()) + 2); // if not protected, definitely take it
						}
					}
					if (checkPieceValue(currentPiece) === checkPieceValue(opponentPiece)) {
						if (checkIfOpponentPieceIsProtected(currentPiece, newSquare) || checkIfOpponentSquareIsProtectedByPawn(currentPiece, newSquare)) {
							addPoints(1); // If protected, we can take it or not, equal trade
						} else {
							addPoints(Math.abs(getPieceTradeValue()) + 2); // if not protected, definitely take it
						}
					}
				}
			}
		}
	};

	const givePointsBySquare = (newSquare, currentPiece) => {
		addPoints(checkSquareValue(newSquare));

		if (checkIfOpponentSquareIsProtectedByPawn(currentPiece, newSquare)) {
			if (currentPiece === 'P' || currentPiece === 'p') {
				addPoints(1);
			} else {
				addPoints(-checkPieceValue(currentPiece));
			}
		}
		if (checkIfFriendlySquareIsProtectedByPawn(currentPiece, newSquare)) addPoints(1);
		if (checkIfOpponentSquareIsProtected(currentPiece, newSquare)) {
			if (getPieceTradeValue('', opponentMovePiece) > 0) addPoints(-(getPieceTradeValue(currentPiece) + 3));
			if (getPieceTradeValue('', opponentMovePiece) === 0) addPoints(1);
			if (getPieceTradeValue('', opponentMovePiece) < 0) addPoints(getPieceTradeValue(currentPiece) + 2);
		}
		if (checkIfFriendlySquareIsProtected(currentPiece, newSquare)) addPoints(1);
	};

	const givePointsForCastle = (newSquare, currentSquare, currentPiece) => {
		if (currentPiece === 'k' || currentPiece === 'K') {
			if ((currentSquare === 4 && newSquare === 6) || (currentSquare === 4 && newSquare === 2) || (currentSquare === 60 && newSquare === 62) || (currentSquare === 60 && newSquare === 58)) {
				addPoints(4);
			}
		}
	};

	const givePointsForMakingWayForCastle = (currentPiece, currentSquare) => {
		if (checkIfBlack(currentPiece) && blackCastle.includes('k')) {
			if ((currentPiece === 'b' && currentSquare === 5) || (currentPiece === 'n' && currentSquare === 6)) addPoints(1);
			if (currentPiece === 'r' && currentSquare === 7) addPoints(-1);
		}
		if (checkIfBlack(currentPiece) && blackCastle.includes('q')) {
			if ((currentPiece === 'b' && currentSquare === 2) || (currentPiece === 'n' && currentSquare === 1)) addPoints(1);
			if (currentPiece === 'r' && currentSquare === 0) addPoints(-1);
		}
		if (checkIfWhite(currentPiece) && blackCastle.includes('K')) {
			if ((currentPiece === 'B' && currentSquare === 61) || (currentPiece === 'N' && currentSquare === 62)) addPoints(1);
			if (currentPiece === 'R' && currentSquare === 63) addPoints(-1);
		}
		if (checkIfWhite(currentPiece) && blackCastle.includes('Q')) {
			if ((currentPiece === 'B' && currentSquare === 58) || (currentPiece === 'N' && currentSquare === 57)) addPoints(1);
			if (currentPiece === 'R' && currentSquare === 56) addPoints(-1);
		}
	};

	const givePoinstForBeingAttacked = (newSquare, currentSquare, currentPiece, opponentPiece) => {
		if (checkIfOpponentSquareIsProtectedByPawn(currentPiece, currentSquare)) {
			if (currentPiece === 'P' && currentPiece === 'p') {
				addPoints(1); // pawn being attacked by pawn
			} else {
				addPoints(5); // favor Running away to a square if being attacked by a pawn
			}
		}

		for (let i = 0; i < (checkIfBlack(currentPiece) ? legalMovesWhite.length : legalMovesBlack.length); i++) {
			let legalMoves = checkIfBlack(currentPiece) ? legalMovesWhite : legalMovesBlack;
			const opponentProtectedSquare = Number(legalMoves[i].split('-')[2]);
			const opponentProtectingPiece = legalMoves[i].split('-')[1];

			if (opponentProtectedSquare === currentSquare) {
				if (checkIfFriendlyPieceIsProtected(currentPiece, currentSquare)) {
					if (getPieceTradeValue('', opponentProtectingPiece) < 0) addPoints(1); // if we are protected and worth less than opponent, dont really want to move
					if (getPieceTradeValue('', opponentProtectingPiece) > 0) addPoints(Math.abs(checkPieceValue(currentPiece))); // if we are protected but worth more, run away
				}
				if (checkIfFriendlySquareIsProtectedByPawn(currentPiece, currentSquare)) {
					if (getPieceTradeValue('', opponentProtectingPiece) < 0) addPoints(1); // if we are protected and worth less than opponent, dont really want to move
					if (getPieceTradeValue('', opponentProtectingPiece) > 0) addPoints(Math.abs(checkPieceValue(currentPiece))); // if we are protected but worth more, run away
				}
			}
		}
	};

	const givePointsForProtectingFriend = (move, newSquare, currentSquare, currentPiece, opponentPiece) => {
		//
	};

	const makeAiMove = () => {
		if (whoseTurnIsIt !== humanColor) {
			if ((whoseTurnIsIt === 'b' && legalMovesBlack.length !== 0) || (whoseTurnIsIt === 'w' && legalMovesWhite.length !== 0)) {
				legalMovesBlack.map(currentMove => {
					movesObj[currentMove] = 0;
					move = currentMove;
					const currentSquare = Number(move.split('-')[0]);
					const newSquare = Number(move.split('-')[2]);
					const currentPiece = move.split('-')[1];
					const opponentPiece = move.split('-')[3];

					givePointsByOpponentPieceValue(currentPiece, opponentPiece, newSquare);
					givePointsBySquare(newSquare, currentPiece, opponentPiece);
					givePointsForCastle(newSquare, currentSquare, currentPiece);
					givePointsForMakingWayForCastle(currentPiece, currentSquare);
					givePointsByRecapture(newSquare, currentPiece, opponentPiece);
					givePoinstForBeingAttacked(newSquare, currentSquare, currentPiece, opponentPiece);
				});

				for (let moveKey in movesObj) {
					if (movesObj[moveKey] <= 0) {
						allMoves.push(moveKey);
					} else {
						for (let i = 0; i <= Math.pow(movesObj[moveKey], 3); i++) {
							allMoves.push(moveKey);
						}
					}
				}

				console.log(movesObj);

				const randomLegalMove = allMoves[Math.round(Math.random() * (allMoves.length - 1))];
				const prevSquare = Number(randomLegalMove.split('-')[0]);
				const newSquare = Number(randomLegalMove.split('-')[2]);
				const piece = randomLegalMove.split('-')[1];
				const droppedPiece = prevSquare + '-' + piece;

				setTimeout(() => {
					makeMove(piece, droppedPiece, newSquare, prevSquare);
				}, 500);
			}
		}
	};

	return { makeAiMove };
}

export default useMakeAiMove;
