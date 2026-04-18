import { type ReactNode } from "react";
import { LayoutDashboard, Users, Settings, Home, ClipboardList, UserRoundCheck, UserPen, Mail, TextInitial, Mails, MailOpen, Megaphone, ArchiveIcon, SignatureIcon, ClipboardPenLine, Activity } from "lucide-react";

export type Role = "admin" | "client" | string;


export type NavChild = {
  key: string,
  label: string;
  to: string;
  icon?: ReactNode;
  roles?: Role[];
}
export type NavItem = {
  key: string;
  label: string;
  to?: string;
  icon?: ReactNode;
  exact?: boolean;
  children?: NavChild[];
  roles?: Role[];
};

export const NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Overview", to: "/dashboard", icon: <Home className="h-4 w-4" />, exact: true, roles: ["admin"] },
  {
    key: "master",
    label: "Data Master",
    icon: <LayoutDashboard className="h-4 w-4" />,
    children: [
      { key: "study_program", label: "Program Studi", to: "/dashboard/study-program", icon: <ClipboardList className="h-4 w-4" /> },
      { key: "official", label: "Dosen", to: "/dashboard/official", icon: <UserRoundCheck className="h-4 w-4" /> },
      { key: "personnel", label: "Personil", to: "/dashboard/personnel", icon: <UserPen className="h-4 w-4" /> },
      { key: "student", label: "Mahasiswa", to: "/dashboard/student", icon: <Users className="h-4 w-4" /> },
    ],
    roles: ["admin"],
  },
  {
    key: "letter",
    label: "Kelola Surat",
    icon: <Mail className="h-4 w-4" />,
    children: [
      { key: "letter", label: "Jenis Surat", to: "/dashboard/letter", icon: <Mail className="h-4 w-4" /> },
      { key: "header", label: "Kop Surat", to: "/dashboard/header", icon: <TextInitial className="h-4 w-4" /> },
      { key: "general_submission", label: "Surat Umum", to: "/dashboard/general-letter", icon: <Mails className="h-4 w-4" /> },
      { key: "student_submission", label: "Surat Mahasiswa", to: "/dashboard/student-letter", icon: <MailOpen className="h-4 w-4" /> },
    ],
    roles: ["admin"],
  },
  { key: "home", label: "Overview", to: "/dashboard", icon: <Home className="h-4 w-4" />, exact: true, roles: ["personnel"] },
  {
    key: "master",
    label: "Data Master",
    icon: <LayoutDashboard className="h-4 w-4" />,
    children: [
      { key: "official", label: "Dosen", to: "/dashboard/official", icon: <UserRoundCheck className="h-4 w-4" /> },
      { key: "student", label: "Mahasiswa", to: "/dashboard/student", icon: <Users className="h-4 w-4" /> },
      { key: "letter", label: "Jenis Surat", to: "/dashboard/letter", icon: <Mail className="h-4 w-4" /> },
      { key: "header", label: "Kop Surat", to: "/dashboard/header", icon: <TextInitial className="h-4 w-4" /> },
    ],
    roles: ["personnel"],
  },
  {
    key: "submission",
    label: "Kelola Surat",
    icon: <Mail className="h-4 w-4" />,
    children: [
      { key: "general_submission", label: "Surat Umum", to: "/dashboard/general-letter", icon: <Mails className="h-4 w-4" /> },
      { key: "student_submission", label: "Surat Mahasiswa", to: "/dashboard/student-letter", icon: <MailOpen className="h-4 w-4" /> },
    ],
    roles: ["personnel"]
  },
  {
    key: "management",
    label: "Pengguna",
    icon: <Users className="h-4 w-4" />,
    children: [
      { key: "users", label: "Users", to: "/dashboard/manage-personels", icon: <Users className="h-4 w-4" /> },
    ],
    roles: ["client"]
  },
  { key: "home", label: "Overview", to: "/dashboard-student", icon: <Home className="h-4 w-4" />, exact: true, roles: ["student"] },
  { key: "activity-history", label: "Kegiatan Saya", to: "/dashboard/student-activity", icon: <Activity className="h-4 w-4" />, roles: ["student"] },
  { key: "home", label: "Overview", to: "/dashboard-lecturer", icon: <Home className="h-4 w-4" />, exact: true, roles: ["lecturer"] },
  { key: "activity-history", label: "Kegiatan Saya", to: "/dashboard/lecturer-activity", icon: <Activity className="h-4 w-4" />, roles: ["lecturer"] },
  { key: "reporting-submission", label: "Verifikasi Laporan", to: "/dashboard/reporting-submission", icon: <ClipboardPenLine className="h-4 w-4" />, exact: true, roles: ["lecturer"] },
  { key: "signature", label: "Tanda Tangan", to: "/dashboard/signature", icon: <SignatureIcon className="h-4 w-4" />, exact: true, roles: ["lecturer"] },
  { key: "reporting", label: "Laporan", to: "/dashboard/reporting-periode", icon: <ClipboardPenLine className="h-4 w-4" />, roles: ["personnel", "admin"] },
  { key: "activity", label: "Kegiatan", to: "/dashboard/activity", icon: <Activity className="h-4 w-4" />, roles: ["admin", "personnel"] },
  { key: "announcement", label: "Pengumuman", to: "/dashboard/announcement", icon: <Megaphone className="h-4 w-4" />, roles: ["admin", "personnel"] },
  { key: "archive", label: "Arsip", to: "/dashboard/archive", icon: <ArchiveIcon className="h-4 w-4" />, roles: ["personnel"] },
  { key: "settings", label: "Pengaturan", to: "/dashboard/profile", icon: <Settings className="h-4 w-4" /> },
];

export function filterByRole(items: NavItem[], role?: Role | null) {
  if (!role) return [];
  return items.filter(i => !i.roles || i.roles.includes(role));
}
