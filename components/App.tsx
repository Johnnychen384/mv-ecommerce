import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Route, Routes, useNavigate} from 'react-router-dom'
import { Login } from "./Login"
import { Register } from "./Register"
import { Nav } from "./Nav"
import { Main } from "./Main"
import { Filtered } from './Filtered'
import { productObject, tempObject, cartObject } from './interfaces'
import { Details } from "./Details"
import { Profile } from "./Profile"
import { Cart } from "./Cart"
import "../index.css"




export const App = () => {
    const [token, setToken] = useState<String | null>(null);
    const [username, setUsername] = useState<String | null>(null);
    const [user, setUser] = useState<object | null>(null);
    const [userCart, setUserCart] = useState<cartObject[]>([]);
    const [products, setProducts] = useState<productObject[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<productObject>({
        category: "",
        id: 0,
        name: "",
        price: 0,
        rating: 0,
        url: ""
    });

    const navigate = useNavigate();

    const loginToken = async (data : object) => {
        try{
            const res: AxiosResponse = await axios.post("http://localhost:8080/api/auth/authenticate", data);
            setToken(res.data.token);
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

    const getAllProducts = async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{
            const res: AxiosResponse = await axios.get(`http://localhost:8080/products/`, config);
            setProducts(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async (data: object) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{
            const res: AxiosResponse = await axios.put(`http://localhost:8080/api/user`, data, config);
            setUser(res.data);
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getUserCarts = async (currentUser: String) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{
            const res: AxiosResponse = await axios.get(`http://localhost:8080/cart/allUserCarts/${currentUser}`, config);
            setUserCart(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = async (data: tempObject) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{
            const res: AxiosResponse = await axios.post(`http://localhost:8080/cart/cart`, data, config);

            if(data.username){
                getUserCarts(data.username)
            }

            alert("Item added.")
            
        } catch (error) {
            console.log(error)
        }
    }

    const updateCart = async (data: tempObject) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{
            const res: AxiosResponse = await axios.put(`http://localhost:8080/cart/cart`, data, config);

            if(data.username){
                getUserCarts(data.username)
            }

            console.log(data)
            alert("Item added.")
            
        } catch (error) {
            console.log(error)
        }
    }

    const selectProduct = (product: productObject) => {
        setSelectedProduct(product);
        navigate("/details")
    }
    
    const logOut = () => {
        localStorage.removeItem("user");
        setToken(null);
        setUsername(null);
        setUser(null);
        navigate("/");
    }

    const clothesArray: productObject[] = products ? products.filter(item => item.category === "Clothing") : [];
    const electronicArray: productObject[] = products ? products.filter(item => item.category === "Electronic") : [];

    useEffect(() => {

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            let users = JSON.parse(storedUser);
            setToken(users.token)
            setUsername(users.username)
            getUser(users.username)
            getUserCarts(users.username)
            getAllProducts()
            navigate("/main")

        } else {
            if (username && token) {
                getUser(username);
                getUserCarts(username)
                getAllProducts();

                localStorage.setItem("user", JSON.stringify({
                    token: token,
                    username: username
                }));
            }
        }
        
    }, [username, token]);




    return (
        <main className='text-center w-100 mx-auto'>
            {username && <Nav logOut={logOut} />}
            <Routes>
                <Route path="/" element={<Login loginToken={loginToken} getUser={getUser} setUsername={setUsername}/>} />
                <Route path="/register" element={<Register registerToken={registerToken} getUser={getUser} setUsername={setUsername}/> }/>
                <Route path="/main" element={<Main clothesArray={clothesArray} electronicArray={electronicArray} selectProduct={selectProduct} addToCart={addToCart} username={username}/> } />
                <Route path="/filter/:category" element={<Filtered clothesArray={clothesArray} electronicArray={electronicArray} selectProduct={selectProduct} addToCart={addToCart} username={username}/>}/>
                <Route path='/details' element={<Details object={selectedProduct} addToCart={addToCart} username={username}/>} />
                <Route path='/profile' element={<Profile user={user} updateUser={updateUser}/>} />
                <Route path='/cart' element={<Cart userCart={userCart}/>} />
            </Routes>
        </main>
    )
}