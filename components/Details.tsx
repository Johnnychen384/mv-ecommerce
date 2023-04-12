import React from "react"
import { productObject } from './interfaces'

type detailProps = {
    object: productObject
}

export const Details = ({ object }: detailProps) => {
    return (
        <>
            <div className="card clothes-card m-1">
                <form>
                    <img src={`${object.url}`} className="card-img-top clothing-img" />
                    <div className="card-body">
                        <h4 className="card-title"><strong>{object.name}</strong></h4>
                        <h5 className="card-text" >{object.price}</h5>
                        <div className="d-inline-block">
                            
                        </div>
                    </div>           
                </form>
            </div>
        </>
    )
}