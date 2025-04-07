import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthHeader from '../components/auth/AuthHeader';
import RegisterForm from '../components/auth/RegisterForm';
import { useForm } from '../hooks/useForm';
import { registerValidationRules } from '../utils/validationRules';
import '../styles/Register.css';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Form gönderim işlevi
  const handleRegister = async (formData) => {
    try {
      console.log('Kayıt işlemi başlatılıyor...');
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName
      });
      
      console.log('Kayıt işlemi sonucu:', result);
      
      if (result.success) {
        navigate('/login', { state: { message: 'Kayıt başarılı! Lütfen giriş yapın.' } });
        return true;
      } else {
        // Hata mesajını errors state'ine ekle
        setErrors(prev => ({
          ...prev,
          form: result.message
        }));
        return false;
      }
    } catch (error) {
      console.error('Kayıt işlemi hatası:', error);
      throw new Error('Kayıt işlemi sırasında beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };
  
  // useForm hook'unu kullanarak form state ve fonksiyonlarını al
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit,
    setErrors
  } = useForm(
    {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: ''
    },
    handleRegister
  );

  // Form gönderimi için wrapper fonksiyon
  const onSubmit = (e) => {
    handleSubmit(e, registerValidationRules);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <AuthHeader 
          title="Hesap Oluştur" 
          instruction="Honda sosyal medya platformuna katılmak için lütfen bilgilerinizi girin." 
        />
        
        <RegisterForm 
          formData={formData}
          errors={errors}
          loading={loading}
          handleChange={handleChange}
          handleSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default Register; 