/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Input } from "@/components/ui/input"; // ShadCN Input component
import { Button } from "@/components/ui/button"; // ShadCN Button component
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // ShadCN Card for UI structure
import { Label } from "@/components/ui/label"; // ShadCN Label component
import { Textarea } from "@/components/ui/textarea"; // ShadCN Textarea component
import { useNavigate } from "react-router-dom";

const AddSupplier: React.FC = () => {
    const [supplierName, setSupplierName] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [notes, setNotes] = useState("");
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const supplierData = {
            supplierName,
            telephone,
            email,
            contactPerson,
            notes,
        };

        try {
            const response = await fetch("http://localhost:3000/api/suppliers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(supplierData),
            });

            if (response.ok) {
                // Successfully added supplier, navigate to the supplier list or any desired page
                navigate("/suppliers");
            } else {
                // Handle error
                const result = await response.json();
                setError(result.error || "Failed to add supplier.");
            }
        } catch (error) {
            setError("Server error. Please try again later.");
        }
    };

    return (
        <Card className="max-w-md mx-auto mt-10 shadow-lg">
            <CardHeader className="text-center">
                <h1 className="text-xl font-bold">Add New Supplier</h1>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="supplierName">Supplier Name</Label>
                        <Input
                            id="supplierName"
                            value={supplierName}
                            onChange={(e) => setSupplierName(e.target.value)}
                            required
                            className="mt-2"
                            placeholder="Enter supplier name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="telephone">Telephone</Label>
                        <Input
                            id="telephone"
                            value={telephone}
                            onChange={(e) => setTelephone(e.target.value)}
                            required
                            className="mt-2"
                            placeholder="Enter telephone"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-2"
                            placeholder="Enter email"
                            type="email"
                        />
                    </div>
                    <div>
                        <Label htmlFor="contactPerson">Contact Person</Label>
                        <Input
                            id="contactPerson"
                            value={contactPerson}
                            onChange={(e) => setContactPerson(e.target.value)}
                            required
                            className="mt-2"
                            placeholder="Enter contact person"
                        />
                    </div>
                    <div>
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="mt-2"
                            placeholder="Enter any notes"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" className="w-full bg-green-500 hover:bg-green-700">
                        Add Supplier
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default AddSupplier;
