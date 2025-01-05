import axios from "axios";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Suspense, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://real-estate-backend-livid.vercel.app/api/V1/auth/logout",
        {},
        { withCredentials: true }
      );
      updateUser(null);
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
            <Link to="/profile/update">
              {" "}
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "/noAvatar.jpg"} alt="avatar" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
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
            <Link to="/add">
              {" "}
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense
            fallback={
              <img
                style={{
                  width: "200px",
                  display: "flex",
                  margin: "auto",
                }}
                src="/loading.gif"
                alt="loading"
              />
            }
          >
            <Await
              resolve={data?.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse?.data.userPosts} />}
            </Await>
          </Suspense>

          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense
            fallback={
              <img
                style={{
                  width: "200px",
                  display: "flex",
                  margin: "auto",
                }}
                src="/loading.gif"
                alt="loading"
              />
            }
          >
            <Await
              resolve={data?.postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse) => <List posts={postResponse?.data.savedPosts} />}
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Suspense
            fallback={
              <img
                style={{
                  width: "200px",
                  display: "flex",
                  margin: "auto",
                }}
                src="/loading.gif"
                alt="loading"
              />
            }
          >
            <Await
              resolve={data?.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
