import React from 'react';
import { Link } from 'react-router-dom';
import FormError from './FormError';

const RegisterForm = ({ formData, errors, loading, handleChange, handleSubmit }) => {
  return (
    <>
      <FormError error={errors.form} fieldErrors={errors} />

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Ad Soyad</label>
          <input
            type="text"
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            id="fullName"
            name="fullName"
            placeholder="Adınız ve soyadınız"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Kullanıcı Adı</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="username"
            name="username"
            placeholder="Kullanıcı adınız"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-posta Adresi</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="email"
            name="email"
            placeholder="E-posta adresiniz"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Şifre</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            placeholder="Şifreniz"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Şifre Tekrar</label>
          <input
            type="password"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Şifrenizi tekrar girin"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength="6"
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 register-button"
          disabled={loading}
        >
          {loading ? 'Kayıt yapılıyor...' : 'Hesap Oluştur'}
        </button>
      </form>

      <div className="mt-3 text-center">
        <Link to="/login" className="login-link">Zaten hesabınız var mı? Giriş yapın</Link>
      </div>
    </>
  );
};

export default RegisterForm; 