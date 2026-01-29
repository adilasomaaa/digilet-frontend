import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";
import { Button, Link, Tooltip } from "@heroui/react";
import { EyeIcon, FileSignature, PrinterIcon, Trash2Icon } from "lucide-react";

export const generalLetterColumns = (
  onView: (item: any) => void,
  onPrint: (item: any) => void,
  onSignature: (item: any) => void,
  onDelete: (item: any) => void
): Column<any>[] => [
  { name: "Nama", uid: "name", sortable: true, defaultVisible: true, renderCell: (item) => 
  <Link isBlock showAnchorIcon color="primary"  href={`/dashboard/general-letter/${item.id}/detail`} className="cursor-pointer">{item.name}</Link> },
  { name: "Nomor Surat", uid: "letterNumber", sortable: true, defaultVisible: true },
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

export const generalLetterSignatureFormFields: FormFieldConfig[] = [
  { key: "officialId", label: "Nama Penanda Tangan", type: "select", placeholder: "Pilih nama penanda tangan...", options: [], isRequired: true },
  { key: "position", label: "Posisi", type: "select", placeholder: "Masukkan posisi...", isRequired: true, options: [
    {
      label: "Kiri Atas",
      value: "kiri-atas",
    }, 
    {
      label: "Kanan Atas",
      value: "kanan-atas",
    }, 
    {
      label: "Kiri Bawah",
      value: "kiri-bawah",
    }, 
    {
      label: "Kanan Bawah",
      value: "kanan-bawah",
    },
    {
      label: "Tengah Bawah",
      value: "tengah-bawah",
    },
    {
      label: "Tengah Atas",
      value: "tengah-atas",
    }
  ]},
  { key: "occupation", label: "Jabatan", type: "text", placeholder: "Masukkan jabatan...", isRequired: true },
  { key: "uniqueCode", label: "NIP/NBM", type: "text", placeholder: "Masukkan NIP/NBM...", isRequired: true },
  { key: "isAcknowledged", label: "Tambahkan kata mengetahui?", type: "select", placeholder: "Apakah pejabat ini mengetahui surat ini?", isRequired: true, options: [
    {
      label: "Ya",
      value: true,
    }, 
    {
      label: "Tidak",
      value: false,
    }
  ]},
  
];

export const generalLetterDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "name", label: "Nama" },
];

export const carbonCopyFormFields: FormFieldConfig[] = [
  {
    key: "carbonCopy",
    label: "Tembusan",
    type: "wysiwyg",
    placeholder: "Masukkan tembusan surat...",
    isRequired: false,
  },
];