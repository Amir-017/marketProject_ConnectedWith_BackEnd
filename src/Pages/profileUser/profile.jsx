import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



function Profile() {
  const [userDetail, setUserDetail] = useState({})
  const navigate = useNavigate()
  const getuserDetails = ()=>{
    axios.get('http://localhost:3000/users/profile',{
      headers:{
        authorization : JSON.parse(localStorage.getItem('accessToken'))
      }
    }).then((data)=>setUserDetail(data.data.data))
  }
  useEffect(()=>{
    getuserDetails()
  },[])
  // console.log(userDetail);
  // funciton to go to page (editeProfile)
  const goToEditeProfile = ()=>{
    navigate('/editeProfile')
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100 dark:bg-blue-gray-900">
      <div className="w-full max-w-3xl bg-white dark:bg-blue-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-blue-gray-700">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 dark:bg-blue-gray-900 px-8 py-6 flex items-center gap-4">
          <img
            src="https://ui-avatars.com/api/?name=Amir&background=10b981&color=fff&rounded=true"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
          />

          <div className="text-white">
            <h1 className="text-2xl font-bold">
              User Profile
            </h1>
            <p className="opacity-90">
              Manage and view your account information
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6 space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                value={userDetail.name || ""}
                readOnly
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 dark:bg-blue-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input
                type="email"
                value={userDetail.email || ""}
                readOnly
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 dark:bg-blue-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            {/* phone */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                type="password"
                value="********"
                readOnly
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 dark:bg-blue-gray-900 text-gray-900 dark:text-white"
              />
            </div>

          

          </div>

          {/* Button */}
          <div className="pt-4 border-t border-gray-200 dark:border-blue-gray-700 flex justify-end">
            <button className="px-6 py-2.5 rounded-lg dark:bg-blue-gray-900 bg-green-600 hover:bg-green-700 text-white font-semibold transition"onClick={goToEditeProfile}>
              Edit Profile
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;