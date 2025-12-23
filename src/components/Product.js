// src/components/Product.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/ProductList.css';
import '../css/Product.css';
import Spinner from "./Spinner";
import { ShopContext } from '../context/ShopContext';

function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Context'ten fonksiyonları çekiyoruz
    const { addToCart, toggleFavorite, isFavorite } = useContext(ShopContext);

    // --- HATALI SATIR BURADAYDI, SİLDİK ---

    useEffect(() => {
        const storedData = localStorage.getItem('cerenAdenProducts');

        if (storedData) {
            const products = JSON.parse(storedData);
            const foundProduct = products.find(p => p.id === Number(id));

            if (foundProduct) {
                setProduct(foundProduct);
            }
        }
        setLoading(false);
    }, [id]);

    // Yükleme ve Ürün Yok kontrolleri (Early Return)
    if (loading) return <div className="loading-msg"><Spinner fullPage={true} text="Ürün getiriliyor..." /></div>;
    if (!product) return <div className="error-msg">Ürün bulunamadı.</div>;

    // --- DÜZELTME: isFav ARTIK BURADA ---
    // Kod buraya ulaştıysa 'product' kesinlikle vardır (null değildir).
    const isFav = isFavorite(product.id);

    return (
        <div className="product-detail-container">
            <button
                onClick={() => navigate(-1)}
                className="back-btn"
            >
                ← Geri Dön
            </button>

            <div className="product-detail-card">
                {/* Sol: Resim Alanı */}
                <div className="product-image-section">
                    <img
                        src={product.api_featured_image || product.image_link}
                        alt={product.name}
                        className="main-img"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=No+Image" }}
                    />

                    {product.product_colors && product.product_colors.length > 0 && (
                        <div className="thumbnails-container">
                            {product.product_colors.slice(0, 5).map((color, i) => (
                                <div
                                    key={i}
                                    className="thumb-img"
                                    style={{ backgroundColor: color.hex_value, width: '30px', height: '30px', borderRadius: '50%', cursor:'default' }}
                                    title={color.colour_name}
                                ></div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sağ: Bilgi Alanı */}
                <div className="product-info-section">
                    <h1 className="detail-title">{product.name}</h1>

                    <p className="detail-category">
                        Kategori: {product.product_type ? product.product_type.replace('_', ' ') : product.product_type}
                    </p>

                    <p className="detail-desc">
                        {product.description}
                    </p>

                    <div className="price-container">
                        <span className="current-price">${Number(product.price).toFixed(2)}</span>
                    </div>

                    <div className="product-actions">
                        <button
                            onClick={() => addToCart(product)}
                            className="add-btn detail-add-btn"
                            disabled={product.stock === 0}
                        >
                            Sepete Ekle
                        </button>

                        {/* KALP BUTONU */}
                        <button
                            className={`fav-btn ${isFav ? 'active' : ''}`}
                            onClick={() => toggleFavorite(product)}
                        >
                            {isFav ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;