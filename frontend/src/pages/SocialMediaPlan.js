import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Calendar from '../components/calendar/Calendar';
import EventModal from '../components/calendar/EventModal';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { formatDateISO } from '../utils/dateUtils';
import '../styles/SocialMediaPlan.css';

const SocialMediaPlan = () => {
  // State'ler
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Form state'i
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '09:00',
    contentType: 'Post', // Post, Reels, Story
    status: 'Planlandı'
  });
  
  // LocalStorage hook'unu kullan
  const [events, setEvents] = useLocalStorage('socialMediaEvents', []);

  // Planların durumlarını kontrol et ve güncelle
  useEffect(() => {
    const checkEventStatus = () => {
      const now = new Date();
      const updatedEvents = events.map(event => {
        const eventDate = new Date(event.date);
        const eventDateTime = new Date(`${event.date}T${event.time}`);
        
        // Bugünün başlangıcı (saat 00:00)
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        // Tarih bugünden önceyse (geçmişte) "Tamamlandı", sonraysa "Planlandı"
        if (eventDate < todayStart) {
          return { ...event, status: 'Tamamlandı' };
        } 
        // Tarih bugün ama saat geçmişse "Tamamlandı"
        else if (eventDate.getTime() === todayStart.getTime() && eventDateTime < now) {
          return { ...event, status: 'Tamamlandı' };
        }
        // Gelecekteki tarihler "Planlandı"
        else {
          return { ...event, status: 'Planlandı' };
        }
      });
      
      // Yalnızca değişiklik varsa güncelle
      if (JSON.stringify(updatedEvents) !== JSON.stringify(events)) {
        setEvents(updatedEvents);
      }
    };
    
    // İlk yükleme ve her dakikada bir kontrol et
    checkEventStatus();
    const interval = setInterval(checkEventStatus, 60000); // Her dakika kontrol et
    
    return () => clearInterval(interval); // Cleanup
  }, [events, setEvents]);

  // Sidebar açma/kapama
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Ay değiştirme
  const changeMonth = (amount) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + amount);
    setCurrentMonth(newMonth);
  };

  // Tarih seçildiğinde modal göster
  const handleDateClick = (date) => {
    // Geçmiş tarihlere planlama yapılamaması kontrolü
    const now = new Date();
    // Seçilen tarih bugünden önceyse engelleyelim (ay ve yılı karşılaştır)
    if (date.getFullYear() < now.getFullYear() || 
        (date.getFullYear() === now.getFullYear() && date.getMonth() < now.getMonth()) ||
        (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() < now.getDate())) {
      alert('Geçmiş tarihlere planlama yapamazsınız!');
      return;
    }
    
    const formattedDate = formatDateISO(date);
    setSelectedDate(date);
    setNewEvent(prev => ({
      ...prev,
      date: formattedDate
    }));
    setShowAddModal(true);
  };

  // Yeni plan ekleme
  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date) {
      // Etkinliğin tarihini kontrol et
      const eventDate = new Date(newEvent.date);
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      // Etkinlik günü bugünden önceyse engelle
      if (eventDate < today) {
        alert('Geçmiş tarihlere planlama yapamazsınız!');
        return;
      }
      
      // Durum belirleme - Bugün ve şu anki saatten önceyse "Tamamlandı", diğer tüm durumlar "Planlandı"
      let status = 'Planlandı';
      
      // Sadece bugünün etkinlikleri için saati kontrol et
      if (eventDate.getTime() === today.getTime()) {
        const eventDateTime = new Date(`${newEvent.date}T${newEvent.time}`);
        if (eventDateTime < now) {
          status = 'Tamamlandı';
        }
      }
      
      const newEventWithId = {
        ...newEvent,
        status, // Belirlenen durumu ata
        platform: 'Instagram', // Sadece Instagram
        id: Date.now() // Benzersiz ID oluşturma
      };
      
      // Events state'ini güncelle
      setEvents([...events, newEventWithId]);
      
      // Form state'ini sıfırla
      setNewEvent({
        title: '',
        date: '',
        time: '09:00',
        contentType: 'Post',
        status: 'Planlandı'
      });
      setShowAddModal(false);
    }
  };

  // Plan silme
  const handleDeleteEvent = (id) => {
    if (window.confirm('Bu planı silmek istediğinize emin misiniz?')) {
      setEvents(events.filter(event => event.id !== id));
    }
  };

  return (
    <div className="social-media-plan-container">
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <main className="main-content">
        <div className="container">
          <h1 className="page-title">Instagram İçerik Takvimi</h1>
          
          <Calendar 
            currentMonth={currentMonth}
            events={events}
            changeMonth={changeMonth}
            handleDateClick={handleDateClick}
            handleDeleteEvent={handleDeleteEvent}
          />
          
          {/* Yeni Plan Ekleme Modal */}
          {showAddModal && (
            <EventModal 
              selectedDate={selectedDate}
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              showAddModal={showAddModal}
              setShowAddModal={setShowAddModal}
              handleAddEvent={handleAddEvent}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default SocialMediaPlan; 