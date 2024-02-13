import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContextsProvider from './context/contextsProvider/ContextsProvider';

// Pages ---------------------------------------------------------------------------------------------------//
import Index from './pages/index/Index';

function App() {
	return (
		<Router>
			<ContextsProvider>
				<div className="main-container" id="main-container">
					<Routes>
						<Route exact path="/" element={<Index />} />
					</Routes>
				</div>
			</ContextsProvider>
		</Router>
	);
}

export default App;
