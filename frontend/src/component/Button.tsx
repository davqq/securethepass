import { ReactNode } from 'react';
import { ClassNameValue, twMerge } from 'tailwind-merge';

interface Props {
  color: 'blue' | 'red' | 'neutral' | 'icon';
  value?: string | undefined;
  id?: string | undefined;
  name?: string | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string | undefined;
  type?: 'button' | 'reset' | 'submit' | undefined;
  children: ReactNode;
  [key: string]: any;
}

const Button: React.FC<Props> = ({
  color,
  value,
  id,
  name,
  onClick,
  className = '',
  type,
  children,
  props,
}) => {
  let baseClassName: ClassNameValue =
    'py-2 px-4 flex justify-center rounded-md content-center shadow-sm text-sm text-center font-medium text-white';

  if (color === 'blue') {
    baseClassName = twMerge(
      baseClassName,
      'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
    );
  } else if (color === 'red') {
    baseClassName = twMerge(
      baseClassName,
      'bg-red-500 hover:bg-red-600 active:bg-red-700'
    );
  } else if (color === 'neutral') {
    baseClassName = twMerge(
      baseClassName,
      'bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700'
    );
  } else if (color === 'icon') {
    baseClassName = twMerge(
      baseClassName,
      'px-2 rounded-full bg-transparent hover:bg-white/10 active:bg-white/20'
    );
  }

  return (
    <button
      type={type}
      value={value}
      onClick={onClick}
      id={id}
      name={name}
      className={twMerge(baseClassName, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
