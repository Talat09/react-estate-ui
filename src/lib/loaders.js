import axios from "axios";

export const singlePageLoader = async ({ request, params }) => {
  const res = await axios.get(
    `http://localhost:5000/api/V1/posts/${params.id}`
  );
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  console.log("request: ", request);
  const res = await axios.get(`http://localhost:5000/api/V1/posts?${query}`);
  console.log("res: ", res);
  return res.data;
};
