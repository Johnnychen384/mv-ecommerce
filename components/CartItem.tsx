import React from "react"
import { cartObject } from "./interfaces"

type cartItemProp = {
    item: cartObject
}

export const CartItem = ({ item }: cartItemProp) => {
    
    return (
        <div className="card m-5 w-75">
            <div className="row">
                <div className="col-md-4">
                    <img src={item.product.url.toString()} className="img-fluid w-75"></img>
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-center align-items-center">
                    <h4 className=""><strong>{item.product.name}</strong></h4>
                    <h5 className="">Price: ${item.product.price}</h5>
                    <div className="d-flex align-items-center justify-content-center">
                        <h5 className="my-3 mr-3">Qty: {item.quantity}</h5>
                        <div className="btn-group mx-2">
                                    <button className="btn btn-sm btn-outline-secondary px-3">+</button>
                                    <button className="btn btn-sm btn-outline-secondary px-3">-</button>
                        </div>
                    </div>
                    <h5 className="">Total: ${item.total.toFixed(2)}</h5>
                    <button className="btn btn-danger mt-4 w-25">Delete</button>
                </div>
            </div>
        </div>



    )
}