import React from 'react';

const Title = ({ title = 'Home' }) => {
    return (
        <div className="bg-gradient-to-r to-orange-500 from-orange-300 p-2">
            <div class="container">
                <h1 className="text-right text-gray-800 text-2xl tracking-wider uppercase">{ title }</h1>
            </div>
        </div>
    )
}

export default Title;