import React from "react";
import Navbar from "@/Component/Header/Navbar";
import Products from "@/Component/Products/Products";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto h-screen">
        <Products />
      </div>
    </>
  );
}

export default page;