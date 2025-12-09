// src/ProductList.js
import React from 'react';
import './ProductList.css'; // CSS dosyasını dahil et

function ProductList({ products, addToCart }) {

    return (
        <div className="product-container">
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">

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
                                onClick={() => addToCart(product)}
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