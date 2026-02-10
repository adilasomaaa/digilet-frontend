import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";

export const studyProgramColumns: Column<any>[] = [
  {
    name: "Nama Program Studi",
    uid: "name",
    sortable: true,
    defaultVisible: true,
  },
  {
    uid: "address",
    name: "Alamat",
    sortable: true,
    defaultVisible: true,
  },
  {
    uid: "type",
    name: "Tipe",
    sortable: true,
    defaultVisible: true,
  },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const studyProgramFormFields: FormFieldConfig[] = [
  {
    key: "name",
    label: "Nama Program Studi",
    type: "text",
    placeholder: "Masukkan nama program studi...",
    isRequired: true,
  },
  {
    key: "address",
    label: "Alamat",
    type: "text",
    placeholder: "Masukkan alamat program studi...",
    isRequired: false,
  },
  {
    key: "type",
    label: "Tipe Institution",
    type: "select",
    placeholder: "Pilih tipe institution...",
    isRequired: true,
    options: [
      { value: "university", label: "University" },
      { value: "faculty", label: "Faculty" },
      { value: "study_program", label: "Study Program" },
      { value: "institution", label: "Institution" },
    ],
  },
  {
    key: "parentId",
    label: "Parent Institution",
    type: "select",
    placeholder: "Pilih parent institution (opsional)...",
    isRequired: false,
    options: [], // Will be populated dynamically
  },
];

export const studyProgramDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "name", label: "Nama Program Studi" },
  { key: "address", label: "Alamat" },
  { key: "type", label: "Tipe" },
];