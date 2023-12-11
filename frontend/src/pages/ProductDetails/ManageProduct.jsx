// ProductList.jsx
import React, { useState } from 'react';

const productsData = [
  { id: 1, name: 'Product 1', description: 'Description 1', price: 10 },
  { id: 2, name: 'Product 2', description: 'Description 2', price: 20 },
  { id: 3, name: 'Product 3', description: 'Description 3', price: 30 },
];

const ProductItem = ({ product, onEdit, onDelete }) => (
  <tr>
    <td className="py-2 px-4 sm:px-6 md:px-8">{product.name}</td>
    <td className="py-2 px-4 sm:px-6 md:px-8">{product.description}</td>
    <td className="py-2 px-4 sm:px-6 md:px-8">{product.price}</td>
    <td className="py-2 px-4 sm:px-6 md:px-8">
      <button
        className="bg-blue-500 text-white py-1 px-2 rounded mr-2 hover:bg-blue-600"
        onClick={() => onEdit(product.id)}
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
        onClick={() => onDelete(product.id)}
      >
        Delete
      </button>
    </td>
  </tr>
);

const ProductList = () => {
  const [products, setProducts] = useState(productsData);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    warehouse: '',
    description: '',
    image: '',
    price: '', // Menambahkan kolom price
  });

  const [editProductId, setEditProductId] = useState(null);

  const handleEdit = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setFormData(productToEdit);
    setEditProductId(productId);
    setShowForm(true);
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const handleAdd = () => {
    setEditProductId(null);
    setShowForm(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editProductId !== null) {
      // Jika editProductId tidak null, maka kita sedang melakukan edit
      const updatedProducts = products.map((product) =>
        product.id === editProductId ? { ...formData, id: editProductId } : product
      );
      setProducts(updatedProducts);
      setEditProductId(null);
    } else {
      // Jika editProductId null, maka kita sedang menambahkan produk baru
      const newProduct = {
        id: products.length + 1,
        ...formData,
      };
      setProducts([...products, newProduct]);
    }

    setShowForm(false);
    setFormData({
      name: '',
      warehouse: '',
      description: '',
      image: '',
      price: '', // Reset kolom price setelah submit
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4 text-indigo-700">Product List</h2>

      <div className="overflow-x-auto mb-8">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="py-2 px-4 sm:px-6 md:px-8">Product Name</th>
              <th className="py-2 px-4 sm:px-6 md:px-8">Description</th>
              <th className="py-2 px-4 sm:px-6 md:px-8">Price</th>
              <th className="py-2 px-4 sm:px-6 md:px-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
            {editProductId !== null ? 'Edit Product' : 'Add Product'}
          </h2>
          {['Product Name', 'Warehouse', 'Description', 'Image URL', 'Price'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">{field}:</label>
              <input
                type={field === 'Image URL' ? 'url' : 'text'}
                name={field.toLowerCase()}
                value={formData[field.toLowerCase()]}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {editProductId !== null ? 'Save Changes' : 'Add Product'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ProductList;
