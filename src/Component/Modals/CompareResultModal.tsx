"use client"
import React from 'react';  
import Modal from './Modal'; // Adjust the import path as necessary  

interface FieldDiff {  
    field: string;  
    values: string[];  
}  

interface CompareResultModalProps {  
    isOpen: boolean;  
    onClose: () => void;  
    compareResult: FieldDiff[]; 
}  

const CompareResultModal: React.FC<CompareResultModalProps> = ({ isOpen, onClose, compareResult }) => {  

    return (  
        <Modal isOpen={isOpen} onClose={onClose}>  
            <div className="flex flex-col">  
                <h2 className="text-xl font-bold mb-4">Comparison Results</h2>  
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Different Field</th>
                            <th className="border border-gray-300 px-4 py-2">Product1</th>
                            <th className="border border-gray-300 px-4 py-2">Product2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {compareResult.map(({ field, values }) => (
                            <tr key={field}>
                                <td className="border border-gray-300 px-4 py-2">{field}</td>
                                <td className="border border-gray-300 px-4 py-2">{values[0]}</td>
                                <td className="border border-gray-300 px-4 py-2">{values[1]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>  
        </Modal>  
    );  
};  

export default CompareResultModal;