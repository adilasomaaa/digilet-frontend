import type { NavChild, Role } from "@/components/dashboard/Nav";
import { LayoutDashboardIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useParams } from "react-router";

interface navbarItem {
    key: string;
    label: string;
    description: string;
    to?: string;
    icon?: ReactNode;
    exact?: boolean;
    children?: NavChild[];
    roles?: Role[];
  }

export const navColumn = (letterId: string | undefined): navbarItem[] => [
    {
      key: "letter-template-signature",
      label: "Template Tanda Tangan",
      to: `/dashboard/${letterId}/letter-signature-template`,
      description: "Template Tanda Tangan",
      exact: true,
      icon: "Signature",
      roles: ["admin", "user"],
    },
    {
      key: "letter-attribute",
      label: "Atribut Surat",
      to: `/dashboard/${letterId}/letter-attribute`,
      description: "Kelola Atribut Surat",
      exact: true,
      icon: 'FileText',
      roles: ["admin", "user"],
    },
    {
      key: "letter-document",
      label: "Dokumen yang Diperlukan",
      to: `/dashboard/${letterId}/letter-document`,
      description: "Dokumen yang Diperlukan",
      exact: true,
      icon: 'FolderOpen',
      roles: ["admin", "user"],
    },
    {
      key: "letter-template",
      label: "Template Surat",
      to: `/dashboard/${letterId}/letter-template`,
      description: "Dokumen yang Diperlukan",
      exact: true,
      icon: 'LayoutPanelTop',
      roles: ["admin", "user"],
    },
]
