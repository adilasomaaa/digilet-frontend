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
import type { Node } from '@/models';

const schema = z.object({
  name: z.string().min(1, 'Nama wajib diisi'),
});

type FormData = z.infer<typeof schema>;

interface RenameModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: Node | null;
  onSubmit: (id: number, name: string) => Promise<void>;
}

const RenameModal = ({ isOpen, onClose, node, onSubmit }: RenameModalProps) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: { name: node?.name || '' },
  });

  const handleFormSubmit = async (data: FormData) => {
    if (!node) return;
    
    try {
      setLoading(true);
      await onSubmit(node.id, data.name);
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
          <ModalHeader>Ubah Nama</ModalHeader>
          <ModalBody>
            <Input
              label='Nama Baru'
              placeholder='Masukkan nama baru'
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
              Simpan
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default RenameModal;
