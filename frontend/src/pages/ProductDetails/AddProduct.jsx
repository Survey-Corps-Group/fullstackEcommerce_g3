


import React, { useState, useEffect } from 'react';
import { getAllWarehouse, createProduct } from '../../modules/fetch/index';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    item_name: '',
    price: '',
    description: '',
    color: '',
    package_weight: '',
    stock_item: '',
    warehouse_id: '',
    images: [],
  });
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const warehouseData = await getAllWarehouse();
        setWarehouses(warehouseData);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      }
    };

    fetchData();
  }, []); // Fetch warehouses when component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData({
      ...formData,
      images: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assign warehouseId to formData
    setFormData({
      ...formData,
      warehouse_id: formData.warehouse_id.toString(),
    });

    // Create form data for file upload
    const formDataWithImages = new FormData();
    for (const key in formData) {
      if (key === 'images') {
        for (let i = 0; i < formData.images.length; i++) {
          formDataWithImages.append('images', formData.images[i]);
        }
      } else {
        formDataWithImages.append(key, formData[key]);
      }
    }

    try {
      // Call addProduct function with formDataWithImages
      const result = await createProduct(formDataWithImages);

      // Handle success and show modal
      setShowSuccessModal(true);

      // Reset form fields
      setFormData({
        item_name: '',
        price: '',
        description: '',
        color: '',
        package_weight: '',
        stock_item: '',
        warehouse_id: '',
        images: [],
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
  };

  const handleBackButtonClick = () => {
    navigate('/ManageProduct');
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '15%' }}>
        {/* Konten div kiri */}
        <button
  onClick={handleBackButtonClick}
  style={{
    backgroundColor: '#4285F4', // Ganti dengan warna yang diinginkan
    color: 'white',
    margin: '20px',
    width: '70px',
    padding: '10px', // Ubah sesuai kebutuhan
    borderRadius: '10%', // Border rounded
    cursor: 'pointer',
    border: 'none', // Hilangkan border
  }}
>
  BACK
</button>
      </div>

      <div style={{ width: '75%' }}>
        <div style={{ padding: '20px', marginBottom: '20px', width: '100%' }}>
          <h1 style={{ textAlign: 'center' }}>Add Product</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ marginBottom: '15px', width: '70%' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Product Name:
                  <input
                    type="text"
                    name="item_name"
                    value={formData.item_name}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </label>
              </div>

              <div style={{ marginBottom: '15px', width: '70%' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </label>
              </div>

              <div style={{ marginBottom: '15px', width: '70%' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Description:
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </label>
              </div>

              <div style={{ marginBottom: '15px', width: '70%' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Color:
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </label>
              </div>

              <div style={{ marginBottom: '15px', width: '70%' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Package Weight (gram) :
                  <input
                    type="number"
                    name="package_weight"
                    value={formData.package_weight}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </label>
              </div>

              <div style={{ marginBottom: '15px', width: '70%' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Stock Item:
                  <input
                    type="number"
                    name="stock_item"
                    value={formData.stock_item}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </label>
              </div>

              <div style={{ marginBottom: '15px', width: '70%' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Warehouse:
                  <select
                    name="warehouse_id"
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                  >
                    <option value="">Select Warehouse</option>
                    {warehouses.map((warehouse) => (
                      <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                        {warehouse.city}, {warehouse.province}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div style={{ marginBottom: '15px', width: '70%' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>
                  Images (Max 5):
                  <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleFileChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                  />
                </label>
              </div>

              <div style={{ textAlign: 'center', width: '70%' }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div style={{ width: '15%' }}>
        {/* Konten div kanan */}
      </div>

      {/* Modal */}
      {showSuccessModal && (
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
            <p>Berhasil menambahkan product</p>
            <button
              onClick={handleModalClose}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;
