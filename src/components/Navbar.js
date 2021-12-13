import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authProvider as AUTH } from '../API/api';

// Context
import { useAuth } from "../contexts/userContext";

const Navbar = () => {
    const [hiddenState, setHiddenState] = useState(true);
    const [ user, setUser ] = useAuth();

    const toggleHiddenState = () => {
        const elementsToHide = document.querySelectorAll('.hide-element');
        setHiddenState(!hiddenState);
        elementsToHide.forEach(el => {
            hiddenState && el.classList.remove('hidden');
            !hiddenState && el.classList.add('hidden');
        });
    }

    const logout = () => {
        AUTH.signout(setUser);
    }

    const privateMenu = (
        <>
            <Link to="/accounts" className="hover:bg-blue-400 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">
                <li className="rounded text-gray-200 hover:text-gray-900 bg-blue-500 hover:bg-blue-600 p-2">
                    Accounts
                </li>
            </Link>
            <Link to="/nuovo-report" className="hover:bg-blue-400 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">
                <li className="rounded text-gray-200 hover:text-gray-900 bg-blue-500 hover:bg-blue-600 p-2">
                    Nuovo Report
                </li>
            </Link>
            <Link to="/report-precedenti" className="hover:bg-blue-400 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0">
                <li className="rounded bg-blue-500 hover:bg-blue-600 text-gray-200 hover:text-gray-900 p-2">
                    Report Precedenti
                </li>
            </Link>
            <button 
                className="hover:bg-blue-400 border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:hover:text-blue-700 md:p-0"
                onClick={logout}    
            >
                <li className="rounded bg-blue-500 hover:bg-blue-600 text-gray-200 hover:text-gray-900 p-2">
                    Logout
                </li>
            </button>
        </>
    );

    return (
        <>
            { /* Navbar */ }
            <nav className="bg-gradient-to-r from-blue-600 to-blue-400 border-gray-200 px-2">
                <div className="container mx-auto flex flex-wrap items-center justify-between">
                    <Link to="/" className="flex">
                        <svg className="h-10 mr-3" width="51" height="70" viewBox="0 0 51 70" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0)"><path d="M1 53H27.9022C40.6587 53 51 42.7025 51 30H24.0978C11.3412 30 1 40.2975 1 53Z" fill="#76A9FA"/><path d="M-0.876544 32.1644L-0.876544 66.411C11.9849 66.411 22.4111 55.9847 22.4111 43.1233L22.4111 8.87674C10.1196 8.98051 0.518714 19.5571 -0.876544 32.1644Z" fill="#A4CAFE"/><path d="M50 5H23.0978C10.3413 5 0 15.2975 0 28H26.9022C39.6588 28 50 17.7025 50 5Z" fill="#1C64F2"/></g><defs><clipPath id="clip0"><rect width="51" height="70" fill="white"/></clipPath></defs></svg>
                            <span className="self-center text-lg font-semibold whitespace-nowrap">FlowBite</span>
                    </Link>
                    <button data-collapse-toggle="mobile-menu" type="button" className="md:hidden ml-3 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center" aria-controls="mobile-menu-2" aria-expanded="false" onClick={toggleHiddenState}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        <svg className="hidden w-6 h-6 hide-element" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    <div className="hidden md:block w-full md:w-auto text-center hide-element" id="mobile-menu">
                        <ul className="flex-col md:flex-row flex md:space-x-4 mt-4 md:mt-0 md:text-sm md:font-medium">
                            { user && privateMenu }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
