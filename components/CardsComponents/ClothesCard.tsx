import React from "react"
import { productObject } from '../interfaces'

type CardProps = {
    clothesObject: productObject,
    selectProduct: (product: productObject) => void
}


export const ClothesCard = ({ clothesObject, selectProduct }: CardProps) => {
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}