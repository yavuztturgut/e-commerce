// src/HeroSlider.js
import React from 'react';
// Swiper React bileşenleri
import { Swiper, SwiperSlide } from 'swiper/react';
// Swiper stilleri (Zorunlu)
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Gerekli modüller
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import '../css/HeroSlider.css'; // Birazdan oluşturacağız

function HeroSlider() {
    // Slider İçerikleri (Buralara kendi resimlerini koyabilirsin)
    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1595051665600-afd01ea7c446?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Bahar İndirimleri Başladı!",
            subtitle: "Seçili makyaj ürünlerinde %50'ye varan indirimler.",
            buttonText: "İncele"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1577195594933-f844fa36c37c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Yeni Sezon Rujlar",
            subtitle: "Dudaklarınızda bahar tazeliği.",
            buttonText: "Alışverişe Başla"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1200&auto=format&fit=crop",
            title: "Cilt Bakım Rutini",
            subtitle: "Işıltılı bir cilt için gereken her şey burada.",
            buttonText: "Keşfet"
        }
    ];

    return (
        <div className="hero-slider-area">
            <Swiper
                spaceBetween={0}
                centeredSlides={true}
                autoplay={{
                    delay: 3500, // 3.5 saniyede bir değişsin
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="slide-content" style={{ backgroundImage: `url(${slide.image})` }}>
                            <div className="slide-overlay">
                                <div className="slide-text-box">
                                    <h2>{slide.title}</h2>
                                    <p>{slide.subtitle}</p>
                                    <button className="slider-btn">{slide.buttonText}</button>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default HeroSlider;