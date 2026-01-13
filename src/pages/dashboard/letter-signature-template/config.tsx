import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";
import { Link } from "@heroui/react";
import { Share2 } from "lucide-react";

export const letterSignatureTemplateColumns = (onOpenToken: (item: any) => void): Column<any>[] => [
  { name: "Nama Penanda Tangan", uid: "official.name", sortable: true, defaultVisible: true, renderCell: (item) => <>
      <Link isBlock showAnchorIcon onPress={() => onOpenToken(item)} anchorIcon={<Share2 size={14} />} color="primary"  href={`/dashboard/${item.id}/letter-signature-template`} className="cursor-pointer">{item.official.name}</Link>
    </>  },
  { name: "Jabatan", uid: "official.occupation", sortable: true, defaultVisible: true },
  { name: "Posisi", uid: "position", sortable: true, defaultVisible: true },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const letterSignatureTemplateFormFields: FormFieldConfig[] = [
  { key: "officialId", label: "Penanda Tangan", type: "select", placeholder: "Pilih penanda tangan...", options: [], isRequired: true },
  { key: "position", label: "Posisi", type: "text", placeholder: "Masukkan posisi...", isRequired: true },
];

export const letterSignatureTemplateDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "official.name", label: "Nama Penanda Tangan" },
  { key: "official.occupation", label: "Jabatan" },
  { key: "letter.letterName", label: "Nama Surat" },
  { key: "position", label: "Posisi" },
];