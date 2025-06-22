'use client';

import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
} from '@chakra-ui/react';

import { RegistrationForm } from '@/components/registration/RegistrationForm';
import { useRegistration } from '@/context/RegistrationContext';

// location to redirect to after registration
const LANDING_PAGE = '/characters';

/*
 * Initial registration page
 */
export default function RegistrationPage() {
  const router = useRouter();
  const { isRegistered } = useRegistration();
  
  const onSuccess = () => {
    router.push(LANDING_PAGE);
  };
  return (
    <Container
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent={'center'}
    >
      <Box p={8}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
      >
        <RegistrationForm
          title="Welcome to the Rick and Morty Explorer"
          subtitle={isRegistered ? 'You can update your details here' : 'Please register to access the content.'}
          onSuccess={onSuccess}
        ></RegistrationForm>
      </Box>
    </Container>
  );
}
