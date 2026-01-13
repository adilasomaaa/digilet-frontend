import React from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input 
} from '@heroui/react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  shareLink: string;
}

const ShareModal = ({ isOpen, onClose, title, description, shareLink }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {description && (
                <p className="text-sm text-default-500 mb-2">{description}</p>
              )}
              <div className="flex flex-col gap-4">
                <Input
                  isReadOnly
                  label="Tautan Token"
                  variant="bordered"
                  value={shareLink}
                  endContent={
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="light" 
                      onPress={handleCopy}
                      color={copied ? "success" : "default"}
                    >
                      {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                    </Button>
                  }
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Tutup
              </Button>
            </ModalFooter>
          </>
        )} 
      </ModalContent> 
    </Modal>
  );
};

export default ShareModal;