import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";

export const letterTemplateColumns: Column<any>[] = [
  { name: "Nama", uid: "name", sortable: true, defaultVisible: true },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const letterTemplateFormFields: FormFieldConfig[] = [
  { key: "name", label: "Nama", type: "text", placeholder: "Masukkan nama..." },
];

export const letterTemplateDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "name", label: "Nama" },
];

export const letterPlaceholders = [
  { group: "Data Mahasiswa", variables: [
    { label: "Nama Lengkap", code: "[nama_mahasiswa]", desc: "Menampilkan nama lengkap mahasiswa" },
    { label: "NIM", code: "[nim]", desc: "Nomor Induk Mahasiswa" },
    { label: "Program Studi", code: "[program_studi]", desc: "Nama Program Studi mahasiswa" },
    { label: "Angkatan", code: "[angkatan]", desc: "Tahun angkatan mahasiswa" },
  ]},
  { group: "Data Surat", variables: [
    { label: "Nama Surat", code: "[nama_surat]", desc: "Judul induk surat" },
    { label: "Nomor Referensi", code: "[nomor_referensi]", desc: "Nomor referensi template surat" },
  ]},
  { group: "Data Transaksi (Submission)", variables: [
    { label: "Nomor Surat", code: "[nomor_surat]", desc: "Nomor surat yang digenerate sistem" },
    { label: "Tanggal Surat", code: "[tanggal_surat]", desc: "Tanggal surat dibuat (Format: 13 Januari 2026)" },
  ]}
];

export const getDynamicPlaceholders = (attributes: any[]) => {
  return {
    group: "Atribut Kustom (Input User)",
    variables: attributes?.map((attr) => ({
      label: attr.attributeName,
      code: `[${attr.attributeName.toLowerCase()}]`, // Placeholder kustom dari admin
      desc: `Input manual untuk: ${attr.label}`,
    })) || []
  };
};