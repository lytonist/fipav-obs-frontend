import React from "react";

// Components
import LoginBox from "./LoginBox";

// Images
import courtImage from '../images/court.jpg';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-blue-500 to-blue-400">
            <div className="container mx-auto text-center flex flex-wrap items-center justify-center gap-4 px-5 py-20 lg:px-10 md:py-48">
                <div className="py-10">
                    <img src={courtImage} className="rounded w-80 md:w-96 md:h-96" alt="Campo di Gioco" />
                </div>
                <div>  
                    { <LoginBox /> }
                </div>
            </div>
            
        </header>
    )
}

export default Header;