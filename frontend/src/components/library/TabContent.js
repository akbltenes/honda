import React from 'react';
import { Tab, Button } from 'react-bootstrap';
import MediaGrid from './MediaGrid';
import DocumentList from './DocumentList';
import EmptyState from './EmptyState';

const TabContent = ({ 
  images, 
  videos, 
  documents, 
  onAddClick, 
  onDeleteImage,
  onDeleteVideo,
  onDeleteDocument
}) => {
  return (
    <Tab.Content>
      <Tab.Pane eventKey="images">
        {images.length === 0 ? (
          <EmptyState mediaType="images" onAddClick={onAddClick} />
        ) : (
          <>
            <div className="d-flex justify-content-between mb-3">
              <h4>Görseller ({images.length})</h4>
              <Button 
                variant="primary" 
                onClick={() => onAddClick('images')}
              >
                <i className="fas fa-plus"></i> Yeni Görsel Ekle
              </Button>
            </div>
            <MediaGrid items={images} type="images" onDelete={onDeleteImage} />
          </>
        )}
      </Tab.Pane>
      
      <Tab.Pane eventKey="videos">
        {videos.length === 0 ? (
          <EmptyState mediaType="videos" onAddClick={onAddClick} />
        ) : (
          <>
            <div className="d-flex justify-content-between mb-3">
              <h4>Videolar ({videos.length})</h4>
              <Button 
                variant="primary" 
                onClick={() => onAddClick('videos')}
              >
                <i className="fas fa-plus"></i> Yeni Video Ekle
              </Button>
            </div>
            <MediaGrid items={videos} type="videos" onDelete={onDeleteVideo} />
          </>
        )}
      </Tab.Pane>
      
      <Tab.Pane eventKey="documents">
        {documents.length === 0 ? (
          <EmptyState mediaType="documents" onAddClick={onAddClick} />
        ) : (
          <>
            <div className="d-flex justify-content-between mb-3">
              <h4>Dokümanlar ({documents.length})</h4>
              <Button 
                variant="primary" 
                onClick={() => onAddClick('documents')}
              >
                <i className="fas fa-plus"></i> Yeni Doküman Ekle
              </Button>
            </div>
            <DocumentList documents={documents} onDelete={onDeleteDocument} />
          </>
        )}
      </Tab.Pane>
    </Tab.Content>
  );
};

export default TabContent; 