// src/Cart.js
import React from 'react';
import '../css/Cart.css'; // CSS dosyasını dahil et

function Cart({ cartItems, isOpen, toggleCart, removeFromCart }) {
    // Sepet toplam tutarı
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

    return (
        <div className="cart-container">
            {/* Sepet Butonu */}
            <button className="cart-toggle-btn" onClick={toggleCart}>
                <span>🛒 Sepetim</span>
                {cartItems.length > 0 && (
                    <span className="cart-count-badge">{cartItems.length}</span>
                )}
            </button>

            {/* Sepet İçeriği Dropdown */}
            {isOpen && (
                <div className="cart-dropdown">
                    <div className="cart-header">
                        <h4>Sepetiniz</h4>
                    </div>

                    {cartItems.length === 0 ? (
                        <p className="empty-cart-msg">Sepetinizde ürün yok.</p>
                    ) : (
                        <>
                            <ul className="cart-items-list">
                                {cartItems.map((item, index) => (
                                    <li key={index} className="cart-item">
                                        <span className="item-title">{item.title}</span>
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
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Cart;