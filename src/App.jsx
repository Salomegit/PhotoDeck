import Landing from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import LoginForm from './pages/Login'
import RegisterForm from './pages/Register'
// import { ToastContainer } from 'toastify'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      {/* <ToastContainer /> */}
      </Router >
      )
}

      export default App;
