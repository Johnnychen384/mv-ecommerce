import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { CartItem } from './CartItem'
import { cartObject, tempObject } from './interfaces'


type cartProp = {
    userCart: cartObject[],
    deleteCart: (data: tempObject) => Promise<void>,
    username: any,
    updateCart: (data: tempObject) => Promise<void>,
    getUserCarts: (currentUser: String) => Promise<void>,
    subTotal: number,
    tax: number,
    getTotal: () => void,
    setItemsForRec: () => void
}

export const Cart = ({ userCart, deleteCart, username, updateCart, getUserCarts, subTotal, tax, getTotal, setItemsForRec }: cartProp) => {
    const [cart, setCart] = useState<cartObject[]>(userCart)
    
    const navigate = useNavigate();
    
    const cartItemsArray = userCart.map((element, indx) => <CartItem key={indx} item={element} deleteCart={deleteCart} username={username} updateCart={updateCart} getTotal={getTotal}/>)


    return (
        <>
            <h1 className="mx-auto text-center my-5">Your cart</h1>
            <div className="container-fluid d-flex justify-content-center">
               { userCart.length > 0 ? 
               <>
                <div className="flex-column flex-grow-1 d-inline-block">
                    {cartItemsArray}
                </div>


                <div className="flex-column flex-grow-1 d-flex total-card m-5 border-0">
                    <div className="card p-5 d-flex flex-column align-items-start">
                        <h3 className="my-5">Order Summary</h3>
                        <h6 className="my-3">Total Items: {userCart.length}</h6>
                        <h6 className="my-3">Shipping: $12.00</h6>
                        <h6 className="my-3">Subtotal: ${subTotal.toFixed(2)}</h6>
                        <h6 className="my-3">Total Tax: ${tax.toFixed(2)}</h6>
                        <h6 className="my-5">Order Total: ${(subTotal + tax).toFixed(2)} </h6>
                        <button className="btn btn-info my-3 px-5" onClick={() => {
                            setItemsForRec()
                            navigate("/confirmation")
                            
                        }}>Checkout</button>
                        
                    </div>
                </div>
               </> :
                    <h1>Empty</h1>
                }
            </div>

        </>
    )
}