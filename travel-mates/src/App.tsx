import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignUp from './pages/Auth/SignUp'

function App() {

  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
