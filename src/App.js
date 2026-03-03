// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Context Provider
import { ShopProvider } from './context/ShopContext';

// Bileşenler
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Product from './components/Product';
import AdminPanel from "./components/AdminPanel";
import HeroSlider from "./components/HeroSlider";
import Favorites from "./components/Favorites";
import Checkout from "./components/Checkout";
import './css/App.css';

// 1. QueryClient oluşturulur (Tüm sorguların merkezi)
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 dakika boyunca veriyi taze kabul et
            refetchOnWindowFocus: true, // Sekmeye dönünce güncelle
        },
    },
});

function App() {
    return (
        // 2. QueryClientProvider ile sarmalanır
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    );
}

export default App;
