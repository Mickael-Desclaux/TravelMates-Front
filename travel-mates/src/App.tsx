import { Route, Routes } from 'react-router-dom';
import './App.css';
import TripListe from './pages/Trip/TripList';
import SignIn from './pages/Auth/SignIn'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import SignUpMultiStepForm from './pages/Auth/SignUp';
import Map from './pages/Map/Map';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<TripListe />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path="/sign-up" element={<SignUpMultiStepForm />} />
        <Route path="/map" element={<Map />} />
      </Routes>

      <ReactQueryDevtools/>
    </>
  )
}

export default App;
