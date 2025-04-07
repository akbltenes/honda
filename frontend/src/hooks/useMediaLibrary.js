import { useState, useEffect } from 'react';

// Medya kütüphanesi için hook
export const useMediaLibrary = () => {
  // Medya durumları
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState('images');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMediaType, setModalMediaType] = useState(null);

  // localStorage'dan verileri yükle
  useEffect(() => {
    const savedImages = localStorage.getItem('mediaLibrary_images');
    const savedVideos = localStorage.getItem('mediaLibrary_videos');
    const savedDocuments = localStorage.getItem('mediaLibrary_documents');

    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (error) {
        console.error('Görsel verilerini yüklerken hata:', error);
      }
    }
    
    if (savedVideos) {
      try {
        setVideos(JSON.parse(savedVideos));
      } catch (error) {
        console.error('Video verilerini yüklerken hata:', error);
      }
    }
    
    if (savedDocuments) {
      try {
        setDocuments(JSON.parse(savedDocuments));
      } catch (error) {
        console.error('Doküman verilerini yüklerken hata:', error);
      }
    }
  }, []);

  // Verileri localStorage'a kaydet
  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem('mediaLibrary_images', JSON.stringify(images));
    }
  }, [images]);
  
  useEffect(() => {
    if (videos.length > 0) {
      localStorage.setItem('mediaLibrary_videos', JSON.stringify(videos));
    }
  }, [videos]);
  
  useEffect(() => {
    if (documents.length > 0) {
      localStorage.setItem('mediaLibrary_documents', JSON.stringify(documents));
    }
  }, [documents]);

  // Medya silme işlemleri
  const deleteImage = (id) => {
    const updatedImages = images.filter(image => image.id !== id);
    setImages(updatedImages);
    
    // Eğer görsel koleksiyonu boşaldıysa localStorage'dan kaldır
    if (updatedImages.length === 0) {
      localStorage.removeItem('mediaLibrary_images');
    } else {
      localStorage.setItem('mediaLibrary_images', JSON.stringify(updatedImages));
    }
  };
  
  const deleteVideo = (id) => {
    const updatedVideos = videos.filter(video => video.id !== id);
    setVideos(updatedVideos);
    
    // Eğer video koleksiyonu boşaldıysa localStorage'dan kaldır
    if (updatedVideos.length === 0) {
      localStorage.removeItem('mediaLibrary_videos');
    } else {
      localStorage.setItem('mediaLibrary_videos', JSON.stringify(updatedVideos));
    }
  };
  
  const deleteDocument = (id) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
    
    // Eğer doküman koleksiyonu boşaldıysa localStorage'dan kaldır
    if (updatedDocuments.length === 0) {
      localStorage.removeItem('mediaLibrary_documents');
    } else {
      localStorage.setItem('mediaLibrary_documents', JSON.stringify(updatedDocuments));
    }
  };

  // Modal açma/kapama işlemleri
  const openAddModal = (mediaType) => {
    setModalMediaType(mediaType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMediaType(null);
  };

  // Yeni medya ekleme
  const addMedia = (formData) => {
    const newMedia = {
      id: Date.now(),
      title: formData.title,
      description: formData.description || '',
      createdAt: new Date().toISOString()
    };

    // Dosyanın URL'sini oluştur (gerçek bir uygulama için dosya yükleme API'si kullanılmalı)
    if (formData.file) {
      const fileUrl = URL.createObjectURL(formData.file);
      
      switch (modalMediaType) {
        case 'images':
          const newImage = { ...newMedia, url: fileUrl };
          setImages([...images, newImage]);
          break;
        case 'videos':
          const newVideo = { 
            ...newMedia, 
            thumbnailUrl: fileUrl, // Örnek için aynı URL kullanılıyor
            duration: '00:00' // Gerçek video süresi hesaplanmalı
          };
          setVideos([...videos, newVideo]);
          break;
        case 'documents':
          const newDocument = { 
            ...newMedia, 
            url: fileUrl,
            type: getFileExtension(formData.file.name),
            size: formatFileSize(formData.file.size)
          };
          setDocuments([...documents, newDocument]);
          break;
        default:
          break;
      }
    }

    closeModal();
  };

  // Dosya uzantısını belirle
  const getFileExtension = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    if (['pdf'].includes(extension)) return 'pdf';
    if (['doc', 'docx'].includes(extension)) return 'word';
    if (['xls', 'xlsx'].includes(extension)) return 'excel';
    return 'default';
  };

  // Dosya boyutunu formatla
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return {
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
  };
}; 