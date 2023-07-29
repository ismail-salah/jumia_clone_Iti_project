import React from "react";
import "./Footer.css";
import logo from "../../../assets/imgs/logowihte.png";
import logo2 from "../../../assets/imgs/JMIA.png";
export default function Footer() {
    return (
        <div className="text-white " style={{ backgroundColor: "#535357" }}>
            <div className="row m-0 bg-dark">
                <div className="col  justify-content-center align-items-center m-3">
                    <img src={logo} className="logowite" alt="" />
                </div>
                <div className="col mt-3 maildiv font-s">
                    <h6 className="h6">NEW TO JUMIA?</h6>
                    <p>
                        Subscribe to our newsletter to get updates on our latest offers!
                    </p>
                    <div className="d-flex justify-content-center align-items-center psize ">
                        <div className="d-flex justify-content-start align-items-center bg-white p-1  rounded-1 mx-2 ">
                            <i
                                className="fa-solid fa-envelope mail"
                                style={{ color: "#535357" }}
                            ></i>{" "}
                            <input
                                className="form-control inpmail"
                                type="email"
                                placeholder="Enter E-mail Address"
                            />
                        </div>
                        <button className="btn btn-secondary btn-outline-light p-2 mx-1">MALE</button>
                        <button className="btn btn-secondary btn-outline-light p-2 mx-1">FEMALE</button>

                        <div>
                        </div>
                    </div>
                </div>
                <div className="col d-flex justify-content-center align-items-center flex-column ">
                    <div className="d-flex justify-content-center align-items-center ">
                        <div className="rounded-2" style={{ backgroundColor: "#FE9900" }}>
                            <img
                                src={logo2}
                                style={{ width: "40px", height: "40px" }}
                                alt=""
                            />
                        </div>
                        <div className="mt-4 ms-2 ">
                            <h6>DOWNLOAD JUMIA FREE APP</h6>
                            <p>Get access to exclusive offers!</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-around  align-items-center mb-1">
                        <div className="border border-1 rounded-1 mx-2 story-pay">
                            <div className="d-flex justify-content-center align-items-center px-2">
                                <i className="fa fab fa-apple me-2"></i>
                                <div>
                                    <small style={{ fontSize: "10px" }}>Download On The</small>
                                    <p>App Store</p>
                                </div>
                            </div>
                        </div>
                        <div className="border border-1 rounded-1 mx-2 story-pay">
                            <div className="d-flex justify-content-center align-items-center px-2">
                                <i className="fa fab fa-google-play me-2"></i>
                                <div>
                                    <small style={{ fontSize: "8px" }}>Get It ON</small>
                                    <p>Play Store</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-white mt-3 font-s">
                <div className="row m-0 ">
                    <div className="col d-flex justify-content-center align-items-center flex-column">
                        <div>
                            <ul>
                                <span className=" d-block my-2">NEED HELP?</span>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-help/"
                                    >
                                        Help Center
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-contact/"
                                    >
                                        Contact us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-how-to-shop/"
                                    >
                                        How to shop on Jumia?
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-how-to-pay/"
                                    >
                                        How to pay on Jumia?
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-delivery-timelines/"
                                    >
                                        Delivery timelines
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-dispute-resolution-policy/"
                                    >
                                        Dispute Resolution Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-returns-and-refunds-policy/"
                                    >
                                        Return &amp; Refund Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-payment-guidelines/"
                                    >
                                        Payment Information Guidelines
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="join mb-4">
                            <small>
                                <strong className="text-uppercase d-block my-3">
                                    join us on
                                </strong>
                            </small>
                            <i
                                className="fa fab fa-facebook join-ico mx-2 p-1"
                                style={{ fontSize: "1.5rem" }}
                            ></i>
                            <i
                                className="fa fab fa-twitter join-ico mx-2 p-1"
                                style={{ fontSize: "1.5rem" }}
                            ></i>
                            <i
                                className="fa fab fa-instagram join-ico mx-2 p-1"
                                style={{ fontSize: "1.5rem" }}
                            ></i>
                            <i
                                className="fa fab fa-youtube join-ico mx-2 p-1"
                                style={{ fontSize: "1.5rem" }}
                            ></i>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column justify-content-start">
                                <a className="link text-white" href="#">Active</a>
                                <a className="link text-white" href="#">ADIDAS</a>
                                <a className="link text-white" href="#">American Eagle</a>
                                <a className="link text-white" href="#">Andora</a>
                            </div>

                        </div>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center flex-column">
                        <div>
                            <ul>
                                <span className=" d-block my-2">ABOUT JUMIA EGYPT</span>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-help/"
                                    >
                                        Jumia Logistics Services
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-contact/"
                                    >
                                        Jumia Careers
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-how-to-shop/"
                                    >
                                        Stores Credit Terms & Conditions
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-how-to-pay/"
                                    >
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-delivery-timelines/"
                                    >
                                        Free Shipping
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-dispute-resolution-policy/"
                                    >
                                        Flash Sales
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-returns-and-refunds-policy/"
                                    >
                                        Return &amp; Refund Policy
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-payment-guidelines/"
                                    >
                                        Join the Jumia DA Academy
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="join mb-4">
                            <small>
                                <strong className="text-uppercase d-block my-3">
                                    PAYMENT METHODS
                                </strong>
                            </small>
                            <i
                                className="fa-solid fa-credit-card join-ico mx-2 p-1"
                                style={{ fontSize: "1.5rem" }}
                            ></i>
                            <i

                                className=" fa-brands fa-cc-paypal join-ico mx-2 p-1"

                                style={{ fontSize: "1.5rem" }}
                            ></i>
                            <i

                                className="fa-solid fa-comments-dollar join-ico mx-2 p-1"
                                style={{ fontSize: "1.5rem" }}
                            ></i>
                            <i
                                className="fa-brands fa-amazon-pay join-ico mx-2 p-1"
                                style={{ fontSize: "1.5rem" }}
                            ></i>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column justify-content-start">
                                <a className="link text-white" href="#">Garnier</a>
                                <a className="link text-white" href="#">HP</a>
                                <a className="link text-white" href="#">Izor</a>
                                <a className="link text-white" href="#">Kady</a>
                            </div>
                            <div className="d-flex flex-column justify-content-start mx-5">
                                <a className="link text-white" href="#">Apple</a>
                                <a className="link text-white" href="#">Braun</a>
                                <a className="link text-white" href="#">Casio</a>
                                <a className="link text-white" href="#">Cottonil</a>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex  align-items-center flex-column">
                        <div>
                            <ul>
                                <span className=" d-block my-2">MAKE MONEY WITH JUMIA</span>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-help/"
                                    >
                                        Sell on Jumia
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-contact/"
                                    >
                                        Become a Logistics Service Partner
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-how-to-shop/"
                                    >
                                        Become a Sales Consultant (J-Force )
                                    </a>
                                </li>

                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-payment-guidelines/"
                                    >
                                        Payment Information Guidelines
                                    </a>
                                </li>
                            </ul>
                        </div><br /><br />
                        <br /><br />
                        <br /><br /><br />
                        <br />
                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <div className="d-flex flex-column justify-content-start ">
                                <a className="link text-white" href="#">L'Oreal Paris</a>
                                <a className="link text-white" href="#">LC Waikiki</a>
                                <a className="link text-white" href="#">Lenovo</a>
                                <a className="link text-white" href="#">Maybelline New York</a>
                            </div>
                            <div className="d-flex flex-column justify-content-start mx-3">
                                <a className="link text-white" href="#">Mesery</a>
                                <a className="link text-white" href="#">Mothercare</a>
                                <a className="link text-white" href="#">NIVEA</a>
                                <a className="link text-white" href="#">Nokia</a>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center align-items-center flex-column">
                        <div>
                            <ul>
                                <span className=" d-block my-2">JUMIA INTERNATIONAL</span>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-help/"
                                    >
                                        Algeria
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-contact/"
                                    >
                                        Ivory Coast
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-how-to-shop/"
                                    >
                                        Ghana
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-how-to-pay/"
                                    >
                                        Kenya
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-delivery-timelines/"
                                    >
                                        Morocco
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-dispute-resolution-policy/"
                                    >
                                        Nigeria
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-returns-and-refunds-policy/"
                                    >
                                        Senegal
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="link text-white"
                                        href="https://www.jumia.com.eg/sp-payment-guidelines/"
                                    >
                                        Tunisia
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <br />
                        <br /><br />
                        <br /><br />
                        <div className="d-flex justify-content-between font-s align-items-center">
                            <div className="d-flex flex-column justify-content-start ">
                                <a className="link text-white" href="#">OPPO</a>
                                <a className="link text-white" href="#">Ravin</a>
                                <a className="link text-white" href="#">Samsung</a>
                                <a className="link text-white" href="#">SHEIN</a>
                            </div>
                            <div className="d-flex flex-column   justify-content-start mx-3">
                                <a className="link fs-6 text-white" href="#">Sokany</a>
                                <a className="link text-white" href="#">Tornado</a>
                                <a className="link text-white" href="#">XIAOMI</a>
                                <br />
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <br />
                <span className="text-start mx-3 mb-3">English | عربي</span>

            </div>
        </div>
    );
}
