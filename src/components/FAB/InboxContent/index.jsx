import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../Loading';
import { useLazyGetInboxQuery } from '@/api/conversationsApi';
import PersonIcon from '@/icon/PersonIcon';
import ChatContent from '../ChatContent';
import { useState } from 'react';
import ArrowLeftIcon from '@/assets/arrow-left-icon.svg';
import CloseIcon from '@/assets/close-icon.svg';
import useDebounce from '@/hooks/useDebouse';

export default function InboxContent({ isOpen }) {
  const listRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [subject, setSubject] = useState(null);

  const debouncedSearchParams = useDebounce(searchQuery, 500, () => {
    triggerInbox({ id: 1 });
  });

  const [triggerInbox, { data: dataInbox, isFetching: isFetchingInbox }] =
    useLazyGetInboxQuery();

  function formatDate(val) {
    const d = new Date(val);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  useEffect(() => {
    if (isOpen) {
      setSubject(null);
      triggerInbox({ id: 1 });
    }
  }, [isOpen]);

  useEffect(() => {
    if (!subject) {
      triggerInbox({ id: 1 });
    }
  }, [subject]);

  useEffect(() => {
    if (debouncedSearchParams) {
      triggerInbox({ id: 1, search: searchQuery });
    }
  }, [debouncedSearchParams]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          className='fixed w-[734px] h-[734px] bottom-25 right-4 bg-white rounded-sm'
        >
          <div className='py-5 px-[25px] border-b'>
            {subject ? (
              <div className='grid grid-cols-[5%_90%_5%] gap-2'>
                <button
                  className='cursor-pointer w-fit'
                  onClick={() => setSubject(null)}
                >
                  <img src={ArrowLeftIcon} />
                </button>
                <div className='flex flex-col gap-[2px]'>
                  <p className='text-blue-1 font-bold truncate'>
                    {subject.title}
                  </p>
                  <p className='text-xs text-gray-1'>
                    {subject.totalParticipants} Participants
                  </p>
                </div>
                <button
                  className='cursor-pointer'
                  onClick={() => setSubject(null)}
                >
                  <img src={CloseIcon} />
                </button>
              </div>
            ) : (
              <input
                placeholder='Search'
                className='w-full px-5 py-[10px] border-gray-3 border rounded-[5px]'
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
          </div>

          {isFetchingInbox ? (
            <div className='w-full h-full flex justify-center items-center'>
              <Loading title='Chats' />
            </div>
          ) : subject ? (
            <ChatContent data={subject} />
          ) : (
            <div
              ref={listRef}
              className='flex flex-col max-h-[620px] gap-5 mt-5 px-5 overflow-y-auto px-5'
            >
              {dataInbox?.map((item) => {
                return (
                  <div
                    className='w-full border-b pb-7 cursor-pointer'
                    key={item.id}
                    onClick={() =>
                      setSubject({
                        title: item.subject,
                        id: item.id,
                        totalParticipants: item.participantIds.length,
                      })
                    }
                  >
                    <div className='grid grid-cols-[5%_70%_25%] gap-4'>
                      <div className='h-fit'>
                        <div className='w-fit bg-blue-1 p-2 rounded-full'>
                          <PersonIcon className='text-white' />
                        </div>
                      </div>

                      <div className=''>
                        <p className='text-blue-1 font-semibold'>
                          {item.subject}
                        </p>
                        <p className='text-gray-2 text-sm font-semibold mt-2'>
                          {item.lastMessageUser.name}
                        </p>
                        <p className='text-gray-2 text-sm break-words whitespace-normal'>
                          {item.lastMessage}
                        </p>
                      </div>
                      <p className='w-fit h-fit text-sm text-gray-2 font-light'>
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
