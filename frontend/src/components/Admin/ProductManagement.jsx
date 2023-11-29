// components/admin/ProductManagement.js
import React, { useState } from "react";

const ProductManagement = () => {
  const [productName, setProductName] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [image, setImage] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

  const handleAddProduct = () => {
    // Lakukan logika pengelolaan produk di sini
    // Misalnya, kirim data ke server atau lakukan operasi penyimpanan lainnya
    if (productName && warehouse && image && city && province) {
      console.log("Product Added:", {
        productName,
        warehouse,
        image,
        city,
        province,
      });

      // Reset state setelah produk ditambahkan
      setProductName("");
      setWarehouse("");
      setImage("");
      setCity("");
      setProvince("");
    } else {
      console.error("Semua kolom harus diisi!");
    }
  };

  return (
    <div>
      <h2>Product Management</h2>
      <form>
        <label>
          Product Name:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Warehouse:
          <input
            type="text"
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <br />
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <br />
        <label>
          Province:
          <input
            type="text"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductManagement;
