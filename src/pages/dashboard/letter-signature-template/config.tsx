import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";

export const letterSignatureTemplateColumns: Column<any>[] = [
  { name: "Nama Penanda Tangan", uid: "official.name", sortable: true, defaultVisible: true },
  { name: "Jabatan", uid: "official.occupation", sortable: true, defaultVisible: true },
  { name: "Posisi", uid: "position", sortable: true, defaultVisible: true },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const letterSignatureTemplateFormFields: FormFieldConfig[] = [
  { key: "officialId", label: "Penanda Tangan", type: "select", placeholder: "Pilih penanda tangan...", options: [], isRequired: true },
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
  { key: "isAcknowledged", label: "Tambahkan kata mengetahui?", type: "select", placeholder: "Apakah pejabat ini mengetahui surat ini?", isRequired: true, options: [
    {
      label: "Ya",
      value: true,
    }, 
    {
      label: "Tidak",
      value: false,
    }
  ]}
];

export const letterSignatureTemplateDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "official.name", label: "Nama Penanda Tangan" },
  { key: "official.occupation", label: "Jabatan" },
  { key: "letter.letterName", label: "Nama Surat" },
  { key: "position", label: "Posisi" },
];