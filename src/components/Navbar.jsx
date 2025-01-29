import  { useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // Perform logout actions
      setIsLoggedIn(false);
      console.log('User logged out');
    } else {
      // Perform login actions
      setIsLoggedIn(true);
      console.log('User logged in');
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
      {/* Brand */}
      <div className="text-xl font-bold text-gray-800">
        <a href="/">PhotoDeck</a>
      </div>

      {/* Links */}
      <div className="flex space-x-6" >
        <a href="/dashboard" className="text-gray-700 hover:text-gray-900">
          View Dashboard
        </a>
       
      </div>

      {/* Auth Button */}
      <div>
        <button
          onClick={handleAuthClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isLoggedIn ? 'Logout' : 'Login with Google'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;