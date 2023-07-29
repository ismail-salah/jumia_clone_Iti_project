import { useFormik } from 'formik';
import jwtDecode from 'jwt-decode';
import React, { useContext } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import { tokenContext } from '../../Context/TokenHandler';

export default function LoginSeller() {
    const navigate = useNavigate();
    const { handleLogin } = useContext(tokenContext);

    async function completelogin(values) {
        const { data } = await handleLogin(values);
        localStorage.setItem("SellerToken", data.token);
        navigate("/seller")

    }

    // function saveUserData() {
    //     let userlogintoken = localStorage.getItem("UserToken");
    //     if (userlogintoken) {
    //         let decodedToken = jwtDecode(userlogintoken);
    //         if (decodedToken.role !== "seller") {
    //             navigate("/login")
    //         } else navigate("/")
    //     }
    // }


    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: completelogin,
    });

    return (
        <>
            <div className="w-75 mx-auto py-4">
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input
                        class="form-control my-2 py-3"
                        type="email"
                        name="email"
                        id="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />

                    <label htmlFor="password">password</label>
                    <input
                        class="form-control my-2 py-3"
                        type="password"
                        name="password"
                        id="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                    <button className="btn btn-success" type="submit">
                        Login
                    </button>
                </form>


            </div>
            <div className="text-center mt-4">
                <Link to="/sellersignup" className="mb-5 fw-bold" style={{ color: "#f8972d" }}>
                    You're a seller? Sign up as a seller here
                </Link>
            </div>
        </>
    );

}







