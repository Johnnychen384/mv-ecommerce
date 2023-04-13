import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { userObject } from "./interfaces"


export const Profile = ({user, updateUser}) => {
    const [formData, setFormData] = useState(user || {});


    const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data: userObject = {
            email: formData.email,
            username: formData.username,
            password: formData.password,
            address: formData.address,
            creditcard: formData.creditcard
        }

        updateUser(data);
        alert("Your changes has been saved.")
    }


    return (
        <>
            <main className="form-signin w-25 m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 className="mb-3 fw-normal mb-5">Your profile</h1>

                    <div className="form-floating mb-2">
                      <input type="email" className="form-control" id="floatingEmail" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required/>
                      <label htmlFor="floatingEmail">Email</label>
                    </div>

                    <div className="form-floating mb-3">
                      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required/>
                      <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-floating mb-2">
                      <input type="address" className="form-control" id="floatingAddress" placeholder="Address" name="address" value={formData.address} onChange={handleInputChange} required/>
                      <label htmlFor="floatingAddress">Address</label>
                    </div>

                    <div className="form-floating mb-2">
                      <input type="text" className="form-control" id="floatingCC" placeholder="CreditCard" name="creditcard" value={formData.creditcard} onChange={handleInputChange} required/>
                      <label htmlFor="floatingCC">CreditCard</label>
                    </div>

                    <div className="btn-group w-100">
                        <button type="button" className="btn btn-lg btn-dark"><Link className="text-decoration-none text-white" to="/main">Back</Link></button>
                        <button type="submit" className="btn btn-lg btn-dark">Save</button>
                    </div>

                </form>
            </main>
        </>
    )
}