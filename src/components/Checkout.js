import React, { useState, useEffect, useContext, useRef } from 'react'; // 1. useRef EKLENDİ
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { notify } from './Notify';
import '../css/Checkout.css';

const Checkout = () => {
    const { cart, clearCart } = useContext(ShopContext);
    const navigate = useNavigate();

    // 2. BİLDİRİM KİLİDİ İÇİN REF TANIMLA
    const isNotifying = useRef(false);

    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '', address: '', city: '', zip: '',
        cardName: '', cardNumber: '', expDate: '', cvc: ''
    });
    useEffect(() => {
        // Eğer sepet boşaldıysa VE henüz başarı ekranında (step 3) değilsek
        if (cart.length === 0 && step !== 3) {
            navigate('/'); // Saniyesinde anasayfaya postala

            // Opsiyonel: Kullanıcıya neden atıldığını söyleyebilirsin
            if (!isNotifying.current) {
                isNotifying.current = true;
                notify.error("Sepetiniz boş olduğu için anasayfaya yönlendirildiniz.");
                setTimeout(() => isNotifying.current = false, 2000);
            }
        }
    }, [cart, navigate, step]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'cardNumber') {
            const formatted = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
            setFormData({ ...formData, [name]: formatted.substring(0, 19) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // --- GÜNCELLENEN HANDLE NEXT ---
    const handleNext = () => {
        // Basit Validasyon
        if (step === 1) {
            if (!formData.fullName || !formData.address || !formData.city) {

                // KİLİT KONTROLÜ
                if (!isNotifying.current) {
                    isNotifying.current = true; // Kilidi kapat
                    notify.error("Lütfen adres bilgilerini doldurun!");

                    // 2 saniye sonra kilidi aç
                    setTimeout(() => {
                        isNotifying.current = false;
                    }, 2000);
                }
                return; // Hata varsa her türlü durdur
            }
        }
        setStep(step + 1);
    };

    const handleBack = () => setStep(step - 1);

    // --- GÜNCELLENEN HANDLE PLACE ORDER ---
    const handlePlaceOrder = () => {
        if (!formData.cardNumber || !formData.cvc) {

            // KİLİT KONTROLÜ
            if (!isNotifying.current) {
                isNotifying.current = true;
                notify.error("Kart bilgileri eksik!");

                setTimeout(() => {
                    isNotifying.current = false;
                }, 2000);
            }
            return;
        }

        // Ödeme Başarılı
        setStep(3);
        clearCart();

        setTimeout(() => {
            navigate('/');
        }, 5000);
    };
    // --- STEP 1: ADRES FORMU ---
    const renderAddressStep = () => (
        <div className="checkout-form">
            <h3>📍 Teslimat Adresi</h3>
            <div className="form-group">
                <label>Ad Soyad</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Örn: Ceren Yılmaz" />
            </div>
            <div className="form-group">
                <label>Adres</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Mahalle, Sokak, Apt No..."></input>
            </div>
            <div className="row">
                <div className="col form-group">
                    <label>Şehir</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div className="col form-group">
                    <label>Posta Kodu</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} />
                </div>
            </div>
            <div className="action-buttons">
                <button className="btn-primary" onClick={handleNext}>Devam Et →</button>
            </div>
        </div>
    );

    // --- STEP 2: ÖDEME FORMU ---
    const renderPaymentStep = () => (
        <div className="checkout-form">
            <h3>💳 Kart Bilgileri</h3>

            {/* CANLI KART ÖNİZLEME */}
            <div className="credit-card-preview">
                <div className="card-chip"></div>
                <div className="card-number-display">
                    {formData.cardNumber || '#### #### #### ####'}
                </div>
                <div className="card-bottom">
                    <div>
                        <div className="card-label">Kart Sahibi</div>
                        <div className="card-value">{formData.cardName || 'AD SOYAD'}</div>
                    </div>
                    <div>
                        <div className="card-label">SKT</div>
                        <div className="card-value">{formData.expDate || 'MM/YY'}</div>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label>Kart Numarası</label>
                <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" maxLength="19" />
            </div>
            <div className="form-group">
                <label>Kart Üzerindeki İsim</label>
                <input type="text" name="cardName" value={formData.cardName} onChange={handleChange} placeholder="Örn: CEREN YILMAZ" />
            </div>
            <div className="row">
                <div className="col form-group">
                    <label>Son Kullanma (Ay/Yıl)</label>
                    <input type="text" name="expDate" value={formData.expDate} onChange={handleChange} placeholder="12/25" maxLength="5" />
                </div>
                <div className="col form-group">
                    <label>CVC</label>
                    <input type="text" name="cvc" value={formData.cvc} onChange={handleChange} placeholder="123" maxLength="3" />
                </div>
            </div>

            <div className="action-buttons">
                <button className="btn-secondary" onClick={handleBack}>← Geri</button>
                <button className="btn-primary" onClick={handlePlaceOrder}>Siparişi Tamamla ({cart.reduce((a, b) => a + Number(b.price), 0).toFixed(2)}$)</button>
            </div>
        </div>
    );

    // --- STEP 3: BAŞARI ---
    const renderSuccessStep = () => (
        <div className="success-screen">
            <div className="check-icon">🎉</div>
            <h2>Siparişiniz Alındı!</h2>
            <p>Teşekkürler {formData.fullName}. Siparişin hazırlanıyor.</p>
            <p>Ana sayfaya yönlendiriliyorsunuz...</p>
            <button className="btn-primary" onClick={() => navigate('/')} style={{marginTop: '20px'}}>Ana Sayfaya Dön</button>
        </div>
    );

    return (
        <div className="checkout-container">
            {/* ÜSTTEKİ ADIM GÖSTERGESİ */}
            <div className="steps-indicator">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>
                    <div className="step-circle">1</div>
                    <span>Adres</span>
                </div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>
                    <div className="step-circle">2</div>
                    <span>Ödeme</span>
                </div>
                <div className={`step ${step >= 3 ? 'active' : ''}`}>
                    <div className="step-circle">3</div>
                    <span>Onay</span>
                </div>
            </div>

            {/* İÇERİK ALANI */}
            {step === 1 && renderAddressStep()}
            {step === 2 && renderPaymentStep()}
            {step === 3 && renderSuccessStep()}
        </div>
    );
};

export default Checkout;