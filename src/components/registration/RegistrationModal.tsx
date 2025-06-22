import { Modal } from "@/components/ui/Modal";
import { RegistrationForm } from "@/components/registration/RegistrationForm";


type RegistrationModalProps = {
    open: boolean;
    onClose: () => void;
}

/**
 * Modal component to be used for editing user details.
 */
export const RegistrationModal = ({
    open,
    onClose,
}: RegistrationModalProps) => {

    const onSuccess = () => {
        onClose?.();
    }
    return (
        <Modal
            title="Edit your details"
            open={open}
            onClose={onClose}
            maxWidth="2xl"
        >

            <RegistrationForm
                onSuccess={onSuccess}
                onCancel={onClose}
                showCancelButton={true}
                showResetButton={true}
            ></RegistrationForm>
        </Modal>
    )
}