import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ResetPasswordForm from "./ResetPasswordForm";

const Header: React.FC = () => {
    const [showResetForm, setShowResetForm] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const handleResetPassword = () => {
        setShowResetForm(true);
    };

    return (
        <>
            <header className="w-full bg-green-500 p-4 shadow-md flex justify-between items-center fixed top-0">
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

            {/* Show reset password form */}
            {showResetForm && <ResetPasswordForm setShowResetForm={setShowResetForm} />}

            <ToastContainer />
        </>
    );
};

export default Header;
