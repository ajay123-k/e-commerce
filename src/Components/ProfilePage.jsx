import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MyShop | Profile";
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      navigate("/");
    }

    setUser(loggedInUser);
  }, []);

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="p-7">
        {/* Profile section */}
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-300 p-6 mt-10 ">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full border-4 border-gray-300 overflow-hidden mb-4">
              <img
                src="/user.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {user?.name}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-500 text-sm mt-1">
              Joined on: {new Date().toDateString()}
            </p>
          </div>
          <hr className="my-4 border-gray-300" />

          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold text-gray-700">Full Name:</span>
              <span className="text-gray-800">{user?.name}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="font-semibold text-gray-700">Email:</span>
              <span className="text-gray-800">{user?.email}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Join Date:</span>
              <span className="text-gray-800">
                {" "}
                {new Date().toDateString()}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded mt-6 w-full hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        {/* Profile section */}
      </div>
    </>
  );
};

export default ProfilePage;
