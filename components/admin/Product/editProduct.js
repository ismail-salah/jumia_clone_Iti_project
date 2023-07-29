import React, { useState, useEffect } from "react";
// import styles from "./userPage.css";
import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from 'react-router-dom';
// import * as Yup from 'yup';
import axiosInstance from "../../axios/axios";
import {  toast } from 'react-toastify';


function EditProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        console.log(response.data); 
        setUser(response.data);
        console.log(user)
      } catch (error) {
        // Handle error
      }
    };
    fetchUserData();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await axiosInstance.put(`/products/${id}`, values);
      console.log(values); // log the updated form values
      const updatedUser = { ...user, ...values };
      setUser(updatedUser);
      console.log(updatedUser); // log the updated user object
      navigate(`/productslist`);
      toast.success('Product edited successfully!'); // Show success message
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
            <h1 className="text-center pt-5"> {user && user.name}</h1>
            {/* <h5 className="text-center mt-1"> {user && user.role}</h5> */}
            {/* <h5 className="text-center text-success">role</h5> */}
          </div>

          <div className="container">
            {/* <h2>account</h2> */}
            <hr />

            <div className="row">
              <div className="col-sm-12 ">
                {user && (
                  <Formik initialValues={{
                     name: user.name,
                     description: user.description,
                     quantity: user.quantity,
                     price: user.price,
                     priceAfterDiscount: user. priceAfterDiscount,
                     sold: "0",
                     category: user.category,
                     subcategory: user.subcategory,
                     brand: user.brand,
                    //  seller: user.seller,
                     }} onSubmit={handleSubmit} 
                  // validationSchema={validationSchema}
                   enableReinitialize={true}>
                    {(myformik) => (
                      <form onSubmit={myformik.handleSubmit}>
                        <div className="form-group">
                          <label className="py-2" htmlFor="name">Product name</label>
                          <Field
                            name="name"
                            type="text"
                            className="form-control my-1"
                            placeholder="Product name"
                          />
                          <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                          <label className="py-2" htmlFor="email">Description</label>
                          <Field
                            name="description"
                            type="text"
                            className="form-control my-1"
                            placeholder="Description"
                          />
                          <ErrorMessage name="description" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label className="py-2" htmlFor="email">Quantity</label>
                          <Field
                            name="quantity"
                            type="text"
                            className="form-control my-1"
                            placeholder="Quantity"
                          />
                          <ErrorMessage name="quantity" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label className="py-2" htmlFor="email">Price</label>
                          <Field
                            name="price"
                            type="text"
                            className="form-control my-1"
                            placeholder="Price"
                          />
                          <ErrorMessage name="price" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label className="py-2" htmlFor="email">Price after discount</label>
                          <Field
                            name="priceAfterDiscount"
                            type="text"
                            className="form-control my-1"
                            placeholder="Price after discount"
                          />
                          <ErrorMessage name="priceAfterDiscount" component="div" className="text-danger" />
                        </div>
                      

                        <button type="submit" className=" btn btn-primary my-2" disabled={!myformik.dirty}>
                          submit
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

export default EditProduct


  {/* <div className="form-group">
                          <label className="py-2" htmlFor="email">Sold</label>
                          <Field
                            name="sold"
                            type="text"
                            className="form-control my-1"
                            placeholder="Sold"
                          />
                          <ErrorMessage name="sold" component="div" className="text-danger" />
                        </div> */}
                        {/* <div className="form-group">
                          <label className="py-2" htmlFor="email">Category</label>
                          <Field
                            name="category"
                            type="text"
                            className="form-control my-1"
                            placeholder="Category"
                          />
                          <ErrorMessage name="category" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label className="py-2" htmlFor="email">Subcategory</label>
                          <Field
                            name="subcategory"
                            type="text"
                            className="form-control my-1"
                            placeholder="Subcategory"
                          />
                          <ErrorMessage name="subcategory" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label className="py-2" htmlFor="email">Brand</label>
                          <Field
                            name="brand"
                            type="text"
                            className="form-control my-1"
                            placeholder="Brand"
                          />
                          <ErrorMessage name="brand" component="div" className="text-danger" />
                        </div> */}
                        {/* <div className="form-group">
                          <label className="py-2" htmlFor="email">Seller</label>
                          <Field
                            name="seller"
                            type="text"
                            className="form-control my-1"
                            placeholder="Seller"
                          />
                          <ErrorMessage name="seller" component="div" className="text-danger" />
                        </div> */}