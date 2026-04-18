import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";

export const letterAttributeColumns: Column<any>[] = [
  { name: "Nama Atribut", uid: "attributeName", sortable: true, defaultVisible: true },
  { name: "Dibuat pada", uid: "createdAt", sortable: true, defaultVisible: true, renderCell: (row) => new Date(row.createdAt).toLocaleString() },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const letterAttributeFormFields: FormFieldConfig[] = [
  { key: "attributeName", label: "Nama Atribut", type: "text", placeholder: "Masukkan nama atribut...", isRequired: true },
  { key: "placeholder", label: "Placeholder", type: "text", placeholder: "Masukkan placeholder...", isRequired: true },
  { key: "label", label: "Label", type: "text", placeholder: "Masukkan label...", isRequired: true },
  { key: "isRequired", label: "Wajib Diisi?", type: "select", placeholder: "Pilih keterangan...", options:[
    {
      label: "Ya",
      value: true,
    },
    {
      label: "Tidak",
      value: false,
    }
  ], isRequired:true },
  { key: "isVisible", label: "Ditampilkan?", type: "select", placeholder: "Pilih keterangan...", options:[
    {
      label: "Ya",
      value: true,
    },
    {
      label: "Tidak",
      value: false,
    }
  ], isRequired:true },
  { key: "isEditable", label: "Dapat Diedit?", type: "select", placeholder: "Pilih keterangan...", options:[
    {
      label: "Ya",
      value: true,
    },
    {
      label: "Tidak",
      value: false,
    }
  ], isRequired:true },
];

export const letterAttributeDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "attributeName", label: "Nama" },
  { key: "placeholder", label: "Placeholder" },
  { key: "label", label: "Label" },
  { key: "type", label: "Tipe" },
  { key: "isRequired", label: "Wajib Diisi", render: (value) => value.isRequired ? "Ya" : "Tidak" },
  { key: "isVisible", label: "Ditampilkan", render: (value) => value.isVisible ? "Ya" : "Tidak" },
  { key: "isEditable", label: "Dapat Diedit?", render: (value) => value.isEditable ? "Ya" : "Tidak" },
];