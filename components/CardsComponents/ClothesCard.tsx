import React from "react"
import { productObject, tempObject } from '../interfaces'

type CardProps = {
    clothesObject: productObject,
    selectProduct: (product: productObject) => void,
    addToCart: (data: tempObject) => Promise<void>,
    username: String | null
}


export const ClothesCard = ({ clothesObject, selectProduct, addToCart, username = "placeholder"}: CardProps) => {
    
    return (
        <div className="col">
            <div className="card shadow-sm">
                <img src={`${clothesObject.url}`} className="card-img-top" alt="your image description"/>
                <div className="card-body">
                    <p className="card-text text-start">{clothesObject.name}</p>
                    <p className="card-text text-start">$ {clothesObject.price}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => selectProduct(clothesObject)}>Details</button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => addToCart({username: username, name: clothesObject.name, quantity: 1})}><i className="fa fa-shopping-bag"></i> Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}