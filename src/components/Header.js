import React, { useState } from "react";

// Images
import courtImage from '../images/court.jpg';

const Header = () => {
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
    }]

    const [ eyeOpen, setEyeOpen ] = useState(true);
    const [ passwordType, setPasswordType ] = useState('password');
    const [ icon, setIcon ] = useState(icons.find(i => !i.status).svg);

    const toggleEyeOpen = () => {
        setEyeOpen(!eyeOpen);
        const svg = icons.find(i => i.status === eyeOpen).svg;
        setIcon(svg);
        eyeOpen && setPasswordType('text');
        !eyeOpen && setPasswordType('password');
    }
    return (
        <header className="bg-gradient-to-r from-blue-500 to-blue-400">
            <div class="container mx-auto text-center flex flex-wrap items-center justify-center gap-4 px-5 py-20 lg:px-10 lg:py-56">
                <div className="py-10">
                    <img src={courtImage} className="rounded w-80 md:w-96 md:h-96" />
                </div>
                <div>  
                    <form className="rounded shadow bg-gray-900 p-8 w-80 md:h-96">
                        <div className="mb-6">
                            <label htmlFor="email" className="text-sm font-medium text-gray-200 block mb-2">Username</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required="" />
                        </div>
                        <div className="mb-6 relative">
                            <label htmlFor="password" className="text-sm font-medium text-gray-200 block mb-2">Password</label>
                            <input type={passwordType} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-7" required="" />
                            <div onClick={toggleEyeOpen}>
                                {icon}
                            </div>
                        </div>
                        <div className="flex items-start mb-6">
                            <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" required="" />
                            
                            </div>
                            <div className="text-sm ml-3">
                            <label htmlFor="remember" className="font-medium text-gray-200">Remember me</label>
                            </div>
                        </div>
                        <button type="submit" className="block w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
                    </form>
                </div>
            </div>
            
        </header>
    )
}

export default Header;