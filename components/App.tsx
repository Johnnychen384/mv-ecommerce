import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Route, Routes} from 'react-router-dom'
import { Welcome } from "./Login"

export const App = () => {
    const [token, setToken] = useState<object | null>(null);
    const [user, setUser] = useState<object | null>(null);

    const loginToken = async (data : object) => {
        console.log(data);
        try{
            const res: AxiosResponse = await axios.post("http://localhost:8080/api/auth/authenticate", data);
            console.log(res);
            setToken(res);
           
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <main className='text-center w-100 mx-auto my-5'>
            <Routes>
                <Route path="/" element={<Welcome loginToken={loginToken}/>} />
            </Routes>
        </main>
    )
}