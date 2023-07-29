import React, { useContext, useEffect, useState } from "react";
import "./SideBar.css";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { tokenContext } from "../../Context/TokenHandler";
function SideBar() {
  const { sellerData, saveSellerData } = useContext(tokenContext)
  // const [nameSeller, setnameSeller] = useState(null)
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("SellerToken")
    navigate("/loginseller")
  }

  useEffect(() => {
    saveSellerData()
  }, [])
  // useEffect(() => {
  //   let userlogintoken = localStorage.getItem("UserToken");
  //   let decodedToken = jwtDecode(userlogintoken);
  //   setnameSeller(decodedToken.name)
  // })

  return (
    <>
      <header className="d-flex  align-items-center justify-content-around my-5">
        <h6 className="h4">Welcome, {sellerData}</h6>
      </header>

      <section>
        <Link style={{ textDecoration: "none", color: "black" }} to="/seller">
          <div className="fix-display">
            <i className="fa-brands fa-get-pocket"></i>
            <h6 className="h6">All Products</h6>
          </div>
        </Link>
        <Link style={{ textDecoration: "none", color: "black" }} to="/selleraddproducts">
          <div className="fix-display">
            <i class="fa-solid fa-circle-plus"></i>
            <h6 className="h6">ADD Product</h6>
          </div>
        </Link>
      </section>

      <section className="text-center my-5">
        <button className="btn btn-dark" onClick={() => {
          logout()
        }}>
          <h2>sign out</h2>
        </button>
      </section>
    </>
  );
}

export default SideBar;
