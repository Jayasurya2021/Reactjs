import { useState } from "react"
import './Card.css'


function Card(props) {

    const [cart, setcart] = useState(true)

    function Addtocard(prod , e){
        
            setcart(!cart)
            if (cart === true) {
                e.target.textContent = "Product add to Wishlist"

                let setitem = localStorage.getItem("items")

                setitem = setitem? JSON.parse(setitem) : []

                setitem.push(prod)
                 const items = JSON.stringify(setitem)

                localStorage.setItem("items", items)
                setcart(true)


            } else {
                e.target.textContent = "Add to Cart"
              
            }
        }
    return (
        <div>
            {props.item.map((prod, index) => (
                <div className="cart-main" style={{display: "flex"}} key={index}>
                    <div className="cart">
                        <div className="cart-img">
                            <img src={prod.img} />
                        </div>
                        <div className="cart-discribution">
                            <p>{prod.productname}</p>
                            <p style={{ fontWeight: "bold" }}>{prod.price}</p>
                            <button className="btn" onClick={(e)=>Addtocard(prod, e)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    )

}

export default Card