import React, { useEffect, useState } from 'react';
import { serviceProvider as API } from '../../API/api';

// Context
import { useTitle } from '../../contexts/titleContext';

// Components
import RefList from './referees/RefList';
import RefModal from './referees/RefModal';

const Referees = () => {
    const [ title, setTitle ] = useTitle();
    const [ modal, setModal ] = useState(false);
    const [ modalType, setModalType ] = useState('new');
    const [ referees, setReferees ] = useState([]);
    const [ referee, setReferee ]  = useState({
        firstname: '',
        lastname: '',
        committee: 'ak',
        email: ''
    });

    useEffect(() => {
        setTitle('Gestione Arbitri');
    }, [setTitle]);

    useEffect(() => {
        API.get('referees', true)
            .then(res => {
                res.success && setReferees(res.referees);
            });
    }, []);

    function newReferee() {
        setModalType('new');
        setReferee({
            firstname: '',
            lastname: '',
            committee: 'ak',
            email: ''
        });
        toggleRefModal();
    }

    function toggleRefModal() {
        setModal(!modal);
        if (modal) {
            document.querySelector('[modal-backdrop]').remove();
        } else {
            const backdropEl = document.createElement('div');
            backdropEl.setAttribute('modal-backdrop', '');
            backdropEl.classList.add('bg-gray-900', 'bg-opacity-50', 'fixed', 'inset-0', 'z-40');
            document.querySelector('body').append(backdropEl);
        }
    }

    return (
        <main className="container mx-auto h-screen px-5 py-20 lg:px-10 md:py-48">
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden sm:rounded-lg shadow-md mb-2">
                            <table className="min-w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="table-th text-gray-700 dark:text-gray-400">
                                            Cognome
                                        </th>
                                        <th scope="col" className="table-th text-gray-700 dark:text-gray-400">
                                            Nome
                                        </th>
                                        <th scope="col" className="table-th hidden md:table-cell text-gray-700 dark:text-gray-400">
                                            E-Mail
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                { !referees.length &&
                                    (<tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="table-td font-medium text-gray-900 text-center dark:text-white" colSpan="4">Nessun arbitro ancora inserito</td>
                                        </tr>
                                    </tbody>)
                                }
                                <RefList 
                                    referees={referees}
                                    setModalType={setModalType}
                                    setReferee={setReferee}
                                    toggleRefModal={toggleRefModal}
                                />
                            </table>
                        </div>
                        <button
                            type="button"
                            className="btn-default dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={ newReferee }
                        >
                            Nuovo Arbitro
                        </button>
                    </div>
                </div>
            </div>
            <RefModal modal={modal} modalType={modalType} referee={referee} setReferee={setReferee} setReferees={setReferees} toggleRefModal={toggleRefModal} />
        </main>
    );

}

export default Referees;