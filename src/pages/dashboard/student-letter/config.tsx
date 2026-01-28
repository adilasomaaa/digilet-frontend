import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";
import { Chip, Button, Link, Tooltip } from "@heroui/react";
import { EyeIcon, PencilIcon, Trash2Icon, PrinterIcon, FileSignature, BadgeCheck } from "lucide-react";

export const studentLetterColumns = (
  onView?: (item: any) => void,
  onEdit?: (item: any) => void,
  onVerify?: (item: any) => void,
  onSignature?: (item: any) => void,
  onPrint?: (item: any) => void,
  onDelete?: (item: any) => void,
  role: 'student' | 'personnel' = 'student'
): Column<any>[] => [
  { name: "Nama", uid: "name", sortable: true, defaultVisible: true, renderCell: (item) => 
  <Link isBlock showAnchorIcon color="primary"  href={`/dashboard/student-letter/${item.id}/detail`} className="cursor-pointer">{item.name}</Link> },
  { name: "Lembaga", uid: "letter.institution.name", sortable: true, defaultVisible: true },
  { name: "Jenis Surat", uid: "letter.letterName", sortable: true, defaultVisible: false },
  {
    name: "Status",
    uid: "status",
    sortable: true,
    defaultVisible: true,
    renderCell: (item) => {
      const statusMap: Record<string, { color: "warning" | "primary" | "success" | "danger" | "secondary"; label: string }> = { 
        pending: { color: "warning", label: "Menunggu" },
        waiting_signature: { color: "secondary", label: "Menunggu Tanda Tangan" },
        approved: { color: "success", label: "Disetujui" },
        rejected: { color: "danger", label: "Ditolak" },
      };
      const status = item.status || "pending";
      return (
        <Chip
            variant="flat"
            color={statusMap[status].color}
            className="text-xs font-medium"
        >
          {statusMap[status].label}
        </Chip>
      );
    },
  },
  { name: "Dibuat pada", uid: "createdAt", sortable: true, defaultVisible: true, renderCell: (item) => new Date(item.createdAt).toLocaleString() },
  { name: "Diperbarui pada", uid: "updatedAt", sortable: true, defaultVisible: false, renderCell: (item) => new Date(item.updatedAt).toLocaleString() },
  { 
      name: "AKSI", 
      uid: "actions", 
      defaultVisible: true,
      renderCell: (item) => {
          return (
              <div className="flex items-center gap-2">
                  {onView && (
                    <Tooltip content="Lihat Detail">
                      <Button isIconOnly size="sm" variant="light" onPress={() => onView(item)}>
                          <EyeIcon className="w-4 h-4 text-default-500" />
                      </Button>
                    </Tooltip>
                  )}
                  
                  {role === 'personnel' && (
                      <>

                          {/* Verify - only if pending */}
                          {item.status === 'pending' && onVerify && (
                            <Tooltip content="Verifikasi">
                              <Button isIconOnly size="sm" variant="light" color="primary" onPress={() => onVerify(item)}>
                                  <BadgeCheck className="w-4 h-4" />
                              </Button>
                            </Tooltip>
                          )}

                          {/* Signature - if not pending */}
                          {item.status !== 'pending' && onSignature && (
                            <Tooltip content="Tanda Tangan">
                              <Button isIconOnly size="sm" variant="light" onPress={() => onSignature(item)}>
                                  <FileSignature className="w-4 h-4 text-default-500" />
                              </Button>
                            </Tooltip>
                          )}

                          {/* Print - only if approved */}
                          {item.status === 'approved' && onPrint && (
                            <Tooltip content="Cetak">
                              <Button isIconOnly size="sm" variant="light" onPress={() => onPrint(item)}>
                                  <PrinterIcon className="w-4 h-4 text-default-500" />
                              </Button>
                            </Tooltip>
                          )}
                      </>
                  )}

                  {role === 'student' && (
                      <>
                           {/* Edit - only if pending */}
                           {onEdit && (
                            <Tooltip content="Edit">
                              <Button isIconOnly size="sm" variant="light" isDisabled={item.status !== 'pending' && item.status !== 'rejected'} onPress={() => onEdit(item)}>
                                  <PencilIcon className="w-4 h-4 text-default-500" />
                              </Button>
                            </Tooltip>
                           )}

                           {/* Print - only if approved */}
                            {item.status === 'approved' && onPrint && (
                               <Tooltip content="Cetak">
                               <Button isIconOnly size="sm" variant="light" onPress={() => onPrint(item)}>
                                   <PrinterIcon className="w-4 h-4 text-default-500" />
                               </Button>
                               </Tooltip>
                           )}

                           {/* Delete - only if pending */}
                           {item.status === 'pending' && onDelete && (
                               <Tooltip color="danger" content="Hapus">
                               <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => onDelete(item)}>
                                   <Trash2Icon className="w-4 h-4" />
                               </Button>
                               </Tooltip>
                           )}
                      </>
                  )}
              </div>
          )
      }
  },
];

export const studentLetterFormFields: FormFieldConfig[] = [
  { key: "name", label: "Nama", type: "text", placeholder: "Masukkan nama..." },
];

export const studentLetterDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "name", label: "Nama" },
];

export const carbonCopyFormFields: FormFieldConfig[] = [
  {
    key: "carbonCopy",
    label: "Tembusan",
    type: "wysiwyg",
    placeholder: "Masukkan tembusan surat...",
    isRequired: false,
  },
];