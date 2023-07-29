import React, { useState, useEffect } from "react";
// import styles from "./userPage.css";
import { Formik, Field, ErrorMessage } from "formik";
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import axiosInstance from "../../axios/axios";
import { ToastContainer, toast } from 'react-toastify';

export default function UserPage() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${id}`);
        setUser(response.data.data);
      } catch (error) {
        // Handle error
      }
    };
    fetchUserData();
  }, [id]);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(8, 'Name must be at least 8 characters'),
        // .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        // .required('Email is required'),
});


  const handleSubmit = async (values) => {
    if (values.name === user.name && values.email === user.email) {
      toast.info('No changes detected'); // Show info message
      return;
    }
    try {
      await axiosInstance.put(`/users/${id}`, values);
      console.log(values); // log the updated form values
      const updatedUser = { ...user, ...values };
      setUser(updatedUser);
      console.log(updatedUser); // log the updated user object
      navigate(`/userslist`);
      toast.success('User edited successfully!'); // Show success message
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
            <h5 className="text-center mt-1"> {user && user.role}</h5>
            {/* <h5 className="text-center text-success">role</h5> */}
          </div>

          <div className="container">
            {/* <h2>account</h2> */}
            <hr />

            <div className="row">
              <div className="col-sm-12 ">
                {user && (
                  <Formik initialValues={{ name: user.name, email: user.email }} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize={true}>
                    {(myformik) => (
                      <form onSubmit={myformik.handleSubmit}>
                        <div className="form-group">
                          <label className="py-2" htmlFor="name">Username</label>
                          <Field
                            name="name"
                            type="text"
                            className="form-control my-1"
                            placeholder="Username"
                          />
                          <ErrorMessage name="name" component="div" className="text-danger" />
                        </div>

                        <div className="form-group">
                          <label className="py-2" htmlFor="email">Email</label>
                          <Field
                            name="email"
                            type="email"
                            className="form-control my-1"
                            placeholder="Email"
                          />
                          <ErrorMessage name="email" component="div" className="text-danger" />
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