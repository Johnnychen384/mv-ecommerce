import React from "react"
import { Link, useNavigate} from 'react-router-dom'
import { productObject } from './interfaces'
import { ClothesCard } from "./CardsComponents/ClothesCard"
import { ElectronicCard } from "./CardsComponents/ElectronicCard"

type mainProps = {
    clothesArray: productObject[],
    electronicArray: productObject[],
    selectProduct: (product: productObject) => void
}


export const Main = ({clothesArray, electronicArray, selectProduct}: mainProps) => {

    const clothesCards = clothesArray.map((item, indx) => <ClothesCard key={indx} clothesObject={item} selectProduct={selectProduct}/>)
    const clothesCards3 = [clothesCards[0], clothesCards[1], clothesCards[2]]

    const electronicCards = electronicArray.map((item, indx) => <ElectronicCard key={indx} electronicObject={item} selectProduct={selectProduct}/>)
    const electronicCards3 = [electronicCards[0], electronicCards[1], electronicCards[2]]
    

    return (
        <main>
            <section className="py-4 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Lorem ipsum dolor sit amet elit.</h1>
                        <p className="lead text-body-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt quae maiores culpa vero et sed autem aliquam recusandae, quisquam, quod provident? Perspiciatis, ratione. Nobis fuga, eligendi nemo architecto officia quo.</p>
                        
                    </div>
                </div>
                <hr className="featurette-divider" />
            </section>

            <div className="album py-5 bg-body-tertiary">
                <div className="container">
                    <h3 className="fw-bold">Trending <Link to="/filter/trending" className="fs-6 text-decoration-none fw-light px-2">See more</Link></h3>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-1">
                        {clothesCards3}
                    </div>

                    <hr className="featurette-divider my-5" />

                    <h3 className="fw-bold">Electronics <Link to="/filter/electronics" className="fs-6 text-decoration-none fw-light px-2">See more</Link></h3>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-1">
                        {electronicCards3}
                    </div>

                    <hr className="featurette-divider my-5" />

                    <h3 className="fw-bold">Clothes <Link to="/filter/clothes" className="fs-6 text-decoration-none fw-light px-2">See more</Link></h3>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-1">
                        {clothesCards3}
                    </div>
                </div>
            </div>


            <hr className="featurette-divider my-4" />

            <footer className="container">
                <p className="float-end"><a href="#">Back to top</a></p>
                <p>&copy; 2017–2023 Company, Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
            </footer>
        </main>

    )
}