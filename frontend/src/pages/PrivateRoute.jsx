import { useAuthContext } from '../hooks/useAuthContext';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;
