import type { Column } from "@/components/dashboard/DataTable";
import { env } from "@/lib/env";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";
import { Button, Chip } from "@heroui/react";
import { Link } from "react-router";

export const announcementColumns: Column<any>[] = [
  { name: "Konten", uid: "content", sortable: true, defaultVisible: true, renderCell(item) {
    return <div dangerouslySetInnerHTML={{ __html: item.content }} />;
  } },
  { name: "File", uid: "file", sortable: true, defaultVisible: true, renderCell(item) {
    return (
      item.file ? (
        <Button size="sm" as={Link} variant="flat" color="primary" to={`${env.apiBaseUrl}${item.file}`} target="_blank" rel="noopener noreferrer">Lihat File</Button>
      ) : (
        'Kosong'
      )
    );
  } },
  { name: "Status", uid: "status", sortable: true, defaultVisible: true, renderCell(item) {
    return <Chip variant="flat" color={item.status ? "success" : "danger"}>{item.status ? "Tampilkan" : "Sembunyikan"}</Chip>;
  } },
  { name: "Dibuat Oleh", uid: "user.name", sortable: true, defaultVisible: true },
  { name: "Institusi", uid: "institution.name", sortable: true, defaultVisible: false },
  { name: "Dibuat Pada", uid: "createdAt", sortable: true, defaultVisible: true, renderCell(item) {
    return new Date(item.createdAt).toLocaleString();
  } },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const announcementFormFields: FormFieldConfig[] = [
  { key: "content", label: "Konten", type: "wysiwyg", placeholder: "Masukkan konten..." },
  { key: "visibleAt",label:"Tampilkan pada", type: "select", options: [{ value: "student", label: "Dashboard Mahasiswa" }, { value: "public", label: "Halaman Publik" }], isRequired:true, placeholder: "Pilih keterangan..." },
  { key: "status", label: "Status Pengumuman", type: "select", placeholder: "Pilih keterangan...", options:[
    {
      label: "Tampilkan",
      value: true,
    },
    {
      label: "Sembunyikan",
      value: false,
    }
  ], isRequired:true },
  { key: "file", label: "File", type: "upload", placeholder: "Masukkan file...", isRequired:false, 
    maxSize: 5 * 1024 * 1024,allowedExtensions: ['.pdf'], previewUrl: "", },
  
];

export const announcementDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "content", label: "Konten" },
  { key: "file", label: "File", render: (item) => <Button size="sm" as={Link} variant="flat" color="primary" to={`${env.apiBaseUrl}${item.file}`} target="_blank" rel="noopener noreferrer">Lihat File</Button> },
  { key: "user.name", label: "Dibuat Oleh" },
  { key: "visibleAt", label: "Tampilkan Pada" },
  { key: "status", label: "Status Pengumuman", render: (item) => <Chip variant="flat" color={item.status ? "success" : "danger"}>{item.status ? "Tampilkan" : "Sembunyikan"}</Chip> },
  { key: "createdAt", label: "Dibuat Pada", render: (item) => new Date(item.createdAt).toLocaleString() },
  { key: "updatedAt", label: "Diperbarui Pada", render: (item) => new Date(item.updatedAt).toLocaleString() },
  { key: "institution.name", label: "Institusi" },
];