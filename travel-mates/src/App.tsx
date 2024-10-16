import { Route, Routes } from 'react-router-dom';
import './App.css';
import TripListe from './pages/Trip/TripList';
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';
import TripCreate from './pages/Trip/TripCreate';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<TripListe />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUp />} />
				<Route path="/trip-create" element={<TripCreate />} />
			</Routes>
		</>
	);
}

export default App;
