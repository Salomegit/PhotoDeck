import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../services/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { Menu, X } from 'lucide-react';
import { useUser } from '../contexts/UserAuthContext.jsx';
import React from 'react';

const NavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="px-4 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 shadow-sm hover:bg-gray-800 hover:text-white transition duration-300"
  >
    {children}
  </Link>
);

const AuthButton = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-lg transition-colors ${className}`}
  >
    {children}
  </button>
);

const Navbar = () => {
  const { isLoggedIn, userDetails, isLoading } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const UserProfile = () => (
    <div className="flex items-center gap-2">
      {userDetails?.photo && (
        <img
          src={userDetails.photo}
          alt="User profile"
          className="w-10 h-10 rounded-full"
        />
      )}
      <div>
        <h2 className="font-semibold text-gray-800">
          {userDetails?.firstName || 'Welcome!'}
        </h2>
        <p className="text-sm text-gray-600">{userDetails?.email}</p>
      </div>
    </div>
  );

  const MobileMenu = () => (
    <div className="md:hidden mt-4 flex flex-col items-center gap-3">
      {isLoggedIn && (
        <>
          {pathname !== '/dashboard' && (
            <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
              View Dashboard
            </NavLink>
          )}
          {pathname !== '/' && (
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Go to Home
            </NavLink>
          )}
          <UserProfile />
          <AuthButton
            onClick={handleLogout}
            className="w-full bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </AuthButton>
        </>
      )}
    </div>
  );

  if (isLoading) return null; // Or loading skeleton

  return (
    <nav className="p-4 bg-blue-100 border-b border-gray-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="text-xl font-bold text-gray-800">
          PhotoDeck
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-4">
                {pathname !== '/dashboard' && (
                  <NavLink to="/dashboard">View Dashboard</NavLink>
                )}
                {pathname !== '/' && <NavLink to="/">Go to Home</NavLink>}
              </div>
              <UserProfile />
              <AuthButton
                onClick={handleLogout}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </AuthButton>
            </>
          ) : (
            <AuthButton
              onClick={handleGoogleSignIn}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              Login with Google
            </AuthButton>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && <MobileMenu />}
    </nav>
  );
};

export default Navbar;