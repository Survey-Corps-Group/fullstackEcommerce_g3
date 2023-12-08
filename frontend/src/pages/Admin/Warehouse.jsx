import React, { useEffect, useState } from "react";
import {
  rajaOngkirProvince,
  rajaOngkirCity,
  createWarehouse,
  getAllWarehouse,
  updatedWarehouse,
  deletedWarehouse
} from "../../modules/fetch";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Profile = () => {
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const [warehouses, setWarehouses] = useState([]);

  const [editingWarehouseId, setEditingWarehouseId] = useState(null);

  const [isEdit, setIsEdit] = useState(false);

  const [isAdd, setIsAdd] = useState(false);

  // fetch province dari raja ongkir
  useEffect(() => {
    const fetchProvince = async () => {
      try {
        const response = await rajaOngkirProvince();
        setProvinces(response.data);
      } catch (e) {}
    };
    fetchProvince();
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await rajaOngkirCity(provinceId);
        setCities(response.data);
      } catch (e) {}
    };
    if (provinceId) {
      fetchCity();
    }
  }, [provinceId]);

  useEffect(() => {
    const fetchAllWarehouse = async () => {
      try {
        const response = await getAllWarehouse();
        setWarehouses(response);
      } catch (e) {}
    };
    fetchAllWarehouse();
  }, [isAdd]);

  const handleProvinceChange = (e) => {
    const selectedProvinceId = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const provinceName = selectedOption.getAttribute("data-name");
    setProvince(provinceName);
    setProvinceId(selectedProvinceId);
  };

  const handleCityChange = async (e) => {
    const selectedCityId = e.target.value;
    const selectedOption = e.target.options[e.target.selectedIndex];
    const cityName = selectedOption.getAttribute("data-name");
    setCity(cityName);
    setCityId(selectedCityId);
  };

  const handleAddWarehouse = async (e) => {
    e.preventDefault();
    const sendData = {
      province: province,
      city: city,
      province_id: provinceId,
      city_id: cityId,
    };

    const hasil = await createWarehouse(sendData);

    if (hasil.success === true) {
      setIsAdd(!isAdd);
      window.alert("Warehouse berhasil ditambahkan");
      clearData()
    } else {
      window.alert("Terjadi kesalahan di dalam server");
    }
  };

  const handleEditClick = (warehouse) => {
    setIsEdit(true);
    setProvinceId(warehouse.province_id);
    setEditingWarehouseId(warehouse.warehouse_id);
    setCityId(warehouse.city_id);
    setProvince(warehouse.province);
    setCity(warehouse.city);
  };

  const clearData = () => {
    setIsEdit(false);
    setProvinceId('');
    setEditingWarehouseId('');
    setCityId('');
    setProvince('');
    setCity('');
  };

  const handleDelete = async (warehouseId) => {
    if (window.confirm("Are you sure you want to delete this warehouse?")) {
      try {
        const result = await deletedWarehouse(warehouseId)
        if (result.success === true) {
          setIsAdd(!isAdd);
          alert("Warehouse deleted successfully");
          clearData()
        }
      } catch (e) {
        alert("Error deleting warehouse");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      city: city,
      province: province,
      city_id: cityId,
      province_id: provinceId,
    };

    console.log(sendData)
    console.log(editingWarehouseId)

    try {
      const result = await updatedWarehouse(editingWarehouseId, sendData);
      console.log(result)
      if (result.success === true) {
        setIsAdd(!isAdd);
        alert("Warehouse operation successful");
        setEditingWarehouseId(null);
        clearData()
      } else {
        alert("Operation failed");
        window.location.reload();
      }
    } catch (e) {
      alert("An error occurred");
    }

    setIsEdit(false)

  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Warehouse" />
      <div className="grid grid-cols-2 gap-8"> {/* Updated this line for grid layout */}
        {/* Left Side - Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form className="pb-20">
            <div className="max-w-container h-auto py-6 flex-col grid-cols-2 gap-4">
            <div>
              <p className="text-base font-titleFont font-semibold mb-2">
                Province:
              </p>
              <select
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-base font-medium outline-none font-titleFont text-lightText"
                value={provinceId}
                onChange={handleProvinceChange}
              >
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option
                    key={province.province_id}
                    value={province.province_id}
                    data-name={province.province}
                  >
                    {" "}
                    {province.province}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold mb-2">
                City:
              </p>
              <select
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-base font-medium outline-none font-titleFont text-lightText"
                value={cityId}
                onChange={handleCityChange}
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option
                    key={city.city_id}
                    value={city.city_id}
                    data-name={city.city_name}
                  >
                    {city.city_name}
                  </option>
                ))}
              </select>
            </div>
            </div>
            <div className="flex justify-end">
              {/* Conditional Edit/Add Warehouse Button */}
              {
            isEdit ? (
              <>
              <button
                onClick={handleSubmit}
                className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200 mt-4 mr-4 rounded-md"
              >
                Submit Edit
              </button>
              <button
              onClick={clearData}
              className="w-44 bg-teal-500 text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-teal-700 hover:text-white duration-200 mt-4 mr-4 rounded-md"
            >
              Cancel Edit
            </button>
            </>
            ) : (
              <button
                onClick={handleAddWarehouse}
                className="w-44 bg-blue-500 text-white h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-blue-700 duration-200 mt-4 rounded-md"
              >
                Add Warehouse
              </button>
            )
          }

            {/* Back to Admin Page Button */}
            <Link to="/AdminPage" className="ml-4">
              <button className="w-44 bg-gray-500 text-white h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-gray-700 duration-200 mt-4 rounded-md">
                Back to Admin Page
              </button>
            </Link>
            </div>
          </form>
        </div>
  
        {/* Right Side - Warehouse List */}
        <div className="mt-8">
          <h2 className="text-xl font-titleFont font-semibold mb-4">
            Warehouse List:
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              {/* Table Rows */}
              <tbody>
                {warehouses.map((warehouse) => (
                  <tr
                    key={warehouse.warehouse_id}
                    className="bg-white hover:bg-gray-100"
                  >
                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                      {warehouse.city}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700">
                      {warehouse.province}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-right">
                      <button
                        onClick={() => handleEditClick(warehouse)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(warehouse.warehouse_id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  );
  



};

export default Profile;
