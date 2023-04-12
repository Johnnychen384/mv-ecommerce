import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

type navProps = {
    logOut: () => void
}

export const Nav = ({logOut}: navProps) => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark py-3">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><i className="fab fa-shopify"></i></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/main">Home</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Category</a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/filter/clothes">Clothes</Link></li>
                                <li><Link className="dropdown-item" to="/filter/electronic">Electronics</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user"></i></a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/cart">Cart</Link></li>
                                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                <li><Link className="dropdown-item" to="/" onClick={logOut}>Logout</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>

    )
}