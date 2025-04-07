import React from 'react';

const DocumentList = ({ documents, onDelete }) => {
  // Dosya tipine göre ikon belirle
  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf': return <i className="far fa-file-pdf"></i>;
      case 'excel': return <i className="far fa-file-excel"></i>;
      case 'word': return <i className="far fa-file-word"></i>;
      default: return <i className="far fa-file"></i>;
    }
  };

  return (
    <div className="document-list">
      {documents.map(doc => (
        <div className="document-card" key={doc.id}>
          <div className="document-icon">
            {getFileIcon(doc.type)}
          </div>
          <div className="document-info">
            <h5>{doc.title}</h5>
            {doc.description && (
              <p className="document-description">{doc.description}</p>
            )}
            <div className="document-details">
              <span className="document-meta">{doc.size}</span>
              <span className="document-date">
                {new Date(doc.createdAt).toLocaleDateString('tr-TR')}
              </span>
            </div>
          </div>
          <div className="document-actions">
            <button className="btn btn-sm btn-outline-primary">
              <i className="fas fa-download"></i> İndir
            </button>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="fas fa-eye"></i> Görüntüle
            </button>
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={() => onDelete && onDelete(doc.id)}
            >
              <i className="fas fa-trash"></i> Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList; 