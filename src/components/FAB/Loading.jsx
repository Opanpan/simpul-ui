export default function Loading({ title }) {
  return (
    <div className='flex flex-col items-center justify-center gap-3'>
      <span
        className='
      inline-block
      w-12 h-12
      border-[5px] border-[#F8F8F8] border-b-[#C4C4C4]
      rounded-full
      box-border
      animate-[rotation_1.2s_linear_infinite]
    '
      ></span>
      <p>Loading {title} ...</p>
    </div>
  );
}
