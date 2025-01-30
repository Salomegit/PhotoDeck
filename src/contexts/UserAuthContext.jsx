// src/context/UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { auth, db } from '../services/firebase'; // Adjust the path to your Firebase config
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  // Check if the user is logged in on component mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
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
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, userDetails, setIsLoggedIn, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
