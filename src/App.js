// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from './components/Checkout';

// Context Provider
import { ShopProvider } from './context/ShopContext';

// Bileşenler
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Product from './components/Product';
import AdminPanel from "./components/AdminPanel";
import HeroSlider from "./components/HeroSlider";
import Favorites from "./components/Favorites";
import './css/App.css';

function App() {
    // BURADA ARTIK HİÇBİR STATE YOK! HEPSİ CONTEXT'TE.

    return (
        <ShopProvider>
            <Router>
                <div className="App">
                    {/* Navbar artık prop almıyor */}
                    <Navbar />

                    <main className="app-main">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <React.Fragment>
                                        <HeroSlider />
                                        {/* ProductList artık prop almıyor */}
                                        <ProductList />
                                    </React.Fragment>
                                }
                            />
                            <Route path="/category/:categoryName" element={<ProductList />} />
                            <Route path="/product/:id" element={<Product />} />
                            <Route path="/admin" element={<AdminPanel />} />
                            <Route path="/favorites" element={<Favorites />} />
                            <Route path="/checkout" element={<Checkout />} />
                        </Routes>
                    </main>

                    <ToastContainer position="top-left" autoClose={2000} theme="light" />
                </div>
            </Router>
        </ShopProvider>
    );
}

export default App;