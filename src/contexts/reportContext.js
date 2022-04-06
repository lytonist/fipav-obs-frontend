import React, { createContext, useContext, useState } from "react";

const ReportContext = createContext();

export function useReport() {
    return useContext(ReportContext);
}

const ReportProvider = ({ children }) => {
    const [state, setState] = useState({ referee: {}, report: {} });

    return (
        <ReportContext.Provider value={[state, setState]}>
            { children }
        </ReportContext.Provider>
    );
}

export default ReportProvider;