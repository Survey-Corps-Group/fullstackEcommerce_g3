// components/admin/AdminPage.js
import React from "react";
import { Link } from "react-router-dom";
import { FaCubes, FaShoppingCart, FaBoxOpen, FaCheckSquare } from "react-icons/fa";
import Footer from "../../components/home/Footer/Footer"

const AdminPage = () => {
  return (
    <div className="admin-container bg-white p-6 rounded-md shadow-md w-full">
      <h2 className="text-3xl font-semibold mb-4 text-gray-800">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/ManageProduct" className="admin-option bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-md transition duration-300 shadow-md">
          <span className="text-xl font-semibold block mb-2">
            <FaCubes className="inline-block mr-2" /> Manage Products
          </span>
          <p className="text-sm text-gray-300">Add, edit, and manage products</p>
        </Link>
        <Link to="/AdminListOrder" className="admin-option bg-green-500 hover:bg-green-600 text-white p-6 rounded-md transition duration-300 shadow-md">
          <span className="text-xl font-semibold block mb-2">
            <FaShoppingCart className="inline-block mr-2" /> View Orders
          </span>
          <p className="text-sm text-gray-300">Review and process orders</p>
        </Link>
        <Link to="/Warehouse" className="admin-option bg-yellow-500 hover:bg-yellow-600 text-white p-6 rounded-md transition duration-300 shadow-md">
          <span className="text-xl font-semibold block mb-2">
            <FaBoxOpen className="inline-block mr-2" /> Warehouse
          </span>
          <p className="text-sm text-gray-300">Manage warehouse inventory</p>
        </Link>
        <Link to="/VerifyPayAdmin" className="admin-option bg-purple-900 hover:bg-purple-600 text-white p-6 rounded-md transition duration-300 shadow-md">
          <span className="text-xl font-semibold block mb-2">
            <FaCheckSquare className="inline-block mr-2" /> Verify
          </span>
          <p className="text-sm text-gray-300">Verify orders or users</p>
        </Link>
        {/* Add more admin options based on your requirements */}
      </div>

      {/* Tambahkan komponen Footer di sini */}
      <Footer />

    </div>
  );
};

export default AdminPage;
