// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Navbar from './components/Navbar';
import './css/App.css';
import HeroSlider from "./components/HeroSlider";

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    // Veriyi API'den çek (Makeup API)
    useEffect(() => {
        // 1. ADIM: Önce LocalStorage'da veri var mı diye kontrol et
        const localData = localStorage.getItem('cerenAdenProducts');

        if (localData) {
            // VARSA: API'ye gitme, hafızadaki veriyi kullan
            console.log("Veri LocalStorage'dan çekildi.");
            setProducts(JSON.parse(localData)); // String'i tekrar JSON objesine çeviriyoruz
            setLoading(false);
        } else {
            // YOKSA: API'den çek
            console.log("Veri API'den çekiliyor...");
            fetch('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline')
                .then(res => res.json())
                .then(data => {
                    const adaptedData = data.map(item => ({
                        ...item,
                        price: Number(item.price) || 10
                    }));

                    // 2. ADIM: Çekilen veriyi LocalStorage'a kaydet
                    // Veriyi saklarken JSON.stringify ile "Metin" haline getirmeliyiz
                    localStorage.setItem('cerenAdenProducts', JSON.stringify(adaptedData));

                    setProducts(adaptedData);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Veri çekme hatası:", err);
                    setLoading(false);
                });
        }
    }, []);
    const addToCart = (productToAdd) => {

        const updatedProducts = products.map(product => {
            if (product.id === productToAdd.id) {
                // Stoktan 1 düş
                return { ...product, stock: product.stock - 1 };
            }
            return product;
        });

        setProducts(updatedProducts);
        setCart([...cart, productToAdd]);
        setIsCartOpen(true);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const removeFromCart = (indexToRemove) => {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);

        if (updatedCart.length === 0) {
            setIsCartOpen(false);
        }
    };

    return (
        <Router>
            <div className="App">
                <Navbar
                    cart={cart}
                    isCartOpen={isCartOpen}
                    toggleCart={toggleCart}
                    removeFromCart={removeFromCart}
                />

                <main className="app-main">
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                            <span>Makyaj ürünleri yükleniyor...</span>
                        </div>
                    ) : (
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <React.Fragment>
                                        <HeroSlider />
                                        <ProductList products={products} addToCart={addToCart} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                                    </React.Fragment>
                                }
                            />
                            <Route
                                path="/product/:id"
                                element={<Product addToCart={addToCart} />}
                            />
                        </Routes>
                    )}
                </main>
            </div>
        </Router>
    );
}

export default App;