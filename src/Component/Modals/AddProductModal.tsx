"use client"  
import React, { useEffect, useState } from 'react';  
import Modal from './Modal'; 
import axios from 'axios';

interface TableData {
    id: number;
    productName: string;
    status: string;
    category: string;
    type: string;
    vendor: string;
}

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    updatedProduct: TableData | null;
    isUpdate: number;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, updatedProduct, isUpdate }) => {  
    const [productName, setProductName] = useState('');  
    const [status, setStatus] = useState('Active');  
    const [category, setCategory] = useState('');  
    const [type, setType] = useState('');  
    const [vendor, setVendor] = useState('');  

    const handleSubmit = async (event: React.FormEvent) => {  
        event.preventDefault();  

        const product = {  
            productName,  
            status,  
            category,  
            type,  
            vendor,  
        };  

        try {  
            if(!isUpdate) {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/product`, product, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.status === 201) {  
                    onClose();
                     
                    setProductName('');  
                    setStatus('');  
                    setCategory('');  
                    setType('');  
                    setVendor('');  
                    alert('Product created successfully!'); 
                } else {  
                    alert('Failed to create product');  
                }
            }
            if(isUpdate == 1){
                const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/product/${updatedProduct?.id}`, product, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.status === 200) {  
                    setProductName('');  
                    setStatus('');  
                    setCategory('');  
                    setType('');  
                    setVendor('');  
                    onClose(); 
                    alert('Product updated successfully!'); 
                } else {  
                    alert('Failed to update product');  
                }
            }
            if(isUpdate == 2){
                const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/product`, product, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.status === 201) {  
                    onClose();
                     
                    setProductName('');  
                    setStatus('');  
                    setCategory('');  
                    setType('');  
                    setVendor('');  
                    alert('Product created successfully!'); 
                } else {  
                    alert('Failed to create product');  
                }
            }
              
        } catch (error) {  
            console.error('Error:', error);  
            alert('An error occurred while creating the product');  
        }  
    };  

    useEffect(() => {
        if(updatedProduct && isUpdate) {
            setProductName(updatedProduct.productName);
            setStatus(updatedProduct.status);
            setCategory(updatedProduct.category);
            setType(updatedProduct.type);
            setVendor(updatedProduct.vendor);
        }
    }, [updatedProduct, isUpdate]);

    return (  
        <Modal isOpen={isOpen} onClose={onClose}>  
            <h1 className="text-xl font-bold mb-4">{isUpdate == 1 ? 'Update Product' : 'Create Product'}</h1>  
            
            <form onSubmit={handleSubmit}>   
                <div className="mb-4">  
                    <label className="block text-sm font-medium text-gray-700">  
                        Name:  
                        <input
                            id='productName'
                            name='productName'  
                            type="text"  
                            value={productName}  
                            onChange={(e) => setProductName(e.target.value)}  
                            required  
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"  
                        />  
                    </label>  
                </div>  
                <div className="mb-4">  
                    <label className="block text-sm font-medium text-gray-700">  
                        Status:  
                        <select  
                            id='status'
                            name='status'
                            value={status}  
                            onChange={(e) => setStatus(e.target.value)}  
                            required  
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"  
                        >  
                            <option value="Active">Active</option>  
                            <option value="Draft">Draft</option>  
                            <option value="Archived">Archived</option>  
                        </select>  
                    </label>  
                </div>  
                <div className="mb-4">  
                    <label className="block text-sm font-medium text-gray-700">  
                        Category:  
                        <input  
                            id='category'
                            name='category'
                            value={category}  
                            onChange={(e) => setCategory(e.target.value)}  
                            required  
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"  
                        />  
                    </label>  
                </div>  
                <div className="mb-4">  
                    <label className="block text-sm font-medium text-gray-700">  
                        Type:  
                        <input  
                            id='type'
                            name='type'
                            value={type}  
                            onChange={(e) => setType(e.target.value)}  
                            required  
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"  
                        />  
                    </label>  
                </div>  
                <div className="mb-4">  
                    <label className="block text-sm font-medium text-gray-700">  
                        Vendor:  
                        <input  
                            name='vendor'
                            value={vendor}  
                            onChange={(e) => setVendor(e.target.value)}  
                            required  
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"  
                        />  
                    </label>  
                </div>  
                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700">  
                    {isUpdate == 1 ? 'Update Product' : 'Create Product'}
                </button>  
            </form>  
        </Modal>  
    );  
};  

export default AddProductModal;