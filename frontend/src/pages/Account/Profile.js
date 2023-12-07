import React, { useEffect, useState } from "react";
import { rajaOngkirProvince , fetchUserDetails, rajaOngkirProvinceName, rajaOngkirCityName} from "../../modules/fetch";
import { rajaOngkirCity } from "../../modules/fetch";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";


const Profile = () => { 

  const [successMsg, setSuccessMsg] = useState("");
  const [dataUser, setDataUser] = useState([])
  const [province, setProvince] = useState([])
  const [city, setCity] = useState([])
  const navigate = useNavigate()

  // fetch data user
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const user_id = decodedToken.userId

  useEffect(() => {
    const fetch_user = async () => {
    try {
          const response = await fetchUserDetails(user_id)
          setDataUser(response)
        }catch (e) {
        }
    }
    fetch_user();
  }, [])
  
  const data = dataUser
  const id_province = data.province_id
  const id_city = data.city_id
  console.log(id_city, 'city_id')

  // fetch province
  useEffect(() => {
    const fetch_province = async () => {
      try {
        const response = await rajaOngkirProvinceName(id_province)
        setProvince(response.data.province)
      }catch (e) {
      }
    }
    fetch_province()
  }, [!province])

// fetch city
  useEffect(() => {
    const fetch_city = async () => {
      try {
        const response = await rajaOngkirCityName(id_city, id_province)
        console.log(response.data.city_name, 'city')
        setCity(response.data.city_name)
      }catch (e) {
      }
    }
    fetch_city()
  }, [!city])
  
  const handleEditProfile = () =>{
    navigate('/editProfile')
  }
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Profile"/>
      {successMsg ? (
        <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
      ) : (
        <form className="pb-20 ">
          
          <div className="max-w-container h-auto py-6 flex flex-col grid grid-cols-2 gap-4">
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Name
              </p>
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                {dataUser.full_name}
              </p>

            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Phone Number
              </p>
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                {dataUser.phone}
              </p>

            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Username
              </p>
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                {dataUser.username}
              </p>

            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Address
              </p>
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                {dataUser.address}
              </p>

            </div>
            
            
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Email
              </p>
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                {dataUser.email}
              </p>

            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Province
              </p>
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                {province}
              </p>
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Password
              </p>
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                .......
              </p>
            </div>
            
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                City
              </p>
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                {city}
              </p>
            </div>
              
          </div>
          <button
              onClick={handleEditProfile}
              className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200 mt-4"
            >
              Edit Profile
            </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
