import React, {useState} from "react"
import { productObject, tempObject } from '../interfaces'
import { useNavigate} from 'react-router-dom'

type CardProps = {
    electronicObject: productObject,
    selectProduct: (product: productObject) => void,
    addToCart: (data: tempObject) => Promise<void>,
    username: String | null
}


export const ElectronicCard = ({ electronicObject, selectProduct, addToCart, username = "placeholder"}: CardProps) => {
    const [formData, setFormData] = useState(electronicObject || {url: "https://placeholder.pics/svg/200", name: "NAN", price: "NAN", quantity: 0});
    const navigate = useNavigate()

    return (
        <div className="col card shadow-sm w-30 p-0">
            <div className="card p-4 w-90 h-100">
                <img src={`${formData.url}`} className="card-img-top img-fluid" alt="your image description"/>
                <div className="card-body">
                    <p className="card-text text-start">{formData.name}</p>
                    <p className="card-text text-start">$ {formData.price}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group btn-group-sm flex-wrap mt-auto">
                            <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => selectProduct(formData)}>Details</button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => {
                                addToCart({username: username, name: formData.name, quantity: 1})
                                if(window.location.href.endsWith("confirmation")) navigate("/cart")

                            }}><i className="fa fa-shopping-bag"></i> Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}