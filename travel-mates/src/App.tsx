import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignIn from './pages/Auth/SignIn'
import SignUp from './pages/Auth/SignUp'

function App() {

  return (
    <>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
