import { useState } from 'react';
import Button from './Button';
import copy from '@/assets/copy.svg';
import check from '@/assets/check.svg';
import { useSnackbar } from '../hooks/SnackBarProvider';

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);
  const showSnackbar = useSnackbar();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    showSnackbar({ message: 'Copied to clipboard!', type: 'success' });
    setTimeout(() => {
      setIsCopied(false);
    }, 2000); // Reset after 2 seconds
  };

  return (
    <Button onClick={handleCopy} color="icon">
      <img src={isCopied ? check : copy} alt="Copy" className="h-4 w-4" />
    </Button>
  );
};

export default CopyButton;
