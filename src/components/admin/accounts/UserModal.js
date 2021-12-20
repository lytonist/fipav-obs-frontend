import React, { useState } from "react";
import { serviceProvider as API } from "../../../API/api";

const UserModal = ({ modalState, newUserModal, toggleUserModal, user, setUser, setUsers }) => {
    const { username, password, firstname, lastname, email, admin } = user;
    const [ error, setError ] = useState('');

    const handleInput = e => {
        const { name, value } = e.currentTarget;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckbox = () => {
        setUser(prevState => ({
            ...prevState,
            admin: !user.admin
        }));
    };

    const closeModal = () => {
        setError('');
        toggleUserModal();
    };

    const newUser = e => {
        e.preventDefault();
            API.insert('users', JSON.stringify(user), true)
            .then(res => {
                if (res?.success) {
                    setUsers(prevState => [...prevState, res.user]
                        .sort((a, b) => {
                            if (a.lastname.toUpperCase() > b.lastname.toUpperCase()) return 1;
                            if (a.lastname.toUpperCase() < b.lastname.toUpperCase()) return -1;
                            return 0;
                        })
                        .sort((a, b) => {
                            if (!admin && b.admin) return 1;
                            if (a.admin && !b.admin) return -1;
                            return 0;
                        })
                    );
                    closeModal();
                } else {
                    setError(res?.msg || 'Qualcosa è andato storto, si prega di riprovare');
                }
            })
            .catch(err => {
                console.error(err);
                setError('Qualcosa è andato storto, si prega di riprovare');
            });
    };

    const editUser = e => {
        e.preventDefault();
        API.update(`users/${user._id}`, JSON.stringify(user), true)
            .then(res => {
                if (res?.success) {
                    setUsers(prevState => {
                        const index = prevState.findIndex(u => u._id === user._id);
                        prevState[index] = user;
                        return prevState
                            .sort((a, b) => {
                                if (a.lastname.toUpperCase() > b.lastname.toUpperCase()) return 1;
                                if (a.lastname.toUpperCase() < b.lastname.toUpperCase()) return -1;
                                return 0;
                            })
                            .sort((a, b) => {
                                if (!admin && b.admin) return 1;
                                if (a.admin && !b.admin) return -1;
                                return 0;
                            });
                    });
                    closeModal();
                } else {
                    setError(res?.msg || 'Qualcosa è andato storto, si prega di riprovare');
                }
            })
            .catch(err => {
                console.error(err);
                setError('Qualcosa è andato storto, si prega di riprovare');
            });
    }

    const deleteUser = e => {
        e.preventDefault();
        API.delete(`users/${user._id}`, true)
            .then(res => {
                if (res?.success) {
                    setUsers(prevState => prevState.filter(u => u._id !== user._id));
                    closeModal();
                } else {
                    setError(res?.msg || 'Qualcosa è andato storto, si prega di riprovare');
                }
            })
            .catch(err => {
                console.error(err);
                setError('Qualcosa è andato storto, si prega di riprovare');
            });
    }

    const resetPassword = e => {
        e.preventDefault();
        const body = JSON.stringify({ password: 'reset' });
        API.update(`users/${user._id}`, body, true)
            .then(res => {
                if (res?.success) {
                    closeModal();
                } else {
                    setError(res?.msg || 'Qualcosa è andato storto, si prega di riprovare');
                }
            })
            .catch(err => {
                console.error(err);
                setError('Qualcosa è andato storto, si prega di riprovare');
            });
    }

    return (
        <div aria-hidden={newUserModal ? 'true' : 'false'} aria-modal={newUserModal ? 'false' : true} className={`overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center ${newUserModal ? 'hidden' : 'flex'}`}>
            <div className="relative w-full max-w-lg px-4 h-full md:h-auto">
                { /* Modal content */ }
                <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                    <div className="flex justify-end p-2">
                        <button type="button" onClick={closeModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                        </button>
                    </div>
                    { error && <div className="rounded w-3/4 mx-auto text-center p-1 bg-red-400 bg-opacity-25 mb-3 ring-4 ring-red-500 text-gray-600">{error}</div> }
                    <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" action="#">
                        <h3 className="text-xl font-medium text-gray-900 text-center dark:text-white">{modalState === 'edit' ? 'Modifica' : 'Nuovo'} Utente</h3>
                        <div className="flex space-x-2 justify-between">
                            <div>
                                <label htmlFor="username" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Username</label>
                                <input
                                    type="text" 
                                    name="username"
                                    value={ username } 
                                    onChange={ handleInput }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    required 
                                />
                            </div>
                            <div>
                                { modalState === 'edit' ? 
                                (
                                    <button 
                                        type="button"
                                        onClick={ resetPassword }
                                        className="btn-edit mt-7 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                    >
                                        Reset Password
                                    </button>
                                )
                                : (
                                    <>
                                        <label htmlFor="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Password</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            placeholder="••••••••" 
                                            value={ password }
                                            onChange={ handleInput }
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                            required 
                                        />
                                    </>
                                ) }
                            </div>
                        </div>
                        <div className="flex space-x-2 justify-between">
                            <div>
                                <label htmlFor="firstname" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Nome</label>
                                <input 
                                    type="text" 
                                    name="firstname" 
                                    value={ firstname }
                                    onChange={ handleInput }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastname" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Cognome</label>
                                <input 
                                    type="text" 
                                    name="lastname" 
                                    value={ lastname }
                                    onChange={ handleInput }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={ email }
                                onChange={ handleInput }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="nome@mail.com" 
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input 
                                        aria-describedby="admin" 
                                        type="checkbox" 
                                        checked={ admin }
                                        onChange={ handleCheckbox }
                                        className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800" 
                                        required 
                                    />
                                </div>
                                <div className="text-sm ml-3">
                                <label htmlFor="admin" className="font-medium text-gray-900 dark:text-gray-300">Admin</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button 
                                type="submit" 
                                className={`w-full ${ modalState === 'edit' ? 'btn-edit' : 'btn-default' } mr-3 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                                onClick={ modalState === 'edit' ? editUser : newUser }
                            >
                                { modalState === 'edit' ? 'Modifica' : 'Crea'} Utente
                            </button>
                            { modalState === 'edit' && (
                                <button 
                                    className="w-full btn-delete"
                                    onClick={ deleteUser }
                                >
                                    Elimina Utente
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div> 
    );
};

export default UserModal;