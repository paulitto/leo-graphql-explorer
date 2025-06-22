'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Spinner, Center } from '@chakra-ui/react';
import { useRegistration } from '@/context/RegistrationContext';

type RegistrationGuardProps = {
  children: React.ReactNode;
}

/**
 * Guard comopnent to be used on the root level
 * Checks if user is registered and redirects to registration if needed
 */
export default function RegistrationGuard({ children }: RegistrationGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { isRegistered, isReady } = useRegistration();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {

    // exit early if user data is not ready
    // to avoid brief rendering of wrong page before redirection
    if (!isReady) {
      return;
    }

    if (pathname === '/register') {
      setIsLoading(false);
      return;
    }

    if (!isRegistered) {
      router.push('/register');
      return;
    }

    setIsLoading(false);
  }, [router, pathname, isRegistered, isReady]);

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner />
      </Center>
    );
  }

  return <>{children}</>;
}
