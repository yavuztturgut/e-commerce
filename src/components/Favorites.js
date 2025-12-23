import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import '../css/ProductList.css'; // Aynı CSS'i kullanabiliriz

function Favorites() {
    const { favorites, toggleFavorite, addToCart } = useContext(ShopContext);
    const navigate = useNavigate();

    if (favorites.length === 0) {
        return (
            <div className="no-result" style={{textAlign: 'center', marginTop: '50px'}}>
                <h2>Henüz favori ürününüz yok 💔</h2>
                <p>Beğendiğiniz ürünlerin üzerindeki kalbe tıklayarak buraya ekleyebilirsiniz.</p>
            </div>
        );
    }

    return (
        <div className="product-container">
            <h2 style={{marginLeft: '20px', color: 'var(--primary-color)'}}>Favorilerim ({favorites.length}) ❤️</h2>

            <div className="product-grid">
                {favorites.map((product) => (
                    <div
                        key={product.id}
                        className="product-card"
                        onClick={() => navigate(`/product/${product.id}`)}
                    >


                        <div className="image-container">
                            <img src={product.api_featured_image || product.image_link} alt={product.name} className="product-image" />
                        </div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="current-price">${Number(product.price).toFixed(2)}</p>
                            <button
                                className="add-btn"
                                onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                            >
                                Sepete Ekle
                            </button>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Favorites;