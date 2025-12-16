import {
  useDeleteMessageMutation,
  useLazyGetMessageQuery,
  usePostMessageMutation,
} from '@/api/conversationsApi';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useEffect } from 'react';
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

  const formatDate = (val) => {
    const d = new Date(val);

    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  };

  const formatChatDate = (dateString) => {
    let result = '';

    if (
      new Date().toLocaleDateString('en-CA', { timeZone: 'UTC' }) ===
      new Date(dateString).toLocaleDateString('en-CA', { timeZone: 'UTC' })
    ) {
      result = 'Today ';
    }

    result += new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });

    return result;
  };

  const isSameDate = (dateA, dateB, timeZone = 'UTC') => {
    const a = new Date(dateA).toLocaleDateString('en-CA', { timeZone });
    const b = new Date(dateB).toLocaleDateString('en-CA', { timeZone });
    return a === b;
  };

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
      <div className='p-5 min-h-[585px] max-h-[585px] overflow-y-auto'>
        <div className='flex flex-col gap-5'>
          {dataMessages?.map((item, index) => {
            return (
              <>
                {!isSameDate(
                  item.createdAt,
                  dataMessages[index - 1]?.createdAt
                ) && (
                  <div className='flex items-center my-2 font-semibold text-gray-2'>
                    <div className='flex-1 border-t border-gray-2'></div>
                    <span className='mx-3 whitespace-nowrap'>
                      {formatChatDate(item.createdAt)}{' '}
                    </span>
                    <div className='flex-1 border-t border-gray-2'></div>
                  </div>
                )}

                <div
                  className={cn(
                    item.senderId === CURRENT_USER
                      ? 'justify-end'
                      : 'justify-start',
                    'flex w-full'
                  )}
                >
                  <div className='flex flex-col gap-[2px] w-full min-w-0'>
                    <p
                      className={cn(
                        item.senderId === CURRENT_USER
                          ? 'text-right text-[#9B51E0]'
                          : 'text-left text-[#E5A443]',
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
                        'flex gap-2 w-full min-w-0'
                      )}
                    >
                      <div
                        className={cn(
                          item.senderId === CURRENT_USER
                            ? 'bg-[#EEDCFF]'
                            : 'bg-[#FCEED3]',
                          'p-[10px] rounded-[5px] max-w-[75%] min-w-0'
                        )}
                      >
                        <p className='break-words whitespace-pre-wrap'>
                          {item.content}
                        </p>
                        <p className='text-xs mt-3'>
                          {formatDate(item.createdAt)}
                        </p>
                      </div>

                      <div className='flex justify-end gap-2 shrink-0'>
                        <MoreOptions
                          id={item.id}
                          canEdit={item.senderId === CURRENT_USER}
                          onClickDelete={triggerDeleteMessage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

      <form
        className='px-[25px] py-2 flex gap-3'
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a new message'
          className='px-4 w-full border-gray-3 border'
        />
        <button
          type='submit'
          className='flex items-center justify-center bg-blue-1 cursor-pointer text-white font-semibold py-3 px-5 rounded-[5px]'
        >
          Send
        </button>
      </form>
    </>
  );
}
