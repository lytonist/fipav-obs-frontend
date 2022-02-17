import React from 'react';

function ReportRow({ index, report, setAction, setButton, setReport, toggleModal }) {
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

    return (
        <tr className={`border-b ${ index % 2 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-700' } dark:border-gray-600`}>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{new Date(report.general.date).toLocaleDateString('it-IT')}, {report.general.time}</td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{report.general.match_num}</td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{report.general.teams}</td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                {`${report.general.first_ref.lastname} ${report.general.first_ref.firstname[0]}.`}
                {report.general.second_ref && ` - ${report.general.second_ref.lastname} ${report.general.second_ref.firstname[0]}.`}
            </td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap text-right dark:text-gray-400 flex gap-1">
                <button className='btn-edit' onClick={editReport}>
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
                <button className='btn-delete' onClick={deleteReport}>
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
            </td>
        </tr>
    )
}

function ReportTable({ reports, setAction, setButton, setReport, toggleModal }) {

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
                                    reports.map((report, index) => {
                                        return <ReportRow index={index} key={index} report={report} setAction={setAction} setButton={setButton} setReport={setReport} toggleModal={toggleModal} />
                                    }
                                        
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