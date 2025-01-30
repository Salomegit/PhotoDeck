import Landing from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/ProtectedRoute'
import UserPage from './pages/User'
import AlbumPage from './pages/Album'
import PhotoEdit from './pages/PhotoEdit'
import { UserProvider } from './contexts/UserAuthContext'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <UserProvider>
      <Routes>
        
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard"  element={
              <Dashboard />} />
        <Route element={<PrivateRoute />}>

        <Route path="/user/:userId" element={
              <UserPage />
        } />
        <Route path="/album/:albumId" element={
              <AlbumPage />
        } />
        
        <Route path="/album/:albumId/photo/:photoId/edit" element={
              <PhotoEdit />

        } />
        </Route>

      </Routes>
      </UserProvider>
      </Router >
      )
}

      export default App;
