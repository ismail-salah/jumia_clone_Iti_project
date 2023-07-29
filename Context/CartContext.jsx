import axios from "axios";

const { createContext, useEffect, useState } = require("react");

export let cartContext = createContext()

export function CartContextProvider(props) {


    const [numOfCartItems, setnumOfCartItems] = useState(0)

    async function getCart() {
        let res = await getLoggedUserCart()
        if (res?.data?.status === 'success') {

            setnumOfCartItems(res.data.numOfCartItems)


            // console.log(res.data.data)
        }


    }

    useEffect(() => {

        getCart()

    }, [])





    let headers = {
        token: `Bearer ${localStorage.getItem('UserToken')}`
    }

    async function addToCart(productId) {
        return await axios.post(`https://ali-service-ey1c.onrender.com/api/team2/cart`,
            {
                productId: productId


            },
            { headers: { 'Authorization': headers.token } }
        ).then((res) => res).catch((err) => err)
    }

    async function getLoggedUserCart() {
        return await axios.get(`https://ali-service-ey1c.onrender.com/api/team2/cart`,

            { headers: { 'Authorization': headers.token } }
        ).then((res) => res).catch((err) => err)
    }

    async function removeItem(productId) {
        return await axios.delete(`https://ali-service-ey1c.onrender.com/api/team2/cart/${productId}`,
            { headers: { 'Authorization': headers.token } }
        ).then((res) => res).catch((err) => err)
    }
    async function updateProductCount(productId, quantity) {
        return await axios.put(`https://ali-service-ey1c.onrender.com/api/team2/cart/${productId}`, {
            quantity: quantity
        },
            { headers: { 'Authorization': headers.token } }
        ).then((res) => res).catch((err) => err)
    }
    async function onlinePayment(cartId, shippingAdrdress) {
        return await axios.post(`https://ali-service-ey1c.onrender.com/api/team2/orders/checkout-session/${cartId}`, {
            shippingAdrdress: shippingAdrdress
        },
            { headers: { 'Authorization': headers.token } }
        ).then((res) => res).catch((err) => err)
    }


    async function removeCart() {
        return await axios.delete(`https://ali-service-ey1c.onrender.com/api/team2/cart`,
            { headers: { 'Authorization': headers.token } }
        ).then((res) => res).catch((err) => err)
    }


    return <cartContext.Provider value={{ onlinePayment, addToCart, getLoggedUserCart, removeItem, updateProductCount, numOfCartItems, setnumOfCartItems, removeCart }}>
        {props.children}
    </cartContext.Provider>
}