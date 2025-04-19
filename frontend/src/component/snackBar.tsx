import check from '@/assets/check.svg';
import copy from '@/assets/copy.svg';

export interface SnackBarProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const SnackBar: React.FC<SnackBarProps> = ({ message, type }) => {
  // Define the styles for the snackbar based on the type
  const styles = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-neutral-500',
  };

  const images = {
    success: check,
    error: copy, // todo: add error image
    info: null,
  };

  // Set the default style to info if type is not provided
  const style = styles[type] || styles.info;
  const image = images[type] || null;

  return (
    <div
      className={`fixed bottom-4 right-1/2 flex translate-x-1/2 flex-row items-center rounded-md p-4 shadow-lg transition-opacity ease-in-out ${style}`}
    >
      {image && <img src={image} alt={type} className="mr-2 inline h-6 w-6" />}
      <p className="text-white">{message}</p>
    </div>
  );
};

export default SnackBar;
