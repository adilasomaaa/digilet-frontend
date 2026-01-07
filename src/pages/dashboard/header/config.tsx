import type { Column } from "@/components/dashboard/DataTable";
import { env } from "@/lib/env";
import type { Header } from "@/models/header";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";

export const headerColumns: Column<any>[] = [
  { name: "Nama", uid: "name", sortable: true, defaultVisible: true },
  { name: "Program Studi", uid: "studyProgram.name", sortable: true, defaultVisible: true },
  { name: "Dibuat pada", uid: "createdAt", sortable: true, defaultVisible: true, renderCell: (item: Header) => new Date(item.createdAt).toLocaleString() },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const headerFormFields: FormFieldConfig[] = [
  { key: "name", label: "Nama", type: "text", placeholder: "Masukkan nama...", isRequired:true },
  { key: "studyProgramId", label: "Program Studi", type: "select", placeholder: "Masukkan program studi...", isRequired:false, options:[] },
  { key: "header", label: "Judul Kop Utama", type: "text", placeholder: "Masukkan judul utama...", isRequired:true },
  { key: "subheader", label: "Judul Kop Sekunder", type: "text", placeholder: "Masukkan sekunder...", isRequired:true },
  { key: "address", label: "Alamat Kop", type: "text", placeholder: "Masukkan alamat...", isRequired:true },
  { key: "logo", label: "Logo Kop", type: "upload", placeholder: "Masukkan logo...", isRequired:true, 
    maxSize: 5 * 1024 * 1024,allowedExtensions: ['.png', '.jpg', '.jpeg'], previewUrl: "", },

];

export const headerDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "name", label: "Nama" },
  { key: "studyProgram.name", label: "Program Studi" },
  { key: "header", label: "Judul Kop Utama" },
  { key: "subheader", label: "Judul Kop Sekunder" },
  { key: "address", label: "Alamat Kop" },
  { key: "logo", label: "Logo Kop", render: (item: Header) => <img src={env.baseUrl + item.logo} width={100} height={100} /> },
];