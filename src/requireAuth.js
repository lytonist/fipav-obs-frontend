import { useAuth } from './userContext';

// API
import { authProvider as API } from './API/api';

const RequireAuth = async ({ children }) => {
    const [ user, setUser ] = useAuth();

    if (!user) {
        const token = localStorage.getItem('jwt');
        if (token) {
            try {
                const response = await API.verifyLogin(token);
                return children
            } catch (err) {
                console.error(err);
            }
        }
    }
}

export default RequireAuth;