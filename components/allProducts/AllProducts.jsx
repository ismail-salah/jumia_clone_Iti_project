import React, { useContext, useEffect, useState } from "react";
import { productsContext } from "../../Context/ProductsContext";
import SideBar from "../sidebar/SideBar";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PaginationComponent from "../Pagination/Pagination";
function AllProducts() {
  // toast
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [deleteID, setdeleteID] = useState("");
  const [data, setdata] = useState(products);

  const { getProducts, deleteProduct, getPage, page } =
    useContext(productsContext);

  const gellAllProducts = async () => {
    const userId = saveSellerData();
    const res = await getProducts(userId);
    setProducts(res.data.Products);
  };

  const handleDetails = (id) => {
    navigate(`/selleraupdateproducts/${id}`);
  };

  // const deleteSelectedItem = async (id) => {
  //   console.log(id);
  //   await deleteProduct(id);
  //   handleClose();
  //   gellAllProducts();
  // };

  const handleClickDelete = (id) => {
    setdeleteID(id);
    setShow(true);
  };

  const handleDeleteItem = async () => {
    setdata((pre) => {
      const newArr = [...pre];
      return newArr.filter((item) => item._id !== deleteID);
    });
    await deleteProduct(deleteID);
    handleClose();
    gellAllProducts();
  };

  function saveSellerData() {
    let sellerlogintoken = localStorage.getItem("SellerToken");
    if (sellerlogintoken) {
      let decodedToken = jwtDecode(sellerlogintoken);
      return decodedToken.userId;
    }
  }







  useEffect(() => {
    if (!localStorage.getItem("SellerToken")) navigate("/login");
    else {
      gellAllProducts();
    }
  }, [page]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deletion Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do You Want To Delete This Item ??</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            No , Back
          </Button>
          <Button variant="danger" onClick={handleDeleteItem}>
            Yes , Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container">
        <div className="row m-0 d-flex justify-content-between">
          <div
            className="col-3 rounded-2 my-2"
            style={{ backgroundColor: "#E6E6E6" }}
          >
            <SideBar />
          </div>
          <div className="col-8 rounded-2 my-2">
            <div className="table-responsive text-center">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Pro. Name</th>
                    <th scope="col">Pro. Image</th>
                    <th scope="col">Pro. price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>
                          <img
                            src={item.imageCover}
                            style={{ width: "100px" }}
                            alt=""
                          />
                        </td>
                        <td>{item.price}</td>
                        <td className="text-center">
                          <div className="d-flex justify-content-around ">
                            <button
                              onClick={() => handleDetails(item._id)}
                              className="btn btn-warning border  rounded-2"
                            >
                              <span>Update</span>
                            </button>

                            <button
                              // onClick={() => deleteSelectedItem(item._id)}
                              onClick={() => {
                                handleClickDelete(item._id);
                              }}
                              className="btn btn-danger border  rounded-2"
                            >
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <PaginationComponent getPage={getPage} />
    </>
  );
}

export default AllProducts;
