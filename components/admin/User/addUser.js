import React, { useState, useEffect } from "react";
// import styles from "./userPage.css";
import { Button} from 'react-bootstrap';

import { Formik, Field, ErrorMessage } from "formik";
// import { useParams } from 'react-router-dom';
import * as Yup from 'yup';
import axiosInstance from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';



function CreateUser() {
  const navigate = useNavigate();
  const [user, setUser] = useState( 
    {
      name:"",
      email:"",
      password:"",
      passwordConfirm:""

    }
  );

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(8, 'Name must be at least 8 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
      )
      .required('Password is required'),
      passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  

  const handleSubmit = async (values) => {
    try {
      await axiosInstance.post(`/users`, values);
      console.log(values); // log the updated form values
      const User = { ...user, ...values };
      setUser(User);
      console.log(User); // log the updated user object
      navigate(`/userslist`);
      toast.success('User added successfully!'); // Show success message
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
            <h1 className="text-center pt-5"> Create User</h1>
          </div>

          <div className="container">
            <hr />

            <div className="row">
              <div className="col-sm-12 ">
                {user && (
                  <Formik initialValues={user} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize={true}>
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

                        <div className="form-group">
                          <label className="py-2" htmlFor="password">Password</label>
                          <Field
                            name="password"
                            type="password"
                            className="form-control my-1"
                            placeholder="Password"
                          />
                          <ErrorMessage name="password" component="div" className="text-danger" />
                        </div>
                        <div className="form-group">
                          <label className="py-2" htmlFor="passwordConfirm">Password</label>
                          <Field
                            name="passwordConfirm"
                            type="password"
                            className="form-control my-1"
                            placeholder="Confirm Password"
                          />
                          <ErrorMessage name="passwordConfirm" component="div" className="text-danger" />
                        </div>

                        <Button  variant="primary" type="submit" className=" btn mt-3 my-2" disabled={!myformik.dirty}>
                          Submit
                        </Button>
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

export default CreateUser


