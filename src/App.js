// src/App.js
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';
import './App.css'; // Yeni CSS dosyamızı dahil ediyoruz
import cerenaden from './cerenaden.png';

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

    // --- SEPETE EKLEME VE STOK DÜŞME MANTIĞI ---
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

    return (
        <div className="App">
            {/* Header - Sticky ve Gölgeli */}
            <header className="app-header">
              <img src={cerenaden} className="App-logo" alt="logo" />
            </header>

            {/* Sepet Bileşeni */}
            <Cart
                cartItems={cart}
                isOpen={isCartOpen}
                toggleCart={toggleCart}
            />

            {/* Ana İçerik */}
            <main className="app-main">
                {loading ? (
                    // Profesyonel Loading Ekranı
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <span>Ürünler yükleniyor...</span>
                    </div>
                ) : (
                    <ProductList products={products} addToCart={addToCart} />
                )}
            </main>
        </div>
    );
}

export default App;