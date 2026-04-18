import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";
import { Chip, Link } from "@heroui/react";
import { Link as RouterLink } from "react-router";

export const reportingPeriodeColumns: Column<any>[] = [
  { name: "Nama", uid: "name", sortable: true, defaultVisible: true, renderCell: (item) => 
    <Link as={RouterLink} to={`/dashboard/reporting-periode/${item.id}/reporting-stage`} color="primary">{item.name}</Link> 
  },
  { name: "Sasaran", uid: "targetUser", sortable: true, defaultVisible: true, renderCell: (item) => (
     <Chip size="sm" variant="solid" color="primary">
        {item?.targetUser === "student" ? "Mahasiswa" : "Tenaga Pendidik"}
      </Chip>
  ) },
  { name: "Ruang Lingkup", uid: "scope", sortable: true, defaultVisible: true, renderCell: (item) => (
     <Chip size="sm" variant="faded" color="primary">
        {item?.scope === "faculty" ? "Fakultas" : "Program Studi"}
      </Chip>
  ) },
  { name: "Institusi", uid: "institution.name", sortable: true, defaultVisible: true },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const reportingPeriodeFormFields: FormFieldConfig[] = [
  { key: "name", label: "Nama", type: "text", placeholder: "Masukkan nama...", isRequired:true },
  { key: "description", label: "Deskripsi", type: "textarea", placeholder: "Masukkan deskripsi...", isRequired:false },
  { 
    key: "institutionId", 
    label: "Institusi", 
    type: "select", 
    placeholder: "Pilih Program Studi / Fakultas", 
    options: [], 
    isRequired:true 
  },
  { 
    key: "targetUser", 
    label: "Sasaran", 
    type: "select", 
    placeholder: "Pilih Sasaran", 
    options: [
      { 
        value: "student", 
        label: "Mahasiswa" 
      }, 
      { 
        value: "lecturer", 
        label: "Tenaga Pendidik" 
      }], 
    isRequired:true 
  },
  { 
    key: "scope", 
    label: "Ruang Lingkup", 
    type: "select", 
    placeholder: "Pilih Ruang Lingkup", 
    options: [
      { 
        value: "faculty", 
        label: "Fakultas" 
      }, 
      { 
        value: "study_program", 
        label: "Program Studi" 
      }], 
    isRequired:true 
  },
];

export const reportingPeriodeDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "name", label: "Nama" },
  { key: "description", label: "Deskripsi" },
  { key: "targetUser", label: "Sasaran" },
  { key: "scope", label: "Ruang Lingkup" },
  { key: "institution.name", label: "Institusi" },
  { key: "user.name", label: "Dibuat Oleh" },
  { key: "createdAt", label: "Dibuat Pada", render(item) {
    return new Date(item.createdAt).toLocaleString();
  }, },
];