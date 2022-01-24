import React, { useEffect } from "react";

// Context
import { useTitle } from '../../contexts/titleContext';

// Components
import ReportForm from "./reports/ReportForm";
import ReportTable from "./reports/ReportTable";

function Reports() {
    const [ title, setTitle ] = useTitle();

    useEffect(() => {
        setTitle('Report');
    }, [setTitle]);

    return (
        <main className="container mx-auto px-5 py-20 lg:px-10 md:py-48">
            <button className="btn-default mb-4">Nuovo Report</button>
            <ReportForm />
            <ReportTable />
        </main>
    )
}

export default Reports;