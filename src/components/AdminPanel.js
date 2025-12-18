// src/components/AdminPanel.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminPanel.css';
import {notify} from "./Notify"; // CSS dosya adını da değiştirelim
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

function AdminPanel() {
    const navigate = useNavigate();
    const { products, addNewProduct, deleteProduct } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        name: '', price: null, product_type: 'lipstick', description: '', image_link: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price) return notify.error(`Lütfen isim ve fiyat alanlarını doldurun.`);
        const productToSend = {
            ...formData,
            price: parseFloat(formData.price) // Ondalıklı sayı desteği için parseFloat
        };
        addNewProduct(productToSend);

        // Formu temizle
        setFormData({ name: '', price: null, product_type: 'lipstick', description: '', image_link: '' });
    };

    // Silme işleminden önce onay alalım
    const handleDeleteClick = (id) => {
        deleteProduct(id);
    };

    return (
        <div className="admin-container">
            <h1 className="admin-title">Yönetim Paneli</h1>

            <div className="admin-content">
                {/* SOL TARAF: ÜRÜN EKLEME FORMU */}
                <div className="admin-section form-section">
                    <h2>✨ Yeni Ürün Ekle</h2>
                    <form onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Ürün Adı" value={formData.name} onChange={handleChange} />
                        <div className="row">
                            <input type="number" name="price" placeholder="Fiyat" value={formData.price} onChange={handleChange} />
                            <select name="product_type" value={formData.product_type} onChange={handleChange}>
                                <option value="lipstick">Ruj</option>
                                <option value="mascara">Maskara</option>
                                <option value="eyeliner">Eyeliner</option>
                                <option value="foundation">Fondöten</option>
                                <option value="moisturizer">Nemlendirici</option>
                                <option value="nail_polish">Oje</option>
                            </select>
                        </div>
                        <input type="text" name="image_link" placeholder="Resim URL" value={formData.image_link} onChange={handleChange} />
                        <button type="submit" className="save-btn">+ Ekle</button>
                    </form>
                </div>

                {/* SAĞ TARAF: MEVCUT ÜRÜN LİSTESİ */}
                <div className="admin-section list-section">
                    <h2>📦 Mevcut Ürünler ({products.length})</h2>
                    <div className="product-table-wrapper">
                        <table className="product-table">
                            <thead>
                            <tr>
                                <th>Resim</th>
                                <th>Ad</th>
                                <th>Fiyat</th>
                                <th>İşlem</th>
                            </tr>
                            </thead>
                            <tbody>
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <img
                                            src={p.api_featured_image || p.image_link}
                                            alt="thumb"
                                            className="table-thumb"
                                            onError={(e) => { e.target.src = "https://via.placeholder.com/50" }}
                                        />
                                    </td>
                                    <td title={p.name}>{p.name.substring(0, 20)}...</td>
                                    <td>${p.price}</td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteClick(p.id)}
                                        >
                                            Sil
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPanel;