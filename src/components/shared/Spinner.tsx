import { cn } from '../../../lib/utils';
import React from 'react';

const Spinner = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'border-gray-600 size-5 animate-spin rounded-full border-2 border-t-white',
        props.className
      )}
    />
  );
};

export default Spinner;
