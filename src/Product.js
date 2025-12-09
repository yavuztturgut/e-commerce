// src/Product.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductList.css'; // Genel buton stilleri (add-btn) buradan geliyor
import './Product.css';     // Yeni oluşturduğumuz özel stiller
import Spinner from "./Spinner";

function Product({ addToCart }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="loading-msg"><Spinner fullPage={true} text="Mağaza Yükleniyor..." /></div>;
    if (!product) return <div className="error-msg">Ürün bulunamadı.</div>;

    return (
        <div className="product-detail-container">
            {/* Geri Dön Butonu */}
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
                        src={product.thumbnail}
                        alt={product.title}
                        className="main-img"
                    />
                    <div className="thumbnails-container">
                        {product.images?.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`thumb-${i}`}
                                className="thumb-img"
                            />
                        ))}
                    </div>
                </div>

                {/* Sağ: Bilgi Alanı */}
                <div className="product-info-section">
                    <h1 className="detail-title">{product.title}</h1>
                    <p className="detail-category">Kategori: {product.category}</p>

                    <p className="detail-desc">{product.description}</p>

                    <div className="price-container">
                        <span className="current-price">${product.price}</span>
                        <span className="discount-tag">%{product.discountPercentage} İndirim</span>
                    </div>

                    {/* Stok durumuna göre renk değişimi için dinamik class kullanımı */}
                    <p className={`stock-text ${product.stock > 0 ? 'stock-available' : 'stock-empty'}`}>
                        {product.stock > 0 ? `Stokta: ${product.stock} adet` : "Tükendi"}
                    </p>

                    <button
                        onClick={() => addToCart(product)}
                        // Hem genel 'add-btn' sınıfını hem de bu sayfaya özel 'detail-add-btn' sınıfını kullanıyoruz
                        className="add-btn detail-add-btn"
                        disabled={product.stock === 0}
                    >
                        Sepete Ekle
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;