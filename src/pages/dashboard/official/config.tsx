import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";


export const officialColumns: Column<any>[] = [
  { name: "Nama", uid: "name", sortable: true, defaultVisible: true },
  { name: "Institusi", uid: "institution.name", sortable: true, defaultVisible: true },
  { name: "Jabatan", uid: "occupation", sortable: true, defaultVisible: true },
  { name: "NIP", uid: "nip", sortable: true, defaultVisible: true },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const officialFormFields: FormFieldConfig[] = [
  { key: "name", label: "Nama", type: "text", placeholder: "Masukkan nama...", isRequired: true },
  { key: "institutionId", label: "Institusi", type: "select", placeholder: "Masukkan nama..." , options: [], isRequired: false},
  { key: "occupation", label: "Jabatan", type: "text", placeholder: "Masukkan jabatan...", isRequired: true },
  { key: "nip", label: "NIP", type: "text", placeholder: "Masukkan NIP...", isRequired: true },

];

export const officialDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "name", label: "Nama" },
  { key: "institution.name", label: "Institusi" },
  { key: "occupation", label: "Jabatan" },
  { key: "nip", label: "NIP" },
];