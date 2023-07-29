import axios from "axios";
// import jwtDecode from "jwt-decode";
import React, { createContext, useState } from "react";
import { toast } from "react-hot-toast";
// import { toast } from "react-hot-toast";

export let productsContext = createContext();
export function ProductsContextProvider(props) {
  const [page, setPage] = useState();
  const getPage = (page) => {
    setPage(page);
  };






  const headers = {
    token: `Bearer ${localStorage.getItem("SellerToken")}`,
  };

  async function handleLogin(values) {
    return await axios
      .post(
        `https://ali-service-ey1c.onrender.com/api/team2/auth/login`,
        values
      )
      .then((response) => response)
      .catch((error) => error);
  }

  // const [products, setProducts] = useState([]);
  async function getProducts(uId) {
    // console.log(uId)
    return await axios
      .get(
        `https://ali-service-ey1c.onrender.com/api/team2/products?seller=${uId}&limit=4`,
        {
          params: {

            page: page
          },
        },
        { headers: { Authorization: headers.token } }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  // Delete Seller Product

  async function deleteProduct(id) {
    return await axios
      .delete(
        `https://ali-service-ey1c.onrender.com/api/team2/products/${id}`,
        { headers: { Authorization: headers.token } }
      )
      .then((response) => {
        if (response.status === 204) {
          toast.success(`Deleted `, {
            position: "top-center",
            duration: 2000,
          });
        }
      })
      .catch((err) => err);
  }

  // update

  async function getOneProduct(productId) {
    return await axios
      .get(
        `https://ali-service-ey1c.onrender.com/api/team2/products/${productId}`,
        { headers: { Authorization: headers.token } }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  // get categories

  const [categories, setCategories] = useState([]);

  async function getCate() {
    const { data } = await axios.get(
      `https://ali-service-ey1c.onrender.com/api/team2/categories?limit=100`,
      { headers: { Authorization: headers.token } }
    );
    setCategories(data.data);
  }

  // add pro
  const addNewProduct = async (values) => {
    return await axios
      .post(
        `https://ali-service-ey1c.onrender.com/api/team2/products`,
        values,
        { headers: { Authorization: headers.token } }
      )
      .then((res) => res)
      .catch((err) => err);
  };

  // Edite
  const editeProduct = async (id, values) => {
    console.log(id, values);
    return await axios
      .put(
        `https://ali-service-ey1c.onrender.com/api/team2/products/${id}`,
        values,
        { headers: { Authorization: headers.token } }
      )
      .then((res) => res)
      .catch((err) => err);
  };

  return (
    <productsContext.Provider
      value={{
        handleLogin,
        getProducts,
        deleteProduct,
        addNewProduct,
        editeProduct,
        categories,
        getCate,
        getOneProduct,
        getPage,
        page
      }}
    >
      {props.children}
    </productsContext.Provider>
  );
}
