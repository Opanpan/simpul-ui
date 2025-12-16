import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function Title({ id, value, triggerUpdateTask, isDone }) {
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
    if (e.key === 'Enter') {
      triggerUpdateTask({
        id: id,
        body: {
          title: currentValue,
        },
      });
      e.target.blur();
    }
  };

  return (
    <input
      value={currentValue}
      placeholder='Type Task Title'
      onChange={(e) => setCurrentValue(e.target.value)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        handleBorderInput(),
        isFocused || !currentValue ? 'px-[14px] py-[14px]' : '',
        isDone && !isFocused && currentValue && 'line-through',
        'w-[380px] text-sm rounded-md outline-none transition-all duration-200 text-gray-2 font-semibold placeholder:text-sm placeholder:text-gray-2 placeholder:font-light'
      )}
      onKeyDown={onClickEnter}
    />
  );
}
