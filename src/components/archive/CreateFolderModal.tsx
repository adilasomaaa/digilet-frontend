import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Nama folder wajib diisi'),
});

type FormData = z.infer<typeof schema>;

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
}

const CreateFolderModal = ({ isOpen, onClose, onSubmit }: CreateFolderModalProps) => {
  const [loading, setLoading] = useState(false);
  const
 {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await onSubmit(data.name);
      reset();
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
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ModalHeader>Buat Folder Baru</ModalHeader>
          <ModalBody>
            <Input
              label='Nama Folder'
              placeholder='Masukkan nama folder'
              {...register('name')}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant='light' onPress={onClose}>
              Batal
            </Button>
            <Button color='primary' type='submit' isLoading={loading}>
              Buat
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CreateFolderModal;
