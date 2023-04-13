import React, {useEffect, useState} from "react"
import { productObject } from './interfaces'
import { OneStar } from "./StarsComponents/OneStar"
import { TwoStar } from "./StarsComponents/TwoStar"
import { ThreeStar } from "./StarsComponents/ThreeStar"
import { FourStar } from "./StarsComponents/FourStar"
import { FiveStar } from "./StarsComponents/FiveStar"
import { tempObject } from "./interfaces"
import { useNavigate } from 'react-router-dom'


type detailProps = {
    object: productObject,
    addToCart: (data: tempObject) => Promise<void>,
    username: String | null
}

export const Details = ({ object, addToCart, username = "placeholder"}: detailProps) => {
    const [star, setStar] = useState<() => JSX.Element | null>(() => null);
    const navigate = useNavigate();

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

                        <button className="btn btn-dark btn-lg w-100 mt-5" onClick={() =>addToCart({username: username, name: object.name, quantity: 1})}><i className="fa fa-shopping-bag"></i> Add to Cart</button>
                        <button className="btn btn-dark btn-lg w-100 mt-1" onClick={() => navigate("/cart")}>Check out</button>
                    </div>
                </div>
            </div>
        </>
    )
}