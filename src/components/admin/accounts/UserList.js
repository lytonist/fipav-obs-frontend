import React from "react";

// Context

const UserRow = ({ setUser, user, toggleUserModal }) => {

    const editUser = () => {
        setUser({
            ...user,
            email: '',
            password: ''
        }); // Set Email and Password here because those properties are not set in users, or will have a warning defined to undefined
        toggleUserModal();
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                { user.lastname } { user.name }
            </td>
            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap dark:text-gray-400">
                { user.admin ? 'Admin' : 'User' }
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                    type="button"
                    onClick={editUser}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Modifica
                </button>
            </td>
        </tr>
    )
};

const UserList = ({ users, setUser, toggleUserModal }) => {
    const listUsers = users.map(user => 
        <UserRow key={user._id} user={user} setUser={setUser} toggleUserModal={toggleUserModal} />
    )

    return (
        <tbody>
            { listUsers }
        </tbody>
    )
};

export default UserList;