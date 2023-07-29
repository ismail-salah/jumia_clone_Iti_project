// import axios from "axios";
import axios from "axios";
import jwtDecode from "jwt-decode";

const { createContext, useEffect, useState } = require("react");

export let tokenContext = createContext()


export default function TokenHandler(props) {
    const [userData, setUsrData] = useState(null)
    const [sellerData, setSellerData] = useState(null)
    const [adminData, setadminData] = useState(null)

    function saveUserData() {
        let userlogintoken = localStorage.getItem("UserToken");
        if (userlogintoken) {
            let decodedToken = jwtDecode(userlogintoken);
            setUsrData(decodedToken.name);
            // console.log(decodedToken);
        }
    }
    function saveSellerData() {
        let sellerlogintoken = localStorage.getItem("SellerToken");
        if (sellerlogintoken) {
            let decodedToken = jwtDecode(sellerlogintoken);
            setSellerData(decodedToken.name);
            // console.log(decodedToken);
        }
    }

    function saveAminData() {
        let adminlogintoken = localStorage.getItem("AdminToken");
        if (adminlogintoken) {
            let decodedToken = jwtDecode(adminlogintoken);
            setadminData(decodedToken.name);
            // console.log(decodedToken);
        }
    }



    async function handleLogin(values) {
        return await axios
            .post(
                `https://ali-service-ey1c.onrender.com/api/team2/auth/login`,
                values
            )
            .then((response) => response)
            .catch((error) => error);
    }



    return <tokenContext.Provider value={{ saveUserData, userData, saveSellerData, sellerData, handleLogin }}>
        {props.children}
    </tokenContext.Provider>
}
