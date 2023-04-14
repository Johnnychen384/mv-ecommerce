import React, { useState, useEffect } from "react"
import { cartObject, tempObject } from "./interfaces"

type cartItemProp = {
    item: cartObject,
    deleteCart: (data: tempObject) => Promise<void>,
    username: any,
    updateCart: (data: tempObject) => Promise<void>,
    getTotal: () => void
}

export const CartItem = ({ item, deleteCart, username, updateCart, getTotal}: cartItemProp) => {
    const [currentItem, setCurrentItem] = useState<cartObject>(item)
    const [quan, setQuan] = useState<number>(currentItem.quantity)

    useEffect(() => {
        getTotal()
    }, [quan])
    
    return (
        <div className="card m-5 w-75">
            <div className="row mt-5">
                <div className="col-md-4">
                    <img src={item.product.url.toString()} className="img-fluid w-75"></img>
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-center align-items-center">
                    <h4 className=""><strong>{item.product.name}</strong></h4>
                    <h5 className="">Price: ${item.product.price}</h5>
                    <div className="d-flex align-items-center justify-content-center">
                        <h5 className="my-3 mr-3">Qty: {item.quantity}</h5>
                        <div className="btn-group mx-2">
                                <button className="btn btn-sm btn-outline-secondary px-3" onClick={() => {
                                    
                                    
                                    updateCart({username: username, name: item.product.name, quantity: item.quantity + 1})
                                    }
                                }>+</button>
                                <button className="btn btn-sm btn-outline-secondary px-3" onClick={() => {
                                    
                                    
                                    {item.quantity === 1 ? deleteCart({username: username, name: item.product.name, quantity: item.quantity})
                                    : updateCart({username: username, name: item.product.name, quantity: item.quantity - 1})}
                                    
                                }}>-</button>
                        </div>
                    </div>
                    <h5 className="">Total: ${item.total.toFixed(2)}</h5>
                    <button className="btn btn-danger mt-3 w-25 mb-5" onClick={() => deleteCart({username: username, name: item.product.name, quantity: item.quantity})}>Delete</button>
                </div>
            </div>
        </div>



    )
}