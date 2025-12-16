import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function TextArea({ id, value, triggerUpdateTask }) {
  const [currentValue, setCurrentValue] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);

  const handleBorderInput = () => {
    if (!currentValue) {
      return 'border border-gray-3';
    } else if (isFocused) {
      return 'border border-gray-3';
    } else {
      return 'border-transparent';
    }
  };

  const onClickEnter = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      triggerUpdateTask({
        id: id,
        body: {
          description: currentValue,
        },
      });
      e.target.blur();
    }
  };

  return (
    <textarea
      value={currentValue}
      placeholder='No Description'
      onChange={(e) => setCurrentValue(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      rows={3}
      className={cn(
        handleBorderInput(),
        isFocused || !currentValue ? 'pl-[14px] pt-[14px]' : '',
        'w-full text-sm pr-[14px] pb-[14px] rounded-md outline-none transition-all duration-200 text-gray-2 font-semibold placeholder:text-gray-2 placeholder:font-light resize-none'
      )}
      onKeyDown={onClickEnter}
    />
  );
}
