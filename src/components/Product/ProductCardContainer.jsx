import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  Button,
  FileInput,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { app } from "../../firebase";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartProvider";

function ProductCardContainer() {
  const [searchParams] = useSearchParams();
  const term = searchParams.get("term");
  const [imageprogress, setImageProgress] = useState(null);
  const [file, setFile] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(term);
  const { currentUser } = useSelector((state) => state.user);
  const [updateproduct, setUpdateProduct] = useState({
    id: "",
    name: "",
    image: "",
    qty: "",
    category: "",
    description: "",
    price: "",
  });

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

  // For Updating Cart Length
  const { setCartLength } = useCart();

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: token,
      };
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP}/v1/product/getall`,
        { headers }
      );
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const HandleDeleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: token,
      };

      const resp = await axios.delete(
        `${import.meta.env.VITE_REACT_APP}/v1/auth/deleteproduct/${id}`,
        {
          headers,
        }
      );
      if (resp.data.success == true) {
        toast.success(resp.data.msg);
        fetchData();
      } else {
        toast.error(resp.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateChange = (e) => {
    const { id, value } = e.target;
    setUpdateProduct({ ...updateproduct, [id]: value });
  };

  const HandleUpdateProduct = async (id) => {
    setUpdateModal(true);
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: token,
      };
      const getproduct = axios.get(
        `${import.meta.env.VITE_REACT_APP}/v1/product/getproduct/${id}`,
        { headers }
      );
      if ((await getproduct).data.success == true) {
        setUpdateProduct((await getproduct).data.product);
      } else {
        toast.error((await getproduct).data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (tab) {
      const filtered = products.filter((item) => {
        return item.category === tab;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [tab, products]);

  const handleAddtoCart = async (pid) => {
    try {
      const userId = currentUser._id;
      const Body = { productId: pid, userId: userId };
      const Fetchdata = await axios.post(
        `${import.meta.env.VITE_REACT_APP}/v1/cart/add`,
        Body
      );
      if (Fetchdata.data.success == true) {
        toast.success(Fetchdata.data.msg);
        // Updating Cart Lenght
        setCartLength((prev) => (prev += 1));
      } else {
        toast.error(Fetchdata.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
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
            setUpdateProduct({ ...updateproduct, image: downloadURL });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinalProductUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const headers = {
        token: token,
      };
      const resp = await axios.patch(
        `${import.meta.env.VITE_REACT_APP}/v1/auth/updateproduct`,
        updateproduct,
        {
          headers,
        }
      );
      console.log(resp);
      if (resp.data.success == true) {
        toast.success(resp.data.msg);
        setUpdateModal(false);
        fetchData();
      } else {
        toast.error(resp.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Categories Sidebar */}
      <div className="md:w-56 p-4">
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              gradientDuoTone="purpleToBlue"
              onClick={() => setTab(category)}
              outline
              className={tab === category ? "bg-purple-500 text-white" : ""}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 p-4">
        <div className="flex flex-wrap gap-5 justify-center">
          {loading ? (
            <Button color="gray">
              <Spinner aria-label="Alternate spinner button example" size="sm" />
              <span className="pl-3">Loading...</span>
            </Button>
          ) : (
            filteredProducts.map((item) => (
              <ProductCard
                key={item._id}
                item={item}
                HandleUpdateProduct={HandleUpdateProduct}
                HandleDeleteProduct={HandleDeleteProduct}
                handleAddtoCart={handleAddtoCart}
              />
            ))
          )}
        </div>
      </div>

      {/* Update Modal */}
      <Modal
        show={updateModal}
        onClose={() => setUpdateModal(false)}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleFinalProductUpdate}
          >
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
              <TextInput
                type="text"
                placeholder="Product Name"
                required
                id="name"
                value={updateproduct.name}
                className="flex-1"
                onChange={handleUpdateChange}
              />
              <Select
                value={updateproduct.category}
                onChange={handleUpdateChange}
                id="category"
              >
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
            {updateproduct && updateproduct.image && (
              <div>
                <img src={updateproduct.image} />
              </div>
            )}

            <Textarea
              type="text"
              onChange={handleUpdateChange}
              value={updateproduct.description}
              placeholder="Description"
              id="description"
              required
            />
            <TextInput
              type="number"
              placeholder="Enter Quentity"
              id="qty"
              onChange={handleUpdateChange}
              value={updateproduct.qty}
            />

            <TextInput
              type="number"
              placeholder="Enter Price"
              id="price"
              onChange={handleUpdateChange}
              value={updateproduct.price}
            />

            <Button
              type="submit"
              gradientDuoTone="purpleToPink"
              outline
            >
              Update
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ProductCardContainer;
