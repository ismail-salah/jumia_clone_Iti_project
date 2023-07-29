import React, { useEffect, useState } from "react";
import "./Products.css";
import ProductsSideBar from "./ProductsSideBar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Banner from "../shared/Banner/Banner";
import Footer from "../shared/Footer/Footer";
import PaginationComponent from "../Pagination/Pagination";
function Products() {
  const navigate = useNavigate();
  const [rangePrice, setrangePrice] = useState([1, 20000]);
  function listFun(argu) {
    setrangePrice(argu);
    // console.log(`rangePrice`)
  }
  const [products, setproducts] = useState([]);
  const [searchField, setSearchField] = useState("");
  const [page, setPage] = useState();
  const getPage = (page) => {
    setPage(page);
  };
  useEffect(() => {
    axios
      .get(
        `https://jumia-clone-api-9qqm.onrender.com/api/team2/products?limit=8&price[lte]=${rangePrice[1]}&price[gte]=${rangePrice[0]}`,
        {
          params: {
            page: page,
          },
        }
      )
      .then((res) => {
        const prodata = res.data.Products;
        setproducts(prodata);
      });
  }, [page, rangePrice]);

  const goHome = () => {
    navigate("/");
  };
  const handleChange = (e) => {
    setSearchField(e.target.value);
  };
  const filteredData = products.filter((item) => {
    return item.name.toLowerCase().includes(searchField.toLowerCase());
  });
  console.log(filteredData);
  return (
    <>
      <Banner />
      <div className="row mx-0 my-3 justify-content-evenly">
        <div className="input-group">
          <button
            onClick={goHome}
            className="btn rounded-1 search-btn fw-bold d-none d-md-block d-lg-block d-xl-block text-white my-2 mx-3 my-sm-0 text-uppercase px-"
            type="button"
          >
            Home
          </button>
          <input
            type="text"
            className="form-control rounded-1 "
            style={{ width: "1rem" }}
            placeholder="Search products"
            onChange={handleChange}
          />
        </div>
        <div className="col-2 d-none d-md-block d-lg-block d-xl-block">
          <ProductsSideBar listFun={listFun} />
        </div>
        <div className="col-xs-4 col-md-8 col-lg-8 col-xl-10   my-4 p-3 bg-white">
          <div>
            <div className="d-flex justify-content-between">
              {`Products : ${filteredData.length} `}
              <div className="dropdown cursor-pointer">
                <span
                  className=" dropdown-toggle"
                  id="triggerId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <h6 className="d-inline">Sort By </h6>{" "}
                  <span>: Popularity</span>
                </span>
                <div
                  className="dropdown-menu sorted"
                  aria-labelledby="triggerId"
                >
                  <a className="dropdown-item" href="#">
                    Popularity
                  </a>
                  <a className="dropdown-item" href="#">
                    Newest Arrivals
                  </a>
                  <a className="dropdown-item" href="#">
                    Price : Low To High
                  </a>
                  <a className="dropdown-item" href="#">
                    Product Rating
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="products-from-api d-flex flex-wrap">
            {filteredData.map((item) => {
              return (
                <>
                  <div className="col-3 p-3 h-100">
                    <Link
                      to={`/productdetails/${item.id}`}
                      className="w-100 text-decoration-none "
                    >
                      <div className="card ">
                        <img
                          className="w-100 pt-2"
                          style={{ maxHeight: "300px" }}
                          src={item.imageCover}
                          alt="Title"
                        />
                        <div className="card-body">
                          <h6 className="card-title products-title">
                            {item.name}
                          </h6>
                          <p className="card-text price m-0">
                            EFP {item.priceAfterDiscount}
                          </p>
                          <small className=" card-text prev-price">
                            {" "}
                            EGP {item.price}
                          </small>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
          <PaginationComponent getPage={getPage} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Products;
