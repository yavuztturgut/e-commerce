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
                                src={product.thumbnail}
                                alt={product.title}
                                className="product-image"
                            />
                        </div>

                        {/* İçerik Alanı */}
                        <div className="product-info">
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-price">${product.price}</p>

                            <p className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                                {product.stock > 0 ? `Stok: ${product.stock}` : "Tükendi"}
                            </p>

                            <button
                                className="add-btn"
                                onClick={(e) => {
                                    e.stopPropagation(); // ÖNEMLİ: Tıklamanın karta geçmesini engeller
                                    addToCart(product);
                                }}
                                disabled={product.stock === 0}
                            >
                                {product.stock > 0 ? 'Sepete Ekle' : 'Stok Yok'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;