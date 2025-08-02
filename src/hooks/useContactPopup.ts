import { useState, useEffect } from 'react';

interface UseContactPopupReturn {
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  hasShownPopup: boolean;
}

const useContactPopup = (delaySeconds: number = 5): UseContactPopupReturn => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasShownPopup, setHasShownPopup] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem('contactPopupShown');
    
    if (hasSeenPopup) {
      setHasShownPopup(true);
      return;
    }

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
      setHasShownPopup(true);
      sessionStorage.setItem('contactPopupShown', 'true');
    }, delaySeconds * 1000);

    return () => clearTimeout(timer);
  }, [delaySeconds]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return {
    isPopupOpen,
    openPopup,
    closePopup,
    hasShownPopup
  };
};

export default useContactPopup; 