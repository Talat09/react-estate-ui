import axios from "axios";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/V1/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("user");
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>
            <span>
              Username: <b>John Doe</b>
            </span>
            <span>
              E-mail: <b>john@gmail.com</b>
            </span>
            <button
              onClick={handleLogout}
              disabled={loading}
              style={{
                width: "100px",
                padding: "10px 20px",
                backgroundColor: loading ? "gray" : "goldenrod",
                border: "none",
                borderRadius: "9px",
                fontSize: "18px",
                color: "white",
                cursor: "pointer",
              }}
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
