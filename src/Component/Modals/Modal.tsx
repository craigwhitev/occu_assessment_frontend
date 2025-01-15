"use client"
import React from 'react';  

interface ModalProps {  
    isOpen: boolean;  
    onClose: () => void;  
    children: React.ReactNode;  
}  

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {  
    if (!isOpen) return null;  

    return (  
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">  
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">    
                <button  
                    onClick={onClose}  
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"  
                    aria-label="Close Modal"  
                >  
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  
                        <line x1="18" y1="6" x2="6" y2="18" />  
                        <line x1="6" y1="6" x2="18" y2="18" />  
                    </svg>  
                </button>  
                {children}  
            </div>  
        </div>  
    );  
};  

export default Modal;