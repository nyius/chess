export const whitePawnMovements = [-8, -16, -7, -9];
export const blackPawnMovements = [8, 16, 9, 7];
export const rookMovements = [-8, 8, 1, -1];
export const bishopMovements = [-7, -9, 9, 7];
export const queenMovements = [-8, 8, 1, -1, -7, -9, 9, 7];
export const kingMovements = [-8, 8, 1, -1, -7, -9, 9, 7];
export const knightMovements = [-15, -17, -10, 6, 15, 17, 10, -6];

export const north = -8;
export const south = 8;
export const east = 1;
export const west = -1;
export const northEast = -7;
export const northWest = -9;
export const southEast = 9;
export const southWest = 7;

export const leftEdge = [56, 48, 40, 32, 24, 16, 8, 0];
export const rightEdge = [63, 55, 47, 39, 31, 23, 15, 7];
export const secondFromRightEdge = [62, 54, 46, 38, 30, 22, 14, 6];
export const secondFromLeftEdge = [1, 9, 17, 25, 33, 41, 49, 57];
export const topEdge = [0, 1, 2, 3, 4, 5, 6, 7];
export const bottomEdge = [56, 57, 58, 59, 60, 61, 62, 63];
export const whitePawnStartingRow = [48, 49, 50, 51, 52, 53, 54, 55];
export const blackPawnStartingRow = [8, 9, 10, 11, 12, 13, 14, 15];

export const pawnValue = 1;
export const bishopValue = 3;
export const knightValue = 3;
export const rookValue = 5;
export const queenValue = 9;
export const kingValue = 1;

export const centerSquaresValue = 3;
export const centerFlankSquaresValue = 2;

export const centerSquares = [27, 28, 35, 36];
export const centerSquaresFlank = [18, 19, 20, 21, 29, 37, 45, 44, 43, 42, 34, 26];

export const chessSquaresNotation = [
	'a8',
	'b8',
	'c8',
	'd8',
	'e8',
	'f8',
	'g8',
	'h8',
	'a7',
	'b7',
	'c7',
	'd7',
	'e7',
	'f7',
	'g7',
	'h7',
	'a6',
	'b6',
	'c6',
	'd6',
	'e6',
	'f6',
	'g6',
	'h6',
	'a5',
	'b5',
	'c5',
	'd5',
	'e5',
	'f5',
	'g5',
	'h5',
	'a4',
	'b4',
	'c4',
	'd4',
	'e4',
	'f4',
	'g4',
	'h4',
	'a3',
	'b3',
	'c3',
	'd3',
	'e3',
	'f3',
	'g3',
	'h3',
	'a2',
	'b2',
	'c2',
	'd2',
	'e2',
	'f2',
	'g2',
	'h2',
	'a1',
	'b1',
	'c1',
	'd1',
	'e1',
	'f1',
	'g1',
	'h1',
];

export const WhiteQueen = {
	movements: queenMovements,
	infiniteMove: true,
	canCheckKing: true,
	canProtectPieces: true,
};

export const BlackQueen = {
	movements: queenMovements,
	infiniteMove: true,
	canCheckKing: true,
	canProtectPieces: true,
};

export const BlackRook = {
	movements: rookMovements,
	infiniteMove: true,
	canCheckKing: true,
	canProtectPieces: true,
	queenRookMoved: false,
	kingRookMoved: false,
};

export const WhiteRook = {
	movements: rookMovements,
	infiniteMove: true,
	canCheckKing: true,
	canProtectPieces: true,
	queenRookMoved: false,
	kingRookMoved: false,
};

export const WhiteBishop = {
	movements: bishopMovements,
	infiniteMove: true,
	canCheckKing: true,
	canProtectPieces: true,
};

export const BlackBishop = {
	movements: bishopMovements,
	infiniteMove: true,
	canCheckKing: true,
	canProtectPieces: true,
};

export const Whiteknight = {
	movements: knightMovements,
	infiniteMove: false,
	canCheckKing: true,
	canProtectPieces: true,
};

export const Blackknight = {
	movements: knightMovements,
	infiniteMove: false,
	canCheckKing: true,
	canProtectPieces: true,
};

export const WhitePawn = {
	movements: whitePawnMovements,
	infiniteMove: false,
	canCheckKing: true,
	canProtectPieces: true,
};

export const BlackPawn = {
	movements: blackPawnMovements,
	infiniteMove: false,
	canCheckKing: true,
	canProtectPieces: true,
};

export const WhiteKing = {
	movements: kingMovements,
	infiniteMove: false,
	canCheckKing: false,
	canProtectPieces: true,
	canCastle: true,
};

export const BlackKing = {
	movements: kingMovements,
	infiniteMove: false,
	canCheckKing: false,
	canProtectPieces: true,
	canCastle: true,
};
