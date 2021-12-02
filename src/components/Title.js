import React from 'react';

const Title = ({ title = 'Home' }) => {
    return (
        <main className="bg-gradient-to-r to-orange-500 from-orange-300 p-2">
            <div className="container">
                <h1 className="text-right text-gray-800 text-2xl tracking-wider uppercase">{ title }</h1>
            </div>
        </main>
    )
}

export default Title;