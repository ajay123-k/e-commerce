import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import bcryptJs from "bcryptjs";
const salt = 10;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // This function is used for user registration
  const handleRegister = async (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    // Check if email is already registered
    if (existingUsers.some((user) => user.email === email)) {
      alert("Email is already registered. Please login.");
      return;
    }

    // Save new user
    const newUser = { name, email, password: await generateHash(password) };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    alert("Registration successful! Please login.");
    navigate("/login");
  };

  //   This function is used for generating hash
  const generateHash = async (plainText) => {
    return bcryptJs.hash(plainText, salt);
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-15 p-5">
        <div className="bg-white p-8 shadow-lg rounded">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 mb-2"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 mb-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 mb-4"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded cursor-pointer"
            >
              Register
            </button>
          </form>
          <p className="mt-2 text-sm">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
