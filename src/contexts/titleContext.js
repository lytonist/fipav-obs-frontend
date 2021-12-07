import React, { createContext, useContext, useState } from "react";

const TitleContest = createContext();

export function useTitle() {
    return useContext(TitleContest);
}

const TitleProvider = ({children}) => {
    const [ state, setState ] = useState('Portale Osservatori');

    return (
        <TitleContest.Provider value={[ state, setState ]}>
            { children }
        </TitleContest.Provider>
    );
}

export default TitleProvider;