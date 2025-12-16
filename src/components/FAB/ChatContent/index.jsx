import {
  useDeleteMessageMutation,
  useLazyGetMessageQuery,
  usePostMessageMutation,
} from '@/api/conversationsApi';
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import DropdownDelete from '../TaskContent/DropdownDelete';
import MoreOptions from './MoreOptions';

const CURRENT_USER = 3;

export default function ChatContent({ data }) {
  const [message, setMessage] = useState('');

  const [triggerMessages, { data: dataMessages, isFetching: isFetchingInbox }] =
    useLazyGetMessageQuery();

  const [
    triggerPostMessage,
    { isLoading: isLoadingPostMessage, isSuccess: isSuccessPostMessage },
  ] = usePostMessageMutation();

  const [
    triggerDeleteMessage,
    { isLoading: isLoadingDeleteMessage, isSuccess: isSuccessDeleteMessage },
  ] = useDeleteMessageMutation();

  const handleSendMessage = () => {
    triggerPostMessage({
      id: data.id,
      body: {
        senderId: CURRENT_USER,
        content: message,
      },
    });
  };

  function formatDate(val) {
    const d = new Date(val);

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  useEffect(() => {
    if (data) {
      triggerMessages({ id: data.id });
    }
  }, [data]);

  useEffect(() => {
    if (!isLoadingPostMessage && isSuccessPostMessage) {
      triggerMessages({ id: data.id });
      setMessage('');
    }
  }, [isLoadingPostMessage, isSuccessPostMessage]);

  useEffect(() => {
    if (!isLoadingDeleteMessage && isSuccessDeleteMessage) {
      triggerMessages({ id: data.id });
    }
  }, [isLoadingDeleteMessage, isSuccessDeleteMessage]);

  return (
    <>
      <div className='p-5 min-h-[600px] max-h-[600px] overflow-y-auto'>
        <div className='flex flex-col gap-5'>
          {dataMessages?.map((item) => {
            return (
              <div
                className={cn(
                  item.senderId === CURRENT_USER
                    ? 'justify-end'
                    : 'justify-start',
                  'flex w-full'
                )}
              >
                <div className='flex flex-col gap-[2px]'>
                  <p
                    className={cn(
                      item.senderId === CURRENT_USER
                        ? 'text-[#9B51E0]'
                        : 'text-[#E5A443]',
                      'font-semibold'
                    )}
                  >
                    {item.senderName}
                  </p>
                  <div
                    className={cn(
                      item.senderId === CURRENT_USER
                        ? 'flex-row-reverse'
                        : 'flex-row',
                      'flex gap-2 w-full'
                    )}
                  >
                    <div
                      className={cn(
                        item.senderId === CURRENT_USER
                          ? 'bg-[#EEDCFF]'
                          : 'bg-[#FCEED3]',
                        'p-[10px] rounded-[5px] w-full'
                      )}
                    >
                      <input value={item.content} />
                      {/* <p className=''>{item.content}</p> */}
                      <p className='text-xs mt-3'>
                        {formatDate(item.createdAt)}
                      </p>
                    </div>

                    <div className='flex justify-end gap-2'>
                      <MoreOptions
                        id={item.id}
                        canEdit={item.senderId === CURRENT_USER}
                        onClickDelete={triggerDeleteMessage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='px-[25px] flex gap-3'>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a new message'
          className='px-4 w-full border-gray-3 border'
        />
        <button
          onClick={() => handleSendMessage()}
          className='flex items-center justify-center bg-blue-1 cursor-pointer text-white font-semibold py-3 px-5 rounded-[5px]'
        >
          Send
        </button>
      </div>
    </>
  );
}
