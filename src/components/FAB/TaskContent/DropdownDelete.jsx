import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import SettingIcon from '@/assets/setting-icon.svg';

export default function DropdownDelete({ id, triggerUpdateTask }) {
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
            className='text-red border py-3 pl-4 pr-[60px] rounded-[10px] border-gray-3 mt-2 bg-white cursor-pointer'
          >
            Delete
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
