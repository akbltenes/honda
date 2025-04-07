import React from 'react';
import { formatDateLocale } from '../../utils/dateUtils';

const EventModal = ({ selectedDate, newEvent, setNewEvent, showAddModal, setShowAddModal, handleAddEvent }) => {
  // Form giriş değişikliklerini işle
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            Yeni Instagram İçeriği: {selectedDate && formatDateLocale(selectedDate)}
          </h5>
          <button className="close-button" onClick={() => setShowAddModal(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group mb-3">
            <label htmlFor="title">İçerik Başlığı</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="İçerik açıklaması"
              value={newEvent.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="time">Yayın Saati</label>
            <input
              type="time"
              className="form-control"
              id="time"
              name="time"
              value={newEvent.time}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="contentType">İçerik Tipi</label>
            <select
              className="form-control"
              id="contentType"
              name="contentType"
              value={newEvent.contentType}
              onChange={handleInputChange}
            >
              <option value="Post">Post</option>
              <option value="Reels">Reels</option>
              <option value="Story">Story</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
            İptal
          </button>
          <button className="btn btn-primary" onClick={handleAddEvent}>
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventModal; 