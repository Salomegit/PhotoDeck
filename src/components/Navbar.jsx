import { useState } from 'react';
import { auth } from '../services/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Menu, X } from 'lucide-react';
import { useUser } from '../contexts/UserAuthContext';

const Navbar = () => {
  const { isLoggedIn, userDetails, setIsLoggedIn, setUserDetails } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in:', result.user);
      navigate('/dashboard'); // Redirect to dashboard after login
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setUserDetails({});
      navigate('/'); // Redirect to home after logout
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="p-4 bg-blue-100 border-b border-gray-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <a href="/">PhotoDeck</a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {isLoggedIn && location.pathname !== '/dashboard' && (
            <a 
              href="/dashboard" 
              className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 shadow-sm hover:bg-gray-800 hover:text-white transition duration-300"
            >
              View Dashboard
            </a>
          )}
          {isLoggedIn && location.pathname !== '/' && (
            <a 
              href="/" 
              className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 shadow-sm hover:bg-gray-800 hover:text-white transition duration-300"
            >
              Go to Home
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Auth Section (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-2">
                {userDetails?.photo && (
                  <img
                    src={userDetails.photo}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {userDetails?.firstName || 'Welcome...'}
                  </h2>
                  <p className="text-sm text-gray-600">{userDetails?.email || ''}</p>
                </div>
              </div>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Login with Google
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-3">
          {isLoggedIn && location.pathname !== '/dashboard' && (
            <a 
              href="/dashboard" 
              className="w-full text-center px-4 py-2 text-gray-700 font-medium border border-gray-300 shadow-sm rounded-lg hover:bg-gray-800 hover:text-white transition duration-300"
            >
              View Dashboard
            </a>
          )}
          {isLoggedIn && location.pathname !== '/' && (
            <a 
              href="/" 
              className="w-full text-center px-4 py-2 text-gray-700 font-medium border border-gray-300 shadow-sm rounded-lg hover:bg-gray-800 hover:text-white transition duration-300"
            >
              Go to Home
            </a>
          )}
          
          {/* Auth Section (Mobile) */}
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-2">
                {userDetails?.photo && (
                  <img
                    src={userDetails.photo}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {userDetails?.firstName || 'Welcome...'}
                  </h2>
                  <p className="text-sm text-gray-600">{userDetails?.email || ''}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Login with Google
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;