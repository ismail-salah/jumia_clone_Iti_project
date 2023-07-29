import React, { useEffect, useState } from 'react'
import "./FlashSalCountDown.css"
import Slider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function FlashSalCountDown() {
    const [allproducts, setAllproducts] = useState([])


    useEffect(() => {
        axios.get("https://ali-service-ey1c.onrender.com/api/team2/products").then(res => {
            // console.log(res.data.Products);    
            const allproducts = res.data.Products
            // console.log(allproducts);
            setAllproducts(allproducts)
        })
    }, [])
    const flashSettings = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }
    return <div className='container bg-white rounded'>
        <div className='row text-white bg-danger text-center align-items-center rounded-1 p-2'>
            <div className="col">
                <h4> <i class="fa-solid fa-tag"></i> Flash Sales Every Day</h4>
            </div>
            <div className="col">
                <h4><span className='timer'>Limited Offers</span></h4>
            </div>
            <div className="col">

                <Link to="/products"><a className='sell text-white'>SEE All <i className='fa fa-arrow-alt-circle-right'></i></a></Link>
            </div>
        </div>
        <Slider {...flashSettings} >
            {
                allproducts.map((item) => {
                    return <Link to={`/productdetails/${item.id}`}>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                            <div className="card border border-0">
                                <img src={item.imageCover} alt="" className='' />
                                <div className="card-body">
                                    <p className='products-title'>{item.name}</p>
                                    <h4 className="card-title">EGP {item.price}</h4>
                                    <p className="card-text">25 Items Left</p>
                                    <div className="progress">
                                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: "90%" }}
                                            aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                })
            }
        </Slider>
    </div>
}
