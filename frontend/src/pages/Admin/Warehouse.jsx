import React, { useState, useEffect } from 'react';

const Warehouse = () => {
  const [formData, setFormData] = useState({
    city: '',
    province: '',
  });

  const [warehouses, setWarehouses] = useState([]);
  
  useEffect(() => {
    // Gantilah dengan logika pengambilan data gudang dari server atau penyimpanan lokal
    // Misalnya menggunakan fetch untuk mendapatkan data dari endpoint API
    fetch('https://api.example.com/warehouses')
      .then((response) => response.json())
      .then((data) => setWarehouses(data))
      .catch((error) => console.error('Error fetching warehouses:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Implementasikan logika penanganan form di sini
    // Anda dapat menggunakan state (formData) atau mengirim data ke server
    alert('Form submitted!');
  };

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Warehouse Information</h2>

        <form>
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

          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        {/* Tampilkan daftar gudang */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">List of Warehouses:</h3>
          <ul>
            {warehouses.map((warehouse) => (
              <li key={warehouse.id}>
                {warehouse.city}, {warehouse.province}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Warehouse;
