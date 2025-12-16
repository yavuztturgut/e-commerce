// src/utils/notify.js
import { toast } from 'react-toastify';

// İki tip bildirimimiz olacak: Başarılı (Pembe) ve Hata (Kırmızı)

export const notify = {
    // Başarılı işlem için: notify.success("Mesajın")
    success: (message) => {
        toast.success(message, {
            // Buraya özel CSS sınıfı veriyoruz, birazdan boyayacağız
            className: 'pembe-toast',
            progressClassName: 'pembe-progress',
            icon: () => <span style={{ fontSize: '20px' }}>🌸</span>        });
    },

    // Hata işlemi için: notify.error("Hata Mesajın")
    error: (message) => {
        toast.error(message, {
            className: 'hata-toast',
        });
    }
};