import React, { useEffect } from "react";
import { authProvider as API } from "../API/api";

// Context
import { useAuth } from '../userContext';

// Components
import LoginBox from "./LoginBox";

// Images
import courtImage from '../images/court.jpg';

const Header = () => {
    const [ user, setUser ] = useAuth();
    useEffect(() => {
        if (!user) {
            API.verifyLogin()
                .then(response => {
                    response && setUser (response.user);
                })
                .catch(err => console.error(err));
        }
    }, [user, setUser]);
    
    return (
        <header className="bg-gradient-to-r from-blue-500 to-blue-400">
            <div className="container mx-auto text-center flex flex-wrap items-center justify-center gap-4 px-5 py-20 lg:px-10 md:py-48">
                <div className="py-10">
                    <img src={courtImage} className="rounded w-80 md:w-96 md:h-96" alt="Campo di Gioco" />
                </div>
                <div>  
                    { !user && <LoginBox /> }
                    { user && <div>Benvenuto {user.username}</div> }
                </div>
            </div>
            
        </header>
    )
}

export default Header;