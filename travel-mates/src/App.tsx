import { Routes, Route } from 'react-router-dom'
import './App.css'
import SignIn from './pages/Auth/SignIn'

function App() {

  return (
    <>
      <Routes>
        <Route path='/sign-in' element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
