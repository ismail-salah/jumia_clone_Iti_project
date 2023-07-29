import React, { useContext, useEffect } from "react";
import "./Navbar.css";
import logo from "../../../assets/imgs/logo.png";
import { Link } from "react-router-dom";
import { cartContext } from "../../../Context/CartContext";
import { tokenContext } from "../../../Context/TokenHandler";

export default function Navbar() {
  let { numOfCartItems } = useContext(cartContext);
  const { userData, saveUserData } = useContext(tokenContext)
  useEffect(() => {
    saveUserData()
  }, [])
  function signOut() {
    localStorage.removeItem("UserToken");
  }
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-white">
        <div className="container row justify-content-center align-items-center ">
          <div className="col-3 d-flex justify-content-center align-items-center">
            <a
              href="/"
              className="d-flex justify-content-center align-items-center "
            >
              <img src={logo} className="logo" alt="" />
            </a>
          </div>
          <form id="search" method="get" className="col-6 d-flex">
            <div className="input-group">
              <input
                type="text"
                className="form-control rounded-1"
                placeholder="Search products"
              />
              <Link to="/products">
                {" "}
                <button
                  className="btn rounded-1 search-btn fw-bold d-none d-md-block d-lg-block d-xl-block text-white my-2 mx-2 my-sm-0 text-uppercase px-3"
                  type="button"
                >
                  search
                </button>
              </Link>
            </div>
          </form>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse col-3" id="collapsibleNavId">
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link acc-drop  fw-bold dropdown-toggle"
                  href="https://www.google.com"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fa-regular fa-user mx-2"></i>
                  {userData ? `Hi, ${userData}` : "Account"}
                </a>
                <div className="dropdown-menu align-items-center text-center ">
                  {userData ? (
                    <Link to="/signin">
                      <button
                        onClick={() => signOut()}
                        className="btn sign-in-btn fw-bold w-75 text-white text-bold mb-1 mt-1 text-uppercase"
                      >
                        Sign Out
                      </button>
                    </Link>
                  ) : (
                    <Link to="/signin">
                      <button className="btn sign-in-btn fw-bold w-75 text-white text-bold mb-1 mt-1 text-uppercase">
                        sign in
                      </button>
                    </Link>
                  )}
                  <hr />
                  <a
                    className="dropdown-item text-start"
                    href="https://www.google.com"
                  >
                    {" "}
                    <i class="fa-regular fa-user "></i> My Account
                  </a>
                  <Link className="dropdown-item text-start" to="/orders">
                    {" "}
                    <i class="fa-solid fa-bag-shopping "></i> Orders
                  </Link>
                  <a
                    className="dropdown-item text-start"
                    href="https://www.google.com"
                  >
                    {" "}
                    <i class="fa-regular fa-heart "></i> Saved Items
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link help fw-bold dropdown-toggle"
                  href="https://www.google.com"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fa-solid fa-question p-1 mx-1"></i> Help
                </a>
                <div
                  className="dropdown-menu align-items-center text-center"
                  aria-labelledby="dropdownId"
                >
                  <a
                    className="dropdown-item text-start"
                    href="https://www.google.com"
                  >
                    Help Center
                  </a>
                  <a
                    className="dropdown-item text-start"
                    href="https://www.google.com"
                  >
                    Place & track order
                  </a>
                  <a
                    className="dropdown-item text-start"
                    href="https://www.google.com"
                  >
                    Order Cancellation
                  </a>
                  <a
                    className="dropdown-item text-start"
                    href="https://www.google.com"
                  >
                    Returns & Refunds
                  </a>
                  <a
                    className="dropdown-item text-start"
                    href="https://www.google.com"
                  >
                    Payment & Jumia account
                  </a>
                  <hr />
                  <button className="btn sign-in-btn fw-bold w-75 text-white fw-bold mb-1 mt-1 text-uppercase ">
                    {" "}
                    <i class="fa-regular fa-message mx-2"></i> live chat
                  </button>
                </div>
              </li>
              <li>
                <Link to="/cart">
                  <span className="nav-link cart fw-bold position-relative">
                    <i class="fa-solid fa-cart-shopping"></i> Cart
                    <span class="position-absolute top-10 start-100 translate-middle badge rounded-pill bg-danger">
                      {numOfCartItems}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
