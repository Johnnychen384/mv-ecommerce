import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

type loginProps = {
    registerToken: (data: object) => Promise<void>,
    getUser: (username: String) => Promise<void>,
    setUsername: React.Dispatch<React.SetStateAction<String | null>>;
}

export const Register = ({registerToken, getUser, setUsername}: loginProps) => {
    const [formData, setFormData] = useState({
        email: "",
		username: "",
        password: "",
        address: "",
        creditcard: ""
	});

    const navigate = useNavigate();

    const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

    const handleSubmit = async (e) => {
        e.preventDefault();
        registerToken(formData);
        setUsername(formData.username);
        setFormData({
            email: "",
            username: "",
            password: "",
            address: "",
            creditcard: ""
        });
        navigate('/main');
    }


    return (
        <>
            <main className="form-signin w-25 m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 className="mb-3 fw-normal mb-5">Sign up now</h1>

                    <div className="form-floating mb-2">
                      <input type="email" className="form-control" id="floatingEmail" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} required/>
                      <label htmlFor="floatingEmail">Email</label>
                    </div>

                    <div className="form-floating mb-2">
                      <input type="username" className="form-control" id="floatingUsername" placeholder="Username" name="username" value={formData.username} onChange={handleInputChange} required/>
                      <label htmlFor="floatingUsername">Username</label>
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

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
                    <div className="mb-5">Have an account? <Link to="/">Sign In here</Link></div> 

                </form>
            </main>
        </>
    )
}