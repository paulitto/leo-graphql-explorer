import type { Metadata } from "next";
import "./variables.css";

import { ChakraUIProvider } from "@/providers/ChakraProvider"
import RegistrationGuard from "@/guards/RegistrationGuard";
import { RegistrationProvider } from "@/context/RegistrationContext";

import { Toaster } from "@/components/chakra-ui/toaster";
import {
  Container,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { ApolloClientProvider } from "@/providers/ApolloClientProvider";

export const metadata: Metadata = {
  title: "Rick and Morty Characters Explorer",
  description: "Explore the characters of the Rick and Morty universe",
};

/**
 * Root page with the main layout for the app
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning as per docs from Ckakra https://chakra-ui.com/docs/get-started/frameworks/next-app#setup-provider
    <html lang="en" suppressHydrationWarning>
      <body>
        <ApolloClientProvider>
          <ChakraUIProvider>
            <RegistrationProvider>
              <RegistrationGuard>
                <Stack gap={0} minH="100vh" display="flex" justifyContent="space-between" flexDirection="column">
                  <Header>
                    <Heading as="h3" size="lg" textAlign="center">
                      Rick And Morty Explorer
                    </Heading>
                  </Header>

                  <Container
                    as="main" display="flex" justifyContent="center" alignItems="start"
                    height="calc(100vh - 2 * var(--chakra-sizes-16))"
                    overflowY="auto"
                  >
                    {children}
                  </Container>

                  <Footer>
                    <Text fontSize="sm" color="fg.muted">
                      Challenge Brief (v3.5) Web Team
                    </Text>
                  </Footer>

                </Stack>

                <Toaster />
              </RegistrationGuard>
            </RegistrationProvider>
          </ChakraUIProvider>
        </ApolloClientProvider>

      </body>
    </html>
  );
}
