import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function useAuth() {
    return useContext(UserContext);
}

const UserProvider = ({ children }) => {
    const [state, setState] = useState(undefined);

    return (
        <UserContext.Provider value={[state, setState]}>
            { children }
        </UserContext.Provider>
    );
}

export default UserProvider;