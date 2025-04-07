import { useState, useEffect } from 'react';

// LocalStorage hook - takvim etkinliklerini kaydetmek ve yüklemek için kullanılır
export const useLocalStorage = (key, initialValue) => {
  // LocalStorage'dan değeri oku
  const readValue = () => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`LocalStorage '${key}' değerini okurken hata:`, error);
      return initialValue;
    }
  };

  // State'i LocalStorage değeri ile başlat
  const [storedValue, setStoredValue] = useState(readValue);

  // LocalStorage'a değeri kaydet
  const setValue = (value) => {
    try {
      // Fonksiyon olarak geçirilirse önceki değeri kullan
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // State'i güncelle
      setStoredValue(valueToStore);
      
      // LocalStorage'a kaydet
      if (valueToStore === initialValue || (Array.isArray(valueToStore) && valueToStore.length === 0)) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`LocalStorage '${key}' değerini kaydederken hata:`, error);
    }
  };

  // Diğer pencerelerden lokalStorage değişikliklerini dinle
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        setStoredValue(readValue());
      }
    };

    // Sayfa odaklandığında verileri yenile
    const handleFocus = () => setStoredValue(readValue());
    
    // Event dinleyicileri ekle
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      // Event dinleyicileri temizle
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [key]);

  return [storedValue, setValue];
}; 