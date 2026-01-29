import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";
import { Chip, Link } from "@heroui/react";

export const letterColumns: Column<any>[] = [
  { 
    name: "Nama Surat", 
    uid: "letterName", 
    sortable: true, 
    defaultVisible: true, 
    renderCell: (item) => 
    <>
      <Link isBlock showAnchorIcon color="primary"  href={`/dashboard/${item.id}/letter-attribute`} className="cursor-pointer">{item.letterName}</Link>
    </> 
  },
  { 
    name: "Lembaga / Prodi", 
    uid: "institution.name", 
    sortable: true, 
    defaultVisible: true,
    renderCell: (item) => 
      <>
        <Chip size="sm" variant="solid" color="primary">
          {item?.institution?.name || "-"}
        </Chip>
      </>
  },
  { name: "Kop Surat", uid: "letterHead.name", sortable: true, defaultVisible: true },
  { 
    name: "Kategori", 
    uid: "category", 
    sortable: true, 
    defaultVisible: true, 
    renderCell: (item) => 
      <>
        <Chip size="sm" variant="flat" color="primary">
          {item?.category || "-"}
        </Chip>
      </>
  },
  { 
    name: "Status", 
    uid: "status", 
    sortable: true, 
    defaultVisible: true, 
    renderCell: (item) => 
      <>
        <Chip size="sm" variant="flat" color="primary">
          {item?.status || "-"}
        </Chip>
      </>
  },
  { name: "Dibuat pada", uid: "createdAt", sortable: true, defaultVisible: false, renderCell: (item) => new Date(item.createdAt).toLocaleString() },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const letterFormFields: FormFieldConfig[] = [
  { key: "letterName", label: "Nama Surat", type: "text", placeholder: "Masukkan nama surat...", isRequired: true },
  { key: "letterHeadId", label: "Kop Surat", type: "select", placeholder: "Pilih kop surat...", isRequired: true, options:[] },
  { key: "category", label: "Kategori", type: "select", placeholder: "Pilih kategori...", isRequired: true, options:[
    { label: "Program Studi", value: "study_program" },
    { label: "Fakultas", value: "faculty" },
    { label: "Universitas", value: "university" },
  ] },
  { key: "status", label: "Status", type: "select", placeholder: "Pilih status...", isRequired: true, options:[
    { label: "Publik", value: "public" },
    { label: "Privasi", value: "private" },
  ] },
];

export const letterDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "letterName", label: "Nama Surat" },
  { key: "letterHead.name", label: "Kop Surat" },
  { key: "category", label: "Kategori" },
  { key: "user.name", label: "Pembuat" },
  { key: "institution.name", label: "Lembaga / Prodi" },
];