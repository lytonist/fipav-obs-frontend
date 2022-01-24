import React from "react";

const UserRow = ({ setModalState, setUser, user, toggleUserModal }) => {

    const editUser = () => {
        setModalState('edit');
        setUser(user);
        toggleUserModal();
    }

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="table-td font-medium text-gray-900 dark:text-white">
                { user.lastname } { user.firstname }
            </td>
            <td className="table-td hidden md:table-cell text-gray-500 dark:text-gray-400">
                { user.email }
            </td>
            <td className="table-td text-gray-500 dark:text-gray-400">
                { user.admin ? 'Admin' : 'User' }
            </td>
            <td className="table-td text-right font-medium">
                <button
                    type="button"
                    onClick={editUser}
                    className="btn-edit py-1 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
                >
                    Modifica
                </button>
            </td>
        </tr>
    );
};

const UserList = ({ users, setModalState, setUser, toggleUserModal }) => {
    const listUsers = users.map(user => 
        <UserRow key={user._id} user={user} setModalState={setModalState} setUser={setUser} toggleUserModal={toggleUserModal} />
    );

    return (
        <tbody>
            { listUsers }
        </tbody>
    );
};

export default UserList;