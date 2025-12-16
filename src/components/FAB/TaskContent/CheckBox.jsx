export default function CheckBox({ id, value, triggerUpdateTask }) {
  return (
    <input
      type='checkbox'
      checked={value}
      className='h-[18px] w-[18px]'
      onChange={(e) =>
        triggerUpdateTask({ id: id, body: { is_done: e.target.checked } })
      }
    />
  );
}
