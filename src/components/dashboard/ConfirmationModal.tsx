import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { AlertTriangleIcon } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    isLoading: boolean;
    confirmLabel?: string;
    cancelLabel?: string;
    color?: "danger" | "warning" | "primary" | "secondary" | "success" | "default";
}

const ConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    isLoading,
    confirmLabel = "Ya, Lanjutkan",
    cancelLabel = "Batal",
    color = "danger"
}: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-2">
              <AlertTriangleIcon className={`text-${color}-500`} />
              {title}
            </ModalHeader>
            <ModalBody>
              <div dangerouslySetInnerHTML={{ __html: message }} />
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="flat" onPress={onClose}>
                {cancelLabel}
              </Button>
              <Button color={color} onPress={onConfirm} isLoading={isLoading}>
                {confirmLabel}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationModal;
