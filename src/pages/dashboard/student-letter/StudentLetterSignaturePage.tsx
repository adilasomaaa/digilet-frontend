import { useMemo, useState } from 'react'
import { useOutletContext, useParams } from 'react-router'
import type { LetterSignature, StudentLetter } from '@/models'
import { useLetterSignature } from '@/hooks/useLetterSignature';
import { Button, Card, CardBody, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Skeleton } from '@heroui/react';
import ShareModal from '@/components/dashboard/ShareModal';
import { env } from '@/lib/env';
import { Share2, CheckCircle2, Clock, RotateCcw, Plus, MoreVertical, Edit3, Trash2 } from 'lucide-react';
import { letterSignatureService } from '@/services/LetterSignatureService';
import InputModal from '@/components/dashboard/InputModal';
import { useOfficial } from '@/hooks/useOfficial';
import { studentLetterSignatureFormFields } from './config';
import DeleteModal from '@/components/dashboard/DeleteModal';

const StudentLetterSignaturePage = () => {
    const { studentLetterId } = useParams<{ studentLetterId: string }>();
    const { item: _ } = useOutletContext<{ item: StudentLetter | null, isLoading: boolean }>();

     const { items, isLoading, refresh, isModalOpen, setIsModalOpen, isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, deletingItem, setDeletingItem,
    handleConfirmDelete, form, onSubmit, isSubmitting } = useLetterSignature(studentLetterId, undefined);
    const [selectedSignature, setSelectedSignature] = useState<LetterSignature | null>(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const handleShare = (signature: LetterSignature) => {
        setSelectedSignature(signature);
        setIsShareModalOpen(true);
    };

    const { allItems } = useOfficial({ fetchTable: false, fetchDropdown: true });
        
    const dynamicFormFields = useMemo(() => {
        return studentLetterSignatureFormFields.map((field) => {
            if (field.key === "officialId") {
            return { ...field, options: allItems };
            }
            return field;
        });
    }, [allItems, editingItem]);

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
               {[1, 2, 3].map((i) => (
                   <Skeleton key={i} className="rounded-lg h-24 w-full" />
               ))}
            </div>
        )
    }

    if (items.length === 0) {
        return (
            <>
                <div className="flex flex-col items-center justify-center p-8 text-default-500 border-2 border-dashed border-default-200 rounded-lg">
                    <Button
                        color="primary"
                        variant="flat"
                        size="sm"
                        className='my-4'
                        startContent={<Plus size={14} />}
                        onPress={() => { 
                            form.reset({
                                officialId: "",
                                isAcknowledged: false,
                                position: "",
                            }); 
                        setEditingItem(null); 
                        setIsModalOpen(true); 
                        }}
                    >
                        Tambah Tanda Tangan
                    </Button>
                    <p>Belum ada daftar tanda tangan.</p>
                </div>
                <InputModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingItem ? "Edit Tanda Tangan" : "Tambah Tanda Tangan"}
                    fields={ dynamicFormFields }
                    register={form.register}
                    onSubmit={form.handleSubmit(onSubmit)}
                    errors={form.formState.errors}
                    setValue={form.setValue}
                    watch={form.watch}
                    isLoading={isSubmitting}
                />
            </>
        )
    }

    const handleResetSignature = async (sigId: number) => {
        try {
          await letterSignatureService.reset(sigId);
          if (typeof refresh === 'function') {
            await refresh();
          }
        }catch(error) {
          console.log(error);
        }
      };

  return (
    <>
        <div className="flex justify-end">
            <Button
                color="primary"
                variant="solid"
                size="sm"
                className='mb-4'
                startContent={<Plus size={14} />}
                onPress={() => { 
                    form.reset({
                        officialId: "",
                        isAcknowledged: false,
                        position: "",
                    }); 
                    setEditingItem(null); 
                    setIsModalOpen(true); 
                }}
            >
                Tambah Tanda Tangan
            </Button>
        </div>
        <div className="flex flex-col gap-4">
            {items.map((signature) => (
                <Card key={signature.id} className="shadow-sm border-default-100">
                    <CardBody className="flex flex-row justify-between items-center p-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-medium">
                                    {signature.official.name}
                                </h4>
                                {signature.verifiedAt ? (
                                    <Chip size="sm" color="success" variant="flat" startContent={<CheckCircle2 size={12} />}>
                                        Sudah Ditandatangani
                                    </Chip>
                                ) : (
                                    <Chip size="sm" color="warning" variant="flat" startContent={<Clock size={12} />}>
                                        Menunggu
                                    </Chip>
                                )}
                            </div>
                            <p className="text-small text-default-500">
                                {signature.occupation}
                            </p>
                            <p className="text-tiny text-default-400">
                                NBM: {signature.uniqueCode}
                            </p>
                        </div>
                        <div>
                            { signature.verifiedAt ? (
                                <Button size="sm" variant="flat" color="danger" startContent={<RotateCcw size={12} />} onPress={() => handleResetSignature(signature.id)}> Reset Tanda Tangan</Button>
                                ) : (
                                    <>
                                        <Button 
                                            color="primary" 
                                            variant="flat" 
                                            size="sm"
                                            startContent={<Share2 size={12} />}
                                            onPress={() => handleShare(signature)}
                                        >
                                            Bagikan
                                        </Button>
                                        <Dropdown placement="bottom-end">
                                            <DropdownTrigger>
                                                <Button isIconOnly size="sm" variant="light">
                                                    <MoreVertical size={18} className="text-default-400" />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu aria-label="Aksi">
                                                <DropdownItem key="edit" startContent={<Edit3 size={16} />} onPress={() => { setEditingItem(signature); form.reset(signature); setIsModalOpen(true); }}>
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 size={16} />} onPress={() => { setDeletingItem(signature); setIsDeleteModalOpen(true); }}>
                                                    Hapus
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </>
                                )
                            }
                        </div>
                    </CardBody>
                </Card>
            ))}

            {selectedSignature && (
                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    title="Bagikan Tanda Tangan"
                    description={`Bagikan tautan ini kepada ${selectedSignature.official.name} untuk melakukan tanda tangan.`}
                    shareLink={`${env.baseUrl}signature/verify/${selectedSignature.token}`}
                    code={selectedSignature.code}
                />
            )}

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Hapus Tanda Tangan"
                message={`Apakah Anda yakin ingin menghapus "${deletingItem?.official.name}"?`}
                isLoading={isSubmitting}
            />
            <InputModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingItem ? "Edit Tanda Tangan" : "Tambah Tanda Tangan"}
                fields={ dynamicFormFields }
                register={form.register}
                onSubmit={form.handleSubmit(onSubmit)}
                errors={form.formState.errors}
                setValue={form.setValue}
                watch={form.watch}
                isLoading={isSubmitting}
            />
        </div>
    </>
    
  )
}

export default StudentLetterSignaturePage