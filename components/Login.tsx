import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

type loginProps = {
    loginToken: (data: object) => Promise<void>,
    getUser: (username: String) => Promise<void>,
    setUsername: React.Dispatch<React.SetStateAction<String | null>>;
}

export const Login = ({loginToken, getUser, setUsername}: loginProps) => {
    const [formData, setFormData] = useState({
		username: "",
        password: ""
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
        loginToken(formData);
        setUsername(formData.username);
        setFormData({
            username: "",
            password: ""
        });
        navigate('/main');
    }


    return (
        <>
            <main className="form-signin w-25 m-auto">
                <form onSubmit={handleSubmit}>
                    <h1 className="mb-3 fw-normal mb-5">Login Now</h1>

                    <div className="form-floating mb-2">
                      <input type="username" className="form-control" id="floatingInput" placeholder="Username" name="username" value={formData.username} onChange={handleInputChange} required/>
                      <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} required/>
                      <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <div className="mb-5">Dont have an account? <Link to="/register">Sign up here</Link></div> 

                </form>
            </main>
        </>
    )
}
