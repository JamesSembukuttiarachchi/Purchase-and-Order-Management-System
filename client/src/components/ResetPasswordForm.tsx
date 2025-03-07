/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface ResetPasswordFormProps {
    setShowResetForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ setShowResetForm }) => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/users/updatepassword", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token stored in localStorage
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                toast.success("Password updated successfully");
                setShowResetForm(false); // Close the form after success
            } else {
                const data = await response.json();
                toast.error(data.message || "Failed to update password");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-96 max-w-lg">
                <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <Button type="submit" variant="default">
                            Update Password
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            className="ml-2"
                            onClick={() => setShowResetForm(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
