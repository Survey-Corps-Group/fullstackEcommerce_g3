import React, { useEffect, useState } from "react";
import { rajaOngkirProvince, rajaOngkirCity } from "../../modules/fetch";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Profile = () => {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState("");
  const [cities, setCities] = useState([]);
  const [city, setCity] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

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

  const handleProvinceChange = async (e) => {
    const selectedProvinceId = e.target.value;
    setProvince(selectedProvinceId);
    setProvinceId(selectedProvinceId);

    try {
      const response = await rajaOngkirCity(selectedProvinceId);
      setCities(response.data);
    } catch (e) {}
  };

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    setCity(selectedCityId);
    setCityId(selectedCityId);
  };

  const handleName = (e) => {
    setClientName(e.target.value);
    setErrClientName("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
    } else {
      // Your email validation logic here
    }
  };

  const handleAddWarehouse = () => {
    const newWarehouse = {
      id: warehouses.length + 1,
      province,
      city,
      provinceId,
      cityId,
    };
    setWarehouses([...warehouses, newWarehouse]);
    setProvince("");
    setCity("");
    setProvinceId("");
    setCityId("");
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Warehouse" />
      {successMsg ? (
        <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
      ) : (
        <div>
          <form className="pb-20 bg-white rounded-lg shadow-md p-8">
            <div className="max-w-container h-auto py-6 flex-col grid-cols-2 gap-4">
              {/* Other form fields */}
              <div>
                <p className="text-base font-titleFont font-semibold mb-2">Province:</p>
                <select
                  className="w-full py-2 px-4 border border-gray-300 rounded-md text-base font-medium outline-none font-titleFont text-lightText"
                  value={province}
                  onChange={handleProvinceChange}
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province.province_id} value={province.province_id}>
                      {province.province}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold mb-2">City:</p>
                <select
                  className="w-full py-2 px-4 border border-gray-300 rounded-md text-base font-medium outline-none font-titleFont text-lightText"
                  value={city}
                  onChange={handleCityChange}
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.city_id} value={city.city_id}>
                      {city.city_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold mb-2">Province ID:</p>
                <p className="w-full py-2 px-4 border border-gray-300 rounded-md text-base font-medium outline-none font-titleFont text-lightText">
                  {provinceId}
                </p>
              </div>
              <div>
                <p className="text-base font-titleFont font-semibold mb-2">City ID:</p>
                <p className="w-full py-2 px-4 border border-gray-300 rounded-md text-base font-medium outline-none font-titleFont text-lightText">
                  {cityId}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handlePost}
                className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200 mt-4 mr-4 rounded-md"
              >
                Edit Warehouse
              </button>
              <button
                onClick={handleAddWarehouse}
                className="w-44 bg-blue-500 text-white h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-blue-700 duration-200 mt-4 rounded-md"
              >
                Add Warehouse
              </button>
              {/* Back to Admin Page Button */}
              <Link to="/AdminPage" className="ml-4">
                <button className="w-44 bg-gray-500 text-white h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-gray-700 duration-200 mt-4 rounded-md">
                  Back to Admin Page
                </button>
              </Link>
            </div>
          </form>
          <div className="mt-8">
            <h2 className="text-xl font-titleFont font-semibold mb-4">Warehouse List:</h2>
            <ul>
              {warehouses.map((warehouse) => (
                <li key={warehouse.id}>
                  <p>Warehouse ID: {warehouse.id}</p>
                  <p>Province: {warehouse.province}</p>
                  <p>City: {warehouse.city}</p>
                  <p>Province ID: {warehouse.provinceId}</p>
                  <p>City ID: {warehouse.cityId}</p>
                  <hr className="my-4" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
