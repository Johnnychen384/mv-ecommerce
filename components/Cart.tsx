import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { CartItem } from './CartItem'
import { cartObject } from './interfaces'


type cartProp = {
    userCart: cartObject[]
}

export const Cart = ({ userCart }: cartProp) => {
    const [subTotal, setSubTotal] = useState<number>(0)
    const [tax, setTax] = useState<number>(0)
    const [cart, setCart] = useState<cartObject[]>(userCart)
    

    const getTotal = (userCart: cartObject[]) => {
        let total = 0
        
        userCart.forEach(obj => total += obj.total)
        
        setSubTotal(Number(total))
        setTax((Number(total) + 12) * 0.0625)
    }

    const cartItemsArray = userCart.map((element, indx) => <CartItem key={indx} item={element}/>)

    useEffect(() => {
        getTotal(cart)
    }, [cart])

    return (
        <>
            <h1 className="mx-auto text-center my-5">Your cart</h1>
            <div className="container-fluid d-flex justify-content-center">
                <div className="flex-column flex-grow-1 d-inline-block">
                    {cartItemsArray}
                </div>


                <div className="flex-column flex-grow-1 d-flex total-card m-5 border-0">
                    <div className="card p-5 d-flex flex-column align-items-start">
                        <h3 className="my-5">Order Summary</h3>
                        <h6 className="my-3">Total Items: {userCart.length}</h6>
                        <h6 className="my-3">Shipping: $12.00</h6>
                        <h6 className="my-3">Subtotal: ${subTotal}</h6>
                        <h6 className="my-3">Total Tax: ${tax.toFixed(2)}</h6>
                        <h6 className="my-5">Order Total: ${(subTotal + tax).toFixed(2)} </h6>
                        <button type="submit" className="btn btn-info my-3 px-5">Checkout</button>
                        
                    </div>
                </div>
            </div>

        </>
    )
}