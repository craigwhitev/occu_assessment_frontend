"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogoClick = () => {
        router.push("/");
    }
    const handleTagsClick = () => {
        router.push("/tags");
    }
    const handleCRUDClick = () => {
        router.push("/product");
    }
    return (
        <div className="bg-[#1a264e] p-4">  
            <div className="container mx-auto flex flex-row justify-start items-center space-x-8">
                <Image className="" src="/logo.png" alt="OCCU" onClick={handleLogoClick} width={40} height={40} />  
                <button className={`text-[20px] p-2 hover:text-gray-100 hover:border-gray-100 ${pathname === '/tags' ? 'border-b-2 border-white text-white'  : 'text-gray-400'}`} 
                onClick={handleTagsClick}>  
                    Status Tags  
                </button>  
                <button className={`text-[20px] p-2 hover:text-gray-100 hover:border-gray-100 ${pathname === '/product' ? 'border-b-2 border-white text-white' : 'text-gray-400'}`}
                onClick={handleCRUDClick}>  
                    Data CRUD  
                </button>  
            </div>
        </div>
    );
};

export default Navbar;