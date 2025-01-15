import React from "react";
import Navbar from "@/Component/Header/Navbar";
import Products from "@/Component/Products/Products";

const page = () => {
  return (

    <div className="container mx-auto h-screen">
      <Navbar />
      <Products />
    </div>
  );
}

export default page;