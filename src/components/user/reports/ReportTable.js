import React from 'react';
import { serviceProvider as API } from '../../../API/api';
import { useAuth } from '../../../contexts/userContext';

function ReportRow({ allReports, index, report, setAction, setButton, setReport, setReports, toggleModal }) {
    const [ user ] = useAuth();

    const editReport = e => {
        e.preventDefault();
        // Per modificare il report, tolgo i campi popolati
        setReport(() => ({
            ...report,
            general: {
                ...report.general,
                author: report.general.author._id,
                first_ref: report.general.first_ref._id,
                second_ref: report.general.second_ref?._id || undefined
            }
        }));
        setAction('edit');
        setButton('edit');
    }

    const deleteReport = e => {
        e.preventDefault();
        setReport(() => ({
            ...report,
            general: {
                ...report.general,
                author: report.general.author._id,
                first_ref: report.general.first_ref._id,
                second_ref: report.general.second_ref?._id || undefined
            }
        }));
        setAction('delete');
        toggleModal(e);
    }

    const handleValidation = e => {
        e.preventDefault();
        const valid = { valid: !report.valid }
        API.update(`reports/${report._id}`, JSON.stringify(valid), true)
            .then(res => {
                if (res?.success) {
                    setReports(prevState => {
                        return [...prevState.filter(report => report._id !== res.report._id), res.report].sort((a, b) => new Date(a.general.date) - new Date(b.general.date))});
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <tr className={`border-b ${ index % 2 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-700' } dark:border-gray-600`}>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{new Date(report.general.date).toLocaleDateString('it-IT')}, {report.general.time}</td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{report.general.match_num}</td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{report.general.teams}</td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                {`${report.general.first_ref.lastname} ${report.general.first_ref.firstname[0]}.`}
                {report.general.second_ref && ` - ${report.general.second_ref.lastname} ${report.general.second_ref.firstname[0]}.`}
            </td>
            {
                allReports && <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{report.general.author.lastname} {report.general.author.firstname[0]}.</td>
            }
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 flex gap-1">
                <button className='btn-edit' title="Modifica" onClick={editReport} disabled={report.valid}>
                    <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        >
                        </path>
                    </svg>
                </button>
                <button className='btn-delete' title="Elimina" onClick={deleteReport}>
                    <svg 
                        className="w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            strokeWidth="2" 
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        >
                        </path>
                    </svg>
                </button>
                {
                    user.admin && (
                        <button 
                            className={ report.valid ? "btn-confirm" : "btn-edit-outline" } 
                            title={ report.valid ? "Annulla omologazione" : "Omologa"}
                            onClick={ handleValidation }
                        >
                            <svg 
                                className="w-6 h-6" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24" 
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                >
                                </path>
                            </svg>
                        </button>
                    )
                }
            </td>
        </tr>
    )
}

function ReportTable({ allReports, reports, setAction, setButton, setReport, setReports, toggleModal }) {

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                        <table className="min-w-full">
                            <thead className="bg-gray-100 dark:bg-gray-700">
                                <tr>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Data
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Gara n.
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Squadre
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Arbitri
                                    </th>
                                    {
                                        allReports && (
                                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                                Osservatore
                                            </th>
                                        )
                                    }
                                    <th scope="col" className="relative py-3 px-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !reports.length && (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td 
                                                className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap text-center dark:text-gray-400" 
                                                colSpan="5"
                                            >
                                                Nessun report da visualizzare
                                            </td>
                                        </tr>
                                    )
                                }
                                {
                                    reports.map((report, index) => (
                                        <ReportRow 
                                            index={index} 
                                            key={index} 
                                            allReports={allReports} 
                                            report={report} 
                                            setAction={setAction} 
                                            setButton={setButton} 
                                            setReport={setReport} 
                                            setReports={setReports} 
                                            toggleModal={toggleModal} 
                                        />
                                        )
                                        
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportTable;