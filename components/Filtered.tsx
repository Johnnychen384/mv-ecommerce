import React from "react"
import { useParams } from 'react-router-dom'
import { productObject, tempObject } from './interfaces'
import { ClothesCard } from "./CardsComponents/ClothesCard"
import { ElectronicCard } from "./CardsComponents/ElectronicCard"

type mainProps = {
    clothesArray: productObject[],
    electronicArray: productObject[],
    selectProduct: (product: productObject) => void,
    addToCart: (data: tempObject) => Promise<void>,
    username: String | null
}

export const Filtered = ({clothesArray, electronicArray, selectProduct, addToCart, username}: mainProps) => {
    const clothesCards = clothesArray.map((item, indx) => <ClothesCard key={indx} clothesObject={item} selectProduct={selectProduct} addToCart={addToCart} username={username}/>)
    const electronicCards = electronicArray.map((item, indx) => <ElectronicCard key={indx} electronicObject={item} selectProduct={selectProduct} addToCart={addToCart} username={username}/>)
    const { category } = useParams();


    return (
        <>  
            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3 mt-1 d-flex justify-content-center">
                        {category === "clothes" ? clothesCards : electronicCards}
                    </div>
                </div>
            </div>  
        </>
    )
}