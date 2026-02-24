import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Checkbox } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ShieldCheck, Save } from "lucide-react";

export const verifySchema = z.object({
    notes: z.string().optional(),
    isVerified: z.boolean().refine(val => val === true, {
        message: "Anda harus menyetujui laporan ini untuk melanjutkan verifikasi.",
    }),
});

export type VerifyFormData = z.infer<typeof verifySchema>;

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (data: VerifyFormData) => Promise<void>;
    isLoading: boolean;
    title?: string;
    defaultNotes?: string;
}

const VerificationModal = ({ 
    isOpen, 
    onClose, 
    onVerify, 
    isLoading, 
    title = "Verifikasi Laporan",
    defaultNotes = ""
}: VerificationModalProps) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<VerifyFormData>({
        resolver: zodResolver(verifySchema),
        defaultValues: {
            notes: defaultNotes,
            isVerified: false
        }
    });

    const onSubmit = async (data: VerifyFormData) => {
        await onVerify(data);
        reset();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={20} />
                                {title}
                            </div>
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-4">
                                <Textarea
                                    label="Catatan Verifikasi"
                                    placeholder="Tambahkan catatan (opsional)"
                                    {...register("notes")}
                                    isInvalid={!!errors.notes}
                                    errorMessage={errors.notes?.message}
                                />
                                <Checkbox 
                                    {...register("isVerified")} 
                                    isInvalid={!!errors.isVerified}
                                    classNames={{
                                        label: "text-small"
                                    }}
                                >
                                    Saya menyatakan bahwa laporan ini benar dan dapat disetujui.
                                </Checkbox>
                                {errors.isVerified && <p className="text-tiny text-danger">{errors.isVerified.message}</p>}
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Batal
                            </Button>
                            <Button 
                                type="submit" 
                                color="primary" 
                                isLoading={isLoading}
                                startContent={!isLoading && <Save size={16} />}
                            >
                                Simpan Verifikasi
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
};

export default VerificationModal;
