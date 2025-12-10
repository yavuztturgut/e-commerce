// src/components/Product.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/ProductList.css';
import '../css/Product.css';
import Spinner from "./Spinner";

function Product({ addToCart }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 1. Adım: LocalStorage'dan veriyi string olarak çek
        const storedData = localStorage.getItem('cerenAdenProducts');

        if (storedData) {
            // 2. Adım: String veriyi tekrar Diziye (Array) çevir
            const products = JSON.parse(storedData);

            // 3. Adım: URL'deki ID ile eşleşen ürünü bul
            // Not: useParams'dan gelen id 'string'dir, verideki 'number' olabilir.
            // O yüzden Number(id) ile çeviriyoruz.
            const foundProduct = products.find(p => p.id === Number(id));
            if (foundProduct) {
                setProduct(foundProduct);


                //const timer = setTimeout(() => {
                  //  window.scrollTo({
                    //    top: 110, // Header boyu kadar aşağı (veya istediğin pixel)
                      //  behavior: "smooth",
                   // });
              //  }, 5);
            }
        }

        // İşlem bitti, yükleniyor durumunu kapat
        setLoading(false);

    }, [id]);

    if (loading) return <div className="loading-msg"><Spinner fullPage={true} text="Ürün getiriliyor..." /></div>;
    if (!product) return <div className="error-msg">Ürün bulunamadı.</div>;

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
                        // Makeup API'de resim 'api_featured_image' veya 'image_link' içindedir
                        src={product.api_featured_image || product.image_link}
                        alt={product.name}
                        className="main-img"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x400?text=No+Image" }}
                    />

                    {/* Makeup API'de galeri olmadığı için bu alanı sadeleştirdik veya renk seçeneklerini gösterebiliriz */}
                    {product.product_colors && product.product_colors.length > 0 && (
                        <div className="thumbnails-container">
                            {/* Renk seçeneklerini küçük kutular olarak gösterelim */}
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

                    {/* Kategori bazen null gelebilir, kontrol ediyoruz */}
                    <p className="detail-category">
                        Kategori: {product.category ? product.category.replace('_', ' ') : product.product_type}
                    </p>

                    <p className="detail-desc">
                        {/* Açıklama bazen HTML tagleri içerebilir, basitçe gösteriyoruz */}
                        {product.description}
                    </p>

                    <div className="price-container">
                        <span className="current-price">${product.price}</span>
                        {/* Makeup API'de indirim yüzdesi yok, o yüzden bu alanı kaldırdık veya statik bir yazı yazabilirsin */}
                    </div>

                    <button
                        onClick={() => addToCart(product)}
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