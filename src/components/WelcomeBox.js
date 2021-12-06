import React from 'react';

// Context
import { useAuth } from '../userContext';

// Icon
import ball from '../images/icons/volleyball.svg';

const WelcomeBox = () => {
    const [ user ] = useAuth();

    return (
        <div className="rounded shadow bg-gray-900 p-8 w-80 md:h-96">
            <span className="text-sm font-medium text-2xl text-gray-200 block mb-16">
                Benvenuto { user.username }
            </span>
            <img
                src={ ball }
                alt="Volleyball Icon" 
                className="w-1/3 animate-bounce mx-auto mb-10"
            />
            <span className="text-sm font-medium text-xl text-gray-200">
                Scegli cosa fare dal menu principale.
            </span>
        </div>
    )
}

export default WelcomeBox;