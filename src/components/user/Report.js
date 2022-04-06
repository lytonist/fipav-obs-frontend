import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useReport } from "../../contexts/reportContext";
import { useTitle } from "../../contexts/titleContext";

// Component
import ReportPreview from "./reports/ReportPreview";

function Report () {
    const [ { referee, report }, setReport ] = useReport();
    const [ title, setTitle ] = useTitle();
    let navigate = useNavigate();

    const goBack = () => {
        setReport({ referee: {}, report: {} });
        navigate('/');
    }

    useEffect(() => {
        setTitle('Report Osservazione');
    }, [setTitle]);

    useEffect(() => {
        // Error Handling: if undefined, go back to login
        !report?.general && goBack();
    }, [report])

    return (
        <main className="container mx-auto min-h-screen px-5 py-20 lg:px-10 md:py-48">
            <div className="flex gap-2 items-center">
                <button
                    className="btn-default mb-4"
                    onClick={ goBack }
                >
                    Indietro
                </button>
            </div>
            {
                report?.general && <ReportPreview report={report} restricted={false} showReferee={referee} />
            }
        </main>
    )
}

export default Report;