import React, { useState } from 'react';

const MediaModal = ({ mediaType, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    file: null,
    description: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files.length > 0) {
      setFormData({
        ...formData,
        file: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const getModalTitle = () => {
    switch (mediaType) {
      case 'images': return 'Yeni Görsel Ekle';
      case 'videos': return 'Yeni Video Ekle';
      case 'documents': return 'Yeni Doküman Ekle';
      default: return 'Yeni Medya Ekle';
    }
  };

  const getFileAccept = () => {
    switch (mediaType) {
      case 'images': return 'image/*';
      case 'videos': return 'video/*';
      case 'documents': return '.pdf,.doc,.docx,.xls,.xlsx';
      default: return '*/*';
    }
  };

  const getFileLabel = () => {
    switch (mediaType) {
      case 'images': return 'Görsel Dosyası';
      case 'videos': return 'Video Dosyası';
      case 'documents': return 'Doküman Dosyası';
      default: return 'Dosya';
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{getModalTitle()}</h5>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group mb-3">
              <label htmlFor="title">Başlık</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="file">{getFileLabel()}</label>
              <input
                type="file"
                className="form-control"
                id="file"
                name="file"
                accept={getFileAccept()}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group mb-3">
              <label htmlFor="description">Açıklama (Opsiyonel)</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              İptal
            </button>
            <button type="submit" className="btn btn-primary">
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MediaModal; 