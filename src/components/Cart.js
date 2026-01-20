// src/Cart.js
import React from 'react';
import {useNavigate} from "react-router-dom";
import '../css/Cart.css'; // CSS dosyasını dahil et
import { ShopContext } from '../context/ShopContext'; // Import et
import { useContext } from 'react';

function Cart() {
    const navigate = useNavigate();
    // 4. Verileri Context'ten çek
    const { cart, removeFromCart, toggleCart, isCartOpen } = useContext(ShopContext);

    // Eğer Context yüklenmediyse veya cart yoksa boş dizi varsayalım
    const safeCart = cart || [];

    // Toplam Fiyat Hesabı (Hata veren yer muhtemelen burasıydı)
    const totalPrice = safeCart.reduce((total, item) => {
        return total + (Number(item.price) * (item.stock ? 1 : 1));
        // Not: Stok adedi mantığın varsa burayı (item.price * item.count) yapmalısın.
    }, 0);
    return (
        <div className="cart-container">
            {/* Sepet Butonu */}
            <button className="cart-toggle-btn" onClick={toggleCart}>
                <span>🛒 Sepetim</span>
                {safeCart.length > 0 && (
                    <span className="cart-count-badge">{safeCart.length}</span>
                )}
            </button>

            {/* Sepet İçeriği Dropdown */}
            {isCartOpen&& (
                <div className="cart-dropdown">
                    <div className="cart-header">
                        <h4>Sepetiniz</h4>
                    </div>

                    {safeCart.length === 0 ? (
                        <p className="empty-cart-msg">Sepetinizde ürün yok.</p>
                    ) : (
                        <>
                            <ul className="cart-items-list">
                                {safeCart.map((item, index) => (
                                    <li key={index} className="cart-item">
                                        <span className="item-title">{item.name}</span>
                                        <span className="item-price">${item.price}</span>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(index)}
                                            title="Sil"
                                        >
                                            ✕
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <div className="cart-footer">
                                <span className="total-text">Toplam Tutar:</span>
                                <span className="total-amount">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button
                                className="checkout-btn"
                                onClick={() => {
                                    toggleCart();
                                    navigate('/checkout');
                                }}
                            >
                                Ödemeye Geç 💳
                            </button>
                        </>
                    )}
                </div>
            )}

        </div>
    );
}

export default Cart;