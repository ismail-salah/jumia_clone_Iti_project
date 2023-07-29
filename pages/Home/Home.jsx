import React, { useEffect, useState } from 'react';

import "./Home.css";
import flash from "../../assets/imgs/flash-sale.png";
import eid from "../../assets/imgs/Eid-offers.png";
import img1 from "../../assets/imgs/slider/1.png";
import img2 from "../../assets/imgs/slider/2.png";
import img3 from "../../assets/imgs/slider/3.jpg";
import img4 from "../../assets/imgs/slider/4.jpg";
import img5 from "../../assets/imgs/slider/5.jpg";
import img6 from "../../assets/imgs/slider/6.jpg";
import img7 from "../../assets/imgs/slider/7.jpg";
import img8 from "../../assets/imgs/slider/8.jpg";

// small slider

// import slid1 from "../../assets/imgs/catSlider/1.png"
// import slid2 from "../../assets/imgs/catSlider/2.png"
// import slid3 from "../../assets/imgs/catSlider/3.png"
// import slid4 from "../../assets/imgs/catSlider/4.png"
// import slid5 from "../../assets/imgs/catSlider/5.png"
// import slid6 from "../../assets/imgs/catSlider/6.png"
// import slid7 from "../../assets/imgs/catSlider/7.png"
// import slid8 from "../../assets/imgs/catSlider/8.png"
// import slid9 from "../../assets/imgs/catSlider/9.png"
// import slid10 from "../../assets/imgs/catSlider/10.png"
// import slid11 from "../../assets/imgs/catSlider/11.png"
// import slid12 from "../../assets/imgs/catSlider/12.png"

// card

import keep2 from "../../assets/imgs/keep2.png"

// extra

import eximg1 from "../../assets/imgs/extra/1.png"
import eximg2 from "../../assets/imgs/extra/2.png"
import eximg3 from "../../assets/imgs/extra/3.png"
import eximg4 from "../../assets/imgs/extra/4.png"
import eximg5 from "../../assets/imgs/extra/5.png"
import eximg6 from "../../assets/imgs/extra/6.png"
import Slider from "react-slick";
import Declaration from '../../components/shared/Declaration/Declaration'
import BackToUpBtn from '../../components/BackToUpBtn/BackToUpBtn'
import FlashSalCountDown from '../../components/FlashSalCountDown/FlashSalCountDown'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function Home() {


    const [cat, setCat] = useState([])
    const [products, setproducts] = useState([])
    useEffect(() => {
        axios.get("https://ali-service-ey1c.onrender.com/api/team2/categories?limit=12").then(res => {
            const data = res.data.data
            setCat(data)
        })
    }, [])

    useEffect(() => {
        axios.get("https://ali-service-ey1c.onrender.com/api/team2/products?limit=3").then(res => {
            // console.log(res.data.Products);    
            const prodata = res.data.Products
            // console.log(prodata);
            setproducts(prodata)
        })
    }, [])
    const catSlider = {
        dots: false,
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 4,
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
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
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
    };

    return <>
        <div className='container-fluid main'>
            <div className="container d-none d-md-block d-lg-block d-xl-block">
                <div className="row pt-3">

                    <div className="col-sm-12 col-md-12 col-lg-2 bg-light categories border border-1 rounded d-flex flex-column justify-content-start " >
                        <span className="my-1 cate-home" style={{ fontSize: "12px" }}> <i class="fa-solid fa-laptop me-2"></i> <Link to="/copmuting"> Copmuters</Link> </span>
                        <span className="my-1 cate-home" style={{ fontSize: "12px" }}>  <i class="fa-solid fa-apple-whole me-2"></i> Supermarket</span>
                        <span className="my-1 cate-home" style={{ fontSize: "12px" }}> <i class="fa-solid fa-shirt me-2"></i> Fasion</span>
                        <span className="my-1 cate-home" style={{ fontSize: "12px" }}> <i class="fa-solid fa-staff-snake me-2"></i> Health & Beauty</span>
                        <span className="my-1 cate-home" style={{ fontSize: "12px" }}> <i class="fa-solid fa-baby me-2"></i> Baby Products</span>
                        <span className="my-1 cate-home" style={{ fontSize: "12px" }}> <i class="fa-solid fa-mobile-screen-button me-2"></i> Phone & Tablets</span>
                        <span className="my-1 cate-home" style={{ fontSize: "12px" }}> <i class="fa-solid fa-house me-2"></i> Home & Furniture</span>
                        <span className="my-1 cate-home" style={{ fontSize: "12px" }}> <i class="fa-solid fa-mug-hot me-2"></i> Appliances</span>
                        <span className="my-1 cate-home" style={{ fontSize: "12px" }}> <i class="fa-solid fa-display me-2"></i>Electronics</span>
                        <span className="my-1 cate-home" style={{ fontSize: "12px" }}> <i class="fa-solid fa-dumbbell me-2"></i>Sporting Goods</span>
                        <span className="my-1 cate-home" style={{ fontSize: "12px" }}> <i class="fa-solid fa-gamepad me-2"></i>Gamming</span>
                        <span className="my-1 cate-home" style={{ fontSize: "12px" }}> <i class="fa-solid fa-ellipsis me-2"></i> Other Categories</span>
                    </div>
                    <div className=" col-sm-12 col-md-12 col-lg-8">
                        <Slider {...sliderSettings}>
                            <div> <img src={img1} alt="" /> </div>
                            <div> <img src={img2} alt="" /> </div>
                            <div> <img src={img3} alt="" /> </div>
                            <div> <img src={img4} alt="" /> </div>
                            <div> <img src={img5} alt="" /> </div>
                            <div> <img src={img6} alt="" /> </div>
                            <div> <img src={img7} alt="" /> </div>
                            <div> <img src={img8} alt="" /> </div>
                        </Slider>
                    </div>
                    <div className=" col-sm-2 col-md-2 col-lg-1 ">
                        <img src={flash} alt="flash" />
                        <img src={eid} alt="eid" />
                    </div>
                </div>
            </div>
            <div className="container mt-4 bg-white rounded mb-3">

                <Slider {...catSlider}>
                    {
                        cat.map((item, index) => {
                            return (
                                <div key={index}>
                                    <img src={item.image} alt='' className='w-100 h-100 m-2 px-1' />
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
            <div className='container bg-white' >
                <div className="text d-flex justify-content-between align-items-center">
                    <p className='h5 m-2'>Keep Shopping For</p>
                    <Link to="/products"><a className='sell m-2'> SEE ALL <i className='fa fa-arrow-right'></i></a></Link>
                </div>
            </div>

            <div className=' row d-flex container m-auto'>
                {
                    products.map((item) => {
                        return (
                            <div className='col-md-4 py-3 '  >
                                <Link to={`/productdetails/${item.id}`} className='w-100 text-decoration-none '>
                                    <div className="card " >
                                        <img className="w-100 pt-2" style={{ maxHeight: '300px' }} src={item.imageCover} alt="Title" />
                                        <div className="card-body">
                                            <h6 className="card-title price">{item.name}</h6>
                                            <p className="card-text price m-0" >EFP {item.priceAfterDiscount}</p>
                                            <small className=" card-text prev-price"> EGP {item.price}</small>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>


            {/* Extra Discounds */}
            <div className="container rounded-1 my-3 pb-2 bg-white d-none d-md-block d-lg-block d-xl-block">
                <h4 className='text-center p-3' style={{ backgroundColor: "#E2F5FF" }}>EXTRA DISCOUNTS FOR YOU</h4>
                <div className=" d-flex flex-row justify-content-around align-items-center">

                    <div><img className='eximg my-1' src={eximg1} alt="" /></div>
                    <div><img className='eximg my-1' src={eximg2} alt="" /></div>
                    <div><img className='eximg my-1' src={eximg3} alt="" /></div>
                    <div><img className='eximg my-1' src={eximg4} alt="" /></div>
                    <div><img className='eximg my-1' src={eximg5} alt="" /></div>
                    <div><img className='eximg my-1' src={eximg6} alt="" /></div>
                </div>
            </div>
            <FlashSalCountDown />
            <div className="container rounded-1 my-3 pb-2 bg-white d-none d-md-block d-lg-block d-xl-block">
                <h4 className='text-center p-3' style={{ backgroundColor: "#F7C1B2" }}>All Your Eid Groceries in One Place</h4>
                <div className=" d-flex flex-row justify-content-around align-items-center">
                    <div><img className='eximg my-1' src={eximg1} alt="" /></div>
                    <div><img className='eximg my-1' src={eximg2} alt="" /></div>
                    <div><img className='eximg my-1' src={eximg3} alt="" /></div>
                    <div><img className='eximg my-1' src={eximg4} alt="" /></div>
                    <div><img className='eximg my-1' src={eximg5} alt="" /></div>
                    <div><img className='eximg my-1' src={eximg6} alt="" /></div>
                </div>
            </div>
            <FlashSalCountDown />
            <BackToUpBtn />
            <Declaration />
        </div>
    </>
}
