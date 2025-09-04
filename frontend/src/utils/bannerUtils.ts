// Utility functions for managing the upgrade banner behavior

export const hideUpgradeBanner = () => {
  // Mark that user has made their first request
  sessionStorage.setItem('user-first-request', 'true');
  
  // Dispatch custom event to notify banner component
  window.dispatchEvent(new CustomEvent('userFirstRequest'));
};

export const showUpgradeBanner = () => {
  // Remove the session storage flag to show banner again
  sessionStorage.removeItem('user-first-request');
};

export const hasUserInteracted = () => {
  return sessionStorage.getItem('user-first-request') === 'true';
};