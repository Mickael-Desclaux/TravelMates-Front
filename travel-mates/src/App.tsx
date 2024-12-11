import { Route, Routes } from 'react-router-dom';
import './App.css';
import TripListe from './pages/Trip/TripList';
import SignIn from './pages/Auth/SignIn';
import SignUpMultiStepForm from './pages/Auth/SignUp';
import Map from './pages/Map/Map';
import TripCreate from './pages/Trip/TripCreate';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Profile from './pages/Profile/Profile';
import PinCreate from './pages/Pin/PinCreate';
import PinDetail from './pages/Pin/PinDetail';
import NavbarComponent from './components/Navbar/Navbar';
import TripDetail from './pages/Trip/TripDetail';
import ProfileEdit from './pages/Profile/ProfileEdit';
import ReviewCreate from './pages/Pin/ReviewCreate';
import ChatList from './pages/Chat/ChatList';
import Chat from './pages/Chat/Chat';
import ProtectRoute from './components/ProtectRoute/ProtectRoute';

function App() {

	return (
		<>
			<NavbarComponent />
			<Routes>
				<Route path="/" element={<TripListe />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-up" element={<SignUpMultiStepForm />} />
				<Route path="/trip-detail" element={<TripDetail />} />
				<Route path="/map" element={<Map />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/pin/:id" element={<PinDetail />} />

				<Route element={<ProtectRoute />}>
					<Route path="/trip-create" element={<TripCreate />} />
					<Route path="/profile-edit" element={<ProfileEdit />} />
					<Route path="/pin-create" element={<PinCreate />} />
					<Route path="/pin-review" element={<ReviewCreate />} />
					<Route path="/message" element={<ChatList />} />
					<Route path="/message/:id" element={<Chat />} />
				</Route>
			</Routes>

			<ReactQueryDevtools />
		</>
	);
}

export default App;
