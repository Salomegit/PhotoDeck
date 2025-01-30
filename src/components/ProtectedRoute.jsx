import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserAuthContext'; 

const PrivateRoute = () => {
  const { isLoggedIn } = useUser(); 

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;