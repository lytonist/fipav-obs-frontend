import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/userContext';

const RequireAdmin = ({ children }) => {
    const [ user ] = useAuth();

    if (user?.admin)
        return children;
    else
        return <Navigate to="/" />;
};

const RequireUser = ({ children }) => {
    const [ user ] = useAuth();

    if (user)
        return children;
    else
        return <Navigate to="/" />;
};

export { RequireAdmin, RequireUser };