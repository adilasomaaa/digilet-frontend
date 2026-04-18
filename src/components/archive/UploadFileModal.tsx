import { useState, useRef } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from '@heroui/react';
import { Upload } from 'lucide-react';

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'image' | 'pdf';
  onSubmit: (file: File) => Promise<void>;
}

const UploadFileModal = ({ isOpen, onClose, type, onSubmit }: UploadFileModalProps) => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptTypes = type === 'image' ? 'image/jpeg,image/png,image/gif,image/webp' : 'application/pdf';
  const title = type === 'image' ? 'Upload Gambar' : 'Upload PDF';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = async () => {
    if (!selectedFile) return;

    try {
      setLoading(true);
      await onSubmit(selectedFile);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className='flex flex-col items-center gap-4'>
            <input
              ref={fileInputRef}
              type='file'
              accept={acceptTypes}
              onChange={handleFileChange}
              className='hidden'
              id='file-upload'
            />
            <label
              htmlFor='file-upload'
              className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary'
            >
              <Upload className='mb-2 text-gray-400' size={32} />
              <p className='text-sm text-gray-500'>
                {selectedFile ? selectedFile.name : 'Klik untuk pilih file'}
              </p>
            </label>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant='light' onPress={onClose}>
            Batal
          </Button>
          <Button
            color='primary'
            onPress={handleFormSubmit}
            isLoading={loading}
            isDisabled={!selectedFile}
          >
            Upload
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadFileModal;
