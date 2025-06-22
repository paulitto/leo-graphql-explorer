import {
    Dialog,
    CloseButton,
} from '@chakra-ui/react';

type ModalProps = {
    title: string;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
}

/**
 * Generic modal component reusing the Dialog Chakra UI.
 */
export const Modal = ({
    title,
    open,
    onClose,
    children,
    maxWidth = "2xl",
}: ModalProps) => {
    return (
        <Dialog.Root
            open={open}
            onOpenChange={({ open }) => !open && onClose()}
        >
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content maxW={maxWidth}>
                    <Dialog.Header justifyContent="center">
                        <Dialog.Title>{title}</Dialog.Title>
                    </Dialog.Header>

                    <Dialog.Body>
                        {children}
                    </Dialog.Body>

                    <Dialog.CloseTrigger asChild onClick={onClose}>
                        <CloseButton size="sm" />
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};