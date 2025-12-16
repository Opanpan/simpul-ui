import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '../hooks/useIsMobile';

const SIDEBAR_MENU = [
  { name: 'About', url: '/about' },
  { name: 'Skill', url: '/skill' },
  { name: 'Experience', url: '/experience' },
  { name: 'Contact', url: '/contact' },
];

export default function Sidebar() {
  const isMobile = useIsMobile();

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.9 }}
        className='flex z-49 items-center left-[10px] top-[10px] justify-center absolute h-[40px] w-[40px] bg-[#222] hover:bg-[#333] border border-[#333] p-2 rounded-[8px] text-white transition cursor-pointer'
        aria-label='Toggle sidebar'
      >
        <Menu size={14} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            key='sidebar'
            initial={{ x: -200, opacity: 0, width: 0 }}
            animate={{ x: 0, opacity: 1, width: isMobile ? '100%' : '180px' }}
            exit={{ x: -200, opacity: 0, width: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className=' left-0 top-0 h-screen bg-[#111111] overflow-hidden z-50 shadow-lg'
          >
            {/* Close button */}
            <div className='flex justify-end p-2'>
              <button
                onClick={() => setIsOpen(false)}
                className='flex items-center justify-center h-[40px] w-[40px] bg-[#222] hover:bg-[#333] border border-[#333] p-2 rounded-[8px] text-white transition cursor-pointer'
              >
                <X size={14} />
              </button>
            </div>

            <nav className='flex flex-col text-sm mt-[100px] text-center'></nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
