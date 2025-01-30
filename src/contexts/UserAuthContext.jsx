// src/context/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true); 

  // Check if the user is logged in on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsLoading(true)
      try {
        
        if (user) {
          setIsLoggedIn(true);
          const docRef = doc(db, 'users', user.uid);
          const docQuery = await getDoc(docRef);
          if (docQuery.exists()) {
            setUserDetails(docQuery.data());
          }
        } else {
          setIsLoggedIn(false);
          setUserDetails({});
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
        setUserDetails({});
        
      }
      finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, userDetails, setIsLoggedIn, setUserDetails,isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
