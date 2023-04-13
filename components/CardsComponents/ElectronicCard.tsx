import React from "react"
import { productObject, tempObject } from '../interfaces'

type CardProps = {
    electronicObject: productObject,
    selectProduct: (product: productObject) => void,
    addToCart: (data: tempObject) => Promise<void>,
    username: String | null
}


export const ElectronicCard = ({ electronicObject, selectProduct, addToCart, username = "placeholder"}: CardProps) => {


    return (
        <div className="col card shadow-sm w-90 p-0">
            <div className="card p-4 w-90 h-100">
                <img src={`${electronicObject.url}`} className="card-img-top img-fluid" alt="your image description"/>
                <div className="card-body">
                    <p className="card-text text-start">{electronicObject.name}</p>
                    <p className="card-text text-start">$ {electronicObject.price}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => selectProduct(electronicObject)}>Details</button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => addToCart({username: username, name: electronicObject.name, quantity: 1})
                        }><i className="fa fa-shopping-bag"></i> Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}