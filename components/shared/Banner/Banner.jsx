import React from 'react'
import  "./Banner.css"
import banner from "../../../assets/imgs/banner.png"
export default function Banner() {
    return <div className='d-flex justify-content-center banner d-none d-md-block d-lg-block d-xl-block'>
        <img src={banner} alt="" style={{width:"100%"}}/>
    </div>
}
