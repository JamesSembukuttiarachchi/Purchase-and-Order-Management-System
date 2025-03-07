import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import bgImage from "../assets/bg-shrimpfeedsbusiness.jpg";
import { toast } from 'react-toastify';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    // Handle login functionality
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Logged in successfully:", data);
                // Store the token in localStorage or wherever appropriate
                localStorage.setItem("token", data.token);
                // Show success toast
                toast.success("Login successful!");
                navigate('/suppliers');
            } else {
                setErrorMessage(data.message || "Login failed.");
                // Show error toast
                toast.error(data.message || "Login failed.");
                console.log("Login failed:", data);
            }
        } catch (error) {
            setErrorMessage("An error occurred during login.");
            // Show error toast
            toast.error("An error occurred during login.");
            console.error("Error:", error);
        }
    };

    // Handle password reset functionality
    const handleResetPassword = () => {
        console.log("Redirecting to reset password...");
        // Implement your reset password functionality or redirect here
    };

    return (
        <div className="flex justify-center items-center h-screen"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                width: "100vw",
                backgroundAttachment: "fixed",
            }}>
            <Card className="w-96 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium">
                                Username
                            </label>
                            <Input
                                type="text"
                                id="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">
                                Password
                            </label>
                            <div className="flex">
                                <Input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                            </div>
                        </div>
                        {errorMessage && (
                            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                        )}
                        <div className="flex flex-col space-y-2">
                            <Button type="submit" className="w-full bg-blue-500 text-white">
                                Log In
                            </Button>
                            <Button
                                type="button"
                                className="w-full bg-gray-500 text-white"
                                onClick={handleResetPassword}
                            >
                                Forgot Password
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginForm;
