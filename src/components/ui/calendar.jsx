import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import './calendar.css';

export function Calendar({ date, setDate }) {
  const formatters = {
    formatWeekdayName: (date) => {
      const weekday = date.getDay();
      const labels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

      return labels[weekday];
    },
  };

  return (
    <DayPicker
      mode='single'
      selected={date}
      onSelect={setDate}
      navLayout='around'
      formatters={formatters}
      animate
    />
  );
}
