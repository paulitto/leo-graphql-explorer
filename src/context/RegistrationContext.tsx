'use client';

import { type RegistrationData, type UserData } from '@/types';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const REGISTRATION_KEY = 'registrationData';

type RegistrationContextType = {
  isRegistered: boolean;
  registrationData: RegistrationData | null;
  register: (data: UserData) => void;
  clearRegistrationData: () => void;
  isReady: boolean;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

/**
 * Provider for RegistrationContext
 * can be used to register a user and retrieve the registration data
 * could be updated later for different storage options
 */
export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const data = localStorage.getItem(REGISTRATION_KEY);
      setRegistrationData(data ? JSON.parse(data) : null);
    } catch {
      setRegistrationData(null);
    } finally {
      setIsReady(true);
    }
  }, []);

  const register = (data: UserData) => {
    const userData = {
      ...data,
      registeredDateTime: new Date().toISOString(),
    };

    localStorage.setItem(REGISTRATION_KEY, JSON.stringify(userData));
    setRegistrationData(userData);
  };

  const clearRegistrationData = () => {
    localStorage.removeItem(REGISTRATION_KEY);
    setRegistrationData(null);
  };

  return (
    <RegistrationContext.Provider
      value={{
        isRegistered: registrationData !== null,
        registrationData,
        register,
        clearRegistrationData,
        isReady,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}


/**
 * Helper hook to access the registration context of RegisterationContextType.
 * @description
 * Note, need to check isReady along with isRegistered to make sure the registration data is ready.
 * @example
 * const { isRegistered, isReady, register, clearRegistrationData } = useRegistration();
 */
export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be within a RegistrationProvider');
  }
  return context;
}
