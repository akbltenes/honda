import React from 'react';

const MediaGrid = ({ items, type, onDelete }) => {
  return (
    <div className="media-grid">
      {items.map(item => (
        <div className="media-card" key={item.id}>
          <div className="media-preview">
            <img src={type === 'videos' ? item.thumbnailUrl : item.url} alt={item.title} />
            {type === 'videos' && (
              <>
                <div className="video-duration">{item.duration}</div>
                <div className="play-button">
                  <i className="fas fa-play"></i>
                </div>
              </>
            )}
          </div>
          <div className="media-info">
            <h5>{item.title}</h5>
            {item.description && (
              <p className="media-description">{item.description}</p>
            )}
            <div className="media-meta">
              <span className="media-date">
                {new Date(item.createdAt).toLocaleDateString('tr-TR')}
              </span>
            </div>
            <div className="media-actions">
              <button className="btn btn-sm btn-outline-primary">
                <i className="fas fa-download"></i> İndir
              </button>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="fas fa-share-alt"></i> Paylaş
              </button>
              <button 
                className="btn btn-sm btn-outline-danger" 
                onClick={() => onDelete && onDelete(item.id)}
              >
                <i className="fas fa-trash"></i> Sil
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaGrid; 