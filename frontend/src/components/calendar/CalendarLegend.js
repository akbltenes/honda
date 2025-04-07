import React from 'react';

const CalendarLegend = () => {
  return (
    <div className="calendar-legend mt-3">
      <div className="legend-item">
        <span className="content-type-label post">Post</span>
        <span>Normal Instagram gönderisi</span>
      </div>
      <div className="legend-item">
        <span className="content-type-label reels">Reels</span>
        <span>Instagram video içeriği</span>
      </div>
      <div className="legend-item">
        <span className="content-type-label story">Story</span>
        <span>24 saat yayında kalan hikaye</span>
      </div>
    </div>
  );
};

export default CalendarLegend; 