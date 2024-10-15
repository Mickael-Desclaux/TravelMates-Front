import { Route, Routes } from 'react-router-dom';
import './App.css';
import TripListe from './pages/Trip/TripList';
import SignIn from './pages/Auth/SignIn'
import SignUpMultiStepForm from './pages/Auth/SignUp';

function App() {

  return (
    <>
      <Routes>
      	<Route path="/" element={<TripListe />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path="/sign-up" element={<SignUpMultiStepForm />} />
      </Routes>
    </>
  )
}

export default App;
