import React from 'react'
import { Navigate } from 'react-router'

export default function ProtectedAdmin(prpos) {
    // const navigate = useNavigate()
    if (localStorage.getItem('AdminToken') == null) {
        return <Navigate to={'/loginadmin'} />
    }
    else {

        return prpos.children
    }


}