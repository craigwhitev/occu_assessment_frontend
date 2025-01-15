"use client"
import React from 'react';  
import Modal from './Modal';  

interface ConfirmDeleteProps {  
    isOpen: boolean;  
    onClose: () => void;  
    onConfirm: () => void;  
}  

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ isOpen, onClose, onConfirm }) => {  
    return (  
        <Modal isOpen={isOpen} onClose={onClose}>  
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>  
            <p>Are you sure?</p>  
            <div className="mt-6 flex justify-end space-x-2">  
                <button   
                    onClick={onClose}   
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"  
                >  
                    Cancel  
                </button>  
                <button   
                    onClick={onConfirm}   
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"  
                >  
                    Delete  
                </button>  
            </div>  
        </Modal>  
    );  
};  

export default ConfirmDelete;