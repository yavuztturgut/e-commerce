// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Cart from './Cart';
import cerenaden from '../assets/cerenaden.png'; // Logoyu buraya taşıdığımız için importu burada yapıyoruz

// App.js'ten gelen verileri (props) karşılıyoruz
const Navbar = ({ cart, isCartOpen, toggleCart, removeFromCart }) => {
    return (
        <>
            {/* Header Alanı */}
            <header className="app-header">
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