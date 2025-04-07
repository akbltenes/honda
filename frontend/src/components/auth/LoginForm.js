import React from 'react';
import { Link } from 'react-router-dom';
import FormError from './FormError';

const LoginForm = ({ formData, errors, loading, handleChange, handleSubmit }) => {
  return (
    <>
      <FormError error={errors.form} fieldErrors={errors} />

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Kullanıcı adı</label>
          <input
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            id="username"
            name="username"
            placeholder="Lütfen kullanıcı adınızı yazınız"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Şifre</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            placeholder="Lütfen şifrenizi yazınız"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="rememberMe"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="rememberMe">Beni Hatırla</label>
        </div>

        <button
          type="submit"
          className="btn btn-danger w-100 login-button"
          disabled={loading}
        >
          {loading ? 'Giriş yapılıyor...' : 'Giriş yap'}
        </button>
      </form>

      <div className="mt-3 text-center">
        <Link to="/register" className="register-link">Hesabınız yok mu? Kayıt olun</Link>
      </div>
    </>
  );
};

export default LoginForm; 