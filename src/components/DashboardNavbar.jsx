import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function NavbarDashboard({ setUserLoading }) {
  const [userDetails, setUserDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setUserLoading(true); // Notify Dashboard that user details are still loading
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const docRef = doc(db, 'users', user.uid);
            const docQuery = await getDoc(docRef);
            if (docQuery.exists()) {
              setUserDetails(docQuery.data() || {});
            } else {
              console.log('User data not found');
            }
          } else {
            console.log('User is not logged in');
            navigate('/login');
          }
          setUserLoading(false); // Notify Dashboard that user details are done loading
        });
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        setUserLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate, setUserLoading]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
      console.log('User logged out');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {userDetails?.photo && (
            <img
              src={userDetails.photo}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          )}
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {userDetails?.firstName || "Welcome"}
            </h2>
            <p className="text-sm text-gray-600">{userDetails?.email || ''}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
