import React, { useEffect, useState } from 'react'

import { useFormik } from "formik";
import * as Yup from "yup"
import axios from "axios";
import { cartContext } from "../../Context/CartContext";
import { useContext } from 'react';


export default function Checkout() {
    let { getLoggedUserCart, onlinePayment } = useContext(cartContext);
    const [cartId, setcartId] = useState(null)

    async function getCart() {
        let res = await getLoggedUserCart()
        if (res?.data?.status === 'success') {
            setcartId(res.data.data._id)

        }


    }

    useEffect(() => {

        getCart()

    }, [])






    async function handelSubmit(values) {
        console.log(cartId)
        let response = await onlinePayment(cartId, values)
        if (response?.data?.status === 'success') {
            window.location.href = response.data.session.url
        }
        console.log(response);

    };



    const validationSchema = Yup.object({
        details: Yup.string().required("details is required").min(3, "details minLength is 3").max(50, "details maxLength is 50"),
        city: Yup.string().required("city is required").min(3, "city minLength is 3").max(50, "city maxLength is 50"),
        phone: Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/, "phone not valid")

    })

    let formik = useFormik({
        initialValues: {
            details: "",
            city: "",
            phone: "",

        },
        // validate: validate,
        validationSchema: validationSchema,
        onSubmit: handelSubmit,
    });
    // console.log(formik)
    return (
        <>
            <div className="container">
                <div className="w-75 mx-auto py-4">
                    <h3>Checkout Now: </h3>

                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="details">details:</label>
                        <input
                            className="form-control mb-2"
                            value={formik.values.details}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="text"
                            name="details"
                            id="details"
                        />

                        {formik.errors.details && formik.touched.details ? <div className="alert alert-danger">{formik.errors.details}</div> : null}

                        <label htmlFor="city">city:</label>
                        <input
                            className="form-control mb-2"
                            value={formik.values.city}
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            name="city"
                            id="city"
                        />
                        {formik.errors.city && formik.touched.city ? <div className="alert alert-danger">{formik.errors.city}</div> : null}

                        <label htmlFor="phone">Phone:</label>
                        <input
                            className="form-control mb-2"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            type="tel"
                            name="phone"
                            id="phone"
                        />
                        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : null}


                        <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-dark">Pay</button>
                    </form>
                </div>
            </div>
        </>
    );
}







