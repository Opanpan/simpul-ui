import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';

function Collapsible({ ...props }) {
  return <CollapsiblePrimitive.Root data-slot='collapsible' {...props} />;
}

function CollapsibleTrigger({ ...props }) {
  return (
    <CollapsiblePrimitive.CollapsibleTrigger
      data-slot='collapsible-trigger'
      {...props}
    />
  );
}

function CollapsibleContent({ ...props }) {
  return (
    <CollapsiblePrimitive.CollapsibleContent
      data-slot='collapsible-content'
      className='transition-all duration-300 overflow-hidden 
        data-[state=open]:animate-[collapsible-down_0.2s_ease-out] 
        data-[state=closed]:animate-[collapsible-up_0.2s_ease-out]'
      {...props}
    />
  );
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
