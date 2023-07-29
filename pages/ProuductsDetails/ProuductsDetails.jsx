import React, { useContext, useEffect, useState } from "react";
import "./prouductsDetails.css";
import axios, { Axios } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";
// import { tokenContext } from "../../Context/TokenHandler";

export default function ProductsDetails() {
  // const { userData } = useContext(tokenContext)

  const navigate = useNavigate();
  const [averageRatings, setaverageRatings] = useState(0)

  let { addToCart, setnumOfCartItems } = useContext(cartContext);

  async function addProduct(id) {
    if (localStorage.getItem("UserToken")) {
      let response = await addToCart(id);
      setnumOfCartItems(response.data.numOfCartItems);
      console.log(response);
      toast(response.data.message, { duration: 2000, position: "top-center" })

    } else {
      navigate("/signin");
    }
  }
  const [errMessage, setErrMessage] = useState("");
  const [usrid, setUsrId] = useState(null);

  async function saveUserData() {
    let userlogintoken = localStorage.getItem("UserToken");
    if (userlogintoken) {
      let decodedToken = await jwtDecode(userlogintoken);

      console.log(decodedToken.userId);
      setUsrId(decodedToken.userId);
      review.user = decodedToken.userId;
    }
  }
  useEffect(() => {
    saveUserData();
  }, []);

  const removeReview = (rev) => {
    console.log(rev._id);
    if (rev.user._id === usrid) {
      axios
        .delete(
          `https://ali-service-ey1c.onrender.com/api/team2/reviews/${rev._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
            },
          }
        )
        .then((res) => {
          getproductDetails();
          setErrMessage("")
        })
        .catch((err) => {
          setErrMessage("error");
        });
    } else {
      console.log("This is not your review 😠");
    }
  };

  const { id } = useParams();

  const [prouductsDetails, setprouductsDetails] = useState(null);

  const [Reviews, setReviews] = useState([]);

  async function getproductDetails() {
    try {
      const { data } = await axios.get(
        `https://ali-service-ey1c.onrender.com/api/team2/products/${id}`
      );

      console.log(data);
      setprouductsDetails(data);
      setReviews(data.reviews);
      const ratingAvera = data.reviews.map((rev) => rev.ratingAverage)
      const all = ratingAvera.reduce((acc, rev) => acc + rev, 0)
      const res = (all / ratingAvera.length);
      if (res) {
        setaverageRatings(res.toFixed(1))
      }
      else setaverageRatings(0)
      // console.log(Reviews);
    } catch (error) {
      console.log("error:", error);
    }
  }




  function newreview(values) {
    axios
      .post(
        `https://ali-service-ey1c.onrender.com/api/team2/reviews`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("UserToken")}`,
          },
        }

      )
      .then((res) => {
        getproductDetails();
      })
      .catch((err) => {
        setErrMessage("you are created a review before");
      });
    // console.log(`res ${res}`)
    console.log(values);
    // setReviews([...Reviews, res])
  }

  let review = {
    title: "",
    user: "",
    product: id,
    ratingAverage: 0,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("review is required")
      .min(3, "review minLength is 3")
      .max(50, "review maxLength is 50"),
    ratingAverage: Yup.number()
      .required("rating is required")
      .min(1, "rating minLength is 1")
      .max(5, "rating maxLength is 5"),
  });

  let myformik = useFormik({
    initialValues: review,
    validationSchema: validationSchema,
    onSubmit: newreview,
  });

  useEffect(function () {
    getproductDetails();

  }, [Reviews]);

  return (
    <>
      {prouductsDetails ? (
        <div className="bg-light">
          <div className="bg-white container">
            <div className="row">
              <div className="col-md-9 ">
                <div className="row ">
                  <div className="col-md-4 ">
                    <img
                      className="w-100 pt-4 "
                      src={prouductsDetails.imageCover}
                      alt=" "
                    />

                    <hr />
                    <h6 className="text-muted">SHARE THIS PRODUCT</h6>
                    <span>
                      <i className="fa-brands fa-square-facebook  cursor-pointer text-larger"></i>{" "}
                      <i className="fa-brands fa-square-twitter cursor-pointer text-larger"></i>
                    </span>
                  </div>
                  <div className="col-md-8 pt-3">
                    <span className="h4">
                      {prouductsDetails.name}
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <i className="fa-regular fa-heart icon-heart cursor-pointer"></i>
                    </span>
                    <div className="pt-2"></div>
                    <span className="fw-bold ">
                      averageRating
                      <span>
                        &nbsp;&nbsp;
                        <a
                          href=""
                          className=" text-decoration-none text-warning"
                        >
                          <i class="fa-solid fa-star star-icon"></i>
                          {averageRatings ? <span> {averageRatings}</span> : <span className="text-start" > No rating yet</span>}
                        </a>
                      </span>{" "}
                    </span>

                    <hr />

                    <h3 className="fw-bold">
                      EGP {prouductsDetails.priceAfterDiscount}
                    </h3>
                    <h6 className="text-muted text-decoration-line-through">
                      {prouductsDetails.price}
                    </h6>
                    <p className="p-color mb-0">Few units left</p>
                    <p className="font12">
                      + shipping from EGP 10.83 to 6th of October
                    </p>
                    <div class=" mt-3 py-2">
                      <button
                        className="btn w-100 text-light"
                        style={{ background: "#E07E1B" }}
                        onClick={() => {
                          addProduct(id);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                    <hr className="m-2" />
                    <p className=" fw-semibold text-muted m-1">PROMOTIONS</p>
                    <i class="fa-solid fa-star star-icon"></i>
                    <a className="px-1 text-decoration-none" href="">
                      Flexible Payment Options Available, with 0% interest
                      installments
                    </a>
                    <br />
                    <i class="fa-solid fa-star star-icon"></i>
                    <a className="px-1 text-decoration-none" href="">
                      Calculate your monthly payments from here
                    </a>
                    <br />
                    <i class="fa-solid fa-star star-icon"></i>
                    <a className="px-1 text-decoration-none" href="">
                      Celebrate our anniversary with us & Enjoy the top deals
                    </a>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <a className=" text-decoration-none pt-2" href="">
                  Report incorrect product information
                </a>
              </div>

              <div className="col-md-3 ">
                <p className=" fw-semibold pt-2 m-1">DELIVERY & RETURNS</p>
                <hr className="m-1" />
                <p className="fw-semibold">Choose your location</p>

                <div>
                  <label className="w-100  mb-3">
                    <select className="w-100 py-2 border-0 rounded-1 px-2">
                      <option className="w-100" value="option1">
                        {" "}
                        Giza
                      </option>

                    </select>
                  </label>

                  <label className="w-100  pb-3">
                    <select className="w-100 py-2 border-0 rounded-1 px-2">
                      <option className="w-100" value="option1">
                        {" "}
                        6th of october
                      </option>

                    </select>
                  </label>
                </div>

                <div className="d-flex ">
                  <i class="fa-solid fa-truck-field text-larger mt-2"></i>
                  <div className="justify-content-between pt-1 px-2">
                    <p className="fw-semibold m-0">
                      Door Delivery &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <a className=" text-decoration-none" href="">
                        details
                      </a>
                    </p>
                    <p className="m-0 font12">Delivery EGP 22.23</p>
                    <p className="font12">
                      Ready for delivery between 25 July & 26 July when you
                      order within next 3hrs 56mins
                    </p>
                  </div>
                </div>

                <div className="d-flex ">
                  <i class="fa-solid fa-handshake text-larger mt-2"></i>
                  <div className="justify-content-between pt-1 px-2">
                    <p className="fw-semibold m-0 ">
                      Pickup Station &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <a className=" text-decoration-none" href="">
                        details
                      </a>
                    </p>
                    <p className="m-0 font12">Delivery EGP 22.23</p>
                    <p className="font12">
                      Ready for delivery between 25 July & 26 July when you
                      order within next 3hrs 56mins
                    </p>
                  </div>
                </div>
                <div className="d-flex ">
                  <i class="fa-solid fa-rotate-left text-larger mt-2"></i>
                  <div className="justify-content-between pt-1 px-2">
                    <p className="fw-semibold m-0">Return Policy</p>
                    <p className="font12">
                      Free return within the legal return period from 14 to 30
                      days, and if they meet the terms & conditions, with the
                      need to report any apparent defect within 48 hours. For
                      more details about return policy.
                    </p>
                  </div>
                </div>

                <p className="m-0">
                  <a
                    href=""
                    className=" text-decoration-none fw-semibold text-dark"
                  >
                    SELLER INFORMATION
                  </a>
                </p>
                <hr className="m-01" />
                <p className="font12 fw-bold">MMGroup</p>
                <div className="d-flex justify-content-between">
                  <div>
                    <p className="m-0 font12">80% Seller Score</p>
                    <p className="m-0 font12">158 Followers</p>
                  </div>
                  <div>
                    <button className="btn btn-warning">follow</button>
                  </div>
                </div>
                <hr className="m-1" />
                <div>
                  <p className="fw-bold">Seller Performance</p>
                  <p>
                    <i class="fa-solid fa-star text-success"></i> Order
                    Fulfillment Rate : <strong>Excellent</strong>{" "}
                  </p>
                  <p>
                    <i class="fa-solid fa-star text-success"></i> Quality Score
                    :<strong>good</strong>{" "}
                  </p>
                  <p>
                    <i class="fa-solid fa-circle-check"></i> Customer Rating :
                    <strong>Average</strong>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <br />
          <div className="container">
            <div className="row ">
              <div className="col-md-9  bg-white">
                <h5 id="pro-details" className=" fw-semibold pt-2">
                  Product details
                </h5>
                <hr />
                <p>{prouductsDetails.description}</p>
              </div>
              <div className="col-md-3 bg-white ">
                <div>
                  <p className="m-2 fw-semibold ">
                    <a
                      className="text-decoration-none text-dark"
                      href="#pro-details "
                    >
                      Product details
                    </a>
                  </p>
                  <hr className="m-2" />
                  <p className="m-2 fw-semibold">
                    <a
                      className="text-decoration-none text-dark"
                      href="#specifications "
                    >
                      specifications
                    </a>
                  </p>
                  <hr className="m-2" />
                  <p className="m-2 fw-semibold">
                    <a
                      className="text-decoration-none text-dark"
                      href="#feedback "
                    >
                      Verified Customer Feedback
                    </a>
                  </p>
                  <hr className="m-2" />
                </div>
              </div>
            </div>
          </div>

          <br />
          <div className="container bg-white">
            <div className="row">
              <div className="col-lg-9">
                <h5 id="specifications" className=" fw-semibold pt-2">
                  Specifications
                </h5>
                <hr />
                <div className="row  px-3 py-2   justify-content-center">
                  <div className="col-lg-5">
                    <table
                      className="w-100 h-auto"
                      style={{ border: "1px solid rgb(156, 152, 152)" }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid rgb(156, 152, 152)",
                              padding: "8px",
                            }}
                          >
                            KEY FEATURES
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              border: "1px solid rgb(156, 152, 152)",
                              padding: "8px",
                            }}
                          >
                            <ul>
                              <li className="">
                                {prouductsDetails.description}

                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div className="col-lg-5">
                    <table
                      className="w-100 h-auto"
                      style={{ border: "1px solid rgb(156, 152, 152)" }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              border: "1px solid rgb(156, 152, 152)",
                              padding: "8px",
                            }}
                          >
                            SPECIFICATIONS
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td
                            style={{
                              border: "1px solid rgb(156, 152, 152)",
                              padding: "8px",
                            }}
                          >
                            <ul>

                              <li>
                                <strong>Production Country</strong>Malaysia
                              </li>
                              <li>
                                <strong>Size (L x W x H cm):</strong> 44x14x31cm
                              </li>
                              <li>
                                <strong>Color</strong> {prouductsDetails.colors}
                              </li>


                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="row">
                  <div className="col-md-5">
                    <img
                      className="w-100 pt-4 "
                      src={prouductsDetails.imageCover}
                      alt={prouductsDetails.name}
                    />
                  </div>
                  <div className="col-md-7">
                    <p className="pt-4"> {prouductsDetails.name}</p>
                    <p className="fw-bold m-0">
                      EGP {prouductsDetails.priceAfterDiscount}
                    </p>
                    <h6 className="font12 text-muted text-decoration-line-through">
                      EGP {prouductsDetails.price}
                    </h6>
                  </div>
                  <div className="m-2">
                    <button
                      className="btn w-100 text-light"
                      style={{ background: "#E07E1B" }}
                      onClick={() => {
                        addProduct(id);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <div className="w-100 pt-3">
                    <p className="font12 text-center">
                      Questions about this product?
                    </p>

                    <p className="text-center fw-bold text-warning cursor-pointer">
                      <i class="fa-regular fa-message "></i> CHAT
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />

          <div className="container bg-white">
            <div className="row">
              <div className="col-md-9 ">
                <div className="d-flex justify-content-between pt-3 pb-1">
                  <p id="feedback" className="text-start fw-semibold m-0">
                    Verified Customer Feedback
                  </p>
                  <p className="text-end m-0"></p>
                </div>

                <hr className="mt-1" />

                <form onSubmit={myformik.handleSubmit}>
                  <label htmlFor="title">feedback </label>

                  <input
                    id="title"
                    onChange={myformik.handleChange}
                    value={myformik.values.title}
                    onBlur={myformik.handleBlur}
                    type="title"
                    className="form-control my-1"
                    placeholder="write Review"
                  />
                  {myformik.errors.title && myformik.touched.title ? (
                    <div className="alert alert-danger w-25">
                      {myformik.errors.title}
                    </div>
                  ) : null}

                  <label htmlFor="ratingAverage">Rating </label>
                  <input
                    id="ratingAverage"
                    onChange={myformik.handleChange}
                    onBlur={myformik.handleBlur}
                    value={myformik.values.ratingAverage}
                    type="number"
                    className="form-control my-1"
                    placeholder="rate proudct"
                  />
                  {myformik.errors.ratingAverage && myformik.touched.ratingAverage ? (
                    <div className="alert alert-danger w-25">
                      {myformik.errors.ratingAverage}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    className=" btn btn-warning my-2"
                    disabled={!(myformik.isValid && myformik.dirty)}
                  >
                    Review
                  </button>
                </form>

                <div className="row">
                  <div className="col-md-3">
                    <p className="fw-semibold">VERIFIED RATINGS </p>
                    <div className="container  bg-light">
                      <h1 className="text-center text-warning">
                        {/* <span>{averageRatings}</span>/5 */}
                        {averageRatings ? <span>{averageRatings}/5</span> : <h6 className="text-start" >"No rating yet"</h6>}
                      </h1>
                      {/* <div className="text-center">
                        <i class="fa-solid fa-star star-icon"></i>
                        <i class="fa-solid fa-star star-icon"></i>
                        <i class="fa-solid fa-star star-icon"></i>
                        <i class="fa-solid fa-star star-icon"></i>
                        <i class="fa-solid fa-star star-icon  star-edit "></i>
                      </div> */}
                      {/* <p className="text-center">
                        {prouductsDetails.ratingCount > 0 ? (
                          <span>
                            verified ratings {prouductsDetails.ratingCount}
                          </span>
                        ) : (
                          " no rating yet"
                        )}{" "}
                      </p> */}
                    </div>
                  </div>
                  <div className="col-md-9">
                    <p>PRODUCT REVIEWS </p>
                    {/* <i class="fa-solid fa-star star-icon"></i>
                    <i class="fa-solid fa-star star-icon"></i>
                    <i class="fa-solid fa-star star-icon"></i>
                    <i class="fa-solid fa-star star-icon"></i>
                    <i class="fa-solid fa-star star-icon"></i> */}

                    {Reviews.length > 0 ? (
                      Reviews.map((rev, idx) => {
                        return (
                          <div key={idx}>
                            <div>
                              <div className="d-flex justify-content-between w-50">
                                <p className="fw-bold pt-2">{rev.user.name}</p>
                                <p className="my-1 text-dark"> {rev.ratingAverage} <i class="fa-solid fa-star star-icon"></i></p>

                              </div>
                              <div className="d-flex justify-content-between w-50">
                                <p className="my-1"> {rev.title}</p>

                                {rev.user._id === usrid ? (
                                  <button
                                    onClick={() => {
                                      removeReview(rev);
                                    }}
                                    className="btn "
                                  >
                                    <i className="fa-solid fa-trash fs-4"></i>
                                  </button>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                            <div className="d-flex justify-content-between">

                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-warning h6 fw-semibold"> No feedback yet on this Product</p>
                    )}
                    <div className="text-danger">
                      {errMessage ? errMessage : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="  vh-100  bg-opacity-50 d-flex justify-content-center align-items-center   ">
          <i className="fa-solid fa-spinner fa-spin fa-7x"></i>
        </div>
      )}
      <br />
    </>
  );
}
