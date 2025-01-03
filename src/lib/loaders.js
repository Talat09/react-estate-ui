import axios from "axios";
import { defer } from "react-router-dom";

export const singlePageLoader = async ({ params }) => {
  console.log(params.id);
  const res = await axios.get(
    `http://localhost:5000/api/V1/posts/${params.id}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
export const listPageLoader = async ({ request }) => {
  const query = request.url.split("?")[1];

  const postPromise = axios.get(`http://localhost:5000/api/V1/posts?${query}`, {
    withCredentials: true,
  });

  return defer({
    postResponse: postPromise,
  });
};
export const profilePageLoader = async () => {
  const postPromise = axios.get(
    `http://localhost:5000/api/V1/users/profilePosts`,
    {
      withCredentials: true,
    }
  );
  const chatPromise = axios.get(`http://localhost:5000/api/V1/chats`, {
    withCredentials: true,
  });

  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
