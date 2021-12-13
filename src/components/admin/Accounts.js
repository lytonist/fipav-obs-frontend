import React, { useEffect, useState } from "react";

// Api
import { serviceProvider as API } from "../../API/api";

// Context
import { useTitle } from "../../contexts/titleContext";

// Components
import UserList from "./accounts/UserList";
import UserModal from "./accounts/UserModal";

const Accounts = () => {
    const [ title, setTitle ] = useTitle();
    const [ users, setUsers ] = useState([]);
    const [ newUserModal, setNewUserModal ] = useState(true);

    useEffect(() => {
        setTitle('Gestione Accounts');
    }, [setTitle]);

    useEffect(() => {
        API.get('users', true)
            .then(res => {
                res.success && setUsers(res.users);
            });
    }, []);

    function toggleUserModal() {
        setNewUserModal(!newUserModal);
        if (!newUserModal) {
            document.querySelector('[modal-backdrop]').remove();
        } else {
            const backdropEl = document.createElement('div');
            backdropEl.setAttribute('modal-backdrop', '');
            backdropEl.classList.add('bg-gray-900', 'bg-opacity-50', 'fixed', 'inset-0', 'z-40');
            document.querySelector('body').append(backdropEl);
        }
    }

    return (
        <main className="container mx-auto px-5 py-20 lg:px-10 md:py-48">
            Accounts Page
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden sm:rounded-lg shadow-md mb-2">
                            <table className="min-w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider dark:text-gray-400">
                                            Nome
                                        </th>
                                        <th scope="col" className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider dark:text-gray-400">
                                            Ruolo
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <UserList users={users} />
                            </table>
                        </div>
                        <button
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={toggleUserModal}
                        >
                            Nuovo Utente
                        </button>
                    </div>
                </div>
            </div>
            <UserModal newUserModal={newUserModal} toggleUserModal={toggleUserModal} />
        </main>
    )
}

export default Accounts;