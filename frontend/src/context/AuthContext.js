import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/api';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkTokenValidity = async () => {
      if (token) {
        try {
          // Token'ın geçerli olup olmadığını kontrol et
          const decodedToken = jwtDecode(token);
          const currentTime = Date.now() / 1000;
          
          if (decodedToken.exp < currentTime) {
            // Token süresi dolmuşsa oturumu kapat
            logout();
          } else {
            // Token geçerliyse kullanıcı bilgilerini ayarla
            setIsAuthenticated(true);
            setUser({ username: decodedToken.sub });
            // API isteklerinde Authorization header'ı için Axios default header'ını ayarla
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            // Kullanıcı profilini getir (opsiyonel)
            try {
              const profileResponse = await AuthService.getUserProfile();
              if (profileResponse.data) {
                setUser(profileResponse.data);
              }
            } catch (error) {
              console.error('Kullanıcı profili alınamadı', error);
            }
          }
        } catch (error) {
          console.error('Token çözümlenirken hata oluştu', error);
          logout();
        }
      }
      setLoading(false);
    };

    checkTokenValidity();
  }, [token]);

  const login = async (username, password) => {
    try {
      console.log('Login attempt for:', username);
      const response = await AuthService.login(username, password);

      console.log('Login response:', response.data);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      setIsAuthenticated(true);

      // Token'dan kullanıcı bilgilerini çıkar
      const decodedToken = jwtDecode(token);
      setUser({ username: decodedToken.sub });
      
      return true;
    } catch (error) {
      console.error('Login error details:', error.response?.data || error.message);
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const response = await AuthService.register(userData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Kayıt hatası:', error.response?.data);
      
      // Hata mesajlarını özelleştir
      if (error.response) {
        const errorData = error.response.data;
        const errorMessage = errorData.message || errorData;
        
        // E-posta zaten kullanılıyor hatası
        if (errorMessage.includes('e-posta') || errorMessage.includes('email')) {
          return { 
            success: false, 
            message: 'Bu e-posta adresi zaten kullanılıyor. Lütfen farklı bir e-posta adresi deneyiniz.' 
          };
        }
        
        // Kullanıcı adı zaten kullanılıyor hatası
        if (errorMessage.includes('kullanıcı adı') || errorMessage.includes('username')) {
          return { 
            success: false, 
            message: 'Bu kullanıcı adı zaten kullanılıyor. Lütfen farklı bir kullanıcı adı seçiniz.' 
          };
        }
        
        // Diğer hatalar için genel mesaj
        return { 
          success: false, 
          message: `Kayıt oluşturulurken bir hata oluştu: ${errorMessage}` 
        };
      }
      
      // Sunucu yanıt vermediğinde
      return { 
        success: false, 
        message: 'Sunucu ile bağlantı kurulamadı. Lütfen daha sonra tekrar deneyiniz.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 