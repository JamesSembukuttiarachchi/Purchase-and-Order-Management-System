import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout logic here
        navigate("/");
    };

    const handleResetPassword = () => {
        // Handle reset password logic here
        navigate("/reset-password"); // Replace with actual route
    };

    return (
        <header className="w-full bg-green-500 p-4 shadow-md flex justify-between items-center">
            {/* Left - Company Name */}
            <div className="text-2xl font-bold text-white">XYZ</div>

            {/* Middle - Navigation Links */}
            <nav className="flex space-x-6 text-white">
                <Link to="/suppliers" className="hover:underline">
                    Suppliers
                </Link>
                <Link to="/users" className="hover:underline">
                    Users
                </Link>
            </nav>

            {/* Right - Buttons */}
            <div className="space-x-4">
                <Button variant="default" onClick={handleResetPassword}>
                    Reset Password
                </Button>
                <Button variant="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </div>
        </header>
    );
};

export default Header;
