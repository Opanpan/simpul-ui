import {
  useAddTaskMutation,
  useLazyGetTasksQuery,
  useUpdateTaskMutation,
} from '@/api/taskApi';
import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClockIcon from '@/assets/clock-icon.svg';
import DescriptionIcon from '@/assets/description-icon.svg';
import Loading from '../Loading';
import InputTitle from './Title';
import TextArea from './TextArea';
import { DatePicker } from './DatePicker';
import { convertDisplayDate } from '@/lib/utils';
import InputCheckBox from './CheckBox';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ChevronUp } from 'lucide-react';
import DropdownDelete from './DropdownDelete';

export default function TaskContent({ isOpen }) {
  const listRef = useRef(null);

  const [triggerGetTasks, { data: dataTasks, isFetching: isFetchingTasks }] =
    useLazyGetTasksQuery();

  const [
    triggerAddTask,
    { isLoading: isLoadingAddTask, isSuccess: isSuccessAddTask },
  ] = useAddTaskMutation();

  const [
    triggerUpdateTask,
    { isLoading: isLoadingUpdateTask, isSuccess: isSuccessUpdateTask },
  ] = useUpdateTaskMutation();

  const getDaysLeft = (val) => {
    const today = new Date();
    const target = new Date(val);

    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((target - today) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return `Expired Today`;
    } else if (diffDays <= 5 && diffDays > 0) {
      return `${diffDays} days left`;
    } else if (diffDays < 0) {
      return 'Expired';
    } else {
      return null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      triggerGetTasks();
    }
  }, [isOpen]);

  useEffect(() => {
    if ((!isLoadingAddTask && isSuccessAddTask) || isSuccessUpdateTask) {
      triggerGetTasks();
    }
  }, [isLoadingAddTask, isSuccessAddTask, isSuccessUpdateTask]);

  useEffect(() => {
    if (dataTasks && listRef.current && isSuccessAddTask) {
      const el = listRef.current;
      el.scrollTo({
        top: el.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [dataTasks]);

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
          <div className='flex justify-between pt-5 pr-5'>
            <div className='pl-[80px]'>
              <button className='border border-[#828282] px-[14px] py-[10px] rounded-[5px]'>
                My Tasks
              </button>
            </div>
            <button
              aria-label='Create Task'
              onClick={() => triggerAddTask({})}
              className='text-white bg-[#2F80ED] px-4 py-2 rounded-[5px] font-semibold cursor-pointer '
            >
              New Task
            </button>
          </div>

          {isFetchingTasks || isLoadingUpdateTask ? (
            <div className='w-full h-full flex justify-center items-center'>
              <Loading title='Task List' />
            </div>
          ) : (
            <div
              ref={listRef}
              className='flex flex-col max-h-[620px] gap-5 mt-5 px-5 overflow-y-auto'
            >
              {dataTasks?.map((item) => {
                return (
                  <Collapsible
                    defaultOpen={true}
                    className='border-b pb-5'
                    key={item.id}
                  >
                    <CollapsibleTrigger asChild>
                      <div className='group grid grid-cols-[5%_85%_10%]'>
                        {/* Checkbox */}
                        <div
                          className='flex items-center justify-center w-fit'
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <InputCheckBox
                            id={item.id}
                            triggerUpdateTask={triggerUpdateTask}
                            value={item.is_done}
                          />
                        </div>

                        {/* Title and Expired */}
                        <div className='flex justify-between'>
                          <div
                            className='w-fit flex items-start justify-center'
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <div className=''>
                              <InputTitle
                                id={item.id}
                                value={item.title}
                                triggerUpdateTask={triggerUpdateTask}
                                isDone={item.is_done}
                              />
                            </div>
                          </div>
                          <div className='flex justify-between items-center gap-2'>
                            {item.expired_date && (
                              <p className='text-sm text-red'>
                                {getDaysLeft(item.expired_date)}
                              </p>
                            )}
                            <p className='text-sm text-gray-2'>
                              {convertDisplayDate(item.expired_date)}
                            </p>
                          </div>
                        </div>

                        {/* Button Collapse */}
                        <div className='flex justify-end gap-2'>
                          <button
                            aria-label='Collaps Button'
                            className='flex h-fit items-start justify-center cursor-pointer'
                          >
                            <ChevronUp className='w-[20px] h-[20px] !text-black transition-transform duration-200 rotate-180 group-data-[state=open]:rotate-0' />
                          </button>

                          <DropdownDelete
                            id={item.id}
                            triggerUpdateTask={triggerUpdateTask}
                          />
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className='grid grid-cols-[5%_85%_10%] mt-3'>
                        <div className=''></div>
                        <div className='flex flex-col'>
                          <div className='grid grid-cols-[5%_95%] gap-2 items-start'>
                            <div className='flex items-center h-full'>
                              <img alt='clock-icon' src={ClockIcon} />
                            </div>
                            <DatePicker
                              id={item.id}
                              triggerUpdateTask={triggerUpdateTask}
                              value={item.expired_date}
                            />
                          </div>

                          <div className='grid grid-cols-[5%_95%] gap-2 items-start mt-4'>
                            <div className='flex items-start h-full'>
                              <img
                                alt='description-icon'
                                src={DescriptionIcon}
                              />
                            </div>
                            <TextArea
                              id={item.id}
                              value={item.description}
                              triggerUpdateTask={triggerUpdateTask}
                            />
                          </div>
                        </div>
                        <div className=''></div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
