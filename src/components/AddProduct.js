// src/components/AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddProduct.css'; // Birazdan oluşturacağız
import {notify} from "./Notify";
import { ShopContext } from '../context/ShopContext'; // Import et
import { useContext } from 'react';

function AddProduct() {
    const navigate = useNavigate();
    const  { onAddProduct } = useContext(ShopContext);

    // Form verilerini tutacak state
    const [formData, setFormData] = useState({
        name: '',
        price: 10,
        product_type: 'lipstick', // Varsayılan kategori
        description: '',
        image_link: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basit doğrulama
        if (!formData.name || !formData.price) {
            notify.error(`Lütfen isim ve fiyat alanlarını doldurun.`);
            return;
        }

        // App.js'den gelen ekleme fonksiyonunu çalıştır
        onAddProduct(formData);

        // İşlem bitince Ana Sayfaya veya Listeye yönlendir
        navigate('/');
    };

    return (
        <div className="add-product-container">
            <div className="form-card">
                <h2>✨ Yeni Ürün Ekle</h2>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Ürün Adı</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Örn: Mat Ruj"
                        />
                    </div>

                    <div className="form-group">
                        <label>Fiyat ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="19.99"
                        />
                    </div>

                    <div className="form-group">
                        <label>Kategori</label>
                        <select name="product_type" value={formData.product_type} onChange={handleChange}>
                            <option value="lipstick">Ruj (Lipstick)</option>
                            <option value="mascara">Maskara</option>
                            <option value="eyeliner">Eyeliner</option>
                            <option value="foundation">Fondöten</option>
                            <option value="moisturizer">Nemlendirici</option>
                            <option value="nail_polish">Oje</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Görsel URL</label>
                        <input
                            type="text"
                            name="image_link"
                            value={formData.image_link}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                        <small>İpucu: Unsplash'ten bir link yapıştırabilirsin.</small>
                    </div>

                    <div className="form-group">
                        <label>Açıklama</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Ürün hakkında kısa bilgi..."
                        ></textarea>
                    </div>

                    <button type="submit" className="save-btn">Ürünü Kaydet</button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;