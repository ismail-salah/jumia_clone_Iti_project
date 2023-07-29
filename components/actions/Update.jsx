import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../sidebar/SideBar";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";

function Update() {
  const navigate = useNavigate();
  const [file, setfile] = useState(null);
  const [files, setfiles] = useState(null);
  const [res, setRes] = useState(null);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const { id } = useParams();

  async function getOneProduct() {
    return await axios
      .get(`https://ali-service-ey1c.onrender.com/api/team2/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("SellerToken")}`,
        },
      })
      .then((res) => {
        setRes(res);

        formik.initialValues.name = res.data.name;
        formik.initialValues.category = res.data.category;
        formik.initialValues.subcategory = res.data.subcategory;
        formik.initialValues.brand = res.data.brand;
        formik.initialValues.price = res.data.price;
        formik.initialValues.quantity = res.data.quantity;
        formik.initialValues.priceAfterDiscount = res.data.priceAfterDiscount;
        formik.initialValues.description = res.data.description;
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getOneProduct();
    getCategory();
    getBrands();
  }, []);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        `https://ali-service-ey1c.onrender.com/api/team2/categories?limit=15`
      );
      setCategories(response.data.data);
      // console.log(response);
    } catch (error) {
      // Handle error
    }
  };

  const getBrands = async () => {
    try {
      const response = await axios.get(
        `https://ali-service-ey1c.onrender.com/api/team2/brands`
      );
      setBrands(response.data.data);
      // console.log(response);
    } catch (error) {
      // Handle error
    }
  };

  const updateProduct = async (fd) => {
    return await axios
      .put(
        `https://ali-service-ey1c.onrender.com/api/team2/products/${id}`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("SellerToken")}`,
          },
        }
      )

      .then((res) => {
        if (res.status === 200) {
          toast.success(`${res.data.data.name} Updated successfully`, {
            position: "top-center",
            duration: 2000,
          });
        }
        navigate("/seller");
      })
      .catch((err) => console.log(err));
  };

  async function handelUpdate(values) {
    const fd = new FormData();
    if (files) {
      for (let i = 0; i < files.length; i++) {
        fd.append("images", files[i]);
      }
    }

    if (file) {
      fd.append("imageCover", file);
    }

    fd.append("name", values.name);
    fd.append("quantity", values.quantity);
    fd.append("price", values.price);
    fd.append("description", values.description);
    fd.append("priceAfterDiscount", values.priceAfterDiscount);
    fd.append("category", values.category);
    fd.append("brand", values.brand);
    fd.append("subcategory", values.subcategory);

    await updateProduct(fd);
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      quantity: "",
      price: "",
      description: "",
      priceAfterDiscount: "",
      category: "",
      subcategory: "",
      brand: "",
      // category: "64ac169f513cc89c46b1f9e9",
      // subcategory: "64acb9a3e8085d57c8828770",
      // brand: "64acb9f5e8085d57c8828776",
      // imageCover: "",
    },

    onSubmit: handelUpdate,
  });

  const handleOnChange = async (event) => {
    if (event.target.id === "category") {
      console.log("Form::onChange", event.target.value);

      await axios
        .get(
          `https://ali-service-ey1c.onrender.com/api/team2/categories/${event.target.value}/subcategories`
        )
        .then((res) => setSubCategories(res.data))
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <div className="container">
        <div className="row m-0 d-flex justify-content-between">
          <div
            className="col-3 rounded-2 my-2"
            style={{ backgroundColor: "#E6E6E6" }}
          >
            <SideBar />
          </div>

          <div className="col-8">
            <div className="w-75 mx-auto py-4">
              <h3>Update Product</h3>
              <form onSubmit={formik.handleSubmit} onChange={handleOnChange}>
                <label htmlFor="name">Name:</label>
                <input
                  className="form-control mb-2"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="name"
                  id="name"
                />

                <label htmlFor="quantity">quantity:</label>
                <input
                  className="form-control mb-2"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                  name="quantity"
                  id="quantity"
                />

                <label htmlFor="price">price:</label>
                <input
                  className="form-control mb-2"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                  name="price"
                  id="price"
                />

                <label htmlFor="priceAfterDiscount">priceAfterDiscount:</label>
                <input
                  className="form-control mb-2"
                  value={formik.values.priceAfterDiscount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="number"
                  name="priceAfterDiscount"
                  id="priceAfterDiscount"
                />

                <label htmlFor="description">description:</label>
                <input
                  className="form-control mb-2"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="text"
                  name="description"
                  id="description"
                />

                <label htmlFor="category">category:</label>
                <select
                  onChange={formik.handleChange}
                  value={formik.values.category}
                  id="category"
                  className="form-control my-1"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="subcategory">subcategory:</label>
                <select
                  onChange={formik.handleChange}
                  value={formik.values.subcategory}
                  id="subcategory"
                  className="form-control my-1"
                >
                  <option value="">Select a subcategory</option>
                  {subCategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="brand">brand:</label>
                <select
                  onChange={formik.handleChange}
                  value={formik.values.brand}
                  id="brand"
                  className="form-control my-1"
                >
                  <option value="">Select a brand</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>

                <label htmlFor="imageCover">imageCover:</label>
                <input
                  className="form-control mb-2"
                  value={formik.values.imageCover}
                  onChange={(e) => {
                    setfile(e.target.files[0]);
                  }}
                  onBlur={formik.handleBlur}
                  type="file"
                  name="imageCover"
                  id="imageCover"
                />
                <label htmlFor="images">images:</label>
                <input
                  className="form-control mb-2"
                  multiple
                  value={formik.values.images}
                  onChange={(e) => {
                    setfiles(e.target.files);
                  }}
                  onBlur={formik.handleBlur}
                  type="file"
                  name="images"
                  id="images"
                />

                <button
                  type="submit"
                  className="btn btn-primary text-light my-3 p-2"
                >
                  update product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Update;
