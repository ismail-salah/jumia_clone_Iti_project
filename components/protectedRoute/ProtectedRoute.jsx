import jwtDecode from 'jwt-decode'
import React from 'react'
import { Navigate } from 'react-router'
export default function ProtectedRoute(prpos) {
    // const tokenData = localStorage.getItem('SellerToken')
    // const auth = jwtDecode(tokenData)
    if (localStorage.getItem('SellerToken') == null) {
        return <Navigate to={'/loginseller'} />
    }
    else {
        return prpos.children
    }
}

