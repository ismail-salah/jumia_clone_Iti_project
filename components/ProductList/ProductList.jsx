import React, { useEffect, useState } from "react";
// import { products } from "../../data/products";
// import axiosInstance from "../../APIs/config";
// import axiosInstance from "../../APIs/config";

// import { useNavigate } from "react-router-dom";

import PaginationComponent from "../Pagination/Pagination";
import axios from "axios";
import Loader from "../Loader/Loader";
import ProductCard from "../ProductCard/ProductCard";

export default function ProductList({ rangePr }) {


    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState();
    const [productsList, setProducts] = useState([]);
    // const [finalRange, setFinalRange] = useState(rangePr)
    // const navigate = useNavigate()
    console.log(rangePr)
    // console.log(finalRange)
    // const handleDetails = (id) => {
    //     navigate(`/product-details/${id}`)
    // }

    const getPage = (page) => {
        setPage(page);
    };


    useEffect(() => {
        setIsLoading(true)
        axios
            .get(`https://ali-service-ey1c.onrender.com/api/team2/categories/64ac169f513cc89c46b1f9e9/products?limit=8&price[lte]=${rangePr[1]}&price[gte]=${rangePr[0]}`, {
                params: {

                    page: page
                },

            })
            .then((res) => {
                // console.log(res.data.Products)
                // setProducts(res.data.Products)
                // setIsLoading(false)
                const computingProducts = res.data.Products.filter(elm => elm.category === "64ac169f513cc89c46b1f9e9")
                console.log(computingProducts)
                setProducts(computingProducts)
                setIsLoading(false)

            })
            .catch((err) => {
                console.log(err)
                setIsLoading(false)
            });
    }, [page, rangePr]);



    return (
        <div>
            {isLoading && <Loader />}
            <div class="row row-cols-sm-2 row-cols-2 row-cols-lg-4 row-cols-md-2 g-4">
                {productsList.map((product) => {
                    return (
                        <div class="col" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    );
                })}
            </div>
            <PaginationComponent getPage={getPage} />
        </div>
    );
}
