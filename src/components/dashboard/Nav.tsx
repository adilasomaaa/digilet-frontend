import { type ReactNode } from "react";
import { LayoutDashboard, Users, Settings, Home, BarChart3, TagIcon, Split, FolderOpen, CircleQuestionMark, CircleFadingPlus, Store, ClipboardList } from "lucide-react";

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
      { key: "official", label: "Pimpinan", to: "/dashboard/official", icon: <Store className="h-4 w-4" /> },
      { key: "personnel", label: "Personil", to: "/dashboard/personnel", icon: <Users className="h-4 w-4" /> },
      { key: "student", label: "Mahasiswa", to: "/dashboard/student", icon: <TagIcon className="h-4 w-4" /> },
    ],
    roles: ["admin"],
  },
  {
    key: "letter",
    label: "Kelola Surat",
    icon: <LayoutDashboard className="h-4 w-4" />,
    children: [
      { key: "letter", label: "Jenis Surat", to: "/dashboard/letter", icon: <ClipboardList className="h-4 w-4" /> },
      { key: "header", label: "Kop Surat", to: "/dashboard/header", icon: <Store className="h-4 w-4" /> },
      { key: "personnel", label: "Personil", to: "/dashboard/personnel", icon: <Users className="h-4 w-4" /> },
      { key: "student", label: "Mahasiswa", to: "/dashboard/student", icon: <TagIcon className="h-4 w-4" /> },
    ],
    roles: ["admin"],
  },
  { key: "home",    label: "Overview", to: "/dashboard/manage-my-shop", icon: <Home className="h-4 w-4" />, exact: true, roles: ["client"] },
  {
    key: "shop",
    label: "Toko",
    icon: <LayoutDashboard className="h-4 w-4" />,
    children: [
      { key: "cabang_toko", label: "Cabang Toko", to: "/dashboard/manage-branch", icon: <Split className="h-4 w-4" /> },
      { key: "produk", label: "Produk", to: "/dashboard/manage-product", icon: <FolderOpen className="h-4 w-4" /> },
      { key: "faq", label: "FAQ", to: "/dashboard/manage-faq", icon: <CircleQuestionMark className="h-4 w-4" /> },
      { key: "sosial-media", label: "Sosial Media", to: "/dashboard/manage-sosial-media", icon: <CircleFadingPlus className="h-4 w-4" /> },
    ],
    roles: ["client"],
  },
  {
    key: "management",
    label: "Pengguna",
    icon: <Users className="h-4 w-4" />,
    children: [
      { key: "users", label: "Users", to: "/dashboard/manage-users", icon: <Users className="h-4 w-4" /> },
      { key: "roles", label: "Roles", to: "/dashboard/manage-roles", icon: <TagIcon className="h-4 w-4" /> },
      { key: "permissions", label: "Permissions", to: "/dashboard/manage-permissions", icon: <TagIcon className="h-4 w-4" /> },
    ],
    roles: ["admin"]
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
  { key: "settings",label: "Settings", to: "/settings",  icon: <Settings className="h-4 w-4" /> },
];

export function filterByRole(items: NavItem[], role?: Role | null) {
  if (!role) return [];
  return items.filter(i => !i.roles || i.roles.includes(role));
}
