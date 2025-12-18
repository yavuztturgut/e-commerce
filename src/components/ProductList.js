// src/ProductList.js
import React, { useState } from 'react';
import '../css/ProductList.css';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext'; // Import et
import { useContext } from 'react';

function ProductList() {
    const navigate = useNavigate();
    const { products, addToCart, searchTerm, setSearchTerm, loading } = useContext(ShopContext);
    // --- STATE TANIMLARI ---
    const [selectedCategory, setSelectedCategory] = useState("Tümü");
    const [sortType, setSortType] = useState("default"); // YENİ: Sıralama durumu

    // 1. Kategorileri Çıkar
    const categories = ["Tümü", ...new Set(products.map(p => p.product_type))];

    // 2. FİLTRELEME (Kategori + Arama)
    const filteredProducts = products.filter(product => {
        // A. Kategoriye göre
        const categoryMatch = selectedCategory === "Tümü"
            ? true
            : product.product_type === selectedCategory;

        // B. Arama kelimesine göre
        const term = searchTerm || "";
        const productName = product.name || "";
        const searchMatch = productName.toLowerCase().includes(term.toLowerCase());

        return categoryMatch && searchMatch;
    });

    // 3. SIRALAMA (Filtrelenmiş listeyi sırala)
    // [...filteredProducts] diyerek orijinal diziyi bozmadan kopyasını alıyoruz
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        // Fiyatları sayıya çevirerek karşılaştır (Güvenlik önlemi)
        const priceA = Number(a.price) || 0;
        const priceB = Number(b.price) || 0;
        const nameA = a.name ? a.name.toLowerCase() : "";
        const nameB = b.name ? b.name.toLowerCase() : "";

        if (sortType === 'price-asc') {
            return priceA - priceB; // Fiyat Artan
        }
        if (sortType === 'price-desc') {
            return priceB - priceA; // Fiyat Azalan
        }
        if (sortType === 'name-asc') {
            return nameA.localeCompare(nameB); // A-Z
        }
        if (sortType === 'name-desc') {
            return nameB.localeCompare(nameA); // Z-A
        }
        return 0; // Varsayılan
    });

    return (
        <div className="product-container">
            <div>
            {/* --- ÜST PANEL: ARAMA ve SIRALAMA --- */}
            <div className="controls-header">
                {/* Arama Kutusu */}
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Ürün ara... (Örn: Face Studio)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="search-icon">🔍</span>
                </div>

                {/* YENİ: Sıralama Kutusu */}
                <div className="sort-wrapper">
                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="sort-select"
                    >
                        <option value="default">Sıralama Seçiniz</option>
                        <option value="price-asc">Fiyat: Artan (Ucuz ➝ Pahalı)</option>
                        <option value="price-desc">Fiyat: Azalan (Pahalı ➝ Ucuz)</option>
                        <option value="name-asc">İsim: A'dan Z'ye</option>
                        <option value="name-desc">İsim: Z'den A'ya</option>
                    </select>
                </div>
            </div>

            {/* --- KATEGORİ BUTONLARI --- */}
            <div className="category-filter-bar">
                {categories.map((cat, index) => (
                    <button
                        key={index}
                        className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat === "Tümü" ? cat : cat.replace('_', ' ')}
                    </button>
                ))}
            </div>
        </div>
            {/* --- ÜRÜN LİSTESİ (Sıralanmış listeyi kullanıyoruz) --- */}
            <div className="product-grid">
                {sortedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => navigate(`/product/${product.id}`)}
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
                                {product.price_sign}{Number(product.price).toFixed(2)}
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

            {/* --- SONUÇ YOK MESAJI --- */}
            {sortedProducts.length === 0 && (
                <div className="no-result">
                    <h3>Sonuç Bulunamadı 😔</h3>
                    <p>Farklı bir arama terimi veya kategori deneyebilirsiniz.</p>
                </div>
            )}
        </div>
    );
}

export default ProductList;