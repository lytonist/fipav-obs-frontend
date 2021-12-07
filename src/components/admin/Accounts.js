import React, { useEffect } from "react";

// Context
import { useTitle } from "../../contexts/titleContext";

const Accounts = () => {
    const [ title, setTitle ] = useTitle();

    useEffect(() => {
        setTitle('Gestione Accounts');
    }, [setTitle]);

    return (
        <main className="container mx-auto px-5 py-20 lg:px-10 md:py-48">
            Accounts Page
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden sm:rounded-lg shadow-md">
                            <table className="min-w-full">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th scope="col" className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider dark:text-gray-400">
                                            Nome
                                        </th>
                                        <th scope="col" className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider dark:text-gray-400">
                                            Ruolo
                                        </th>
                                        <th scope="col" className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider dark:text-gray-400">
                                            Category
                                        </th>
                                        <th scope="col" className="text-xs font-medium text-gray-700 px-6 py-3 text-left uppercase tracking-wider dark:text-gray-400">
                                            Price
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <!-- Product 1 --> */}
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            Apple MacBook Pro 17"
                                        </td>
                                        <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
                                            Sliver
                                        </td>
                                        <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
                                            Laptop
                                        </td>
                                        <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
                                            $2999
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                    {/* <!-- Product 2 --> */}
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            Apple Imac 27"
                                        </td>
                                        <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
                                            White
                                        </td>
                                        <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
                                            Desktop Pc
                                        </td>
                                        <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
                                            $1999
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                    {/* <!-- Product 2 --> */}
                                    <tr className="bg-white dark:bg-gray-800">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                            Apple Magic Mouse 2
                                        </td>
                                        <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
                                            White
                                        </td>
                                        <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
                                            Accessories
                                        </td>
                                        <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
                                            $99
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Accounts;