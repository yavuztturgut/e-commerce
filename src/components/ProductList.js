// src/ProductList.js
import React, { useState } from 'react'; // useState buraya alındı
import '../css/ProductList.css';
import { useNavigate } from 'react-router-dom';
import Cart from "./Cart";

function ProductList({ products, addToCart, searchTerm, setSearchTerm  }) {
    const navigate = useNavigate();

    // --- FİLTRELEME MANTIĞI ---
    const [selectedCategory, setSelectedCategory] = useState("Tümü");

    // 1. Ürünlerden benzersiz kategorileri çıkar
    // Set kullanarak aynı kategorilerin tekrar etmesini engelliyoruz
    const categories = ["Tümü", ...new Set(products.map(p => p.product_type))];

    // 2. Seçili kategoriye göre ürünleri süz
    const filteredProducts = products.filter(product => {
        // 1. Kategori Kriteri
        const categoryMatch = selectedCategory === "Tümü"
            ? true
            : product.product_type === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

    // İkisi de uyuyorsa göster
    return categoryMatch && searchMatch;
    });
    return (
        <div className="product-container">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Ürün ara... (Örn: Lipstick)"
                    value={searchTerm}
                    // Yazılan her harfte App.js'deki state'i güncelliyoruz
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <span className="search-icon">🔍</span>
            </div>
            {/* --- YENİ: FİLTRELEME BUTONLARI --- */}
            <div className="category-filter-bar">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {/* Alt tireleri boşlukla değiştirip baş harfleri büyütelim */}
                        {cat === "Tümü" ? cat : cat.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* --- ÜRÜN LİSTESİ --- */}
            <div className="product-grid">
                {/* DİKKAT: Artık 'products' değil 'filteredProducts' dönüyoruz */}
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => navigate(`/product/${product.id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="image-container">
                            <img
                                src={product.api_featured_image || product.image_link}
                                alt={product.name}
                                className="product-image"
                                onError={(e) => { e.target.src = "https://via.placeholder.com/300x300?text=No+Image" }}
                            />
                        </div>

                        <div className="product-info">
                            <h3 className="product-title">{product.name}</h3>
                            <p className="product-price">
                                {product.price_sign}{product.price}
                            </p>

                            <button
                                className="add-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                            >
                                Sepete Ekle
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Eğer filtre sonucunda ürün kalmadıysa mesaj göster */}
            {filteredProducts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '50px', color: '#999' }}>
                    Bu kategoride ürün bulunamadı. 🌸
                </div>
            )}
        </div>
    );
}

export default ProductList;