import React from 'react'
import PriceRangeBar from '../PriceRangeBar/PriceRangeBar'
import "./SidebarOfCategories.css"
export default function SidebarOfCategories({ listFun }) {
    return (
        <div className="">
            <h6 className="text-uppercase my-3">category</h6>
            <a
                href="#"
                target="_blank"
                className="btn main-btn w-100 rounded-0 text-start fw-medium"
            >
                Computing
            </a>
            <a
                href="#"
                target="_blank"
                className="btn main-btn w-100 rounded-0 text-start ps-4"
            >
                Computer Accessories
            </a>
            <a
                href="#"
                target="_blank"
                className="btn main-btn w-100 rounded-0 text-start ps-4"
            >
                Computers & Accessories
            </a>
            <a
                href="#"
                target="_blank"
                className="btn main-btn w-100 rounded-0 text-start ps-4"
            >
                Software
            </a>
            <hr />
            <h6 className="text-uppercase my-3">express delivery</h6>
            <hr />

            <PriceRangeBar listFun={listFun} />
            <hr />
            <h6 className="text-uppercase my-3">shipped from</h6>
        </div>

    )
}
