
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem } from "@heroui/react";
import { useState, useEffect } from "react";

interface ChangeStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (status: string) => void;
    currentStatus: string;
}

const statusOptions = [
    { value: "pending", label: "Menunggu" },
    { value: "waiting_signature", label: "Menunggu Tanda Tangan" },
    { value: "approved", label: "Disetujui" },
    { value: "rejected", label: "Ditolak" },
];

const ChangeStatusModal = ({ isOpen, onClose, onConfirm, currentStatus }: ChangeStatusModalProps) => {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    
    useEffect(() => {
        setSelectedStatus(currentStatus);
    }, [currentStatus]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Ubah Status Pengajuan</ModalHeader>
                <ModalBody>
                    <Select 
                        label="Status" 
                        selectedKeys={selectedStatus ? [selectedStatus] : []}
                        onSelectionChange={(keys) => setSelectedStatus(Array.from(keys)[0] as string)}
                    >
                        {statusOptions.map((option) => (
                            <SelectItem key={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button variant="light" onPress={onClose}>Batal</Button>
                    <Button color="primary" onPress={() => onConfirm(selectedStatus)}>Simpan</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ChangeStatusModal;
