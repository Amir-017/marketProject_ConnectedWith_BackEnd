import { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = JSON.parse(localStorage.getItem("accessToken"));

      const res = await axios.get("http://localhost:3000/users", {
        headers: {
          authorization: token,
        },
      });

    //   console.log(res.data);

      // لو الباك بيرجع users جوا object
      setUsers(res.data.data || res.data);
    //   console.log(res.data);
      
    } catch (error) {
    //   console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      await axios.delete(`http://localhost:3000/users/${id}`, {
        headers: {
          authorization: token,
        },
      });

      // نمسح اليوزر من الواجهة من غير ريفرش
      setUsers((prev) => prev.filter((user) => user._id !== id));
    
    } catch (error) {
    //   console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  const handleChangeRole = async (id, currentRole) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
    
      const newRole = currentRole === "admin" ? "member" : "admin";
    
      const res = await axios.patch(
        `http://localhost:3000/users/${id}/role`,
        { role: newRole },
        {
          headers: {
            authorization: token,
          },
        }
      );

      console.log(res.data);

      
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
    //   console.log(error);
      alert(error.response?.data?.message || "Role update failed");
    }
  };

  if (loading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container mx-auto mt-8 px-4 ">
    <div className="rounded-2xl shadow-xl overflow-hidden bg-white dark:bg-blue-gray-900 border border-gray-200 dark:border-blue-gray-800">
      
      <div className="px-6 py-5 border-b border-gray-200 dark:border-blue-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white">
          All Users
        </h1>
  
        {error && (
          <p className="text-red-500 text-center mt-3 font-semibold">
            {error}
          </p>
        )}
      </div>
  
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-sm text-left text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 dark:bg-blue-gray-800 text-gray-900 dark:text-white">
            <tr>
              <th className="px-6 py-4 font-bold text-center">Name</th>
              <th className="px-6 py-4 font-bold text-center">Email</th>
              <th className="px-6 py-4 font-bold text-center">Role</th>
              <th className="px-6 py-4 font-bold text-center">Actions</th>
            </tr>
          </thead>
  
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-t border-gray-200 dark:border-blue-gray-800 transition-all hover:bg-gray-50 dark:hover:bg-blue-gray-800/60 ${
                    index % 2 === 0
                      ? "bg-white dark:bg-blue-gray-900"
                      : "bg-gray-50 dark:bg-blue-gray-900/80"
                  }`}
                >
                  <td className="px-6 py-4 text-center font-medium">
                    {user.name}
                  </td>
  
                  <td className="px-6 py-4 text-center break-words">
                    {user.email}
                  </td>
  
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.role === "admin"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
  
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                      <button
                        onClick={() => handleChangeRole(user._id, user.role)}
                        className="bg-blue-gray-800 hover:bg-blue-gray-700 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200"
                      >
                        Change Role
                      </button>
  
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="bg-red-700 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition-all duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white dark:bg-blue-gray-900">
                <td
                  colSpan="4"
                  className="px-6 py-8 text-center text-lg font-medium text-gray-500 dark:text-gray-300"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default AllUsers;