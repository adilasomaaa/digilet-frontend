import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";

export const letterSignatureTemplateColumns: Column<any>[] = [
  { name: "Nama", uid: "name", sortable: true, defaultVisible: true },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const letterSignatureTemplateFormFields: FormFieldConfig[] = [
  { key: "name", label: "Nama", type: "text", placeholder: "Masukkan nama..." },
];

export const letterSignatureTemplateDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "name", label: "Nama" },
];