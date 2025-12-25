// src/components/Navbar.js
import React, { useState, useContext } from 'react'; // useState eklendi
import { Link, NavLink } from 'react-router-dom';
import "../css/Navbar.css";
import Cart from './Cart';
import { ShopContext } from '../context/ShopContext';
import { Button } from "antd";

const Navbar = () => {
    const { cart, toggleCart, isCartOpen, removeFromCart, theme, toggleTheme, favorites } = useContext(ShopContext);

    // Burger menü durumu (Açık/Kapalı)
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Menüyü açıp kapatan fonksiyon
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Linke tıklayınca menüyü kapatmak için (Mobilde önemli)
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="app-header">

                {/* 1. LOGO (Artık Solda veya Ortada Sabit) */}
                <Link to="/" className="logo-link" onClick={closeMenu}>
                    <span className="brand-name">CERENADEN</span>
                    <span className="brand-suffix">SHOP</span>
                </Link>

                {/* 2. BURGER BUTONU (Sadece Mobilde Görünür) */}
                <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                {/* 3. MENÜ İÇERİĞİ (Linkler + Butonlar) */}
                {/* Mobilde 'nav-menu active' sınıfını alarak açılır */}
                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>

                    {/* Linkler */}
                    <div className="nav-links">
                        <NavLink to="/category/makeup" onClick={closeMenu} className={({isActive}) => isActive ? "active-link" : ""}>Makyaj</NavLink>
                        <NavLink to="/category/skincare" onClick={closeMenu} className={({isActive}) => isActive ? "active-link" : ""}>Cilt Bakımı</NavLink>
                        <NavLink to="/category/accessories" onClick={closeMenu} className={({isActive}) => isActive ? "active-link" : ""}>Aksesuar</NavLink>
                    </div>

                    {/* Aksiyonlar (Admin, Tema, Favori) */}
                    <div className="nav-actions">
                        <Link to="/favorites" className="fav-link-btn" onClick={closeMenu}>
                            ❤️ <span className="fav-count">({favorites.length})</span>
                        </Link>

                        <Link to="/admin" className="admin-btn" onClick={closeMenu}>
                            Admin
                        </Link>

                        <Button onClick={() => { toggleTheme(); closeMenu(); }} className="theme-toggle-btn">
                            {theme === 'light' ? '☀️' : '🌙'}
                        </Button>
                    </div>
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