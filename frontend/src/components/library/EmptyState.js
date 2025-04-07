import React from 'react';

const EmptyState = ({ mediaType, onAddClick }) => {
  // Medya tipine göre ikon belirle
  const getIcon = () => {
    switch (mediaType) {
      case 'images':
        return <i className="far fa-images empty-icon"></i>;
      case 'videos':
        return <i className="far fa-play-circle empty-icon"></i>;
      case 'documents':
        return <i className="far fa-file-alt empty-icon"></i>;
      default:
        return <i className="far fa-question-circle empty-icon"></i>;
    }
  };

  // Medya tipine göre metinleri belirle
  const getTexts = () => {
    switch (mediaType) {
      case 'images':
        return {
          title: 'Henüz hiç görsel eklenmedi',
          description: 'Kütüphaneye görsel eklemek için aşağıdaki butona tıklayın.',
          buttonText: 'Görsel Ekle'
        };
      case 'videos':
        return {
          title: 'Henüz hiç video eklenmedi',
          description: 'Kütüphaneye video eklemek için aşağıdaki butona tıklayın.',
          buttonText: 'Video Ekle'
        };
      case 'documents':
        return {
          title: 'Henüz hiç doküman eklenmedi',
          description: 'Kütüphaneye doküman eklemek için aşağıdaki butona tıklayın.',
          buttonText: 'Doküman Ekle'
        };
      default:
        return {
          title: 'İçerik bulunamadı',
          description: 'Yeni içerik eklemek için aşağıdaki butona tıklayın.',
          buttonText: 'İçerik Ekle'
        };
    }
  };

  const texts = getTexts();

  return (
    <div className="empty-media-container">
      <div className="empty-media-message">
        {getIcon()}
        <h3>{texts.title}</h3>
        <p>{texts.description}</p>
        <button 
          className="btn btn-primary add-media-btn"
          onClick={() => onAddClick(mediaType)}
        >
          <i className="fas fa-plus me-2"></i>
          {texts.buttonText}
        </button>
      </div>
    </div>
  );
};

export default EmptyState; 