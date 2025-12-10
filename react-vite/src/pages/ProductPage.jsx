import Card from "../components.js/Card";
import './ProductPage'
import Wishlist from "./WishList";
import { useState } from "react";

import card1 from '../assets/1.avif'
import card2 from '../assets/2.avif'
import card3 from '../assets/3.avif'
import card4 from '../assets/4.avif'
import card5 from '../assets/5.avif'
import card6 from '../assets/6.avif'
import Nav from '../components.js/Nav'




function ProductPage(){

     const [list, setlist] = useState(false)

          const product = [{id:1, productname:"Regular Fit Oxford shirt", price:"Rs.1,999.00", img : card1},
            {id:2, productname:"Regular Fit Oxford shirt", price:"Rs.1,999.00", img : card2 },
            {id:3, productname:"Regular Fit Oxford shirt", price:"Rs.1,999.00", img : card3 },
            {id:4, productname:"Regular Fit Oxford shirt", price:"Rs.1,999.00", img : card4 },
            {id:5, productname:"Regular Fit Oxford shirt", price:"Rs.1,999.00", img : card5 },
            {id:6, productname:"Regular Fit Oxford shirt", price:"Rs.1,999.00", img : card6 },
    ]

    
   return(
        <>

        <div >
          <Nav/>

          
          <button onClick={()=> setlist(!list)}>
               {list ? "hide list": "show list"}
               </button>
               {list ?  <Wishlist/> :
               <div className="parent">
               <Card item = {product}/>
                </div>
                }
                    

        </div>
        </>
   )
}


export default ProductPage;