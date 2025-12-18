// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../css/Navbar.css"
import Cart from './Cart';
import cerenaden from '../assets/cerenaden.png'; // Logoyu buraya taşıdığımız için importu burada yapıyoruz
import { ShopContext } from '../context/ShopContext'; // Import et
import { useContext } from 'react';
import { Button } from "antd"

// App.js'ten gelen verileri (props) karşılıyoruz
const Navbar = () => {
    const { cart, toggleCart, isCartOpen, removeFromCart, theme, toggleTheme } = useContext(ShopContext);
    return (
        <>

            {/* Header Alanı */}
            <header className="app-header">
                <Button onClick={toggleTheme}>
                    {theme === 'light' ? '☀️' : '🌙'}
                </Button>
                <img src={cerenaden} className="App-logo" alt="logo" />


            </header>



            {/* Sepet Bileşeni */}
            <Cart
                cartItems={cart}
                isOpen={isCartOpen}
                toggleCart={toggleCart}
                removeFromCart={removeFromCart}
            />
        </>
    );
};

export default Navbar;