import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Select, SelectItem } from "@heroui/react";
import { DownloadIcon, FileTextIcon } from "lucide-react";

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  templateUrl: string; // Lokasi file template (misal: /templates/student_template.xlsx)
  acceptedFileTypes?: string; // Default: .xlsx, .csv
  extraFields?: {
    key: string;
    label: string;
    options: { label: string; value: any }[];
  }[];
  onConfirm: (file: File, extraData: Record<string, any>) => Promise<void>;
  isLoading: boolean;
}

const ImportModal = ({
  isOpen,
  onClose,
  title,
  templateUrl,
  acceptedFileTypes = ".xlsx, .xls",
  extraFields = [],
  onConfirm,
  isLoading
}: ImportModalProps) => {
  const [file, setFile] = React.useState<File | null>(null);
  const [extraData, setExtraData] = React.useState<Record<string, any>>({});
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = templateUrl;
    link.download = templateUrl.split("/").pop() || "template.xlsx";
    link.click();
  };

  const handleSubmit = async () => {
    if (file) {
      await onConfirm(file, extraData);
      setFile(null);
      setExtraData({});
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody className="flex flex-col gap-4">
          <div className="p-4 border-2 border-dashed border-default-200 rounded-xl flex flex-col items-center gap-2">
            <Button 
              size="sm" 
              variant="flat" 
              startContent={<DownloadIcon size={16}/>}
              onPress={handleDownloadTemplate}
            >
              Download Template
            </Button>
            <p className="text-tiny text-default-400">Gunakan template ini agar format data sesuai</p>
          </div>

          {extraFields.map((field) => (
            <Select
              key={field.key}
              label={field.label}
              placeholder={`Pilih ${field.label}`}
              isRequired
              onSelectionChange={(keys) => {
                const val = Array.from(keys)[0];
                setExtraData(prev => ({ ...prev, [field.key]: val }));
              }}
            >
              {field.options.map((opt) => (
                <SelectItem key={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </Select>
          ))}

          <div 
            className="cursor-pointer p-8 bg-default-50 hover:bg-default-100 rounded-xl border-2 border-dashed border-primary-200 flex flex-col items-center gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              accept={acceptedFileTypes}
              onChange={handleFileChange}
            />
            <FileTextIcon className="text-primary" size={32} />
            <p className="text-small font-medium">{file ? file.name : "Klik untuk pilih file"}</p>
            <p className="text-tiny text-default-400">Format yang didukung: {acceptedFileTypes}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>Batal</Button>
          <Button 
            color="primary" 
            isLoading={isLoading} 
            isDisabled={!file || Object.keys(extraData).some(key => !extraData[key])} 
            onPress={handleSubmit}
          >
            Mulai Import
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImportModal;