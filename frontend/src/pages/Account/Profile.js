import React, { useEffect, useState } from "react";
import { rajaOngkirProvince } from "../../modules/fetch";
import { rajaOngkirCity } from "../../modules/fetch";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const Profile = () => {

  const [clientName, setclientName] = useState("");
  const [email, setEmail] = useState("");
  const [provinces, setProvinces] = useState([])
  const [province, setProvince] = useState("")
  const [errCity, setErrCity] = useState("");
  const [cities, setCities] = useState([])
  const [city, setCity] = useState("")

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

  
  const [errClientName, setErrClientName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleName = (e) => {
    setclientName(e.target.value);
    setErrClientName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrEmail("");
  };
  const handleProvince = (e) => {
    setProvince(e.target.value)
  };
  const handleCity = (e) => {
    setCity(e.target.value);
    setErrCity("");
  };

  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

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

  // fetch city dari raja ongkir
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

  const handlePost = (e) => {
    e.preventDefault();
    if (!clientName) {
      setErrClientName("Enter your Name");
    }
    if (!email) {
      setErrEmail("Enter your Email");
    } else {
      if (!EmailValidation(email)) {
        setErrEmail("Enter a Valid Email");
      }
    }
  };

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
                Alexa Sabrina
              </p>
              {errClientName && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errClientName}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Phone Number
              </p>
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                Alexa Sabrina
              </p>
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
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                Alexa Sabrina
              </p>
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
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                Alexa Sabrina
              </p>
              {errClientName && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errClientName}
                </p>
              )}
            </div>
            
            
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Email
              </p>
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                Alexa Sabrina
              </p>
              {errEmail && (
                <p className="text-red-500 text-sm font-titleFont font-semibold mt-1 px-2 flex items-center gap-1">
                  <span className="text-sm italic font-bold">!</span>
                  {errEmail}
                </p>
              )}
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Province
              </p>
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                Alexa Sabrina
              </p>
            </div>
            <div>
              <p className="text-base font-titleFont font-semibold px-2">
                Password
              </p>
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                Alexa Sabrina
              </p>
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
              <p className="w-full py-1  px-2 text-base font-medium placeholder:font-normal placeholder:text-sm outline-none font-titleFont text-lightText">
                Alexa Sabrina
              </p>
            </div>
              
          </div>
          <button
              onClick='/frontend/src/pages/Account/EditProfile.js'
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