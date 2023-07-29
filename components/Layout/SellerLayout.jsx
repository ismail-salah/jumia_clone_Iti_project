// import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
// import SideBar from '../sidebar/SideBar';
// import toast, { Toaster } from "react-hot-toast";


function SellerLayout() {
    return <>

        {/* <SideBar /> */}
        <ToastContainer />
        {/* <Toaster /> */}
        <Outlet >
        </Outlet >

    </>
}

export default SellerLayout


