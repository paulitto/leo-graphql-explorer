import { Container, Stack } from "@chakra-ui/react";

/**
 * Footer component to be used in the bottom of the page/layout.
 */
export const Footer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container as="footer" height={16} bg="gray.50">
            <Stack direction="row" justify="center" align="center" height="100%">
                {children}
            </Stack>
        </Container>
    );
};