import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios'
import { Route, Routes, useNavigate} from 'react-router-dom'
import { Login } from "./Login"
import { Register } from "./Register"
import { Nav } from "./Nav"
import { Main } from "./Main"
import { Filtered } from './Filtered'
import { productObject, tempObject, cartObject, soldObject } from './interfaces'
import { Details } from "./Details"
import { Profile } from "./Profile"
import { Cart } from "./Cart"
import { Confirmation } from './Confirmation'
import { Success } from "./Success"
import { ClothesCard } from "./CardsComponents/ClothesCard"
import { ElectronicCard } from "./CardsComponents/ElectronicCard"
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
    const [subTotal, setSubTotal] = useState<number>(0)
    const [tax, setTax] = useState<number>(0)
    const [clothArray, setClothArray] = useState<productObject[]>([])
    const [electronArray, setElectronArray] = useState<productObject[]>([])
    const [rec, setRec] = useState<JSX.Element[]>([])
    const [sold, setSold] = useState<soldObject[]>([])


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
            getTotal()
            
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCart = async (data: tempObject) => {
        const config = {
            params: {
                username: data.username,
                name: data.name
            },
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{
            const res: AxiosResponse = await axios.delete(`http://localhost:8080/cart/cart`,  config);

            if(data.username){
                getUserCarts(data.username)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const deleteAllCart = async (username: String) => {
        const config = {
            params: {
                username: username
            },
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{
            const res: AxiosResponse = await axios.delete(`http://localhost:8080/cart/allCarts`,  config);

            if(username){
                getUserCarts(username)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const getAllSold = async () => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{
            const res: AxiosResponse = await axios.get(`http://localhost:8080/sold/sold`, config);
            setSold(res.data);
        } catch (error) {
            console.log(error)
        }
    }

    const createSold = async (data: tempObject) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{
            const res: AxiosResponse = await axios.post(`http://localhost:8080/sold/sold`, data, config);
            getAllSold()
            
        } catch (error) {
            console.log(error)
        }
    }

    const updateSold = async (data: tempObject) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        
        try{
            const res: AxiosResponse = await axios.put(`http://localhost:8080/sold/sold`, data, config);
            getAllSold()
            
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

    const getTotal = () => {
        let total = 0
        
        userCart.forEach(obj => total += obj.total)
        
        setSubTotal(Number(total))
        setTax((Number(total) + 12) * 0.0625)
    }

    const clothesArray: productObject[] = products ? products.filter(item => item.category === "Clothing") : [];
    const electronicArray: productObject[] = products ? products.filter(item => item.category === "Electronic") : [];
    const trendingArray = sold.map((obj, indx) => {
        if(obj.product.category === "Clothing") {
            return <ClothesCard key={indx} clothesObject={obj.product} selectProduct={selectProduct} addToCart={addToCart} username={username}/>
        } else {
            return <ElectronicCard key={indx} electronicObject={obj.product} selectProduct={selectProduct} addToCart={addToCart} username={username}/>
        }
    })
    

    const setItemsForRec = () => {
        const cArray = userCart.filter(obj => obj.product.category === "Clothing")
        const eArray = userCart.filter(obj => obj.product.category === "Electronic")

        const randomNumber = (array) => {
            return Math.floor(Math.random() * array.length)
        }

        if(cArray.length > 0 && eArray.length > 0){
            setClothArray([clothesArray[randomNumber(clothArray)], clothesArray[randomNumber(clothArray)], clothesArray[randomNumber(clothArray)]])
            setElectronArray([electronicArray[randomNumber(electronicArray)], electronicArray[randomNumber(electronicArray)], electronicArray[randomNumber(electronicArray)]])

            const clothesCards = clothArray.map((item, indx) => <ClothesCard key={indx} clothesObject={item} selectProduct={selectProduct} addToCart={addToCart} username={username}/>)
            const electronicCards = electronArray.map((item, indx) => <ElectronicCard key={indx} electronicObject={item} selectProduct={selectProduct} addToCart={addToCart} username={username}/>)

            setRec([...clothesCards, ...electronicCards])
            console.log("Both")

        } else if (cArray.length < 1) {
            setElectronArray([electronicArray[randomNumber(electronicArray)], electronicArray[randomNumber(electronicArray)], electronicArray[randomNumber(electronicArray)]])
            const electronicCards = electronArray.map((item, indx) => <ElectronicCard key={indx} electronicObject={item} selectProduct={selectProduct} addToCart={addToCart} username={username}/>)
            setRec(electronicCards)
            console.log("Electronics")
        } else if (eArray.length < 1){
            setClothArray([clothesArray[randomNumber(clothesArray)], clothesArray[randomNumber(clothesArray)], clothesArray[randomNumber(clothesArray)]])
            const clothesCards = clothArray.map((item, indx) => <ClothesCard key={indx} clothesObject={item} selectProduct={selectProduct} addToCart={addToCart} username={username}/>)
            setRec(clothesCards)
            console.log("Clothes")
        }

    }

    useEffect(() => {

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            let users = JSON.parse(storedUser);
            setToken(users.token)
            setUsername(users.username)
            getUser(users.username)
            getUserCarts(users.username)
            getAllProducts()
            getAllSold()
            navigate("/main")

        } else {
            if (username && token) {
                getUser(username);
                getUserCarts(username)
                getAllProducts();
                getAllSold;

                localStorage.setItem("user", JSON.stringify({
                    token: token,
                    username: username
                }));
            }
        }
        
    }, [username, token]);



    useEffect(() => {
        getTotal()
        setItemsForRec()
        getAllSold()
    }, [userCart])


    return (
        <main className='text-center w-100 mx-auto'>
            {username && <Nav logOut={logOut} />}
            <Routes>
                <Route path="/" element={<Login loginToken={loginToken} getUser={getUser} setUsername={setUsername}/>} />
                <Route path="/register" element={<Register registerToken={registerToken} getUser={getUser} setUsername={setUsername}/> }/>
                <Route path="/main" element={<Main clothesArray={clothesArray} electronicArray={electronicArray} selectProduct={selectProduct} addToCart={addToCart} username={username} trendingArray={trendingArray}/> } />
                <Route path="/filter/:category" element={<Filtered clothesArray={clothesArray} electronicArray={electronicArray} selectProduct={selectProduct} addToCart={addToCart} username={username} />}/>
                <Route path='/details' element={<Details object={selectedProduct} addToCart={addToCart} username={username}/>} />
                <Route path='/profile' element={<Profile user={user} updateUser={updateUser}/>} />
                <Route path='/cart' element={<Cart userCart={userCart} deleteCart={deleteCart} username={username} updateCart={updateCart} getUserCarts={getUserCarts} subTotal={subTotal} tax={tax} getTotal={getTotal} setItemsForRec={setItemsForRec}/>} />
                <Route path='/confirmation' element={<Confirmation  rec={rec} user={user} subTotal={subTotal} tax={tax} deleteAllCart={deleteAllCart} userCart={userCart} sold={sold} createSold={createSold} updateSold={updateSold}/>} />
                <Route path='/success' element={<Success/>} />
            </Routes>
        </main>
    )
}