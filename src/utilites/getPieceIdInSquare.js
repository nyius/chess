/**
 * grabs a square, gets the piece inside of it and grabs its name (P, Q, r, k, etc)
 * @param {*} id takes in a square id to search ('square-3', etc)
 * @returns
 */
const getPieceIdInSquare = id => {
	const squareElement = document.getElementById(id);

	if (squareElement) return squareElement.children[1]?.id.split('-')[1];
};

export default getPieceIdInSquare;
