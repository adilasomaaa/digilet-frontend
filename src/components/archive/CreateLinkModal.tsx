import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from '@heroui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
  content: z.string().min(1, 'Konten link wajib diisi'),
});

type FormData = z.infer<typeof schema>;

interface CreateLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, content: string) => Promise<void>;
}

const CreateLinkModal = ({ isOpen, onClose, onSubmit }: CreateLinkModalProps) => {
  const [loading, setLoading] = useState(false);
  const {
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
      await onSubmit(data.name, data.content);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
      <ModalContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <ModalHeader>Buat Link/Catatan Baru</ModalHeader>
          <ModalBody>
            <Input
              label='Nama'
              placeholder='Masukkan nama link/catatan'
              {...register('name')}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
            />
            <Textarea
              label='Konten'
              placeholder='Masukkan URL atau konten catatan'
              minRows={4}
              {...register('content')}
              isInvalid={!!errors.content}
              errorMessage={errors.content?.message}
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

export default CreateLinkModal;
