import React, { useState, useEffect } from "react";
// import styles from "./userPage.css";
import { Button } from "react-bootstrap";
import { Formik, Field, ErrorMessage, FieldArray } from "formik";
// import { useParams } from 'react-router-dom';
import * as Yup from "yup";
import axiosInstance from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';


export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    quantity: "",
    price: "",
    priceAfterDiscount: "",
    sold: "0",
    images: [""],
    category: "",
    subcategory: "",
    brand: "",
    seller: "",
  });
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    getCategory();
    getSubCategory();
    getBrands();
  }, []);

  const getCategory = async () => {
    try {
      const response = await axiosInstance.get(`/categories`);
      setCategories(response.data.data);
      console.log(response);
    } catch (error) {
      // Handle error
    }
  };
  const getSubCategory = async () => {
    try {
      const response = await axiosInstance.get(`/subcategories`);
      setSubCategories(response.data);
      console.log(response);
    } catch (error) {
      // Handle error
    }
  };
  const getBrands = async () => {
    try {
      const response = await axiosInstance.get(`/brands`);
      setBrands(response.data.data);
      console.log(response);
    } catch (error) {
      // Handle error
    }
  };

  const handleSubmit = async (values) => {
    try {
      await axiosInstance.post(`/products`, values);
      console.log(values); // log the updated form values
      const Product = { ...product, ...values };
      setProduct(Product);
      console.log(Product); // log the updated user object
      navigate(`/productslist`);
      toast.success('Product added successfully!'); // Show success message
      // Handle successful update
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <div>
        <div className="container">
          <div>
            <h1 className="text-center pt-5"> Create Product</h1>
          </div>

          <div className="container">
            <hr />

            <div className="row">
              <div className="col-sm-12 ">
                {product && (
                  <Formik
                    initialValues={product}
                    onSubmit={handleSubmit}
                    // validationSchema={validationSchema}
                    enableReinitialize={true}
                  >
                    {(myformik) => (
                      <form onSubmit={myformik.handleSubmit}>
                        <label className="py-2" htmlFor="name">
                          Product name
                        </label>
                        <input
                          onChange={myformik.handleChange}
                          value={myformik.values.name}
                          id="name"
                          type="name"
                          className="form-control my-1"
                          placeholder="Product name"
                        />

                        <label className="py-2" htmlFor="description">
                          Description
                        </label>
                        <input
                          onChange={myformik.handleChange}
                          value={myformik.values.description}
                          id="description"
                          type="description"
                          className="form-control my-1"
                          placeholder="Description"
                        />
                        <label className="py-2" htmlFor="quantity">
                          Quantity
                        </label>
                        <input
                          onChange={myformik.handleChange}
                          value={myformik.values.quantity}
                          id="quantity"
                          type="quantity"
                          className="form-control my-1"
                          placeholder="Quantity"
                        />

                        <label className="py-2" htmlFor="price">
                          Price
                        </label>
                        <input
                          onChange={myformik.handleChange}
                          value={myformik.values.price}
                          id="price"
                          type="price"
                          className="form-control my-1"
                          placeholder="Price"
                        />
                        <label className="py-2" htmlFor="priceAfterDiscount">
                          Price After Discount
                        </label>
                        <input
                          onChange={myformik.handleChange}
                          value={myformik.values.priceAfterDiscount}
                          id="priceAfterDiscount"
                          type="priceAfterDiscount"
                          className="form-control my-1"
                          placeholder="Price After Discount"
                        />

                        <label className="py-2" htmlFor="category">
                          Category
                        </label>
                        <select
                          onChange={myformik.handleChange}
                          value={myformik.values.category}
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

                        <label className="py-2" htmlFor="subcategory">
                          Subcategory
                        </label>
                        <select
                          onChange={myformik.handleChange}
                          value={myformik.values.subcategory}
                          id="subcategory"
                          type="subcategory"
                          className="form-control my-1"
                          > 
                            <option value="">Select a subcategoty</option>
                          {subCategories.map((subcategory) => (
                            <option key={subcategory._id} value={subcategory._id}>
                              {subcategory.name}
                            </option>
                          ))}
                          </select>
                        <label className="py-2" htmlFor="brand">
                          Brand
                        </label>
                        <select
                          onChange={myformik.handleChange}
                          value={myformik.values.brand}
                          id="brand"
                          type="brand"
                          className="form-control my-1"
                          placeholder="Brand"
                        >
                            <option value="">Select a subcategoty</option>
                          {brands.map((brand) => (
                            <option key={brand._id} value={brand._id}>
                              {brand.name}
                            </option>
                          ))}

                            </select>

                        <button type="submit" className=" btn btn-primary my-2" disabled={!myformik.dirty}>
                          Submit
                        </button>
                      </form>
                    )}
                  </Formik>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//   const validationSchema = Yup.object().shape({
//     name: Yup.string()
//       .min(8, 'Name must be at least 8 characters')
//       .required('Name is required'),
//     email: Yup.string()
//       .email('Invalid email address')
//       .required('Email is required'),
//     password: Yup.string()
//       .matches(
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//         'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
//       )
//       .required('Password is required'),
//       passwordConfirm: Yup.string()
//       .oneOf([Yup.ref('password'), null], 'Passwords must match')
//       .required('Confirm Password is required'),
//   });

{
  /* <label htmlFor="images">Product images</label>
                    <FieldArray name="images">
                      {(filedArrayProps) => {
                        const { push, form } = filedArrayProps;
                        const { values } = form;
                        const { images } = values;
                        return (
                          <div>
                            {images.map((item, index) => {
                              return (
                                <div className="form-control" key={index}>
                                  <Field name={`images[${index}]`} />
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => push("")}
                                  >
                                    +
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        );
                      }}
                    </FieldArray> */
}

{
  /* <label className="py-2" htmlFor="sold">
                        Sold
                        </label>
                        <input
                          onChange={myformik.handleChange}
                          value={myformik.values.sold}
                          id="sold"
                          type="sold"
                          className="form-control my-1"
                          placeholder="Sold "
                        /> */
}
