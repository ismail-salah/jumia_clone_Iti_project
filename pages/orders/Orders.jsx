import React from 'react'
import { Link } from 'react-router-dom'

export default function Orders() {
    return (
        <div className='container d-flex flex-column align-items-center justify-content-center fixed-height '>
            <h1>Thank you so much for your order! 🛒</h1>
            <Link to="/">
                <button className="btn buttonSTART p-3 my-3">
                    CONTINUE SHOPPING{" "}
                </button>
            </Link>
        </div>
    )
}
