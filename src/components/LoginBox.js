import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../contexts/userContext";
import { useReport } from "../contexts/reportContext";

// Api
import { authProvider as AUTH } from '../API/api';

const LoginBox = () => {
    let navigate = useNavigate();
    const icons = [{
        status: true,
        svg: (
            <svg 
                className="absolute top-10 hover:text-gray-500 right-0 w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                </path>
                <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                </path>
            </svg>)
    }, {
        status: false,
        svg: (
            <svg 
                className="absolute top-10 hover:text-gray-500 right-0 w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                </path>
            </svg>)
    }];
    
    const [ email, setEmail ] = useState('');
    const [ error, setError ] = useState(undefined);
    const [ eyeOpen, setEyeOpen ] = useState(true);
    const [ icon, setIcon ] = useState(icons.find(i => !i.status).svg);
    const [ password, setPassword ] = useState('');
    const [ passwordType, setPasswordType ] = useState('password');
    const [ refereeAccess, setRefereeAccess ] = useState(false);
    const [ reportId, setReportId ] = useState('');
    const [ username, setUsername ] = useState('');

    const [ report, setReport ] = useReport();
    const [ user, setUser ] = useAuth();
    
    const toggleEyeOpen = () => {
        setEyeOpen(!eyeOpen);
        const svg = icons.find(i => i.status === eyeOpen).svg;
        setIcon(svg);
        eyeOpen && setPasswordType('text');
        !eyeOpen && setPasswordType('password');
    }

    const handleInput = e => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        if (name === 'username') setUsername(value);
        if (name === 'password') setPassword(value);
        if (name === 'email') setEmail(value);
        if (name === 'reportId') setReportId(value);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setError(undefined);
            const body = refereeAccess ? JSON.stringify({email, reportId}) : JSON.stringify({username, password});
            if (!refereeAccess) {
                await AUTH.signin(body, setUser, setError);
            } else {
                const response = await AUTH.accessReport(body);
                if (response.success) {
                    setReport(() => ({ referee: response.referee, report: response.report }));
                    navigate('/visualizza-report');
                } else {
                    setError(response.msg || 'Qualcosa è andato storto');
                }
            }
    }

    const toggleRefAccess = () => {
        setError(undefined);
        setRefereeAccess(!refereeAccess);
    }

    return (
        <form className="rounded shadow bg-gray-900 p-8 w-80" onSubmit={handleSubmit}>
            <div className="mb-2">
                <label htmlFor="referee-access" className="flex relative items-center mb-4 cursor-pointer">
                    <input 
                        type="checkbox" 
                        id="referee-access" 
                        className="sr-only"
                        checked={refereeAccess}
                        value={refereeAccess}
                        onChange={toggleRefAccess}
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full border border-gray-200 toggle-bg dark:bg-gray-700 dark:border-gray-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-200 block">Accesso Arbitri</span>
                </label>
            </div>
            <div className="mb-6">
                { error && <div className="rounded p-1 bg-red-400 bg-opacity-25 mb-3 ring-4 ring-red-500 text-gray-200">{error}</div> }
                { refereeAccess ?
                    <>
                        <label htmlFor="email" className="text-sm font-medium text-gray-200 block mb-2">E-Mail</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={email}
                            onChange={handleInput}
                            required="" 
                        />
                    </>
                    :
                    <>
                        <label htmlFor="username" className="text-sm font-medium text-gray-200 block mb-2">Username</label>
                        <input 
                            type="text"
                            id="username"
                            name="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={username}
                            onChange={handleInput}
                            required="" 
                        />
                    </>
                 }
                
            </div>
            <div className="mb-6 relative">
                { refereeAccess ? 
                    <>
                        <label htmlFor="reportId" className="text-sm font-medium text-gray-200 block mb-2">Codice Report</label>
                        <input 
                            type="text"
                            id="reportId"
                            name="reportId"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={reportId}
                            onChange={handleInput}
                            required="" 
                        />
                    </>
                    :
                    <>
                        <label htmlFor="password" className="text-sm font-medium text-gray-200 block mb-2">Password</label>
                        <input
                            type={passwordType}
                            id="password"
                            name="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-7"
                            value={password}
                            onChange={handleInput}
                            required="" 
                        />
                        <div onClick={toggleEyeOpen}>
                            {icon}
                        </div>
                    </>
                }
            </div>
            { !refereeAccess && 
                <div className="mb-6 relative text-gray-200">
                    Password dimenticata?
                </div>
            }
            <button type="submit" className="block w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
        </form>
    );
}

export default LoginBox;