import { ReactNode, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import dots from '@/assets/dots.svg';

interface PopUpProps {
  name: string;
  children: ReactNode;
  className?: string;
}

const PopUp: React.FC<PopUpProps> = ({ name, children, className }) => {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePopUp = () => {
    setShow(!show);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    // Check if the new focused element is inside the popup
    if (!containerRef.current?.contains(e.relatedTarget)) {
      setShow(false);
    }
  };

  return (
    <div
      className={twMerge('relative', className)}
      ref={containerRef}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <div className="mx-8">
        <button
          className={`w-full rounded-lg px-4 py-2 text-left text-white hover:bg-white/10 ${show ? 'bg-white/10' : ''}`}
          onClick={togglePopUp}
        >
          <div className="flex items-center justify-between">
            {name}
            <img src={dots} alt="dots" />
          </div>
        </button>
      </div>
      {show && (
        <div className="absolute bottom-16 z-10 w-full">
          <div className="mx-8 flex flex-col gap-2 rounded-xl bg-slate-950 p-2 shadow-lg">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopUp;
