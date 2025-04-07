import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AuthHeader from '../components/auth/AuthHeader';
import LoginForm from '../components/auth/LoginForm';
import { useForm } from '../hooks/useForm';
import { loginValidationRules } from '../utils/validationRules';
import '../styles/Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Form gönderim işlevi
  const handleLogin = async (formData) => {
    try {
      const success = await login(formData.username, formData.password);
      if (success) {
        navigate('/social-media-plan');
        return true;
      } else {
        throw new Error('Kullanıcı adı veya şifre hatalı. Lütfen bilgilerinizi kontrol edip tekrar deneyin.');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Sunucuya bağlanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };
  
  // useForm hook'unu kullanarak form state ve fonksiyonlarını al
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit
  } = useForm(
    {
      username: '',
      password: '',
      rememberMe: false
    },
    handleLogin
  );

  // Form gönderimi için wrapper fonksiyon
  const onSubmit = (e) => {
    handleSubmit(e, loginValidationRules);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <AuthHeader 
          title="Hoş geldiniz" 
          instruction="Honda sosyal medya kütüphanesine devam etmek için lütfen oturum açınız." 
        />
        
        <LoginForm 
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

export default Login; 