import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './userContext';

const RequireAdmin = ({ children }) => {
    const [ user ] = useAuth();
    const navigate = useNavigate();

    if (user?.admin)
        return children;
    else
        return <Navigate to="/" />;
};

const RequireUser = ({ children }) => {
    const [ user ] = useAuth();
    const navigate = useNavigate();

    if (user)
        return children;
    else
    return <Navigate to="/" />;
};

export { RequireAdmin, RequireUser };