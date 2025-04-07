import { useState } from 'react';

// Form state'i ve işlevleri için özel hook
export const useForm = (initialState = {}, onSubmit = () => {}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Form alanı değişikliklerini işle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Alan değiştiğinde ilgili hatayı temizle
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Form doğrulama işlemi
  const validateForm = (validationRules = {}) => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(field => {
      const value = formData[field] || '';
      const fieldRules = validationRules[field];

      // Gerekli alan kontrolü
      if (fieldRules.required && !value.trim()) {
        newErrors[field] = `${fieldRules.name || field} alanı gereklidir.`;
        isValid = false;
      }

      // Minimum uzunluk kontrolü
      if (isValid && fieldRules.minLength && value.length < fieldRules.minLength) {
        newErrors[field] = `${fieldRules.name || field} en az ${fieldRules.minLength} karakter olmalıdır.`;
        isValid = false;
      }

      // E-posta formatı kontrolü
      if (isValid && fieldRules.isEmail && !/\S+@\S+\.\S+/.test(value)) {
        newErrors[field] = 'Geçerli bir e-posta adresi giriniz.';
        isValid = false;
      }

      // Özel doğrulama kuralı
      if (isValid && fieldRules.validate && typeof fieldRules.validate === 'function') {
        const customError = fieldRules.validate(value, formData);
        if (customError) {
          newErrors[field] = customError;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Form gönderimi
  const handleSubmit = async (e, validationRules = {}) => {
    e.preventDefault();
    
    // Form doğrulama başarısızsa işlemi durdur
    if (!validateForm(validationRules)) {
      return;
    }

    setLoading(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors(prev => ({
        ...prev,
        form: error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.'
      }));
    } finally {
      setLoading(false);
    }
  };

  // Form state'ini sıfırla
  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,
    loading,
    setLoading,
    handleChange,
    handleSubmit,
    resetForm
  };
}; 