import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";

export const letterDocumentColumns: Column<any>[] = [
  { name: "Nama Dokumen", uid: "documentName", sortable: true, defaultVisible: true },
  { name: "Tipe", uid: "fileType", sortable: true, defaultVisible: true },
  { name: "Wajib Diisi", uid: "isRequired", sortable: true, defaultVisible: true, renderCell: (row) => row.isRequired ? "Ya" : "Tidak" },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const letterDocumentFormFields: FormFieldConfig[] = [
  { key: "documentName", label: "Nama Dokumen", type: "text", placeholder: "Masukkan nama..." },
  { key: "fileType", label: "Tipe", type: "select", placeholder: "Masukkan tipe...", isRequired: true, options:[
    {
      label: "PDF",
      value: "pdf",
    },
    {
      label: "Gambar (PNG, JPG, JPEG)",
      value: "png,jpg,jpeg",
    }
  ] },
  { key: "isRequired", label: "Wajib Diisi", type: "select", placeholder: "Masukkan tipe...", isRequired: true, options: [
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

export const letterDocumentDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "documentName", label: "Nama Dokumen" },
  { key: "fileType", label: "Tipe" },
  { key: "isRequired", label: "Wajib Diisi", render: (item) => item.isRequired ? "Ya" : "Tidak" },
];