import axios from "axios";

export const singlePageLoader = async ({ request, params }) => {
  const res = await axios.get(
    `http://localhost:5000/api/V1/posts/${params.id}`
  );
  return res.data;
};
