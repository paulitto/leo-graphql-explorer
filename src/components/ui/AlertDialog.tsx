import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react"

type AlertDialogProps = {
  title?: string
  description: string
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

/**
 * Are you sure dialog to be used for confirming actions.
 */
export const AlertDialog = ({
  title = "Are you sure?",
  description,
  isOpen,
  onClose,
  onConfirm
}: AlertDialogProps) => {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={({ open }) => !open && onClose()} role="alertdialog">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{description}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
              </Dialog.ActionTrigger>
              <Button colorPalette="red" onClick={handleConfirm}>Confirm</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
