import React from 'react'
import "./ProductsSideBar.css"
import { Link } from 'react-router-dom'
import PriceRangeBar from '../PriceRangeBar/PriceRangeBar'
function ProductsSideBar({listFun}) {
    console.log(listFun)
    return (
        <div className='cat-sidebar my-4 p-3 bg-white'>
            <div>
                <h4>CATEGORY</h4>
                <div className="category-links m-2">
                    <Link to="/copmuting"> <p>Copmuting</p> </Link>
                    <p>Copmuting</p>
                    <p>Electronics</p>
                    <p>Sporting Goods</p>
                    <p>Phones & Tablets</p>
                    <p>Fashion</p>
                    <p>Gaming</p>
                    <p>Home & Office</p>
                    <p>Automobile</p>
                </div>
            </div>
            <hr />
            <div>
                <h4>EXPRESS DELIVERY</h4>
                <input className='checkboxs' type="checkbox" /><span className='d-inline-block mx-3'>Jumia Express</span>
            </div>
            <hr />
            <div>
                <h4>SHIPPED FROM</h4>
                <div className="d-flex flex-column">
                    <div>
                        <input className='checkboxs' name="ship" type="radio" /><span className='d-inline-block mx-3'>Shipped from Egypt</span>
                    </div>
                    <div>
                        <input className='checkboxs' name="ship" type="radio" /><span className='d-inline-block mx-3 bg-blue'>Shipped from abroad</span>
                    </div>
                </div>

            </div>
            <hr />
            <div>
                {/* <div className='d-flex justify-content-between'>
                    <div><h4>PRICE (EGP)</h4></div>
                    <div><p className='text-warning fw-bolder cursor-pointer'>APPLAY</p></div>
                </div>
                <div>
                    <input type="range" className="form-range" min="0" max="99999999" id="customRange2" />
                    <input type="number" className="" min="0" max="99999999" id="customRange2" value="6254" /> -  <input type="number" className="" min="0" max="99999999" id="customRange2" value="6254" />
                </div> */}
                <PriceRangeBar listFun={listFun} />
            </div>
            <hr />
            <div>
                <h4>DISCOUNT PERCENTAGE
                </h4>
                <div className="d-flex flex-column">
                    <div>
                        <input type="radio" name='disc' /> <span>50% or more</span>
                    </div>
                    <div>
                        <input type="radio" name='disc' /> <span>40% or more</span>
                    </div>
                    <div>
                        <input type="radio" name='disc' /> <span>30% or more</span>
                    </div>
                    <div>
                        <input type="radio" name='disc' /> <span>20% or more</span>
                    </div>
                    <div>
                        <input type="radio" name='disc' /> <span>10% or more</span>
                    </div>
                </div>
            </div>
            <hr />
            <div>
                <h4>BRANDS
                </h4>
                <div className="d-flex flex-column">
                    <div>
                        <input type="checkbox" /> <span>LENOVO</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>APPLE</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>ASUS</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>HP</span>
                    </div>
                    <div>
                        <input type="checkbox" /> <span>DELL</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductsSideBar
