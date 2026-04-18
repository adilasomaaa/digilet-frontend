import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  Input, 
  InputOtp,
  Divider
} from '@heroui/react';
import { Copy, CheckCircle2, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  shareLink: string;
  code?: string;
}

const ShareModal = ({ isOpen, onClose, title, description, shareLink, code }: ShareModalProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    const formattedCode = code?.padStart(6, '0');
    const message = `Halo, mohon bantuannya untuk menandatangani dokumen berikut secara digital.\n\n` +
                    `*Detail Verifikasi*:\n` +
                    `🔗 Tautan: ${shareLink}\n` +
                    `🔑 Kode Verifikasi: *${formattedCode}*\n\n` +
                    `_Silakan klik tautan di atas dan masukkan kode verifikasi untuk memproses tanda tangan. Terima kasih._`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
                {code && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-default-500">Kode Tanda Tangan</p>
                  <InputOtp
                    isReadOnly
                    variant="bordered"
                    value={code.padStart(6, '0')}
                    length={6}
                  />
                </div>
                )}

                <Divider className="my-2" />
                
                {/* Tombol Berbagi WhatsApp */}
                <Button 
                  color="success" 
                  variant="flat" 
                  className="w-full font-semibold"
                  startContent={<MessageCircle size={20} />}
                  onPress={handleWhatsAppShare}
                >
                  Bagikan ke WhatsApp
                </Button>
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