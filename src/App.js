// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import Product from './components/Product';
import Navbar from './components/Navbar';
import './css/App.css';
import HeroSlider from "./components/HeroSlider";
import AddProduct from './components/AddProduct';
import AdminPanel from "./components/AdminPanel";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {notify} from "./components/Notify";

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
        notify.success(`Ürün sepetinize eklendi!`);
        setProducts(updatedProducts);
        setCart([...cart, productToAdd]);
        setIsCartOpen(true);

    };

    const addNewProduct = (newProduct) => {
        // 1. Yeni ürüne benzersiz bir ID verelim (şimdiki zamanı kullanmak pratiktir)
        const productWithId = { ...newProduct, id: Date.now() };

        // 2. Mevcut listeye ekle
        const updatedList = [productWithId, ...products]; // En başa ekler

        // 3. State'i güncelle (Ekranda görünsün)
        setProducts(updatedList);

        // 4. LocalStorage'ı güncelle (Sayfa yenilenince gitmesin)
        localStorage.setItem('cerenAdenProducts', JSON.stringify(updatedList));

        notify.success(`Ürün başarıyla eklendi!`)
    };

    const deleteProduct = (idToDelete) => {
        // 1. Silinmek istenen hariç diğerlerini filtrele
        const updatedProducts = products.filter(product => product.id !== idToDelete);

        // 2. State'i güncelle
        setProducts(updatedProducts);

        // 3. LocalStorage'ı güncelle (Kalıcı olması için)
        localStorage.setItem('cerenAdenProducts', JSON.stringify(updatedProducts));

        // Opsiyonel: Bildirim göster
        // alert("Ürün silindi.");
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
                            <Route
                                path="/admin"
                                element={
                                    <AdminPanel
                                        products={products}          // Listeyi görmek için
                                        onAddProduct={addNewProduct} // Eklemek için
                                        onDeleteProduct={deleteProduct} // Silmek için
                                    />
                                }
                            />
                        </Routes>
                    )}
                </main>
            </div>

            <ToastContainer
                position="top-left"
                autoClose={2000} // 3 saniye sonra kapansın
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                limit={4}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Router>
    );
}

export default App;