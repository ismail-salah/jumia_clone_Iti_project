import React from 'react'

import { Link } from 'react-router-dom'
export default function Languages() {
    return <>
        <div className='px-5 d-flex justify-content-around align-items-center lang d-none d-md-flex d-lg-flex d-xl-flex'>
            <div >
                <Link to={localStorage.getItem('SellerToken') ? "/seller" : "/loginseller"} className='link-warning sell'> <i className='fa fa-star text-warning'></i> Sell ON Jumia</Link>
                <Link to={localStorage.getItem('AdminToken') ? "/admin" : "/loginadmin"} className='link-warning sell mx-3 btn btn-primary'>Admin Jumia</Link>

            </div>
            <div className="">
                Pay
            </div>
            <div className="">
                عربي | English
            </div>
        </div >
    </>

}
