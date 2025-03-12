import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import bcryptJs from "bcryptjs";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MyShop | Login";
    let user = localStorage.getItem("loggedInUser");
    if (user) {
      navigate("/");
    }
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);

    if (!user) {
      alert("User details not found");
      return;
    }
    const hashPwd = await bcryptJs.compare(password, user.password);

    if (user && hashPwd) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-20 p-5">
        <div className="bg-white p-8 shadow-lg rounded">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
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
              className="w-full bg-black cursor-pointer text-white py-2 rounded"
            >
              Login
            </button>
            <div className="my-2 text-sm">
              New user{" "}
              <Link className="text-blue-600" to={"/register"}>
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
