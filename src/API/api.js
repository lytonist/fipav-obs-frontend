import decode from 'jwt-decode';
import { getToken, removeToken, setToken } from '../lib/storageUtils';

// Main Variables
import mainConfigs from '../configs/main';
const { PATH, PROTOCOL } = mainConfigs;

// Common Fetch
async function fetchData(endpoint, method, body = undefined, requireAuth = false) {
    const url = `${PROTOCOL}://${PATH}/${endpoint}`;
    const options = {
        mode: 'cors',
        method: method,
        headers: { 'Content-Type': 'application/json' }
    }
    body && (options.body = body);
    requireAuth && (options.headers['Authorization'] = getToken());
    try {
        return await (await fetch(url, options)).json();
    } catch(err) {
        return {success: false, msg: 'Qualcosa è andato storto'}
    }
}

const authProvider = {

    signin: async (body, setUser, setError) => {
        fetchData('login', 'POST', body)
            .then(response => {
                if (response.success) {
                    setUser(response.user);
                    setToken(response.token.token);
                } else {
                    setError(response.msg || 'Qualcosa è andato storto');
                }
            })
            .catch(err => {
                console.error(err);
                setError('Qualcosa è andato storto');
            });
    },

    signout: (setUser) => {
        removeToken();
        setUser(undefined);
    },

    verifyLogin: async () => {
        const token = getToken();
        const decoded = token ? decode(token) : undefined;
        if (token && Date.now() / 1000 > decoded.exp) { // il token è scaduto
            removeToken();
            return false;
        }
        if (token && Date.now() / 1000 < decoded.exp) { // il token è ancora valido
            return await fetchData('protected', 'GET', undefined, true);
        }
        return false;
    }
};

const serviceProvider = {

    get: async (endpoint, requireAuth = false) => {
        return await fetchData(endpoint, 'GET', undefined, requireAuth);
    },

    insert: async (endpoint, data, requireAuth) => {
        return await fetchData(endpoint, 'POST', data, requireAuth);
    }
}

export { authProvider, serviceProvider };