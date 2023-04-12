import React, {useEffect, useState} from "react"
import { productObject } from './interfaces'
import { OneStar } from "./OneStar"
import { TwoStar } from "./TwoStar"
import { ThreeStar } from "./ThreeStar"
import { FourStar } from "./FourStar"
import { FiveStar } from "./FiveStar"

type detailProps = {
    object: productObject
}

export const Details = ({ object }: detailProps) => {
    const [star, setStar] = useState<() => JSX.Element | null>(() => null);

    const setStarRating = (rating: number): (() => JSX.Element | null) => {
        switch (rating) {
            case 1.0:
                return () => <OneStar />;
            case 2.0:
                return () => <TwoStar />;
            case 3.0:
                return () => <ThreeStar />;
            case 4.0:
                    return () => <FourStar />;
            case 5.0:
                return () => <FiveStar />;
            default:
                return () => null;
        }
    };

    const randomNumber = () => {
        return Math.floor(Math.random() * 100) + 1;
    }

    useEffect(() => {
        setStar(setStarRating(object.rating))
    }, [])

    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-4">
                        <img src={`${object.url}`} alt="Product Image" className="img-fluid"/>
                    </div>
                    <div className="col-md-4">
                        <img src={`${object.url}`} alt="Product Image" className="img-fluid"/>
                    </div>
                    <div className="col-md-4 d-flex flex-column align-items-start">
                        <h2 className="mb-4 mt-2">{object.name}</h2>
                        <p className="text-start">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus pariatur praesentium amet, Non, aspernatur.</p>
                        <p>Price: ${object.price}</p>
                        <p>In stock: {randomNumber()}</p>
                        <div className="row">
                            
                            <div className="col">
                                Reviews:
                                <>
                                    {star}
                                </>

                            </div>
                        </div>

                        <button className="btn btn-dark btn-lg w-100 mt-5"><i className="fa fa-shopping-bag"></i> Add to Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}