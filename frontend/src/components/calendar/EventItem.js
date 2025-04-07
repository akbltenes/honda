import React from 'react';

const EventItem = ({ event, handleDeleteEvent }) => {
  // Duruma göre CSS sınıfı belirle
  const getStatusClass = (status) => {
    switch(status) {
      case 'Planlandı': return 'status-planned';
      case 'Tamamlandı': return 'status-completed';
      default: return 'status-planned';
    }
  };

  // İçerik tipine göre ikon/etiket belirle
  const getContentTypeLabel = (contentType) => {
    switch(contentType) {
      case 'Post': return <span className="content-type-label post">Post</span>;
      case 'Reels': return <span className="content-type-label reels">Reels</span>;
      case 'Story': return <span className="content-type-label story">Story</span>;
      default: return <span className="content-type-label">Diğer</span>;
    }
  };

  return (
    <div className={`event-item ${getStatusClass(event.status)}`}>
      <div className="event-header">
        {getContentTypeLabel(event.contentType)}
        <button 
          className="event-delete-btn" 
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteEvent(event.id);
          }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
      <div className="event-title">{event.title}</div>
      <div className="event-footer">
        <div className="event-time">{event.time}</div>
        <div className="event-status">{event.status}</div>
      </div>
    </div>
  );
};

export default EventItem; 