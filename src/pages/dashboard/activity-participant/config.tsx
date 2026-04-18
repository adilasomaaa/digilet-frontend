import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";

export const activityParticipantColumns: Column<any>[] = [
  {
    name: "Nama Peserta",
    uid: "participantName",
    sortable: true,
    defaultVisible: true,
    renderCell: (item) => {
      if (item.user?.student) return item.user.student.fullname;
      if (item.user?.official) return item.user.official.name;
      return item.user?.name || "Unknown";
    }
  },
  {
    name: "Identitas",
    uid: "identifier",
    sortable: true,
    defaultVisible: true,
    renderCell: (item) => {
      if (item.user?.student) return item.user.student.nim;
      if (item.user?.official) return item.user.official.nip;
      return "-";
    }
  },
  {
    name: "Waktu Kehadiran",
    uid: "createdAt",
    sortable: true,
    defaultVisible: true,
    renderCell: (item) => new Date(item.createdAt).toLocaleString("id-ID")
  },
  {
    name: "Bukti",
    uid: "proofOfAttendance",
    defaultVisible: true,
    renderCell: (item) => item.proofOfAttendance ? (
      <a href={`${import.meta.env.VITE_API_BASE_URL}/${item.proofOfAttendance}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
        Lihat Gambar
      </a>
    ) : "-"
  },
  {
    name: "Status",
    uid: "isVerified",
    sortable: true,
    defaultVisible: true,
    renderCell: (item) => (
      <span className={item.isVerified ? "text-success" : "text-warning"}>
        {item.isVerified ? "Terverifikasi" : "Pending"}
      </span>
    )
  },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const activityParticipantFormFields: FormFieldConfig[] = [
  // Manual adding/editing should be rare for attendance
];

export const activityParticipantDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "user.name", label: "Nama Akun" },
  { key: "createdAt", label: "Waktu Absen" },
];