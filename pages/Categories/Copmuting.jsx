import React, { useEffect, useState } from 'react'
import "./Copmuting.css"
import SidebarOfCategories from '../../components/SidebarOfCategories/SidebarOfCategories'
import ProductList from '../../components/ProductList/ProductList'
import axios from 'axios';

export default function Copmuting() {
    const [subCategories, setSubs] = useState([]);
    const [rangePrice, setrangePrice] = useState([1, 60000])
    const [brandsComputing, setBrandsComputing] = useState([]);
    function listFun(argu) {
        setrangePrice(argu)
        // console.log(rangePrice)
    }



    useEffect(() => {
        axios
            .get(`https://ali-service-ey1c.onrender.com/api/team2/subcategories`
            )
            .then((res) => {
                const subs = res.data.filter(elm => elm.category.name === "Computing")
                console.log(subs)
                setSubs(subs)
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);
    useEffect(() => {
        axios
            .get(`https://ali-service-ey1c.onrender.com/api/team2/brands?limit=20`
            )
            .then((res) => {
                let myArray = ['HP', 'Dell', 'Lenovo', 'ASUS', 'Canon', 'AULA']
                const selectedBrands = res.data.data.filter(brand => myArray.includes(brand.name));
                // console.log(res.data.data)
                setBrandsComputing(selectedBrands)


            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    return <>
        <div className="container my-5">
            <div className="container text-center border shadow px-0">
                <h4 className="p-2" style={{ background: "#FEE2CC" }}>
                    SHOP BY CATEGORY
                </h4>
                <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-2 p-2">

                    {
                        subCategories.map((subCat, index) => {
                            return (
                                <div class="col" key={index}>
                                    <a href="#" className="">
                                        <div class="card h-100">
                                            <img
                                                src={subCat.image}
                                                class="card-img-top"
                                                alt="..."
                                            />
                                            <div class="card-body">
                                                <h6 class="card-title link">{subCat.name}</h6>
                                            </div>
                                        </div>
                                    </a>
                                </div>

                            )
                        })

                    }




                </div>

            </div>
            <div className="container text-center border shadow px-0 my-3">
                <h4 className="p-2" style={{ background: "#FEE2CC" }}>
                    SHOP BY BRAND
                </h4>
                <div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-2 p-2">

                    {
                        brandsComputing.map((subCat, index) => {
                            return (
                                <div class="col" key={index}>
                                    <a href="#" className="">
                                        <div class="card h-100">
                                            <img
                                                src={subCat.image}
                                                class="card-img-top"
                                                alt="..."
                                            />

                                        </div>
                                    </a>
                                </div>

                            )
                        })

                    }

                </div>

            </div>
            <div className="container">
                <div className="row my-3 p-3 border shadow">
                    <div className="col-lg-3 d-lg-block d-none bg-light mx-0 p-8">
                        <SidebarOfCategories listFun={listFun} />
                    </div>
                    <div className="col-lg-9 col-12">
                        <ProductList rangePr={rangePrice} />
                    </div>
                </div>
            </div>
        </div>

    </>
}
