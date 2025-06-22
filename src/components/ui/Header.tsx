"use client"

import { LuMenu } from "react-icons/lu"
import {
    Button,
    CloseButton,
    Container,
    Drawer,
    IconButton,
    Image,
    Portal,
    Separator,
    Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { RegistrationModal } from "../registration/RegistrationModal";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRegistration } from "@/context/RegistrationContext";

type HeaderProps = {
    children?: React.ReactNode;
}
/**
 * Header component to be used in the top of the page/layout.
 */
export const Header = ({ children }: HeaderProps) => {
    const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
    const { registrationData, isRegistered } = useRegistration()
    const pathname = usePathname();

    if (!isRegistered) {
        return null;
    }
    return (
        <>
            <Container as="header" height={16} bg="gray.50" w="full" minW="100%">
                <Stack direction="row" justify="space-between" align="center" height="100%">
                    <Link href="/">
                        <Image
                            src="/rickmorty.jpeg"
                            boxSize="32px"
                            borderRadius="full"
                            fit="cover"
                            alt="Rick and Morty Logo"
                        />
                    </Link>

                    {children}

                    <Drawer.Root>
                        <Drawer.Trigger asChild>
                            <IconButton variant="ghost" aria-label="Open menu">
                                <LuMenu />
                            </IconButton>
                        </Drawer.Trigger>
                        <Portal>
                            <Drawer.Backdrop />
                            <Drawer.Positioner>
                                <Drawer.Content>
                                    <Drawer.Header>
                                        <Drawer.Title>Hi {registrationData?.username}</Drawer.Title>
                                    </Drawer.Header>
                                    <Drawer.Body>
                                        <Stack>
                                            <Drawer.Context>

                                                {context => (
                                                    <Button
                                                        onClick={() => {
                                                            context.setOpen(false);
                                                            setIsUserDetailsOpen(true);
                                                        }}
                                                        justifyContent="flex-start"
                                                        variant="ghost"
                                                        width="full"
                                                    >
                                                        Edit your details
                                                    </Button>
                                                )}
                                            </Drawer.Context>
                                            <Separator />
                                            <Drawer.Context>
                                                {context => (
                                                    <>
                                                        {pathname !== '/' &&
                                                            <Button
                                                                onClick={() => context.setOpen(false)}
                                                                justifyContent="flex-start" variant="ghost" width="full">
                                                                <Link
                                                                    style={{
                                                                        width: '100%',
                                                                        textAlign: 'left',
                                                                    }}
                                                                    href="/">About</Link>
                                                            </Button>
                                                        }
                                                        {pathname !== '/characters' &&
                                                            <Button
                                                                onClick={() => context.setOpen(false)}
                                                                justifyContent="flex-start" variant="ghost" width="full">
                                                                <Link
                                                                    style={{
                                                                        width: '100%',
                                                                        textAlign: 'left',
                                                                    }}
                                                                    href="/characters">Explore Characters</Link>
                                                            </Button>
                                                        }
                                                    </>
                                                )}

                                            </Drawer.Context>
                                        </Stack>
                                    </Drawer.Body>
                                    <Drawer.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Drawer.CloseTrigger>
                                </Drawer.Content>
                            </Drawer.Positioner>
                        </Portal>
                    </Drawer.Root>
                </Stack>
            </Container>
            <Portal>
                <RegistrationModal
                    open={isUserDetailsOpen}
                    onClose={() => setIsUserDetailsOpen(false)}
                />
            </Portal>
        </>
    )
}