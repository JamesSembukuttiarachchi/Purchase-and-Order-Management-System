/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

// Define the types for user data
interface User {
    id: number;
    username: string;
    createdAt: string;
}

const UserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/users/", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Error fetching users");
                }

                const data: User[] = await response.json();
                setUsers(data);
            } catch (err) {
                setError("An error occurred while fetching the users.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleAddUserButton = () => {
        navigate('/adduser');
    };

    if (isLoading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-600">{error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">User List</h2>

            <div className="mb-6 flex justify-end">
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={handleAddUserButton}>
                    Add User
                </button>
            </div>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full table-auto">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Username</th>
                            <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Role</th>
                            <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Date Joined</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition duration-200">
                                <td className="py-3 px-6 text-sm text-gray-800">{user.username}</td>
                                <td className="py-3 px-6 text-sm text-gray-800">{ }</td>
                                <td className="py-3 px-6 text-sm text-gray-600">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;
