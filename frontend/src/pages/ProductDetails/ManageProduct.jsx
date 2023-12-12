

// Import statements
import React, { useEffect, useState } from 'react';
import { getAdminProducts, getItemIdByName, deleteProduct, deleteWarehouseItem } from '../../modules/fetch/index';
import { Link, useNavigate } from 'react-router-dom';

// Functional component for ManageProduct
const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteItemName, setDeleteItemName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminProducts = await getAdminProducts();
        const sortedProducts = adminProducts.products.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching admin products:', error);
      }
    };

    fetchData();
  }, []);

  async function handleEditClick(item_name) {
    const res = await getItemIdByName(item_name);
    const itemId = res.item_id;
    navigate(`/EditProduct/${itemId}`);
  }

  async function handleDeleteClick(item_name) {
    // Menampilkan modal konfirmasi
    setShowDeleteModal(true);
    setDeleteItemName(item_name);
  }

  async function handleConfirmDelete() {
    try {
      // Panggil fungsi deleteProduct dan deleteWarehouseItem untuk menghapus produk dan warehouse item
      const res = await getItemIdByName(deleteItemName);
      console.log("tes",res);
      const itemId = res.item_id;
      console.log("tes",itemId);
      await deleteWarehouseItem(itemId);
      await deleteProduct(itemId);

      // Produk berhasil dihapus, refresh data produk
      console.log(`Product with ID ${itemId} deleted successfully`);

      // Refresh data produk
      const adminProducts = await getAdminProducts();
      const sortedProducts = adminProducts.products.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setProducts(sortedProducts);

      // Tutup modal setelah penghapusan
      setShowDeleteModal(false);
    } catch (error) {
      // Handle error jika diperlukan
      console.error('Error deleting product:', error);
    }
  }

  return (
    <div className="max-w-container mx-auto px-4">
      <div className="mb-4" style={{ height: '20px' }}></div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigate('/AdminPage')}
          className="bg-blue-500 text-white px-4 py-2 ml-4 rounded-md hover:bg-blue-700 duration-300"
        >
          Back
        </button>
        <h1 className="text-primeColor font-semibold text-lg">Manage Products</h1>
        <Link to="/addproduct" className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 duration-300">
          Add Product
        </Link>
      </div>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-indigo-500 text-white">
          <tr>
            <th className="py-2 px-4 sm:px-5 md:px-8">No</th>
            <th className="py-2 px-4 sm:px-5 md:px-8">Product Name</th>
            <th className="py-2 px-4 sm:px-5 md:px-8">Price</th>
            <th className="py-2 px-4 sm:px-5 md:px-8">Stock</th>
            <th className="py-2 px-4 sm:px-5 md:px-8">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.item_id}>
              <td className="py-2 px-4 sm:px-5 md:px-8">{index + 1}</td>
              <td className="py-2 px-4 sm:px-5 md:px-8">{product.item_name}</td>
              <td className="py-2 px-4 sm:px-5 md:px-8">${product.price}</td>
              <td className="py-2 px-4 sm:px-5 md:px-8">{product.stock_item}</td>
              <td className="py-2 px-4 sm:px-5 md:px-8">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                  onClick={() => handleEditClick(product.item_name)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                  onClick={() => handleDeleteClick(product.item_name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Konfirmasi Delete */}
      {showDeleteModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            <h1>Apakah yakin akan menghapus produk ini?</h1>
            <div style={{ height: '20px' }}></div>
            <div>
              <button
                onClick={handleConfirmDelete}
                style={{
                  backgroundColor: '#FF0000',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              >
                Hapus
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  backgroundColor: '#808080',
                  color: 'white',
                  padding: '10px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProduct;
