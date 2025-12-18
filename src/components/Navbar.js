// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import "../css/Navbar.css"
import Cart from './Cart';
import cerenaden from '../assets/cerenaden.png'; // Logoyu buraya taşıdığımız için importu burada yapıyoruz
import { ShopContext } from '../context/ShopContext'; // Import et
import { useContext } from 'react';
import { Button } from "antd"
import { NavLink } from 'react-router-dom';

// App.js'ten gelen verileri (props) karşılıyoruz
const Navbar = () => {
    const { cart, toggleCart, isCartOpen, removeFromCart, theme, toggleTheme } = useContext(ShopContext);
    return (
        <>
        <header className="app-header">
            {/* SOL: Linkler */}
            <div className="nav-links">
                <NavLink to="/category/makeup" className={({isActive}) => isActive ? "active-link" : ""}>Makyaj</NavLink>
                <NavLink to="/category/skincare" className={({isActive}) => isActive ? "active-link" : ""}>Cilt Bakımı</NavLink>
                <NavLink to="/category/accessories" className={({isActive}) => isActive ? "active-link" : ""}>Aksesuar</NavLink>
            </div>

            {/* ORTA: Logo */}
            <Link to="/" className="logo-link">
                <span className="brand-name">CERENADEN</span>
                <span className="brand-suffix">SHOP</span>
            </Link>

            {/* SAĞ: Aksiyonlar (Admin + Tema) */}
            <div className="nav-actions">
                <Link to="/admin" className="admin-btn">
                    Admin
                </Link>

                <Button onClick={toggleTheme} className="theme-toggle-btn">
                    {theme === 'light' ? '☀️' : '🌙'}
                </Button>
            </div>
        </header>

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