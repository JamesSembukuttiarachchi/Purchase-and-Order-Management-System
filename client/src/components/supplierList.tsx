/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';
interface Supplier {
    id: number;
    supplierName: string;
    contactPerson: string;
    email: string;
    telephone: string;
    notes: string;
}

const SupplierList = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [editSupplierId, setEditSupplierId] = useState<number | null>(null);
    const [editFormData, setEditFormData] = useState<Supplier | null>(null);
    const navigate = useNavigate();

    // Fetch suppliers from backend
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/suppliers");
                if (!response.ok) {
                    throw new Error("Error fetching suppliers");
                }
                const data = await response.json();
                setSuppliers(data);
                setLoading(false);
            } catch (error) {
                setError("Error fetching suppliers");
                setLoading(false);
            }
        };
        fetchSuppliers();
    }, []);


    // Handle "Add Supplier" button click
    const handleAddSupplierButton = () => {
        navigate('/addsupplier');
    };

    // Handle "Edit" button click
    const handleEditClick = (supplier: Supplier) => {
        setEditSupplierId(supplier.id);
        setEditFormData({ ...supplier });
    };

    // Handle input change in the edit form
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editFormData) {
            setEditFormData({
                ...editFormData,
                [e.target.name]: e.target.value,
            });
        }
    };

    // Submit update request to backend
    const handleUpdateSupplier = async () => {
        if (editSupplierId && editFormData) {
            try {
                const response = await fetch(`http://localhost:3000/api/suppliers/${editSupplierId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(editFormData),
                });
                if (response.ok) {
                    const updatedSupplier = await response.json();
                    setSuppliers(suppliers.map(supplier => supplier.id === editSupplierId ? updatedSupplier : supplier));
                    setEditSupplierId(null);
                    setEditFormData(null);
                } else {
                    throw new Error("Error updating supplier");
                }
            } catch (error) {
                setError("Error updating supplier");
            }
        }
    };

    // Delete supplier
    const handleDeleteSupplier = async (supplierId: number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/suppliers/${supplierId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setSuppliers(suppliers.filter(supplier => supplier.id !== supplierId));
            } else {
                throw new Error("Error deleting supplier");
            }
        } catch (error) {
            setError("Error deleting supplier");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-8 space-y-4">
            <Card className="shadow-lg">
                <div className="mb-6 flex justify-between items-center p-6">
                    <CardTitle className="text-left text-xl">Supplier List</CardTitle>
                    <Button
                        className="bg-green-500 hover:bg-green-700 text-white"
                        onClick={handleAddSupplierButton}>
                        Add Supplier
                    </Button>
                </div>

                <CardContent>
                    <Table className="min-w-full bg-white border border-gray-200">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Contact Person</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Notes</TableHead>
                                <TableHead>

                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {suppliers.map((supplier) => (
                                <TableRow key={supplier.id}>
                                    <TableCell>
                                        {editSupplierId === supplier.id ? (
                                            <input
                                                name="supplierName"
                                                value={editFormData?.supplierName || ''}
                                                onChange={handleInputChange}
                                                className="border rounded p-1"
                                            />
                                        ) : (
                                            supplier.supplierName
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editSupplierId === supplier.id ? (
                                            <input
                                                name="contactPerson"
                                                value={editFormData?.contactPerson || ''}
                                                onChange={handleInputChange}
                                                className="border rounded p-1"
                                            />
                                        ) : (
                                            supplier.contactPerson
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editSupplierId === supplier.id ? (
                                            <input
                                                name="email"
                                                value={editFormData?.email || ''}
                                                onChange={handleInputChange}
                                                className="border rounded p-1"
                                            />
                                        ) : (
                                            supplier.email
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editSupplierId === supplier.id ? (
                                            <input
                                                name="telephone"
                                                value={editFormData?.telephone || ''}
                                                onChange={handleInputChange}
                                                className="border rounded p-1"
                                            />
                                        ) : (
                                            supplier.telephone
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editSupplierId === supplier.id ? (
                                            <input
                                                name="notes"
                                                value={editFormData?.notes || ''}
                                                onChange={handleInputChange}
                                                className="border rounded p-1"
                                            />
                                        ) : (
                                            supplier.notes
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {editSupplierId === supplier.id ? (
                                            <Button
                                                className="bg-green-500 hover:bg-green-700 text-white"
                                                onClick={handleUpdateSupplier}>
                                                Save
                                            </Button>
                                        ) : (
                                            <Button
                                                className="bg-blue-500 hover:bg-blue-700 text-white"
                                                onClick={() => handleEditClick(supplier)}>
                                                Update
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            className="bg-red-500 hover:bg-red-700 text-white"
                                            onClick={() => handleDeleteSupplier(supplier.id)}>
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
