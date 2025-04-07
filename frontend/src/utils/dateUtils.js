// Takvim ve tarih işlemleri için yardımcı fonksiyonlar

// Takvim başlangıç gününü hesaplar
export const getCalendarStartDate = (year, month) => {
  // Ayın ilk günü
  const firstDayOfMonth = new Date(year, month, 1);
  
  // Ayın ilk gününün haftanın hangi günü olduğunu bul (0: Pazar, 1: Pazartesi, ...)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // Pazartesi = 0 olacak şekilde ayarla
  const startDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  
  // Takvim başlangıç günü (önceki aydan gösterilecek günler dahil)
  const calendarStart = new Date(firstDayOfMonth);
  calendarStart.setDate(calendarStart.getDate() - startDay);
  
  return calendarStart;
};

// Bir tarihin bugün olup olmadığını kontrol eder
export const isToday = (date) => {
  const today = new Date();
  return date.getDate() === today.getDate() && 
         date.getMonth() === today.getMonth() && 
         date.getFullYear() === today.getFullYear();
};

// Bir tarihin belirli bir ayda olup olmadığını kontrol eder
export const isInMonth = (date, month) => {
  return date.getMonth() === month;
};

// Tarihi YYYY-MM-DD formatına dönüştürür
export const formatDateISO = (date) => {
  return date.toISOString().split('T')[0];
};

// Tarihi yerel formatta görüntüler
export const formatDateLocale = (date, locale = 'tr-TR') => {
  return date.toLocaleDateString(locale);
};

// Ayın adını döndürür
export const getMonthName = (date, locale = 'tr-TR') => {
  return date.toLocaleString(locale, { month: 'long', year: 'numeric' });
}; 