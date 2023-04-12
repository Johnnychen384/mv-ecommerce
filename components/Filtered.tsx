import React from "react"
import { useParams } from 'react-router-dom'
import { productObject } from './interfaces'
import { ClothesCard } from "./ClothesCard"
import { ElectronicCard } from "./ElectronicCard"

type mainProps = {
    clothesArray: productObject[],
    electronicArray: productObject[]
}

export const Filtered = ({clothesArray, electronicArray}: mainProps) => {
    const clothesCards = clothesArray.map(item => <ClothesCard clothesObject={item}/>)
    const electronicCards = electronicArray.map(item => <ElectronicCard electronicObject={item}/>)
    const { category } = useParams();


    return (
        <>  
            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-3 mt-1">
                        {category === "clothes" ? clothesCards : electronicCards}
                    </div>
                </div>
            </div>  
        </>
    )
}