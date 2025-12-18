// src/components/CategoryFilter.js
import React from 'react';
import '../css/CategoryFilter.css'; // Birazdan oluşturacağız
import { ShopContext } from '../context/ShopContext'; // Import et
import { useContext } from 'react';

function CategoryFilter() {
    const  {products, selectedCategory, setSelectedCategory} = useContext(ShopContext);
    // 1. Ürünlerden benzersiz kategorileri (product_type) çıkarıyoruz
    const allCategories = [
        "Tümü",
        ...new Set(products.map(item => item.product_type))
    ];

    return (
        <div className="category-filter-container">
            {allCategories.map((cat, index) => (
                <button
                    key={index}
                    // Eğer kategori seçiliyse 'active' sınıfı ekle
                    className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                >
                    {/* API'den gelen veriler 'lipstick' şeklinde küçük harf, onları düzeltiyoruz */}
                    {cat === "Tümü" ? cat : cat.replace('_', ' ')}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;