/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "react-toastify";
import bgImage from "../assets/bg-shrimpfeedsbusiness.jpg";
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [role, setRole] = useState<string>("staff");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [generatedPassword, setGeneratedPassword] = useState<string | null>(
        null
    );

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        setGeneratedPassword(null);

        try {
            const response = await fetch("http://localhost:3000/api/users/adduser/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    username,
                    role,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setGeneratedPassword(data.password); // Set the generated password from the response
                toast.success("User added successfully!");
            } else {
                setError(data.message || "Failed to add user.");
                toast.error(data.message || "Failed to add user.");
            }
        } catch (err) {
            setError("Something went wrong.");
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    // Function to copy password to clipboard
    const copyToClipboard = () => {
        if (generatedPassword) {
            navigator.clipboard.writeText(generatedPassword).then(() => {
                toast.success("Password copied to clipboard!");
            });
        }
        navigate('/users')
    };
    // Function to copy password to clipboard
    const cancelButton = () => {
        navigate('/users');
    };

    return (
        <div className="mx-auto my-8 p-4 flex justify-center items-center min-h-screen"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                width: "100vw",
                backgroundAttachment: "fixed",
            }}>
            <Card className="w-1/3 mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Add New User</h2>
                <form onSubmit={handleSubmit}>
                    {/* Username Field */}
                    <div className="mb-4">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-2"
                        />
                    </div>

                    {/* Role Selection */}
                    <div className="mb-4">
                        <Label htmlFor="role">Role</Label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-2 p-2 border rounded-md w-full"
                        >
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Error or Success Message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                    )}
                    {success && (
                        <p className="text-green-500 text-sm text-center mb-4">
                            User added successfully!
                        </p>
                    )}

                    {/* Generated Password Section */}
                    {generatedPassword && (
                        <div className="mb-4 text-center">
                            <p className="text-lg">Generated Password: {generatedPassword}</p>
                            <Button
                                type="button"
                                onClick={copyToClipboard}
                                className="mt-2 bg-green-600 text-white hover:bg-green-700"
                            >
                                Copy Password
                            </Button>
                        </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center space-x-10">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="mt-8 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400"
                        >
                            {loading ? "Adding..." : "Add User"}
                        </Button>
                        <Button
                            type="button"
                            onClick={cancelButton}
                            className="mt-8 bg-red-400 text-white hover:bg-red-500"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddUser;
