import React, {useState, useEffect} from 'react';
// import {Products, Navbar} from './components'
import {commerce } from './lib/commence'
import Products from './components/Products/Products'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'
import Checkout from './components/CheckoutForm/Checkout/Checkout'
import { BrowserRouter as Router, Switch} from 'react-router-dom'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart ] = useState({})

    const fetchProducts = async () => {
        const {data} = await commerce.products.list();
        
        setProducts(data)
    }


    const fetchCart = async () => { 
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quanitity) => {
        const {cart}= await commerce.cart.add(productId, quanitity);

        setCart(cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity})

        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const {cart} = await commerce.cart.remove(productId);

        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();

        setCart(cart)
    } 

    useEffect(()=>{
        fetchProducts();
        fetchCart()
    }, [])


    console.log(cart)

    


    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items}/>
                <Switch>
                    <Router exact path="/">
                        <Products products={products} onAddToCart={handleAddToCart}/>
                    </Router>
                    <Router exact path="/cart">
                        <Cart 
                            cart={cart}
                            handleUpdateCartQty={handleUpdateCartQty}
                            handleRemoveFromCart={handleRemoveFromCart}
                            handleEmptyCart={handleEmptyCart}
                        />
                    </Router>
                    <Router exact path="/checkout">
                        <Checkout cart={cart} />
                    </Router>
                </Switch>
            </div>
        </Router>
       
    )
}

export default App
