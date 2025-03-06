import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Handle login functionality
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Logging in with:", username, password);
    };

    // Handle password reset functionality
    const handleResetPassword = () => {
        console.log("Redirecting to reset password...");
        // Implement your reset password functionality or redirect here
    };

    // Copy password to clipboard
    const handleCopyPassword = async () => {
        try {
            await navigator.clipboard.writeText(password);
            alert("Password copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy password: ", err);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
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
                                <Button
                                    type="button"
                                    className="ml-2 bg-gray-200 text-black"
                                    onClick={handleCopyPassword}
                                >
                                    Copy
                                </Button>
                            </div>
                        </div>
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
