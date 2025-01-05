import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Register() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch(
        "https://real-estate-backend-livid.vercel.app/api/V1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        toast.error("An error occurred: " + errorData.message);
      }
    } catch (error) {
      console.error("New Error:", error.response);
    }
  };

  return (
    <div className="register">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="formContainer">
        <form onSubmit={handleRegister}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />

          <div
            className="passwordContainer"
            style={{ position: "relative", width: "100%" }}
          >
            <span
              style={{ position: "absolute", right: "10px", top: "35%" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
            <input
              style={{ width: "100%" }}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
          </div>

          <p style={{ color: "red" }}>{error}</p>
          <button>Register</button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
