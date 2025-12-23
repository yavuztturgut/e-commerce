// src/components/Reviews.js
import React, { useState, useEffect } from 'react';
import { notify } from './Notify'; // Senin bildirim sistemin
import '../css/Reviews.css'; // Birazdan oluşturacağız

const Reviews = ({ productId }) => {
    // Yorumları tutan state
    const [reviews, setReviews] = useState([]);

    // Form verileri
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0); // Seçilen yıldız (0-5)
    const [hover, setHover] = useState(0);   // Mouse ile üzerine gelinen yıldız

    // 1. Sayfa açılınca o ürüne ait yorumları localStorage'dan çek
    useEffect(() => {
        const allReviews = JSON.parse(localStorage.getItem('cerenAdenReviews')) || [];
        // Sadece BU ürüne (productId) ait olanları filtrele
        const productReviews = allReviews.filter(r => r.productId === productId);
        setReviews(productReviews);
    }, [productId]);

    // 2. Yorum Gönderme Fonksiyonu
    const handleSubmit = (e) => {
        e.preventDefault();
        if (rating === 0) return notify.error('Lütfen puan veriniz! ⭐');
        if (!name.trim() || !comment.trim()) return notify.error('Lütfen tüm alanları doldurun.');

        const newReview = {
            id: Date.now(), // Benzersiz ID
            productId,      // Hangi ürüne yapıldı?
            name,
            comment,
            rating,
            date: new Date().toLocaleDateString('tr-TR') // Tarih
        };

        // Mevcut listeye ekle
        const updatedReviews = [newReview, ...reviews];
        setReviews(updatedReviews);

        // LocalStorage'a TÜM yorumları güncellemek için kaydet
        const allReviews = JSON.parse(localStorage.getItem('cerenAdenReviews')) || [];
        localStorage.setItem('cerenAdenReviews', JSON.stringify([...allReviews, newReview]));

        // Formu temizle
        setName('');
        setComment('');
        setRating(0);
        notify.success('Yorumunuz için teşekkürler! 💖');
    };

    // 3. Ortalama Puan Hesaplama
    const averageRating = reviews.length > 0
        ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
        : 0;

    return (
        <div className="reviews-container">
            <h3 className="reviews-title">Değerlendirmeler</h3>

            {/* ÖZET KISMI */}
            <div className="reviews-summary">
                <div className="average-score">
                    <span className="big-score">{averageRating}</span>
                    <span className="out-of">/ 5</span>
                </div>
                <div className="total-count">{reviews.length} Yorum</div>
                {/* Yıldızların Görseli */}
                <div className="static-stars">
                    {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.round(averageRating) ? "star filled" : "star"}>★</span>
                    ))}
                </div>
            </div>

            {/* YORUM YAPMA FORMU */}
            <form onSubmit={handleSubmit} className="review-form">
                <h4>Yorum Yap</h4>

                {/* Tıklanabilir Yıldızlar */}
                <div className="star-rating-input">
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <label key={index}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={ratingValue}
                                    onClick={() => setRating(ratingValue)}
                                />
                                <span
                                    className="star-btn"
                                    style={{ color: ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9" }}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    ★
                                </span>
                            </label>
                        );
                    })}
                </div>

                <input
                    type="text"
                    placeholder="Adınız"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="review-input"
                />
                <textarea
                    placeholder="Bu ürün hakkında ne düşünüyorsunuz?"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="review-textarea"
                ></textarea>

                <button type="submit" className="submit-review-btn">GÖNDER</button>
            </form>

            {/* YORUM LİSTESİ */}
            <div className="reviews-list">
                {reviews.length === 0 ? (
                    <p className="no-reviews">Henüz yorum yapılmamış. İlk yorumu sen yap! ✨</p>
                ) : (
                    reviews.map((rev) => (
                        <div key={rev.id} className="review-item">
                            <div className="review-header">
                                <span className="reviewer-name">{rev.name}</span>
                                <span className="review-date">{rev.date}</span>
                            </div>
                            <div className="review-stars">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} style={{color: i < rev.rating ? "#ffc107" : "#444"}}>★</span>
                                ))}
                            </div>
                            <p className="review-text">{rev.comment}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Reviews;