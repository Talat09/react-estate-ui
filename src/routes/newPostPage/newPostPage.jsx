import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function NewPostPage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Gather input values from the form
    const title = form.title.value.trim();
    const price = form.price.value.trim();
    const address = form.address.value.trim();
    const desc = value; // ReactQuill content
    const city = form.city.value.trim();
    const bedroom = form.bedroom.value.trim();
    const bathroom = form.bathroom.value.trim();
    const latitude = form.latitude.value.trim();
    const longitude = form.longitude.value.trim();
    const type = form.type.value;
    const property = form.property.value;
    const utilities = form.utilities.value;
    const petPolicy = form.pet.value;
    const incomePolicy = form.income.value.trim();
    const size = form.size.value.trim();
    const schoolDistance = form.school.value.trim();
    const busDistance = form.bus.value.trim();
    const restaurantDistance = form.restaurant.value.trim();

    // Validate required fields (you can expand validation as needed)
    if (!title || !price || !address || !desc) {
      alert("Please fill in all required fields!");
      return;
    }

    // Prepare data for submission
    const postData = {
      title,
      price: parseFloat(price),
      address,

      city,
      bedroom: parseInt(bedroom, 10),
      bathroom: parseInt(bathroom, 10),
      latitude: JSON.stringify(latitude),
      longitude: JSON.stringify(longitude),
      type,
      property,
      images,
    };
    const postDetails = {
      desc,
      utilities,
      petPolicy,
      incomePolicy,
      size: parseFloat(size),
      distances: {
        school: parseFloat(schoolDistance),
        bus: parseFloat(busDistance),
        restaurant: parseFloat(restaurantDistance),
      },
    };

    console.log("Form Data:", { postData, postDetails });
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/V1/posts",
        {
          postData,
          postDetails,
        },
        { withCredentials: true }
      );

      toast.success("Post added successfully!");
      setLoading(false);
      navigate("/" + response.data.id);
    } catch (error) {
      setLoading(false);
      setError("Error submitting data. Please try again later.");

      toast.error("Submission failed.");
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>

            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton" disabled={loading}>
              {loading ? "Loading..." : "Add"}
            </button>
            {error && <span style={{ color: "red" }}>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img key={index} src={image} alt={image} />
        ))}
        <UploadWidget
          uwConfig={{
            cloudName: "talatdev",
            uploadPreset: "estate",
            multiple: true,
            maxImageFileSize: 2000000,
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
