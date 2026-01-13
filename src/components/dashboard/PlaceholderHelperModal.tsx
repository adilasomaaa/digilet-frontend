import { getDynamicPlaceholders, letterPlaceholders } from "@/pages/dashboard/letter-template/config";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Code } from "@heroui/react";
import { Copy } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  dynamicAttributes: any[];
}

const PlaceholderHelperModal = ({ isOpen, onClose, dynamicAttributes }: Props) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Tambahkan notifikasi toast jika diperlukan
  };

  const allGroups = [
    ...letterPlaceholders, // Variabel statis (nama_mahasiswa, dsb)
    getDynamicPlaceholders(dynamicAttributes) // Variabel dinamis
  ];

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader>Daftar Variabel Template</ModalHeader>
        <ModalBody>
          <p className="text-sm text-default-500 mb-4">
            Gunakan variabel di bawah ini di dalam editor. Sistem akan mengganti variabel tersebut secara otomatis saat surat dicetak.
          </p>
          {allGroups.map((group) => (
            <div key={group.group} className="mb-6">
              <h4 className="font-bold text-primary mb-2">{group.group}</h4>
              <Table aria-label="Variable table" removeWrapper>
                <TableHeader>
                  <TableColumn>LABEL</TableColumn>
                  <TableColumn>KODE VARIABEL</TableColumn>
                  <TableColumn>AKSI</TableColumn>
                </TableHeader>
                <TableBody>
                  {group.variables.map((v) => (
                    <TableRow key={v.code}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{v.label}</span>
                          <span className="text-xs text-default-400">{v.desc}</span>
                        </div>
                      </TableCell>
                      <TableCell><Code color="primary">{v.code}</Code></TableCell>
                      <TableCell>
                        <Button isIconOnly size="sm" variant="light" onPress={() => copyToClipboard(v.code)}>
                          <Copy size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>Tutup</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PlaceholderHelperModal;