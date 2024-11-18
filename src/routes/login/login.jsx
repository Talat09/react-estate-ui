import toast, { Toaster } from "react-hot-toast";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState("");
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;

    const password = e.target.password.value;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/V1/auth/login",
        { username, password },
        { withCredentials: true }
      );
      // console.log("login response:", response.data);
      updateUser(response.data);
      if (response.status === 200) {
        toast.success("Registration successful!");
        navigate("/");
      }
    } catch (error) {
      // console.error("New Error:", error.response.data.message);
      setError(error.response.data.message);
      toast.error("An error occurred: " + error.response.data.message);
    }
  };
  return (
    <div className="login">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="formContainer">
        <form onSubmit={handleLogin}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <p style={{ color: "red" }}>{error}</p>
          <button>Login</button>
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
