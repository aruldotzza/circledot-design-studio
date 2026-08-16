import React, { createContext, useContext, useState, useEffect } from 'react';

interface NavigationContextType {
  currentPath: string;
  navigateTo: (path: string) => void;
  isEnquiryModalOpen: boolean;
  preselectedCategory: string | null;
  openEnquiryModal: (preselectedCategory?: string) => void;
  closeEnquiryModal: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [preselectedCategory, setPreselectedCategory] = useState<string | null>(null);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openEnquiryModal = (category?: string) => {
    if (category) setPreselectedCategory(category);
    setIsEnquiryModalOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryModalOpen(false);
    setPreselectedCategory(null);
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        navigateTo,
        isEnquiryModalOpen,
        preselectedCategory,
        openEnquiryModal,
        closeEnquiryModal,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
