import React from "react";

const RefRow = ({ referee, setModalType, setReferee, toggleRefModal }) => {
    function editReferee() {
        setModalType('edit');
        setReferee(referee);
        toggleRefModal();
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="table-td font-medium text-gray-900 dark:text-white">
                { referee.lastname }
            </td>
            <td className="table-td font-medium text-gray-900 dark:text-white">
                { referee.firstname }
            </td>
            <td className="table-td hidden md:table-cell text-gray-500 dark:text-gray-400">
                { referee.email }
            </td>
            <td className="table-td text-right font-medium">
                <button
                    type="button"
                    onClick={editReferee}
                    className="btn-edit py-1 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                >
                    Modifica
                </button>
            </td>
        </tr>
    )
}

const RefList = ({ referees, setModalType, setReferee, toggleRefModal }) => {
    const listReferess = referees.map(referee =>
        <RefRow 
            key={referee._id} 
            referee={referee} 
            setModalType={setModalType} 
            setReferee={setReferee} 
            toggleRefModal={toggleRefModal} 
        />
    );

    return (
        <tbody>
            { listReferess }
        </tbody>
    );
};

export default RefList;