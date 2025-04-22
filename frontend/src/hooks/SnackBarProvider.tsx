import React, { createContext, useContext, useState } from 'react';
import SnackBar from '../component/snackBar';

type Snackbar = {
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number; // in milliseconds
};

type SnackbarContextType = {
  showSnackbar: (snackbar: Snackbar) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<Snackbar | null>(null);

  const showSnackbar = (snackbar: Snackbar) => {
    setSnackbar(snackbar);
    setTimeout(() => setSnackbar(null), snackbar.duration || 2000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && <SnackBar message={snackbar.message} type={snackbar.type} />}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  return context.showSnackbar;
};
