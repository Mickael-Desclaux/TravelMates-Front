import { Route, Routes } from 'react-router-dom';
import './App.css';
import TripListe from './pages/Trip/TripList';
import SignIn from './pages/Auth/SignIn';
import SignUpMultiStepForm from './pages/Auth/SignUp';
import Map from './pages/Map/Map';
import TripCreate from './pages/Trip/TripCreate';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Profile from './pages/Profile/Profile';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<TripListe />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUpMultiStepForm />} />
				<Route path="/trip-create" element={<TripCreate />} />
        		<Route path="/map" element={<Map />} />
        		<Route path="/profile" element={<Profile />} />
			</Routes>

			<ReactQueryDevtools />
		</>
	);
}

export default App;
