import React, { useState } from "react";
import { serviceProvider as API } from "../../../API/api";

const RefModal = ({ modal, modalType, referee, setReferee, setReferees, toggleRefModal }) => {
    const { firstname, lastname, committee, email } = referee;
    const [ error, setError ] = useState('');

    function closeModal() {
        setError('');
        toggleRefModal();
    }

    function handleInput(e) {
        const { name, value } = e.currentTarget;
        setReferee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function newReferee(e) {
        e.preventDefault();
        API.insert('referees', JSON.stringify(referee), true)
            .then(res => {
                if (res?.success) {
                    setReferees(prevState => [...prevState, res.referee]
                        .sort((a, b) => {
                            if (a.lastname.toUpperCase() > b.lastname.toUpperCase()) return 1;
                            if (a.lastname.toUpperCase() < b.lastname.toUpperCase()) return -1;
                            return 0;
                        })
                    );
                    closeModal();
                } else {
                    setError(res?.msg || 'Qualcosa è andato storto, si prega di riprovare');
                }
            })
            .catch (err => {
                console.error(err);
                setError('Qualcosa è andato storto, si prega di riprovare');
            });
    }

    function editReferee(e) {
        e.preventDefault();
        API.update(`referees/${referee._id}`, JSON.stringify(referee), true)
            .then(res => {
                if (res?.success) {
                    setReferees(prevState => {
                        const index = prevState.findIndex(r => r._id === referee._id);
                        prevState[index] = referee;
                        return prevState
                            .sort((a, b) => {
                                if (a.lastname.toUpperCase() > b.lastname.toUpperCase()) return 1;
                                if (a.lastname.toUpperCase() < b.lastname.toUpperCase()) return -1;
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

    function deleteReferee(e) {
        e.preventDefault();
        API.delete(`referees/${referee._id}`, true)
            .then(res => {
                if (res?.success) {
                    setReferees(prevState => prevState.filter(r => r._id !== referee._id));
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
        <div aria-hidden={modal ? 'false' : 'true'} aria-modal={modal ? 'true' : 'false'} className={`overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 justify-center items-center ${modal ? 'flex' : 'hidden'}`}>
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
                        <h3 className="text-xl font-medium text-gray-900 text-center dark:text-white">{modalType === 'edit' ? 'Modifica' : 'Nuovo'} Arbitro</h3>
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
                        <div className="flex space-x-2 justify-between">
                            <div>
                                <label htmlFor="committee" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Comitato</label>
                                <select 
                                    name="committee" 
                                    value={ committee }
                                    onChange={ handleInput }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    required
                                >
                                    <option value="ak">Akranis</option>
                                    <option value="ct">Catania</option>
                                    <option value="me">Messina</option>
                                    <option value="mi">Monti Iblei</option>
                                    <option value="pa">Palermo</option>
                                    <option value="tp">Trapani</option>
                                </select>
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
                        </div>
                        <div>
                            <button 
                                type="submit" 
                                className={`w-full ${ modalType === 'edit' ? 'btn-edit' : 'btn-default' } mr-3 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                                onClick={ modalType === 'edit' ? editReferee : newReferee }
                            >
                                { modalType === 'edit' ? 'Modifica' : 'Crea'} Arbitro
                            </button>
                            { modalType === 'edit' && (
                                <button 
                                    className="w-full btn-delete"
                                    onClick={ deleteReferee }
                                >
                                    Elimina Arbitro
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div> 
    );
};

export default RefModal;