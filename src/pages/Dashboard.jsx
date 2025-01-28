// pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchUserDetails = async () => {

    try {
      const success = auth.onAuthStateChanged(async(user) => {
        console.log(success)
        if (user) {
     

      const docRef = doc(db, 'users', user.uid);
      const docQuery = await getDoc(docRef);
      if (docQuery.exists()) {
        setUserDetails(docQuery.data());
      } else {
        console.log('User is not Logged in');
      }
      setLoading(false);
    }
    else {
      console.log('User is not Logged in');
    }})}

    catch (error) {
      console.error('Failed to fetch user details:', error);
      setError('Failed to fetch user details. Please try again later.');
      setLoading(false);
    }
  }



  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    try {

      await auth.signOut();
      navigate('/login')
      console.log('User is Logged out')
    } catch (error) {
      console.error('Failed to logout:', error);
    }

  }


  if (loading) 
  <div>Loading...</div>


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Users</h1>
      {userDetails ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userDetails && (
            <div className="bg-white p-4 rounded-lg shadow-md">
              {/* <h2 className="text-xl font-bold text-gray-800 mb-2">{userDetails.first_name}</h2> */}
              <img src={userDetails.photo} alt="user photo" className="w-24 h-24 rounded-full mx-auto" />
              <p className="text-gray-600">{userDetails.firstName}</p>
              <p className="text-gray-600">{userDetails.email}</p>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{userDetails.displayName}</h2>
            </div>
          )}
          <div className='flex justify-center m-5 p-5'>

            <button onClick={handleLogout} className='m-5 p-5 bg-red-700 text-white'>Logout</button>
          </div>
        </div>

      ) : (
        <p>......loading</p>
      )}
    </div>
  );}
