import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border border-gray-300 p-2 rounded-md w-full ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export default Input;
