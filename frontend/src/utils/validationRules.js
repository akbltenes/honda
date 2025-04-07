// Form doğrulama kuralları

// Kayıt formu doğrulama kuralları
export const registerValidationRules = {
  fullName: {
    required: true,
    name: 'Ad Soyad'
  },
  username: {
    required: true,
    minLength: 3,
    name: 'Kullanıcı Adı'
  },
  email: {
    required: true,
    isEmail: true,
    name: 'E-posta Adresi'
  },
  password: {
    required: true,
    minLength: 6,
    name: 'Şifre'
  },
  confirmPassword: {
    required: true,
    name: 'Şifre Tekrar',
    validate: (value, formData) => {
      if (value !== formData.password) {
        return 'Şifreler eşleşmiyor!';
      }
      return null;
    }
  }
};

// Giriş formu doğrulama kuralları
export const loginValidationRules = {
  username: {
    required: true,
    name: 'Kullanıcı Adı'
  },
  password: {
    required: true,
    name: 'Şifre'
  }
}; 