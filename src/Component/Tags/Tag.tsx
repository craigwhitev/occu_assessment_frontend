"use client"
import React from "react";

interface TagProps
{
    label: string;
    status: string;
}
const Tag: React.FC<TagProps> = ({label, status }) => {  
    let bgColorClass = 'bg-green-200'; 
    let borderColorClass = 'border-green-200';

    switch (status) {  
        case 'fail':  
            bgColorClass = 'bg-red-100 hover:bg-red-200';  
            borderColorClass = 'border-red-300';
            break;  
        case 'warn':  
            bgColorClass = 'bg-yellow-100 hover:bg-yellow-200';  
            borderColorClass = 'border-yellow-300';
            break;  
        case 'pass':
            bgColorClass = 'bg-green-100 hover:bg-green-200';  
            borderColorClass = 'border-green-300';
            break;  
        default:  
            bgColorClass = 'bg-gray-100 hover:bg-gray-200';
            borderColorClass = 'border-gray-300';
    }  

    return (  
        <div className={`${bgColorClass} ${borderColorClass} border px-4 py-2 rounded m-4`}>  
            {label}  
        </div>  
    );  
}
  
export default Tag;