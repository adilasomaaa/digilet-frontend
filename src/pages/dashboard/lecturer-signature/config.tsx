import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";
import { Button, Chip, Tooltip } from "@heroui/react";
import { EyeIcon,  FileSearchCorner, FileSignatureIcon, Redo2Icon } from "lucide-react";
import { Link } from "react-router";

export const lecturerSignatureColumns = (
  onView: (item: any) => void,
  onReset: (item: any) => void,
): Column<any>[] => [
  {
    name: "Nama Pengaju",
    uid: "submissionName",
    sortable: false,
    defaultVisible: true,
    renderCell: (item) => {
        return (
            <div className="flex flex-col">
                <span className="font-semibold text-small">
                    {item.generalLetterSubmission?.name || item.studentLetterSubmission?.name || '-'}
                </span>
                <span className="text-tiny text-default-400">
                    {item.generalLetterSubmission ? "Surat Umum" : (item.studentLetterSubmission ? "Surat Mahasiswa" : "-")}
                </span>
            </div>
        )
    }
  },
  {
    uid: "occupation",
    name: "Jabatan",
    sortable: true,
    defaultVisible: true,
  },
  {
    uid: "verifiedAt",
    name: "Tanggal Verifikasi",
    sortable: true,
    defaultVisible: true,
    renderCell: (item) => {
        return item.verifiedAt ? (
             <Chip color="success" variant="flat" size="sm">
                {new Date(item.verifiedAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                })}
             </Chip>
        ) : (
            <Chip color="warning" variant="flat" size="sm">Belum Diverifikasi</Chip>
        );
    }
  },
  { name: "ACTIONS", uid: "actions", defaultVisible: true, renderCell: (item) => (
    <div className="flex items-center gap-2">
        <Tooltip content="Lihat Detail">
          <Button isIconOnly size="sm" variant="light" onPress={() => onView(item)}>
            <EyeIcon className="w-4 h-4 text-default-400" />
          </Button>
        </Tooltip>
        {!item.verifiedAt ? 
            (
                <Tooltip content="Tanda Tangani Surat">
                    <Button 
                        as={Link}
                        isIconOnly
                        size="sm"
                        target="#blank"
                        variant="light"
                        color="primary"
                        to={`/signature/verify/${item.token}`}
                    >
                        <FileSignatureIcon className="w-4 h-4" />
                    </Button>
                </Tooltip>
            )
            :
            (
                <Tooltip content="Reset Tanda Tangan">
                    <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => onReset(item)}>
                        <Redo2Icon className="w-4 h-4" />
                    </Button>
                </Tooltip>
            )
        }
        <Tooltip content="Lihat Surat">
          <Button
            as={Link}
            isIconOnly
            size="sm"
            target="#blank"
            variant="light"
            color="primary"
            to={`/dashboard/${item.generalLetterSubmission ? "general-letter" : "student-letter"}/preview/${item.generalLetterSubmission?.token || item.studentLetterSubmission?.token}`}
          >
            <FileSearchCorner className="w-4 h-4" />
          </Button>
        </Tooltip>
      </div>
  ) },
];

export const lecturerSignatureFormFields: FormFieldConfig[] = [
  {
    key: "occupation",
    label: "Jabatan",
    type: "text",
    placeholder: "Masukkan jabatan...",
    isRequired: true,
  },
];

export const lecturerSignatureDisplayFields: DisplayFieldConfig<any>[] = [
  { 
    key: "submissionName", 
    label: "Nama Pengaju",
    render: (item) => item.generalLetterSubmission?.name || item.studentLetterSubmission?.name || '-'
  },
  { key: "occupation", label: "Jabatan" },
  { key: "code", label: "Kode" },
  { 
    key: "verifiedAt", 
    label: "Tanggal Verifikasi",
    render: (item) => item.verifiedAt ? new Date(item.verifiedAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                }) : 'Belum Diverifikasi'
  },
];