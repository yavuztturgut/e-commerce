// src/context/ShopContext.js
import React, { createContext, useState, useEffect, useRef } from "react";
import { notify } from "../components/Notify"; // Notify yoluna dikkat et

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    // --- TÜM STATE'LER BURADA ---
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [theme, setTheme] = useState(localStorage.getItem("cerenAdenTheme") || "light");
    const [favorites, setFavorites] = useState(() => {
        // Başlangıçta localStorage'dan oku
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });
    const isNotifying = useRef(false);
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("cerenAdenTheme", newTheme); // Hafızaya kaydet
    };

    // --- 1. VERİ ÇEKME (API + LocalStorage) ---
    useEffect(() => {
        const localData = localStorage.getItem("cerenAdenProducts");

        if (localData) {
            setProducts(JSON.parse(localData));
            setLoading(false);
        } else {
            fetch("https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
                .then((res) => res.json())
                .then((data) => {
                    const adaptedData = data.map((item) => ({
                        ...item,
                        price: Number(item.price) || 10,
                        stock: 20, // Varsayılan stok
                        category: 'makeup'
                    }));
                    localStorage.setItem("cerenAdenProducts", JSON.stringify(adaptedData));
                    setProducts(adaptedData);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setLoading(false);
                });
        }

        // Sepeti de hafızadan geri getir
        const localCart = localStorage.getItem("cerenAdenCart");
        if (localCart) setCart(JSON.parse(localCart));
    }, []);

    // --- 2. SEPET DEĞİŞİNCE KAYDET ---
    useEffect(() => {
        localStorage.setItem("cerenAdenCart", JSON.stringify(cart));
    }, [cart]);


    useEffect(() => {
        // <body> etiketine data-theme="dark" veya "light" ekler
        document.body.setAttribute("data-theme", theme);
    }, [theme]);
    // --- FONKSİYONLAR ---

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToCart = (productToAdd) => {
        // Stok düşme mantığı
        const updatedProducts = products.map((p) => {
            if (p.id === productToAdd.id) return { ...p, stock: (p.stock || 20) - 1 };
            return p;
        });
        setProducts(updatedProducts); // Stok güncel halini kaydet

        setCart([...cart, productToAdd]);
        setIsCartOpen(true);
        if (!isNotifying.current) {
            isNotifying.current = true; // Mesaj sürecini başlat
            notify.success("Ürün sepete eklendi! 🌸");

            // 2 saniye sonra tekrar mesaj gönderilmesine izin ver
            setTimeout(() => {
                isNotifying.current = false;
            }, 2000);
        }
    };

    const removeFromCart = (indexToRemove) => {
        const updatedCart = cart.filter((_, index) => index !== indexToRemove);
        setCart(updatedCart);
        if (updatedCart.length === 0) setIsCartOpen(false);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);

    // Admin Fonksiyonları
    const addNewProduct = (newProduct) => {
        const productWithId = { ...newProduct, id: Date.now() };
        const updatedList = [productWithId, ...products];
        setProducts(updatedList);
        localStorage.setItem("cerenAdenProducts", JSON.stringify(updatedList));
        notify.success("Ürün eklendi! ✨");
    };

    const deleteProduct = (id) => {
        const updatedList = products.filter(p => p.id !== id);
        setProducts(updatedList);
        localStorage.setItem("cerenAdenProducts", JSON.stringify(updatedList));
        notify.error("Ürün silindi.");
    };

    const toggleFavorite = (product) => {
        const isExist = favorites.find((f) => f.id === product.id);

        if (isExist) {
            // Varsa çıkar
            setFavorites(favorites.filter((f) => f.id !== product.id));
            // notify.info("Favorilerden çıkarıldı"); // İstersen bildirim açabilirsin
        } else {
            // Yoksa ekle
            setFavorites([...favorites, product]);
            // notify.success("Favorilere eklendi ❤️");
        }
    };

    // 4. FAVORİ KONTROLÜ (Ürün favoride mi?)
    const isFavorite = (productId) => {
        return favorites.some((f) => f.id === productId);
    };
    // --- PAKETLEME ---
    const values = {
        products, cart, isCartOpen, loading, searchTerm,
        setSearchTerm, addToCart, removeFromCart, toggleCart,
        addNewProduct, deleteProduct, theme, toggleTheme, favorites, toggleFavorite, isFavorite
    };

    return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
};