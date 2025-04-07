import React from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import CalendarLegend from './CalendarLegend';

const Calendar = ({ currentMonth, events, changeMonth, handleDateClick, handleDeleteEvent }) => {
  // Takvim başlıkları
  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

  return (
    <div className="calendar-container">
      <CalendarHeader 
        currentMonth={currentMonth} 
        changeMonth={changeMonth} 
      />
      
      <div className="calendar-week-days">
        {weekDays.map((day, index) => (
          <div key={index} className="week-day">{day}</div>
        ))}
      </div>
      
      <CalendarGrid 
        currentMonth={currentMonth}
        events={events}
        handleDateClick={handleDateClick}
        handleDeleteEvent={handleDeleteEvent}
      />
      
      <CalendarLegend />
    </div>
  );
};

export default Calendar; 