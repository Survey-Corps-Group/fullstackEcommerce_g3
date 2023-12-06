import React, { useEffect, useState } from "react";
import { rajaOngkirProvince , fetchUserDetails, rajaOngkirProvinceName, rajaOngkirCityName, rajaOngkirCity} from "../../modules/fetch";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useParams } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { updateProfile } from "../../modules/fetch";

const EditProfile = () => {

  const [clientName, setclientName] = useState("");
  // const [province, setProvince] = useState("")
  const [errCity, setErrCity] = useState("");
  
  // const [city, setCity] = useState("")
  
  const [dataUser, setDataUser] = useState([])
  const [provinces, setProvinces] = useState([])
  const [province, setProvince] = useState("")
  const [cities, setCities] = useState([])
  const [city, setCity] = useState("")

  const [fullName, setFullName] = useState("")
  const [defaultFullName, setDefaultFullName] = useState("")
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleFullName = (e) =>{
    setFullName(e.target.value)
  }

  const handleUserName = (e) =>{
    setUserName(e.target.value)
  }

  const handleEmail = (e) =>{
    setEmail(e.target.value)
  }

  const handleAddress = (e) =>{
    setAddress(e.target.value)
  }

  const handlePhone = (e) =>{
    setPhone(e.target.value)
  }

  const handlePassword = (e) =>{
    setPassword(e.target.value)
  }

  const handleProvince = (e) => {
    setProvince(e.target.value)
  };
  const handleCity = (e) => {
    setCity(e.target.value);
    setErrCity("");
  };

  
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");



  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const user_id = decodedToken.userId

  useEffect(() => {
    const fetch_user = async () => {
    try {
          const response = await fetchUserDetails(user_id)
          setDataUser(response)
          setFullName(response.full_name)
          setDefaultFullName(response.full_name)
          setUserName(response.username)
          setEmail(response.email)
          setAddress(response.address)
          setPhone(response.phone)
        }catch (e) {
        }
    }
    fetch_user();
  }, [])

  // fetch province dari raja ongkir
  useEffect(() => {
    const fetchProvince = async () => {
        try{
          const response = await rajaOngkirProvince()
          setProvinces(response.data)
        }catch (e) {

        }
    }
    fetchProvince();
  }, [])
  
  useEffect( () => {
    const fetchCity = async () => {
      const id = province
      try {
        const response = await rajaOngkirCity(id)
        setCities(response.data)
      }catch(e){

      }
    }
    fetchCity()
  }, [province])

  
  const handlePost = async (e) => {
    e.preventDefault();
    console.log('masul')
    // if (!fullName || fullName === "") {
    //   fullName = defaultFullName
    // }
    // if (!fullName) {
    //   setErrClientName("Enter your Name");
    // }
    // if (!email) {
    //   setErrEmail("Enter your Email");
    // } else {
    //   if (!EmailValidation(email)) {
    //     setErrEmail("Enter a Valid Email");
    //   }
    // }

    await updateProfile(user_id, userName, email,password,address,fullName,phone,city,province)
  };

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Edit Profile"/>
      {successMsg ? (
        <p className="pb-20 w-96 font-medium text-green-500">{successMsg}</p>
      ) : (
        <form className="pb-20 ">
          
          <div className="max-w-container h-auto py-6 flex flex-col grid grid-cols-2 gap-4">
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Name
              </p>
              <input
                onChange={handleFullName}
                value={fullName}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter your name here"
              />
              {errClientName && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errClientName}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Address
              </p>
              <input
                onChange={handleAddress}
                value={address}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter your username here"
              />
              {errClientName && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errClientName}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Username
              </p>
              <input
                onChange={handleUserName}
                value={userName}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter your email here"
              />
              {errClientName && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errClientName}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Province
              </p>
              <select
                    onChange={handleProvince}
                    value={province}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                  >
                    <option value=""  selected >
                      Select Province
                    </option>
                    {
                      provinces.map((provincesOption) => (
                        <option key={provincesOption.province_id} value={provincesOption.province_id}> 
                          {provincesOption.province}
                        </option>
                      ))
                    }
                  </select>
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Email
              </p>
              <input
                onChange={handleEmail}
                value={email}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter your password here"
              />
              {errClientName && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errClientName}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                City
              </p>
              <select
                    onChange={handleCity}
                    value={city}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                  >
                    <option value="" disabled selected hidden>
                      Select City
                    </option>
                    {
                      cities.map((citiesOption) => (
                        <option key={citiesOption.city_id} value={citiesOption.city_id}> 
                          {citiesOption.city_name}
                        </option>
                      ))
                    }
                  </select>
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Phone Number
              </p>
              <input
                onChange={handlePhone}
                value={phone}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="text"
                placeholder="Enter your province here"
              />
              {errClientName && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errClientName}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Password
              </p>
              <input
                onChange={handlePassword}
                value={password}
                className="w-full py-1 border-b-2 px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none focus-within:border-primeColor"
                type="email"
                placeholder="Enter your Country here"
              />
              {errEmail && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errEmail}
                </p>
              )}
            </div>
        
            
          </div>
          <button
              onClick={handlePost}
              className="w-44 bg-primeColor text-gray-200 h-10 font-titleFont text-base tracking-wide font-semibold hover:bg-black hover:text-white duration-200 mt-4"
            >
              Save changes
            </button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
