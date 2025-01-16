"use client"
import React, { useEffect } from "react";
import axios from 'axios';
import { HiOutlinePencil } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { useState } from "react";
import AddProductModal from "../Modals/AddProductModal";
import CompareResultModal from "../Modals/CompareResultModal";

interface TableData {
    id: number;
    productName: string;
    status: string;
    category: string;
    type: string;
    vendor: string;
}

interface FieldDiff {  
    field: string;  
    values: string[];  
}

const pageButDisable = "w-[54px] border border-gray-600 text-gray-800 opacity-70";
const pageButEnable = "w-[54px] border border-gray-600 text-gray-800";
const pageSize = 10;

const Products = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isCompareModalOpen, setCompareModalOpen] = useState(false);
    const [compareResult, setCompareResult] = useState<FieldDiff[]>([]);
    const [isUpdate, setIsUpdate] = useState(0);
    const [activeRow, setActiveRow] = useState(-1);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(-1);
    const [startIdx, setStartIdx] = useState(0);
    const [endIdx, setEndIdx] = useState(0);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [products, setProducts] = useState<TableData[]>([]);
    const [customStatus, setCustomStatus] = useState("");
    const [searchText, setSearchText] = useState("");
    const [modalProduct, setModalProduct] = useState<TableData | null>(null);

    const updateStartEndIdx = (current: number) => {
        let total;
        if (totalCount == -1) {
            total = products?.length > 0 ? products.length : 0;
        }
        else {
            total = totalCount;
        }

        if (total) {
            const start = (current - 1) * pageSize;
            const end = (start + pageSize) < total ? start + pageSize : total;
            setStartIdx(start);
            setEndIdx(end);
        }
    }
    const handleAllSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        const allProductNamesOnCurrentPage = products.slice(startIdx, endIdx).map(product => product.productName);
        if (event.target.checked) {
            setSelectedRows(allProductNamesOnCurrentPage);
        } else {
            setSelectedRows([]);
        }
    }
    const handlePagePrev = () => {
        if (currentPage > 1) {
            updateStartEndIdx(currentPage - 1);
            setCurrentPage(currentPage - 1);
        }
    }
    const handlePageNext = () => {
        if (currentPage * pageSize < totalCount) {
            updateStartEndIdx(currentPage + 1);
            setCurrentPage(currentPage + 1);
        }
    }
    const handleSelectedRow = (name:string) => {
        const newSelectedRows = [...selectedRows];
        const index = newSelectedRows.indexOf(name);
        if (index === -1) {
            newSelectedRows.push(name);
        } else {
            newSelectedRows.splice(index, 1);
        }
        setSelectedRows(newSelectedRows);
    }
    const handleCloseModal = () => {
        setModalOpen(false);
        fetchProducts();
    }
    const handleCloseCompareModal = () => {
        setCompareModalOpen(false);
    }
    const handleAddProduct = () => {
        setIsUpdate(0);
        setModalOpen(true);
    };
    const handleEdit = (id: number) => {
        setIsUpdate(1);
        setModalProduct(products.find(product => product.id === id) || null);
        setModalOpen(true);
    }
    const handleCopy = (id: number) => {
        setIsUpdate(2);
        setModalProduct(products.find(product => product.id === id) || null);
        setModalOpen(true);
    }
    const handleCompare = async () => {
        const selectedProducts = products.filter(product => selectedRows.includes(product.productName));
        if (selectedProducts.length === 2) {
            const [product1, product2] = selectedProducts;
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/product/compare/${product1.id}/${product2.id}`);
            setCompareResult(response.data);
            setCompareModalOpen(true);
        } else {
            console.error('Exactly two products must be selected for comparison.');
        }
    }
    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.status === 200) {
            const updatedProducts = products.filter(product => product.id !== id);
            setProducts(updatedProducts);
            const count = updatedProducts?.length > 0 ? updatedProducts.length : 0;
            setTotalCount(count);
        }
    }
    const handleDeleteSelected = async () => {
        if (!window.confirm("Are you sure you want to delete these products?")) {
            return;
        }
        const deleteRequests = selectedRows.map(name => {
            const product = products.find(product => product.productName === name);
            return product ? axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/product/${product.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }) : null;
        });

        try {
            await Promise.all(deleteRequests);
            const updatedProducts = products.filter(product => !selectedRows.includes(product.productName));
            setProducts(updatedProducts);
            setSelectedRows([]);
            const count = updatedProducts?.length > 0 ? updatedProducts.length : 0;
            setTotalCount(count);
        } catch (error) {
            console.error('Error deleting selected products:', error);
        }
    }
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        getFilteredProducts(event.target.value, customStatus);
    }
    const handleStatusFilter = (status: string) => {
        setCustomStatus(status);
        getFilteredProducts(searchText, status);
    }
    const getFilteredProducts = async (keyword: string, status: string) => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/product/search`,{
            params: {
                keyword,
                status
            }
        }); 
        setProducts(response.data);

        const count = response.data?.length > 0 ? response.data.length : 0;
        setTotalCount(count);
    }
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/product`);
            setProducts(response.data);

            const count = response.data?.length > 0 ? response.data.length : 0;
            setTotalCount(count);
            
        } catch (error) {
            console.error('Error fetching products:', error);
            setTotalCount(0);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        updateStartEndIdx(1);
        setCurrentPage(1);
    },[totalCount]);

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-row justify-between pb-4">
                <h1 className="text-[28px] font-bold">Products</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" onClick={handleAddProduct}>
                    Add Product
                </button>
            </div>
            <div className="relative w-full basis-[63%]">
                <div className="flex flex-row justify-between items-center p-4 border border-1 border-gray-200">
                    <div className="flex flex-row gap-[10px] items-center text-[14px] text-gray-500">
                        <button 
                            className={`py-2 px-4 rounded-md border border-1 border-gray-50 hover:border-gray-300 ${customStatus === "" ? "bg-gray-300" : ""}`} 
                            onClick={() => handleStatusFilter("")}
                        >
                            All
                        </button>
                        <button 
                            className={`py-2 px-4 rounded-md border border-1 border-gray-50 hover:border-gray-300 ${customStatus === "Active" ? "bg-gray-300" : ""}`} 
                            onClick={() => handleStatusFilter("Active")}
                        >
                            Active
                        </button>
                        <button 
                            className={`py-2 px-4 rounded-md border border-1 border-gray-50 hover:border-gray-300 ${customStatus === "Draft" ? "bg-gray-300" : ""}`} 
                            onClick={() => handleStatusFilter("Draft")}
                        >
                            Draft
                        </button>
                        <button 
                            className={`py-2 px-4 rounded-md border border-1 border-gray-50 hover:border-gray-300 ${customStatus === "Archived" ? "bg-gray-300" : ""}`} 
                            onClick={() => handleStatusFilter("Archived")}
                        >
                            Archived
                        </button>
                    </div>
                    <div className="flex flex-row gap-[10px] items-center">
                        <div className="flex flex-row gap-[10px] items-center">
                            <input 
                                id="searchInput"
                                type="text" 
                                placeholder="Search" 
                                className="border border-1 border-gray-200 rounded-md p-2" 
                                value={searchText}
                                onChange={handleSearch}
                                
                            />
                            {selectedRows.length === 2 && (
                                <button className="border border-1 border-blue-400 bg-blue-100 hover:bg-blue-200 rounded-md py-2 px-4"
                                onClick={handleCompare}>
                                    Compare
                                </button>
                            )}
                            {selectedRows.length > 0 && (
                                <button className="border border-1 border-red-400 bg-red-100 hover:bg-red-200 rounded-md py-2 px-4" 
                                onClick={handleDeleteSelected}>
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                <table className="w-full table-auto border border-1">  
                    <thead>  
                        <tr className="text-gray-800 h-[40px]">  
                            <th className="pl-[20px] py-[10px] text-left">
                                <input 
                                    id="checkall"
                                    type="checkbox" 
                                    onChange={handleAllSelected} 
                                    checked={products.length > 0 && products.slice(startIdx, endIdx).every(product => selectedRows.includes(product.productName))}
                                />
                            </th>  
                            <th className="pl-[20px] py-[10px] text-left">Name</th>  
                            <th className="pl-[20px] py-[10px] text-left">Status</th>  
                            <th className="pl-[20px] py-[10px] text-left">Category</th>  
                            <th className="pl-[20px] py-[10px] text-left">Type</th>  
                            <th className="pl-[20px] py-[10px] text-left">Vendor</th>  
                            <th className="pl-[20px] py-[10px] text-left">Actions</th>  
                        </tr>  
                    </thead>    
                    <tbody>  
                        {products?.length > 0 && products.slice(startIdx, endIdx).map((item, index) => (  
                            <tr key={item.productName}   
                                onMouseOver={() => setActiveRow(index)}   
                                onMouseLeave={() => setActiveRow(-1)}   
                                className={`h-[50px] ${selectedRows.includes(item.productName) ? "bg-green-100" : (activeRow === index) ? "bg-gray-100" : !(index % 2) ? 'bg-white' : ''} text-gray-700`}>  
                                
                                <td className="pl-[20px] py-[10px]"><input id={item.productName} type="checkbox" checked={selectedRows.includes(item.productName)} onChange={() => handleSelectedRow(item.productName)}/></td>  
                                <td className="pl-[20px] py-[10px]">{item.productName}</td>  
                                <td className="pl-[20px] py-[10px]">
                                    <span className={`px-2 py-1 rounded text-[12px] ${item.status === "Active" ? "bg-green-200" : item.status === "Draft" ? "bg-yellow-200" : item.status === "Archived" ? "bg-red-200" : "bg-gray-200"}`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="pl-[20px] py-[10px]">{item.category}</td>  
                                <td className="pl-[20px] py-[10px]">{item.type}</td>  
                                <td className="pl-[20px] py-[10px]">{item.vendor}</td>  
                                <td className="pl-[20px] py-[10px]">  
                                    <div className="flex justify-start gap-[14px] items-center">  
                                        <button><HiOutlinePencil className="text-lg" onClick={()=>handleEdit(item.id)}/></button>  
                                        <button><HiOutlineDocumentDuplicate className="text-lg" onClick={()=>handleCopy(item.id)}/></button>  
                                        <button><HiOutlineTrash className="text-lg" onClick={()=>handleDelete(item.id)} /></button>  
                                    </div>  
                                </td>  
                            </tr>  
                        ))}  
                    </tbody>  
                </table>
                {!(products?.length > 0) &&
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col items-center">
                            <div className="text-[#B4B4B4] text-[12px] mt-[10px]">No Products</div>
                        </div>
                    </div>
                }
                {products?.length > 0 &&
                    <div className="w-full my-[20px] justify-end">
                        <div className="flex flex-row gap-[17px] justify-end items-center">
                            <span id="pageState" className="text-gray-800">{startIdx + 1}-{endIdx} of {totalCount}</span>
                            <button className={startIdx < pageSize ? pageButDisable : pageButEnable} onClick={handlePagePrev}>Prev</button>
                            <button className={endIdx == totalCount ? pageButDisable : pageButEnable} onClick={handlePageNext}>Next</button>
                        </div>
                    </div>
                }
                <AddProductModal isOpen={isModalOpen} onClose={handleCloseModal} updatedProduct={modalProduct} isUpdate={isUpdate}/>
                <CompareResultModal isOpen={isCompareModalOpen} onClose={handleCloseCompareModal} compareResult={compareResult} />
            </div>
        </div>
    )
}

export default Products;