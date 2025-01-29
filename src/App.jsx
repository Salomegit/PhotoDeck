import Landing from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import LoginForm from './pages/Login'
import RegisterForm from './pages/Register'
import UserPage from './pages/User'
import AlbumPage from './pages/Album'
import PhotoEdit from './pages/PhotoEdit'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/album/:albumId" element={<AlbumPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/photo/:photoId" element={<PhotoEdit />} />

      </Routes>
      {/* <ToastContainer /> */}
      </Router >
      )
}

      export default App;
