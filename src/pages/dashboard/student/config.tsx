import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";

export const studentColumns: Column<any>[] = [
  { name: "Nama", uid: "fullname", sortable: true, defaultVisible: true },
  { name: "Program Studi", uid: "institution.name", sortable: true, defaultVisible: true },
  { name: "NIM", uid: "nim", sortable: true, defaultVisible: true },
  { name: "Angkatan", uid: "classYear", sortable: true, defaultVisible: true },
  { name: "L/P", uid: "gender", sortable: true, defaultVisible: false},
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const studentFormFields: FormFieldConfig[] = [
  { key: "fullname", label: "Nama", type: "text", placeholder: "Masukkan nama...", isRequired: true },
  { key: "institutionId", label: "Program Studi", type: "select", placeholder: "Pilih program studi...", options: [], isRequired: true },
  {
    key: "email",
    label: "Email",
    type: "text",
    placeholder: "Masukkan email...",
    isRequired: true,
  },
  {
    key: "address",
    label: "Alamat",
    type: "text",
    placeholder: "Masukkan alamat...",
    isRequired: true,
  },
  {
    key: "nim",
    label: "NIM",
    type: "text",
    placeholder: "Masukkan NIM...",
    isRequired: true,
  },
  {
    key: "classYear",
    label: "Angkatan",
    type: "text",
    placeholder: "Masukkan Angkatan...",
    isRequired: true,
  },
  {
    key: "phoneNumber",
    label: "Nomor Handphone",
    type: "text",
    placeholder: "Masukkan nomor handphone...",
    isRequired: false,
  },
  {
    key: "birthday",
    label: "Tanggal Lahir",
    type: "date",
    placeholder: "Pilih tanggal lahir...",
    isRequired: false,
  },
  {
    key: "birthplace",
    label: "Tempat Lahir",
    type: "text",
    placeholder: "Masukkan tempat lahir...",
    isRequired: false,
  },
  {
    key: "gender",
    label: "Jenis Kelamin",
    type: "select",
    placeholder: "Pilih jenis kelamin...",
    options: [
      { label: "Laki-laki", value: "Laki-laki" },
      { label: "Perempuan", value: "Perempuan" },
    ],
    isRequired: true,
  }
];

export const studentDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "fullname", label: "Nama" },
  { key: "institution.name", label: "Program Studi" },
  { key: "nim", label: "NIM" },
  { key: "classYear", label: "Angkatan" },
  { key: "user.email", label: "Email" },
  { key: "address", label: "Alamat" },
  { key: "phoneNumber", label: "Nomor Handphone" },
  { key: "birthday", label: "Tanggal Lahir" },
  { key: "birthplace", label: "Tempat Lahir" },
  { key: "gender", label: "Jenis Kelamin"},
];