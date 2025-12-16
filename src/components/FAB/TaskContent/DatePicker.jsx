import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import CalendarIcon from '@/assets/calendar-icon.svg';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { useEffect } from 'react';
import { cn, convertDisplayDate } from '@/lib/utils';

export function DatePicker({ id, value, triggerUpdateTask }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(null);

  const formatDate = (value) => {
    const day = String(value.getDate()).padStart(2, '0');
    const month = String(value.getMonth() + 1).padStart(2, '0');
    const year = value.getFullYear();

    return `${month}-${day}-${year}`;
  };

  const onChangeDate = (e) => {
    const formatedDate = formatDate(e);

    triggerUpdateTask({
      id: id,
      body: {
        expired_date: formatedDate,
      },
    });

    setDate(e);
    setOpen(false);
  };

  useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [open, value]);

  return (
    <div className='flex flex-col gap-3'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            id='date'
            className={cn(
              value ? 'font-semibold' : 'font-light',
              'text-gray-2 w-48 justify-between  border-gray-3'
            )}
          >
            {value ? convertDisplayDate(value) : 'Select date'}

            <img alt='calendar-icon' src={CalendarIcon} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            date={date}
            setDate={onChangeDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
