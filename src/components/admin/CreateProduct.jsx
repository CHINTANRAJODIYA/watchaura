import { Button, FileInput, Select, TextInput, Textarea } from "flowbite-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../../firebase";

function CreateProduct() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageprogress, setImageProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Get categories from localStorage
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem('productCategories');
    return savedCategories ? JSON.parse(savedCategories) : [
      "rolex",
      "zenith",
      "breitling",
      "seiko",
      "longines",
      "hublot",
      "titan",
      "omega",
      "tagheuer"
    ];
  });

  const [formdata, setFormdata] = useState({
    name: "",
    description: "",
    image: "",
    category: "",
    qty: "",
    price: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormdata({ ...formdata, [id]: value });
  };

  const handleUploadImage = async () => {
    try {
      if (!file) {
        toast.error("Select Image First.!!");
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageProgress(progress.toFixed(0));
        },
        (error) => {
          console.log(error);
          toast.error("Image upload failed..!!");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormdata({ ...formdata, image: downloadURL });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Debug log to see what's in formdata
    console.log("Form Data:", formdata);
    
    // Check each field individually and show specific error messages
    if (!formdata.name.trim()) {
      toast.error("Please enter product name");
      return;
    }
    if (!formdata.description.trim()) {
      toast.error("Please enter product description");
      return;
    }
    if (!formdata.image) {
      toast.error("Please upload an image");
      return;
    }
    if (!formdata.category) {
      toast.error("Please select a category");
      return;
    }
    if (!formdata.qty || formdata.qty <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }
    if (!formdata.price || formdata.price <= 0) {
      toast.error("Please enter a valid price");
      return;
    }

    // Convert qty and price to numbers
    const submitData = {
      ...formdata,
      qty: parseInt(formdata.qty),
      price: parseInt(formdata.price)
    };

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const header = {
        token: token,
      };

      const FetchData = await axios.post(
        `${import.meta.env.VITE_REACT_APP}/v1/product/create`,
        submitData,
        {
          headers: header,
        }
      );

      if (FetchData.data.success === true) {
        toast.success(FetchData.data.msg);
        setLoading(false);
        navigate("/product?tab=allproduct");
      } else {
        toast.error(FetchData.data.msg);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.msg || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Create a Product
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Product Name"
            required
            id="name"
            className="flex-1"
            onChange={handleChange}
            value={formdata.name}
          />
          <Select onChange={handleChange} id="category" required value={formdata.category}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            required
            typeof="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageprogress}
          >
            {imageprogress ? (
              <div className="w-16 h-16 ">
                <CircularProgressbar
                  value={imageprogress}
                  text={`${imageprogress || 0}%`}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        <Textarea
          type="text"
          placeholder="Description"
          onChange={handleChange}
          id="description"
          required
          value={formdata.description}
        />
        <TextInput
          type="number"
          placeholder="Enter Price"
          required
          id="price"
          onChange={handleChange}
          value={formdata.price}
        />
        <TextInput
          type="number"
          placeholder="Enter Quantity"
          required
          id="qty"
          onChange={handleChange}
          value={formdata.qty}
        />

        <Button
          type="submit"
          disabled={loading}
          gradientDuoTone="purpleToPink"
          outline
        >
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </div>
  );
}

export default CreateProduct;