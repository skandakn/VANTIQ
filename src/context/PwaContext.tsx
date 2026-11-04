// src/context/PwaContext.tsx
// Global State & Controller for Progressive Web App Installation and Offline Resilience
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface PwaContextType {
  isInstallable: boolean;
  isInstalled: boolean;
  isIos: boolean;
  isOffline: boolean;
  showInstallModal: boolean;
  setShowInstallModal: (show: boolean) => void;
  promptInstall: () => Promise<void>;
}

const PwaContext = createContext<PwaContextType | undefined>(undefined);

export const PwaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
  });

  const [isIos, setIsIos] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(() => typeof navigator !== 'undefined' ? !navigator.onLine : false);
  const [showInstallModal, setShowInstallModal] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAppleIos = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isAppleIos);

    // Online / Offline listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for Chrome/Edge/Android beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    // Listen for successful installation
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setShowInstallModal(false);
      console.log('[VANTIQ PWA] App was successfully installed.');
    };

    // Monitor display-mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayChange = (e: MediaQueryListEvent) => {
      setIsInstalled(e.matches);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    mediaQuery.addEventListener('change', handleDisplayChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', handleDisplayChange);
    };
  }, []);

  const promptInstall = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setIsInstalled(true);
          setIsInstallable(false);
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.warn('[VANTIQ PWA] Prompt failed, opening fallback modal:', err);
        setShowInstallModal(true);
      }
    } else {
      // If deferredPrompt is null (e.g. desktop Chrome already triggered, iOS Safari, or Firefox)
      setShowInstallModal(true);
    }
  };

  return (
    <PwaContext.Provider
      value={{
        isInstallable,
        isInstalled,
        isIos,
        isOffline,
        showInstallModal,
        setShowInstallModal,
        promptInstall,
      }}
    >
      {children}
    </PwaContext.Provider>
  );
};

export const usePwa = (): PwaContextType => {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error('usePwa must be used within a PwaProvider');
  }
  return context;
};
