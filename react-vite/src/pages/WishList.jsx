import { useState } from "react";



function Wishlist() {

    
    const [list , setlist] = useState(JSON.parse(localStorage.getItem("items")) || [] )

    function productRemove(id){
        const items1 = list.filter(prod => prod.id !== id )
        setlist(items1)
        localStorage.setItem("items", JSON.stringify(items1))
    }
    return (
        <div>
            
            <h1>WishList</h1>
            {list.length === 0 ? (<h3>No Product in your WishList</h3>) :
            (list.map((prod, index) => (
                <div style={{display : "flex"}} key={index}>
                    <div className="cart-img">
                            <img src={prod.img} style={{width : "150px", height: "180px"}} />
                        </div>
                    <div className="cart-main" >
                        <div className="cart">
                            <div className="cart-discribution">
                                <p>{prod.productname}</p>
                                <p style={{ fontWeight: "bold" }}>{prod.price}</p>
                                <button className="btn" onClick={()=>productRemove(prod.id)}>
                                    Remove the product
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            )))}
        </div>
    )
}

export default Wishlist;