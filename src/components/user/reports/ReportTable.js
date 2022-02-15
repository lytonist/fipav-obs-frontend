import React from 'react';

function ReportRow({ index, report }) {
    return (
        <tr className={`border-b ${ index % 2 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-700' } dark:border-gray-600`}>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{new Date(report.general.date).toLocaleDateString('it-IT')}, {report.general.time}</td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{report.general.match_num}</td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">{report.general.teams}</td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                {`${report.general.first_ref.lastname} ${report.general.first_ref.firstname[0]}.`}
                {report.general.second_ref && ` - ${report.general.second_ref.lastname} ${report.general.second_ref.firstname[0]}.`}
            </td>
            <td className="py-4 px-6 text-sm text-gray-500 whitespace-nowrap text-right dark:text-gray-400">
                <button className='btn-edit'>Edit</button>
            </td>
        </tr>
    )
}

function ReportTable({ reports }) {

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
                                        return <ReportRow index={index} key={index} report={report} />
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