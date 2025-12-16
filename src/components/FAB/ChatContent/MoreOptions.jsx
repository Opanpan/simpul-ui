import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import SettingIcon from '@/assets/setting-icon.svg';
import { useState } from 'react';

export default function MoreOptions({ id, canEdit, onClickDelete }) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label='Setting Icon'
            className='flex h-fit items-center justify-center cursor-pointer'
          >
            <img
              alt='setting-icon'
              src={SettingIcon}
              className='w-[20px] h-[20px]'
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <div className='flex flex-col border border-gray-4 rounded-sm'>
            {canEdit && (
              <button
                aria-label='Delete Task'
                onClick={() => {
                  triggerUpdateTask({
                    id: id,
                    body: {
                      is_delete: true,
                    },
                  });
                }}
                className='text-blue-1 py-3 pl-4 pr-[60px] border-b border-gray-4 bg-white cursor-pointer'
              >
                Edit
              </button>
            )}
            <button
              aria-label='Delete Task'
              onClick={() => onClickDelete({ id: id })}
              className='text-red py-3 pl-4 pr-[60px] bg-white cursor-pointer'
            >
              Delete
            </button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
