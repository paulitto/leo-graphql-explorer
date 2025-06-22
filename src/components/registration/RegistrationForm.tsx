'use client';

import { useState } from 'react';
import {
  Stack,
  Input,
  Button,
  Fieldset,
  Field,
  Box,
  HStack,
} from '@chakra-ui/react';
import { toaster } from '@/components/chakra-ui/toaster';
import { useRegistration } from '@/context/RegistrationContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AlertDialog } from '../ui/AlertDialog';

export type RegistrationFormProps = {
  onSuccess: () => void;
  onCancel?: () => void;
  showCancelButton?: boolean;
  showResetButton?: boolean;
  title?: string;
  subtitle?: string;
}

/**
 * A form to be used for user registration.
 * Can be reused for both editing and creating new registration.
 */
export const RegistrationForm = ({
  onSuccess,
  onCancel,
  showCancelButton = false,
  showResetButton = false,
  title,
  subtitle,
}: RegistrationFormProps) => {
  const { registrationData, register, clearRegistrationData } = useRegistration();
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)

  const [username, setUsername] = useState(registrationData?.username || '');
  const [jobTitle, setJobTitle] = useState(registrationData?.jobTitle || '');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !jobTitle.trim()) {
      toaster.create({
        title: "Invalid Input",
        description: "Please enter username and job title",
        type: 'error',
        duration: 3000,
        closable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      register({
        username: username.trim(),
        jobTitle: jobTitle.trim(),
      });

      toaster.create({
        title: 'Welcome!',
        description: 'Registered successfully',
        type: 'success',
        duration: 2000,
        closable: true,
      });

      onSuccess?.();
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: 'Failed to register. Please try again later.',
        type: 'error',
        duration: 3000,
        closable: true,
      });
      console.error('Failed to register:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {


    clearRegistrationData();
    router.push('/register');
  };

  return (
    <Box as="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
    >
      <Fieldset.Root size="lg" maxW="md">
        <Stack gap={6}>
          {(title || subtitle) &&
            (<Stack gap={2}>
              {title && <Fieldset.Legend>{title}</Fieldset.Legend>}
              {subtitle && <Fieldset.HelperText>{subtitle}</Fieldset.HelperText>}
            </Stack>)
          }

          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input
                required
                px={4}
                name="username"
                placeholder="User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Job Title</Field.Label>
              <Input
                required
                px={4}
                name="jobtitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Job Title"
                disabled={isLoading}
              />
            </Field.Root>
          </Fieldset.Content>
          <HStack gap={3} justifyContent={'flex-start'}>
            {showResetButton && <Link href="#" onClick={() => {
              setIsConfirmDeleteOpen(true);
            }}>Reset your details</Link>}
          </HStack>
          <HStack gap={3} justifyContent={'space-between'}>
            {showCancelButton && <Button
              type="button"
              variant="outline"
              size="lg"
              w="auto"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            }

            <Button
              disabled={isLoading || !username || !jobTitle}
              type="submit"
              size="lg"
              w={showCancelButton ? 'auto' : 'full'}
              loading={isLoading}
              loadingText="Saving..."
            >
              Submit
            </Button>


          </HStack>
        </Stack>
      </Fieldset.Root>
      <AlertDialog
        title="Delete Item"
        description="This action cannot be undone."
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleReset}
      />
    </Box>
  );
};