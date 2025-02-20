import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const useAuth = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = !!user;

  return { user, isAuthenticated };
};

export default useAuth;
