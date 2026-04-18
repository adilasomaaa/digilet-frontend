import type { Column } from "@/components/dashboard/DataTable";
import { Chip } from "@heroui/react";
import { CalendarIcon, MapPinIcon } from "lucide-react";

export const myActivityColumns: Column<any>[] = [
  {
    name: "Nama Kegiatan", uid: "activity", sortable: true, defaultVisible: true, renderCell: (item) => (
      <span className="font-semibold">{item.activity?.activityName || "-"}</span>
    )
  },
  {
    name: "Waktu Absen", uid: "createdAt", sortable: true, defaultVisible: true, renderCell: (item) => (
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-xs text-default-500">
           <CalendarIcon size={12} />
           {new Date(item.createdAt).toLocaleString('id-ID')}
        </div>
      </div>
    )
  },
  {
    name: "Lokasi", uid: "location", sortable: false, defaultVisible: true, renderCell: (item) => (
       <div className="flex items-center gap-1 text-xs">
          <MapPinIcon size={12} className="text-default-400" />
          {item.activity?.location || "-"}
       </div>
    )
  },
  {
    name: "Status", uid: "isVerified", sortable: true, defaultVisible: true, renderCell: (item) => (
      <Chip
        color={item.isVerified ? "success" : "warning"}
        variant="flat"
        size="sm"
      >
        {item.isVerified ? "Terverifikasi" : "Pending"}
      </Chip>
    )
  },
];
