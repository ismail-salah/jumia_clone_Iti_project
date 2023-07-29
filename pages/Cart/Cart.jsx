import React from 'react'
import Footer from '../../components/shared/Footer/Footer';
import "./Cart.css";
import img1 from "../../assets/imgs/keep2.png"
import img2 from "../../assets/imgs/sale/1.png"
import img3 from "../../assets/imgs/sale/2.png"
import Home from '../Home/Home';
import { Link } from 'react-router-dom';

function Cart() {
    const imgs = [
        "https://www.jumia.com.eg/assets_he/images/cart.668e6453.svg",
    ]

    return (
        <>
            <form className="container rounded-1 bg-white my-4">
                <div className='text itemCard  justify-content-between align-items-center p-3'>

                    <img src={imgs[0]} className='w-10 h-10  bg-white imgcard' />
                    <h5 className='bg-white py-2'>Your cart is empty!</h5>
                    <p className='bg-white py-2'>Browse our categories and discover our best deals!</p>
                    <Link to="/"><button className='btn buttonSTART p-3 my-3'>START SHOPPING </button></Link>
                </div>

            </form>

            {/* ///////////////////////////////////////////////////////////////////// */}

            <form className="container-fluid row rounded-1 m-3 p-1 my-5 w-100 Check ">
                <table className=" col-8 w-1 h-1  rounded-1 bg-white  ms-4">
                    <td>
                        {/* <img src={imgs[0]} className=' bg-white imgcard' /> */}
                        <h3 className='bg-white py-2'>cart</h3>
                        <p className='bg-white py-2'>Browse our categories and discover our best deals!</p>
                        <button className='btn buttonSTART p-2 my-3'> START </button>
                    </td>

                </table>


                <table className='card col-3 rounded-1  ms-4  '>

                    <h5 className='bg-white py-2'>Your cart is empty!</h5>
                    <p className='bg-white py-2'>Browse our categories and discover our best deals!</p>
                    <button className='btn buttonSTART p-3 my-3'> Checkout </button>
                </table>

            </form>
            {/* ///////////////////////////////////////////////////////////////////// */}

            <div className='container rounded-1 p-1 my-5 bg-white'>
                <div className="text d-flex justify-content-between align-items-center ">
                    <p className='h5 m-2'>Keep Shopping For</p>
                </div>
                <div className="row p-2">
                    <div className="col  w-10 " >
                        <img className='item-img' src={img1} alt="" /></div>
                    <div className="col w-10 " >
                        <img className='item-img' src={img2} alt="" /></div>
                    <div className="col w-10 " >
                        <img className='item-img' src={img3} alt="" /></div>
                    <div className="col w-10 " >
                        <img className='item-img' src={img2} alt="" /></div>
                    <div className="col w-10 " >
                        <img className='item-img' src={img3} alt="" /></div>
                </div>
            </div>

            <Footer />

        </>
    )
}
export default Cart;
