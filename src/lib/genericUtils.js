const genShortid = () => {
    let shortid = '';
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      
    for (let i = 1; i <= 10; i++) {
        const char = Math.floor(Math.random() * str.length + 1);
        shortid += str.charAt(char);
    }
      
    return shortid;
}

export default genShortid;