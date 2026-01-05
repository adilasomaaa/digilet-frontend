import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";

export const personnelColumns: Column<any>[] = [
  { name: "Nama", uid: "name", sortable: true, defaultVisible: true },
  { name: "Program Studi", uid: "studyProgram.name", sortable: true, defaultVisible: true },
  { name: "Posisi", uid: "position", sortable: true, defaultVisible: true },
  { name: "Email", uid: "user.email", sortable: true, defaultVisible: true },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const personnelFormFields: FormFieldConfig[] = [
  { key: "name", label: "Nama", type: "text", placeholder: "Masukkan nama...", isRequired:true },
  { key: "studyProgramId", label: "Program Studi", type: "select", placeholder: "Pilih program studi...", options: [], isRequired:false },
  { key: "position", label: "Posisi", type: "text", placeholder: "Masukkan posisi...", isRequired:true },
  { key: "email", label: "Email", type: "email", placeholder: "Masukkan email...", isRequired:true },
];

export const personnelDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "name", label: "Nama" },
  { key: "studyProgram.name", label: "Program Studi" },
  { key: "position", label: "Posisi" },
  { key: "user.email", label: "Email" },
];