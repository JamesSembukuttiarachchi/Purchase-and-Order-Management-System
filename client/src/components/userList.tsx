/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import bgImage from "../assets/bg-shrimpfeedsbusiness.jpg";

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
        <div className="p-8 space-y-4 flex justify-center items-center h-screen"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                width: "100vw",
                backgroundAttachment: "fixed",
            }}>
            <Card className="shadow-lg w-2/3">
                <div className="flex justify-between items-center px-6">
                    <CardTitle className="text-left text-xl">Users</CardTitle>
                    <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white"
                        onClick={handleAddUserButton}>
                        Add User
                    </Button>
                </div>

                <CardContent>
                    <Table className="min-w-full bg-white border border-gray-200">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>Date Joined</TableHead>
                                <TableHead>Role</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{/* Role field (you may want to fill in later) */}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserList;
