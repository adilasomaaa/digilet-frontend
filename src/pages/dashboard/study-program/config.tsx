import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";
import { Chip } from "@heroui/react";

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
    isRequired: true,
  },
];

export const studyProgramDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "name", label: "Nama Program Studi" },
  { key: "address", label: "Alamat" },
];