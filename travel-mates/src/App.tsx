import { Route, Routes } from 'react-router-dom';
import './App.css';
import TripListe from './pages/Trip/TripList';

function App() {
	return (
		<Routes>
			<Route path="/" element={<TripListe />} />
		</Routes>
	);
}

export default App;
