// src/App.js
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Context Provider
import { ShopProvider } from './context/ShopContext';

// Bileşenler (Statik - Hemen lazım olanlar)
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';

// Sayfalar (Lazy - İhtiyaç anında yüklenecekler)
const ProductList = lazy(() => import('./components/ProductList'));
const Product = lazy(() => import('./components/Product'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const Favorites = lazy(() => import('./components/Favorites'));
const Checkout = lazy(() => import('./components/Checkout'));
const HeroSlider = lazy(() => import('./components/HeroSlider'));

import './css/App.css';

// QueryClient oluşturulur
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: true,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ShopProvider>
                <Router>
                    <div className="App">
                        <Navbar />

                        <main className="app-main">
                            <Suspense fallback={<Spinner fullPage={true} text="Sayfa yükleniyor..." />}>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <React.Fragment>
                                                <HeroSlider />
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
                            </Suspense>
                        </main>

                        <ToastContainer position="top-left" autoClose={2000} theme="light" />
                    </div>
                </Router>
            </ShopProvider>
        </QueryClientProvider>
    );
}

export default App;
