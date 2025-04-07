import React from 'react';
import EventItem from './EventItem';
import { isToday, isInMonth, formatDateISO } from '../../utils/dateUtils';

const CalendarGrid = ({ currentMonth, events, handleDateClick, handleDeleteEvent }) => {
  // Takvim günlerini oluşturma
  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Ayın ilk günü
    const firstDayOfMonth = new Date(year, month, 1);
    
    // Ayın ilk gününün haftanın hangi günü olduğunu bul (0: Pazar, 1: Pazartesi, ...)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Pazartesi = 0 olacak şekilde ayarla
    const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Takvim başlangıç günü (önceki aydan gösterilecek günler dahil)
    const calendarStart = new Date(firstDayOfMonth);
    calendarStart.setDate(calendarStart.getDate() - startDay);
    
    // Takvimde gösterilecek toplam gün sayısı (6 hafta)
    const totalDays = 42;
    
    // Takvim günlerini oluştur
    const days = [];
    for (let i = 0; i < totalDays; i++) {
      const currentDate = new Date(calendarStart);
      currentDate.setDate(calendarStart.getDate() + i);
      
      // Bu güne ait etkinlikleri bul
      const dateStr = formatDateISO(currentDate);
      const dayEvents = events.filter(event => event.date === dateStr);
      
      days.push(
        <div 
          key={i} 
          className={`calendar-day ${isInMonth(currentDate, month) ? 'current-month' : 'other-month'} ${isToday(currentDate) ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
          onClick={() => handleDateClick(currentDate)}
        >
          <div className="day-header">
            <span className="day-number">{currentDate.getDate()}</span>
          </div>
          <div className="day-content">
            {dayEvents.map(event => (
              <EventItem 
                key={event.id} 
                event={event} 
                handleDeleteEvent={handleDeleteEvent} 
              />
            ))}
          </div>
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="calendar-grid">
      {renderCalendarDays()}
    </div>
  );
};

export default CalendarGrid; 