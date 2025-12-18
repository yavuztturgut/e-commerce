// src/components/ProductList.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import '../css/ProductList.css';

function ProductList() {
    const navigate = useNavigate();
    const { categoryName } = useParams(); // URL parametresi (makeup, skincare, accessories)
    const { products, addToCart, searchTerm, setSearchTerm, loading } = useContext(ShopContext);

    // --- STATE TANIMLARI ---
    const [selectedType, setSelectedType] = useState("Tümü");
    const [sortType, setSortType] = useState("default");

    // URL kategorisi değiştiğinde alt kategori filtresini sıfırla
    useEffect(() => {
        setSelectedType("Tümü");
    }, [categoryName]);

    if (loading) return <div className="loading-container"><div className="spinner"></div></div>;

    // 1. ADIM: URL'den gelen ANA KATEGORİYE göre filtrele (Makyaj, Cilt Bakımı vb.)
    const baseProducts = products.filter(product => {
        if (!categoryName) return true; // Ana sayfadaysak hepsini göster
        return product.category === categoryName;
    });

    // 2. ADIM: Mevcut ürünlerden benzersiz ALT TÜRLERİ (product_type) çıkar
    // Bu sayede "Makyaj" sayfasındayken sadece ruj, maskara gibi butonlar görünür.
    const subCategories = ["Tümü", ...new Set(baseProducts.map(p => p.product_type).filter(Boolean))];

    // 3. ADIM: ALT TÜR ve ARAMA terimine göre filtrele
    const filteredProducts = baseProducts.filter(product => {
        const typeMatch = selectedType === "Tümü"
            ? true
            : product.product_type === selectedType;

        const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());

        return typeMatch && searchMatch;
    });

    // 4. ADIM: SIRALAMA
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        const priceA = Number(a.price) || 0;
        const priceB = Number(b.price) || 0;
        const nameA = a.name ? a.name.toLowerCase() : "";
        const nameB = b.name ? b.name.toLowerCase() : "";

        if (sortType === 'price-asc') return priceA - priceB;
        if (sortType === 'price-desc') return priceB - priceA;
        if (sortType === 'name-asc') return nameA.localeCompare(nameB);
        if (sortType === 'name-desc') return nameB.localeCompare(nameA);
        return 0;
    });

    return (
        <div className="product-container">
            {/* --- ÜST PANEL: ARAMA ve SIRALAMA --- */}
            <div className="controls-header">
                <div className="search-wrapper">
                    <input
                        type="text"
                        placeholder="Ürün ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="search-icon">🔍</span>
                </div>

                <div className="sort-wrapper">
                    <select
                        value={sortType}
                        onChange={(e) => setSortType(e.target.value)}
                        className="sort-select"
                    >
                        <option value="default">Sıralama Seçiniz</option>
                        <option value="price-asc">Fiyat: Artan</option>
                        <option value="price-desc">Fiyat: Azalan</option>
                        <option value="name-asc">İsim: A-Z</option>
                        <option value="name-desc">İsim: Z-A</option>
                    </select>
                </div>
            </div>

            {/* --- DİNAMİK ALT KATEGORİ BUTONLARI --- */}
            <div className="category-filter-bar">
                {subCategories.map((type, index) => (
                    <button
                        key={index}
                        className={`filter-btn ${selectedType === type ? 'active' : ''}`}
                        onClick={() => setSelectedType(type)}
                    >
                        {type === "Tümü" ? type : type.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* --- ÜRÜN LİSTESİ --- */}
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
                                onError={(e) => { e.target.src = "https://via.placeholder.com/300x300?text=CerenAden" }}
                            />
                        </div>

                        <div className="product-info">
                            <h3 className="product-title">{product.name}</h3>
                            <p className="product-price">
                                ${Number(product.price).toFixed(2)}
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
                    <p>Farklı bir arama terimi veya alt kategori deneyebilirsiniz.</p>
                </div>
            )}
        </div>
    );
}

export default ProductList;