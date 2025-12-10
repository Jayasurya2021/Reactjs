import React, { useState } from "react";
import pluse from "../assets/plus-red2.png";
import hmLogo from "../assets/hm-red-logo.png";
import searchIcon from "../assets/search.png";
import accountIcon from "../assets/account.png";
import heartIcon from "../assets/heart-logo.png";
import cartIcon from "../assets/hm-cart.png";
import "./Nav.css";
import Wishlist from "../pages/WishList";
import Card from "./Card";

function Nav() {


    const [cart, setcart] = useState(false)


    return (
        <div className="navigation">

            <div className="navigationtop">
                <div>Member Exclusive | Flat 15% off</div>
                <div className="plus">
                    <img src={pluse} alt="plus-icon" />
                </div>
            </div>

            <div className="navigationdown">

                <div className="hm-left-nav">
                    <div className="hm-logo">
                        <img src={hmLogo} alt="H&M logo" />
                    </div>
                    <div className="hm-links">
                        <a href="#" style={{ fontWeight: "bold" }}>MENS</a>
                        <a href="#">LADIES</a>
                        <a href="#">KIDS</a>
                        <a href="#">HOME</a>
                    </div>
                </div>


                <div className="hm-right-nav">
                    <img src={searchIcon} alt="search" />
                    <img src={accountIcon} alt="account" />
                    <img src={heartIcon} alt="wishlist" />
                    <button className="btn2" onClick={()=>setcart(!cart)}>
                        <img src={cartIcon} alt="cart" />
                        {cart ?  <Wishlist/> : "" }
                    </button>
                    
                </div>
            </div>
        </div>
    );
}

export default Nav;
