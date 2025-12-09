// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Navbar from './components/Navbar'; // YENİ: Navbar'ı dahil ettik
import './css/App.css';
import HeroSlider from "./components/HeroSlider";

// cerenaden.png ve Cart importlarını kaldırdık (Navbar'a taşıdık)

function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Veriyi API'den çek
    useEffect(() => {
        fetch('https://dummyjson.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch(err => {
                console.error("Veri çekme hatası:", err);
                setLoading(false);
            });
    }, []);

    const addToCart = (productToAdd) => {
        if (productToAdd.stock <= 0) return;

        const updatedProducts = products.map(product => {
            if (product.id === productToAdd.id) {
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
        // Tıklanan sıradaki (index) ürünü filtreleyerek yeni liste oluşturuyoruz
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);

        // Eğer sepet boşaldıysa sepeti kapatabiliriz (isteğe bağlı)
        if (updatedCart.length === 0) {
            setIsCartOpen(false);
        }
    };
    return (
        <Router>
            <div className="App">

                {/* ESKİ KODLAR YERİNE SADECE BU SATIR GELDİ */}
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
                            <span>Ürünler yükleniyor...</span>
                        </div>
                    ) : (
                        <Routes>
                            <Route
                                path="/"
                                element={
                                <React.Fragment>
                                    <HeroSlider />
                                    <ProductList products={products} addToCart={addToCart} />
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