import React from 'react';
import { Tab } from 'react-bootstrap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MediaNavigation from '../components/library/MediaNavigation';
import TabContent from '../components/library/TabContent';
import MediaModal from '../components/library/MediaModal';
import { useMediaLibrary } from '../hooks/useMediaLibrary';
import '../styles/Library.css';

const Library = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  // useMediaLibrary hook'u ile medya kütüphanesi fonksiyonları
  const {
    images,
    videos,
    documents,
    activeTab,
    setActiveTab,
    isModalOpen,
    modalMediaType,
    openAddModal,
    closeModal,
    addMedia,
    deleteImage,
    deleteVideo,
    deleteDocument
  } = useMediaLibrary();
  
  // Sidebar açma/kapama
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="social-media-plan-container">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="main-content">
        <div className="container">
          <h1 className="page-title">Medya Kütüphanesi</h1>
          
          <Tab.Container
            id="library-tabs"
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
          >
            <MediaNavigation activeKey={activeTab} onSelect={setActiveTab} />
            
            <TabContent
              images={images}
              videos={videos}
              documents={documents}
              onAddClick={openAddModal}
              onDeleteImage={deleteImage}
              onDeleteVideo={deleteVideo}
              onDeleteDocument={deleteDocument}
            />
          </Tab.Container>
        </div>
      </main>
      
      {/* Medya ekleme modalı */}
      {isModalOpen && (
        <MediaModal
          mediaType={modalMediaType}
          onClose={closeModal}
          onSave={addMedia}
        />
      )}
    </div>
  );
};

export default Library; 