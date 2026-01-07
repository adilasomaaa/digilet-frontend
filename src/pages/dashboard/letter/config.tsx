import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";

export const letterColumns: Column<any>[] = [
  { name: "Nama Surat", uid: "letterName", sortable: true, defaultVisible: true },
  { name: "Kode Surat", uid: "referenceNumber", sortable: true, defaultVisible: true },
  { name: "Kategori", uid: "category", sortable: true, defaultVisible: true },
  { name: "Tanda Tangan", uid: "signatureType", sortable: true, defaultVisible: false },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const letterFormFields: FormFieldConfig[] = [
  { key: "letterName", label: "Nama Surat", type: "text", placeholder: "Masukkan nama surat...", isRequired: true },
  { key: "referenceNumber", label: "Kode Surat", type: "text", placeholder: "Masukkan kode surat...", isRequired: true },
  { key: "letterNumberingStart", label: "Mulai Nomor Surat", type: "number", placeholder: "Masukkan Mulai Nomor Surat ...", isRequired: true },
  { key: "expiredDate", label: "Waktu Kadaluwarsa (Hari)", type: "number", placeholder: "Masukkan Waktu Kadaluwarsa ...", isRequired: true },
  { key: "category", label: "Kategori", type: "select", placeholder: "Pilih kategori...", isRequired: true, options:[
    { label: "Program Studi", value: "study_program" },
    { label: "Fakultas", value: "faculty" },
    { label: "Universitas", value: "university" },
  ] },
  { key: "signatureType", label: "Tanda Tangan", type: "select", placeholder: "Pilih tanda tangan...", isRequired: true, options: [
    {
      label: "Barcode",
      value: "barcode",
    },
    {
      label: "Digital",
      value: "digital",
    }
  ]}
  
];

export const letterDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "letterName", label: "Nama Surat" },
  { key: "referenceNumber", label: "Kode Surat" },
  { key: "letterNumberingStart", label: "Nomor Surat Awal" },
  { key: "expiredDate", label: "Waktu Kadaluwarsa", render: (item) => `${item.expiredDate} Hari` },
  { key: "category", label: "Kategori" },
  { key: "signatureType", label: "Tanda Tangan" },
  { key: "user.name", label: "Pembuat" },
];