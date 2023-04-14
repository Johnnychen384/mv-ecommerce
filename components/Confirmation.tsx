import React, {useState} from "react"
import { useNavigate } from 'react-router-dom'



export const Confirmation = ({rec, user, subTotal, tax, deleteAllCart, userCart, sold, createSold, updateSold}) => {
    const [formData, setFormData] = useState(user || {username: "", address: "", email: "", creditcard: ""});
    
    const navigate = useNavigate()

    return (
        <>
            <h1 className="mt-5">Order Summary</h1>

            <div className="container-fluid d-flex flex-column align-items-center">
                <hr className="featurette-divider my-5" />
                <h3>Billing/Shipping</h3>
                <ul className="list-group w-50">
                    <li className="list-group-item"><strong>Name:</strong> {formData.username}</li>
                    <li className="list-group-item"><strong>Address:</strong> {formData.address}</li>
                    <li className="list-group-item"><strong>Email:</strong> {formData.email}</li>
                    <li className="list-group-item"><strong>Credit Card Number:</strong> {formData.creditcard}</li>
                    <h3 className="my-5">Order Total: ${(subTotal + tax).toFixed(2)} </h3>
                    <button className="btn btn-dark btn-lg w-100 mt-1" onClick={() => {
                        const arrayOfProductNames: String[] = []

                        for(let obj of sold){
                            arrayOfProductNames.push(obj.product.name)
                        }

                        for(let obj of userCart){
                            if(!arrayOfProductNames.includes(obj.product.name)) createSold({username: formData.username, name: obj.product.name, quantity: obj.quantity})
                            else updateSold({username: formData.username, name: obj.product.name, quantity: obj.quantity})
                        }



                        deleteAllCart(formData.username)
                        navigate("/success")
                
                    }}>Continue</button>
                </ul>
            </div>
            <div className="album py-5 bg-body-tertiary">
                    <div className="container">
                        <h3 className="fw-bold">Recommendations</h3>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-1 w-60">
                            {rec}
                        </div>

                        <hr className="featurette-divider my-5" />
                    </div>
            </div>
        </>
    )


}
