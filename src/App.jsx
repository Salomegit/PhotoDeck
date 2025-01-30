import Landing from './pages/LandingPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PrivateRoute from './components/ProtectedRoute.jsx'
import UserPage from './pages/User.jsx'
import AlbumPage from './pages/Album.jsx'
import PhotoEdit from './pages/PhotoEdit.jsx'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

      return (
            <Router>
                  <Routes>

                        <Route path="/" element={<Landing />} />
                        <Route element={<PrivateRoute />}>
                              <Route path="/dashboard" element={
                                    <Dashboard />} />

                              <Route path="/albums/:albumId/photos/:photoId/edit" element={
                                    <PhotoEdit />

                              } />

                              <Route path="/user/:userId" element={
                                    <UserPage />
                              } />
                              <Route path="/album/:albumId" element={
                                    <AlbumPage />
                              } />
                        </Route>

                  </Routes>
            </Router >
      )
}

export default App;
