import { Link } from 'react-router-dom';
import React, {useState} from "react"


export const Success = () => {

    return (
        <div className="container-fluid">
        <h3>Order Confirmation: d2Fd5HGF554HBFAS1</h3>
        <Link to="/main" className="btn btn-dark">Homepage</Link>
        </div>
    );
};
