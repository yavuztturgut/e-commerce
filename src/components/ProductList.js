// src/ProductList.js
import React from 'react';
import '../css/ProductList.css'; // CSS dosyasını dahil et
import { useNavigate } from 'react-router-dom';

function ProductList({ products, addToCart }) {
    const navigate = useNavigate();
    return (
        <div className="product-container">
            <div className="product-grid">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="product-card"
                        // Karta tıklayınca detay sayfasına git
                        onClick={() => navigate(`/product/${product.id}`)}
                        style={{ cursor: 'pointer' }} // Tıklanabilir olduğunu göster
                    >

                        {/* Resim Alanı */}
                        <div className="image-container">
                            <img
                                src={product.image_link}
                                alt={product.name}
                                className="product-image"
                            />
                        </div>

                        {/* İçerik Alanı */}
                        <div className="product-info">
                            <h3 className="product-title">{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                            <button
                                className="add-btn"
                                onClick={(e) => {
                                    e.stopPropagation(); // ÖNEMLİ: Tıklamanın karta geçmesini engeller
                                    addToCart(product);
                                }}
                            >
                                {'Sepete Ekle'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;