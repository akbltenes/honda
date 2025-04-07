import React from 'react';
import { getMonthName } from '../../utils/dateUtils';

const CalendarHeader = ({ currentMonth, changeMonth }) => {
  return (
    <div className="calendar-header">
      <button className="btn btn-sm btn-outline-primary" onClick={() => changeMonth(-1)}>
        <i className="fas fa-chevron-left"></i>
      </button>
      <h2 className="calendar-title">{getMonthName(currentMonth)}</h2>
      <button className="btn btn-sm btn-outline-primary" onClick={() => changeMonth(1)}>
        <i className="fas fa-chevron-right"></i>
      </button>
    </div>
  );
};

export default CalendarHeader; 