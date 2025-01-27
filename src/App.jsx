import Landing from './pages/LandingPage'
// import HomePage from './pages/HomePage'
import LoginForm from './pages/login'
import RegisterForm from './pages/register'
// import { ToastContainer } from 'toastify'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      {/* <ToastContainer /> */}
      </Router >
      )
}

      export default App;
