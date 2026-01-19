import { type ReactNode } from "react";
import { LayoutDashboard, Users, Settings, Home, TagIcon, Split, FolderOpen, CircleQuestionMark, CircleFadingPlus, Store, ClipboardList, UserRoundCheck, UserPen, Mail, TextInitial, Mails, MailsIcon, MailOpen } from "lucide-react";

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
  { key: "home",    label: "Overview", to: "/dashboard", icon: <Home className="h-4 w-4" />, exact: true, roles: ["admin"] },
  {
    key: "master",
    label: "Data Master",
    icon: <LayoutDashboard className="h-4 w-4" />,
    children: [
    { key: "study_program", label: "Program Studi", to: "/dashboard/study-program", icon: <ClipboardList className="h-4 w-4" /> },
      { key: "official", label: "Pimpinan", to: "/dashboard/official", icon: <UserRoundCheck className="h-4 w-4" /> },
      { key: "personnel", label: "Personil", to: "/dashboard/personnel", icon: <UserPen className="h-4 w-4" /> },
      { key: "student", label: "Mahasiswa", to: "/dashboard/student", icon: <Users className="h-4 w-4" /> },
    ],
    roles: ["admin"],
  },
  {
    key: "letter",
    label: "Kelola Surat",
    icon: <LayoutDashboard className="h-4 w-4" />,
    children: [
      { key: "letter", label: "Jenis Surat", to: "/dashboard/letter", icon: <Mail className="h-4 w-4" /> },
      { key: "header", label: "Kop Surat", to: "/dashboard/header", icon: <TextInitial className="h-4 w-4" /> },
      { key: "general_submission", label: "Surat Umum", to: "/dashboard/personnel", icon: <Mails className="h-4 w-4" /> },
      { key: "student_submission", label: "Surat Mahasiswa", to: "/dashboard/student", icon: <MailOpen className="h-4 w-4" /> },
    ],
    roles: ["admin"],
  },
  { key: "home",    label: "Overview", to: "/dashboard", icon: <Home className="h-4 w-4" />, exact: true, roles: ["personnel"] },
  {
    key: "master",
    label: "Data Master",
    icon: <LayoutDashboard className="h-4 w-4" />,
    children: [
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
  { key: "home",    label: "Overview", to: "/dashboard", icon: <Home className="h-4 w-4" />, exact: true, roles: ["student"] },
  {
    key: "master",
    label: "Data Master",
    icon: <LayoutDashboard className="h-4 w-4" />,
    children: [
      { key: "student", label: "Pengajuan Surat", to: "/dashboard/student-letter/submission", icon: <Users className="h-4 w-4" /> },
      { key: "letter", label: "Riwayat Pengajuan", to: "/dashboard/student-letter", icon: <Mail className="h-4 w-4" /> },
    ],
    roles: ["student"],
  },
  { key: "settings",label: "Settings", to: "/settings",  icon: <Settings className="h-4 w-4" /> },
];

export function filterByRole(items: NavItem[], role?: Role | null) {
  if (!role) return [];
  return items.filter(i => !i.roles || i.roles.includes(role));
}
