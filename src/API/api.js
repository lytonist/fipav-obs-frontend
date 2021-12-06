import decode from 'jwt-decode';

const authProvider = {
    signin: async (body) => {
        const url = 'http://localhost:3001/api/v1/login';
        const options = {
            method: 'POST',
            body: body,
            headers: { 'Content-Type': 'application/json' }
        };
        return await (await fetch(url, options)).json();
    },

    verifyLogin: async () => {
        const token = localStorage.getItem('jwt');
        const decoded = token ? decode(token) : undefined;
        if (token && Date.now() / 1000 > decoded.exp) { // il token è scaduto
            console.log('token scaduto');
            localStorage.removeItem('jwt');
            return false;
        }
        if (token && Date.now() / 1000 < decoded.exp) { // il token è ancora valido
            console.log('token valido');
            const url = 'http://localhost:3001/api/v1/protected';
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            }
            return await (await fetch(url, options)).json();
        }
        return false;
    }
};

export { authProvider };