import React from "react";
import { serviceProvider as API } from "../../../API/api";

function ReportModal({ action, modal, report, setButton, setError, setReports, toggleModal }) {

    function sendReport(e) {
        e.preventDefault();
        switch (action) {
            case 'new':
                API.insert('reports', JSON.stringify(report), true)
                    .then(res => {
                        if (res?.success) {
                            setReports(prevState => [...prevState, res.report]);
                            setButton('new');
                        } else {
                            setError(res?.msg || 'Qualcosa è andato storto, si prega di riprovare');
                            setButton('new');
                        }
                    });
            break;
            case 'edit':
                API.update(`reports/${report._id}`, JSON.stringify(report), true)
                    .then(res => {
                        if (res?.success) {
                            setReports(prevState => [...prevState.filter(report => report._id !== res.report._id), res.report]);
                            setButton('new');
                        } else {
                            setError(res?.msg || 'Qualcosa è andato storto, si prega di riprovare');
                            setButton('new');
                        }
                    });
            break;
            case 'delete':
                API.delete(`reports/${report._id}`, true)
                    .then(res => {
                        if (res?.success) {
                            setReports(prevState => prevState.filter(report => report._id !== res.report._id));
                            setButton('new');
                        } else {
                            setError(res?.msg || 'Qualcosa è andato storto, si prega di riprovare');
                            setButton('new');
                        }
                    })
            break;
            default:
                // action is pre-set, no need to set a default case
        }
        
        toggleModal(e);
    }

    return (
        <div id="reportModal" aria-hidden={ modal ? 'false' : 'true' } className={ `${ modal ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0` }>
            <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal body --> */}
                    <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            Confermi la correttezza dei dati e l'inserimento del report?
                        </p>
                    </div>
                    {/* <!-- Modal footer --> */}
                    <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button 
                            data-modal-toggle="reportModal" 
                            type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={sendReport}
                        >
                            Conferma
                        </button>
                        <button 
                            data-modal-toggle="reportModal" 
                            type="button" 
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600"
                            onClick={toggleModal}
                        >
                            Annulla
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportModal;