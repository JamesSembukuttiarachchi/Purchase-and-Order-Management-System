/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Supplier {
    id: number;
    supplierName: string;
    contactPerson: string;
    email: string;
    telephone: string;
    notes: string;
}

const SupplierList: React.FC = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch supplier data from API using fetch
        const fetchSuppliers = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/suppliers");
                if (!response.ok) {
                    throw new Error("Error fetching suppliers");
                }
                const data = await response.json();
                setSuppliers(data); // Set the suppliers data
                setLoading(false);
            } catch (error) {
                setError("Error fetching suppliers");
                setLoading(false);
            }
        };

        fetchSuppliers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-8 space-y-4">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-xl">Supplier List</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table className="min-w-full bg-white border border-gray-200">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Contact Person</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Notes</TableHead>
                                <TableHead>Actions</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {suppliers.map((supplier) => (
                                <TableRow key={supplier.id}>
                                    <TableCell>{supplier.supplierName}</TableCell>
                                    <TableCell>{supplier.contactPerson}</TableCell>
                                    <TableCell>{supplier.email}</TableCell>
                                    <TableCell>{supplier.telephone}</TableCell>
                                    <TableCell>{supplier.notes}</TableCell>
                                    <TableCell>
                                        <Button className="bg-blue-500 hover:bg-blue-700 text-white">
                                            Update
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button className="bg-red-500 hover:bg-red-700 text-white">
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default SupplierList;
