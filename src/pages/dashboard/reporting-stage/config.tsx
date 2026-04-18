import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";
import { Chip, Link } from "@heroui/react";
import { Link as RouterLink } from "react-router";

export const reportingStageColumns: Column<any>[] = [
  { name: "Nama Tahapan", uid: "stageName", sortable: true, defaultVisible: true, renderCell(item) {
    return <Link as={RouterLink} to={`/dashboard/reporting-periode/${item.reportingPeriodeId}/reporting-stage/${item.id}/reporting-submission`} color="primary">{item.stageName}</Link> 
  } },
  { name: "Tanggal Mulai", uid: "startDate", sortable: true, defaultVisible: true, renderCell(item) {
    return new Date(item.startDate).toLocaleString()
  }},
  { name: "Tanggal Tutup", uid: "endDate", sortable: true, defaultVisible: true, renderCell(item) {
    return new Date(item.endDate).toLocaleString()
  }},
  {
    name: "Status", uid: "status", sortable: true, defaultVisible: true, renderCell(item) {
      const now = new Date();
      const startDate = new Date(item.startDate);
      const endDate = new Date(item.endDate);
      let status = 'Selesai'
      if (now >= startDate && now <= endDate) {
        status = 'Sedang Berlangsung';
      } else if (now < startDate) {
        status = 'Akan Datang';
      } else {
        status = 'Selesai';
      }
      return <Chip color={status === 'Sedang Berlangsung' ? 'success' : status === 'Akan Datang' ? 'warning' : 'danger'} size="sm" variant="flat">{status}</Chip>;
    }
  },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const reportingStageFormFields: FormFieldConfig[] = [
  { key: "stageName", label: "Nama Tahapan", type: "text", placeholder: "Masukkan nama..." },
  { key: "startDate", label: "Tanggal Mulai", type: "date", placeholder: "Masukkan tanggal mulai..." },
  { key: "endDate", label: "Tanggal Tutup", type: "date", placeholder: "Masukkan tanggal tutup..." },
];

export const reportingStageDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "stageName", label: "Nama Tahapan" },
  { key: "startDate", label: "Tanggal Mulai" },
  { key: "endDate", label: "Tanggal Tutup" },
];