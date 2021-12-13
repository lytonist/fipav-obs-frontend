import React from "react";
import { Link } from "react-router-dom";

const UserRow = ({ user }) => {
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                { user.lastname } { user.name }
            </td>
            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
                { user. admin ? 'Admin' : 'User' }
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:underline">Edit</Link>
            </td>
        </tr>
    )
};

const UserList = ({ users }) => {
    const listUsers = users.map(user => <UserRow key={user._id} user={user} />)
    return (
        <tbody>
            { listUsers }
        </tbody>
    )
};

export default UserList;