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
    const [ modalState, setModalState ] = useState('new');
    const [ newUserModal, setNewUserModal ] = useState(true);
    const [user, setUser] = useState({
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        admin: false
    });

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

    function newUser() {
        setModalState('new');
        setUser({
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            admin: false
        });
        toggleUserModal();
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
                                            Nome
                                        </th>
                                        <th scope="col" className="table-th hidden md:table-cell dark:text-gray-400">
                                            E-Mail 
                                        </th>
                                        <th scope="col" className="table-th text-gray-700 dark:text-gray-400">
                                            Ruolo
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                { !users.length &&
                                    (<tbody>
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td className="table-td font-medium text-gray-900 text-center dark:text-white" colSpan="4">Nessun utente ancora inserito</td>
                                        </tr>
                                    </tbody>)
                                }
                                <UserList users={users} setModalState={setModalState} setUser={setUser} toggleUserModal={toggleUserModal} />
                            </table>
                        </div>
                        <button
                            type="button"
                            className="btn-default dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={newUser}
                        >
                            Nuovo Utente
                        </button>
                    </div>
                </div>
            </div>
            <UserModal newUserModal={newUserModal} toggleUserModal={toggleUserModal} modalState={modalState} user={user} setUser={setUser} setUsers={setUsers} />
        </main>
    );
}

export default Accounts;