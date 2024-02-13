import { setResetBoard, setTurnNum } from '../context/boardState/BoardStateActions';
import ParseFEN from './parseFEN';

const resetGame = (dispatchBoardState, fen) => {
	setResetBoard(dispatchBoardState);
	ParseFEN(fen, dispatchBoardState);
	setTurnNum(dispatchBoardState, 1);
};

export default resetGame;
