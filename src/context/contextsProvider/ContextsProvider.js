import React from 'react';
import { BoardStateProvider } from '../boardState/BoardStateContext';

function ContextsProvider({ children }) {
	return <BoardStateProvider>{children}</BoardStateProvider>;
}

export default ContextsProvider;
