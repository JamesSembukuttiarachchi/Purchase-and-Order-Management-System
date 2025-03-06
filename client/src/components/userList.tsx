/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table } from "@/components/ui/table";

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

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">User List</h2>
            <Table>
                <thead>
                    <tr>
                        <th className="p-3 text-left">Username</th>
                        <th className="p-3 text-left">Date Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="p-3">{user.username}</td>
                            <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserList;
