import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";
import { Button, Tooltip } from "@heroui/react";
import { EyeIcon, FileSignature, PencilIcon, PrinterIcon, Trash2Icon } from "lucide-react";

export const generalLetterColumns = (
  onView: (item: any) => void,
  onPrint: (item: any) => void,
  onSignature: (item: any) => void,
  onEdit: (item:any) => void,
  onDelete: (item: any) => void
): Column<any>[] => [
  { name: "Nama", uid: "name", sortable: true, defaultVisible: true },
  { name: "Jenis Surat", uid: "letter.letterName", sortable: true, defaultVisible: true },
  { name: "Dibuat oleh", uid: "user.name", sortable: true, defaultVisible: true },
  { name: "Dibuat pada", uid: "createdAt", sortable: true, defaultVisible: true, renderCell: (item) => new Date(item.createdAt).toLocaleString() },
  { 
    name: "ACTIONS", 
    uid: "actions", 
    defaultVisible: true,
    renderCell: (item) => (
      <div className="flex items-center gap-2">
        <Tooltip content="Lihat Detail">
          <Button isIconOnly size="sm" variant="light" onPress={() => onView(item)}>
            <EyeIcon className="w-4 h-4 text-default-400" />
          </Button>
        </Tooltip>
        <Tooltip content="Edit Surat">
          <Button isIconOnly size="sm" variant="light" color="warning" onPress={() => onEdit(item)}>
            <PencilIcon className="w-4 h-4 text-warning-400" />
          </Button>
        </Tooltip>
        <Tooltip content="Cetak Surat">
          <Button isIconOnly size="sm" variant="light" color="primary" onPress={() => onPrint(item)}>
            <PrinterIcon className="w-4 h-4" />
          </Button>
        </Tooltip>
        <Tooltip content="Status Tanda Tangan">
          <Button isIconOnly size="sm" variant="light" color="secondary" onPress={() => onSignature(item)}>
            <FileSignature className="w-4 h-4" />
          </Button>
        </Tooltip>
        <Tooltip content="Hapus">
          <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => onDelete(item)}>
            <Trash2Icon className="w-4 h-4" />
          </Button>
        </Tooltip>
      </div>
    )
  },
];

export const generalLetterFormFields: FormFieldConfig[] = [
  { key: "name", label: "Nama", type: "text", placeholder: "Masukkan nama..." },
];

export const generalLetterDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "name", label: "Nama" },
];