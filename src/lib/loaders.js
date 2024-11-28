import axios from "axios";
import { defer } from "react-router-dom";

export const singlePageLoader = async ({ request, params }) => {
  console.log(params.id);
  const res = await axios.get(
    `http://localhost:5000/api/V1/posts/${params.id}`
  );
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];

  const postPromise = axios.get(`http://localhost:5000/api/V1/posts?${query}`);

  return defer({
    postResponse: postPromise,
  });
};
