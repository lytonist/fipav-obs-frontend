const getToken = () => {
    return localStorage.getItem('jwt');
};

const removeToken = () => {
    return localStorage.removeItem('jwt');
}

const setToken = (token) => {
    return localStorage.setItem('jwt', token);
}

export { getToken, removeToken, setToken };