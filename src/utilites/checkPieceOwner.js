/**
 * Checks if a piece is black.
 * @param {*} piece takes in a piece ('B', 'r', etc)
 * @returns
 */
export const checkIfBlack = piece => {
	if (piece === piece.toLowerCase()) {
		return true;
	} else {
		return false;
	}
};
/**
 * Checks if a piece is white.
 * @param {*} piece takes in a piece ('B', 'r', etc)
 * @returns
 */
export const checkIfWhite = piece => {
	if (piece === piece.toUpperCase()) {
		return true;
	} else {
		return false;
	}
};

/**
 * Checks if a piece is opponent
 * @param {*} currentPieceName
 * @param {*} pieceToCheck
 * @returns
 */
export const checkIfOpponentPiece = (currentPieceName, pieceToCheck) => {
	if (pieceToCheck !== ' ' && checkIfBlack(currentPieceName) && checkIfWhite(pieceToCheck)) return true;
	if (pieceToCheck !== ' ' && checkIfWhite(currentPieceName) && checkIfBlack(pieceToCheck)) return true;
};

/**
 * Checks if a piece is friendly
 * @param {*} currentPieceName
 * @param {*} pieceToCheck
 * @returns
 */
export const checkIfFriendlyPiece = (currentPieceName, pieceToCheck) => {
	if (pieceToCheck !== ' ' && checkIfBlack(currentPieceName) && checkIfBlack(pieceToCheck)) return true;
	if (pieceToCheck !== ' ' && checkIfWhite(currentPieceName) && checkIfWhite(pieceToCheck)) return true;
};
