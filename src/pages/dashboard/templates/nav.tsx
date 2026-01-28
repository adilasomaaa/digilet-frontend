import type { NavChild, Role } from "@/components/dashboard/Nav";
import type { ReactNode } from "react";

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

export const letterNavColumn = (letterId: string | undefined): navbarItem[] => [
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

export const generalLetterNavColumn = (generalLetterId: string | undefined): navbarItem[] => [
    {
      key: "general-letter-detail",
      label: "Detail Surat",
      to: `/dashboard/general-letter/${generalLetterId}/detail`,
      description: "Detail Surat",
      exact: true,
      icon: "Info",
      roles: ["admin", "user"],
    },
    {
      key: "general-letter-template-signature",
      label: "Tanda Tangan",
      to: `/dashboard/general-letter/${generalLetterId}/signature`,
      description: "Kelola Atribut Surat",
      exact: true,
      icon: 'FileSignature',
      roles: ["admin", "user"],
    },
    {
      key: "general-letter-attachment",
      label: "Lampiran",
      to: `/dashboard/general-letter/${generalLetterId}/attachment`,
      description: "Dokumen yang Diperlukan",
      exact: true,
      icon: 'LayoutPanelTop',
      roles: ["admin", "user"],
    },
]

export const studentLetterNavColumn = (studentLetterId: string | undefined): navbarItem[] => [
    {
      key: "student-letter-detail",
      label: "Detail Surat",
      to: `/dashboard/student-letter/${studentLetterId}/detail`,
      description: "Detail Surat",
      exact: true,
      icon: "Info",
      roles: ["admin", "user"],
    },
    {
      key: "student-letter-template-signature",
      label: "Tanda Tangan",
      to: `/dashboard/student-letter/${studentLetterId}/signature`,
      description: "Kelola Atribut Surat",
      exact: true,
      icon: 'FileSignature',
      roles: ["admin", "user"],
    },
    {
      key: "student-letter-attachment",
      label: "Lampiran",
      to: `/dashboard/student-letter/${studentLetterId}/attachment`,
      description: "Dokumen yang Diperlukan",
      exact: true,
      icon: 'LayoutPanelTop',
      roles: ["admin", "user"],
    },
]
