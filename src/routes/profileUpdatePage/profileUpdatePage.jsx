import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const [error, setError] = useState("");

  const { currentUser, updateUser } = useContext(AuthContext);

  const [avatar, setAvatar] = useState([]);
  const navigate = useNavigate();
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(username, email, password);
    // updateUser(username, email, password);
    try {
      const id = currentUser.id;

      const response = await axios.put(
        `http://localhost:5000/api/V1/users/${id}`,
        { username, email, password, avatar: avatar[0] },
        { withCredentials: true }
      );
      // console.log("login response:", response.data);
      updateUser(response.data);
      if (response.status === 200) {
        toast.success("Registration successful!");
        navigate("/profile");
      }
    } catch (error) {
      setError(error.response.data.message);
      toast.error("An error occurred: " + error.response.data.message);
    }
  };
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleUpdateUser}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || "/noAvatar.jpg"}
          alt="avatar"
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "talatdev",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
