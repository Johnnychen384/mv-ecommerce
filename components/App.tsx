import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Route, Routes, useNavigate} from 'react-router-dom'
import { Login } from "./Login"
import { Register } from "./Register"
import { Nav } from "./Nav"

export const App = () => {
    const [token, setToken] = useState<String | null>(null);
    const [username, setUsername] = useState<String | null>(null);
    const [user, setUser] = useState<object | null>(null);

    const navigate = useNavigate();

    const loginToken = async (data : object) => {
        try{
            const res: AxiosResponse = await axios.post("http://localhost:8080/api/auth/authenticate", data);
            setToken(res.data.token);
        } catch (error) {
            console.log(error)
        }
        
    }

    const getUser = async (currentUser: String) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{
            const res: AxiosResponse = await axios.get(`http://localhost:8080/api/user/${currentUser}`, config);
            setUser(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const registerToken = async (data: object) => {
        try{
            const res: AxiosResponse = await axios.post("http://localhost:8080/api/auth/register", data);
            setToken(res.data.token);
        } catch (error) {
            console.log(error)
        }
    }

    const logOut = () => {
        localStorage.removeItem("user");
        setToken(null);
        setUsername(null);
        setUser(null);
        navigate("/");
    }

    useEffect(() => {
        let user : {token: String, username: String};

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            user = JSON.parse(storedUser);
            setToken(user.token)
            setUsername(user.username)
            getUser(user.username)
            navigate("/main")

        } else {
            if (username && token) {
                getUser(username);

                user = {
                    token: token,
                    username: username
                };

                localStorage.setItem("user", JSON.stringify(user));
            }
        }
        
    }, [username, token]);




    return (
        <main className='text-center w-100 mx-auto'>
            {user && <Nav logOut={logOut} />}
            <Routes>
                <Route path="/" element={<Login loginToken={loginToken} getUser={getUser} setUsername={setUsername}/>} />
                <Route path="/register" element={<Register registerToken={registerToken} getUser={getUser} setUsername={setUsername}/>} />
            </Routes>
        </main>
    )
}