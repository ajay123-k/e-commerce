import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("user@test.com");
  const [password, setPassword] = useState("123456");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "MyShop | Login";
    let user = localStorage.getItem("loggedInUser");
    if (user) {
      navigate("/");
    }
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();
    let user = {
      email,
      password,
      name: "User",
    };

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    alert("Login successful!");
    let checkout = localStorage.getItem("isCheckoutCliked");
    if (checkout === "true") {
      navigate("/cart");
      return;
    }
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-20">
        <div className="bg-white p-8 shadow-lg rounded">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 mb-2"
              readOnly
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 mb-4"
              readOnly
            />
            <button
              type="submit"
              className="w-full bg-black cursor-pointer text-white py-2 rounded"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
