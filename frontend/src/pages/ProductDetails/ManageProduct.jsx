import React, { useState } from 'react';

const ManageProduct = () => {
  const [productData, setProductData] = useState([]);
  const [formData, setFormData] = useState({
    productName: '',
    quantity: '',
    warehouse: '',
    province: '',
    city: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const newProductData = [...productData, formData];
    setProductData(newProductData);
    setFormData({
      productName: '',
      quantity: '',
      warehouse: '',
      province: '',
      city: '',
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center sm:flex-row">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full sm:mr-4 mb-4 sm:mb-0">
        <h2 className="text-2xl font-semibold mb-4">Manage Product</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="w-full p-2 border rounded-md"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700 text-sm font-bold mb-2">
              Quantity:
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              className="w-full p-2 border rounded-md"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="warehouse" className="block text-gray-700 text-sm font-bold mb-2">
              Warehouse:
            </label>
            <input
              type="text"
              id="warehouse"
              name="warehouse"
              className="w-full p-2 border rounded-md"
              placeholder="Enter warehouse"
              value={formData.warehouse}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="province" className="block text-gray-700 text-sm font-bold mb-2">
              Province:
            </label>
            <input
              type="text"
              id="province"
              name="province"
              className="w-full p-2 border rounded-md"
              placeholder="Enter province"
              value={formData.province}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
              City:
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="w-full p-2 border rounded-md"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
          >
            Add Product
          </button>
        </form>
      </div>

      {/* Display product data */}
      {productData.length > 0 && (
        <div className="bg-white p-4 rounded shadow-md w-full sm:w-auto">
          <h3 className="text-lg font-semibold mb-2">Product List:</h3>
          <table className="min-w-full border rounded-md overflow-hidden">
            <thead className="bg-orange-200">
              <tr>
                <th className="py-2 px-4 border-b sm:w-1/4 text-center">Product Name</th>
                <th className="py-2 px-4 border-b sm:w-1/4 text-center">Quantity</th>
                <th className="py-2 px-4 border-b sm:w-1/4 text-center">Warehouse</th>
                <th className="py-2 px-4 border-b sm:w-1/4 text-center">City</th>
                <th className="py-2 px-4 border-b sm:w-1/4 text-center">Province</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-blue-100'}>
                  <td className="py-2 px-4 border-b text-center sm:w-1/4">{product.productName}</td>
                  <td className="py-2 px-4 border-b text-center sm:w-1/4">{product.quantity}</td>
                  <td className="py-2 px-4 border-b text-center sm:w-1/4">{product.warehouse}</td>
                  <td className="py-2 px-4 border-b text-center sm:w-1/4">{product.city}</td>
                  <td className="py-2 px-4 border-b text-center sm:w-1/4">{product.province}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
