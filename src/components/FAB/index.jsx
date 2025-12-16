import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import FABIcon from '@/assets/fab-icon.svg';
import TaskIcon from '@/icon/TaskIcon';
import InboxIcon from '@/icon/InboxIcon';
import TaskContent from './TaskContent';
import InboxContent from './InboxContent';

export default function FAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFAB, setSelectedFAB] = useState('');
  const [menuFAB, setSelectedMenuFAB] = useState([
    {
      title: 'Task',
      value: 'task',
      Icon: TaskIcon,
      activeColor: 'text-white',
      inactiveColor: 'text-[#F8B76B]',
      bgActive: 'bg-[#F8B76B]',
    },
    {
      title: 'Inbox',
      value: 'inbox',
      Icon: InboxIcon,
      activeColor: 'text-white',
      inactiveColor: 'text-[#8785FF]',
      bgActive: 'bg-[#8785FF]',
    },
  ]);
  const [styleVariants, setStyleVariants] = useState({
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  });

  const onClickFAB = (type) => {
    if (type === selectedFAB) {
      setSelectedFAB('');
      setStyleVariants((prev) => ({
        ...prev,
        visible: { opacity: 1, x: 0 },
      }));
    } else {
      const sorted = menuFAB
        .filter((item) => item.value !== type)
        .concat(menuFAB.filter((item) => item.value === type));

      setSelectedMenuFAB(sorted);
      setSelectedFAB(type);

      setStyleVariants((prev) => ({
        ...prev,
        visible: { opacity: 1, x: 105 },
      }));
    }
  };

  return (
    <>
      <TaskContent isOpen={selectedFAB === 'task'} />
      <InboxContent isOpen={selectedFAB === 'inbox'} />

      <div className='fixed bottom-4 right-4 flex items-end gap-[26px]'>
        <AnimatePresence>
          {isOpen && (
            <>
              {menuFAB.map((item, index) => {
                return (
                  <motion.button
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    variants={styleVariants}
                    transition={{ duration: 0.25 }}
                    className='flex flex-col items-center justify-center gap-3 cursor-pointer'
                    onClick={() => onClickFAB(item.value)}
                    key={index}
                  >
                    {!selectedFAB && (
                      <p className='text-[#F2F2F2] font-semibold'>
                        {item.title}
                      </p>
                    )}
                    <div
                      className={cn(
                        selectedFAB === item.value ? item.bgActive : 'bg-white',
                        'p-5 w-fit rounded-full'
                      )}
                    >
                      <item.Icon
                        className={cn(
                          selectedFAB === item.value
                            ? item.activeColor
                            : item.inactiveColor
                        )}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </>
          )}
        </AnimatePresence>

        <button
          aria-label='FAB Icon'
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            selectedFAB ? 'bg-[#4F4F4F]' : 'bg-[#2F80ED] ',
            'p-[6px] w-fit rounded-full cursor-pointer'
          )}
        >
          <img alt='FAB-icon' src={FABIcon} />
        </button>
      </div>
    </>
  );
}
