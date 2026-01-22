import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";
import { Chip, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Badge, EyeIcon, PencilIcon, Trash2Icon, PrinterIcon, FileSignature, MoreVerticalIcon, BadgeCheck } from "lucide-react";

export const studentLetterColumns = (
  onView?: (item: any) => void,
  onEdit?: (item: any) => void,
  onVerify?: (item: any) => void,
  onSignature?: (item: any) => void,
  onPrint?: (item: any) => void,
  onDelete?: (item: any) => void,
  role: 'student' | 'personnel' = 'student'
): Column<any>[] => [
  { name: "Nama", uid: "name", sortable: true, defaultVisible: true },
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
                      <Button isIconOnly size="sm" variant="light" onPress={() => onView(item)}>
                          <EyeIcon className="w-4 h-4 text-default-500" />
                      </Button>
                  )}
                  
                  {role === 'personnel' && (
                      <>
                          {/* Edit (Verify) */}
                          {onEdit && (
                              <Button isIconOnly size="sm" variant="light" onPress={() => onEdit(item)}>
                                  <PencilIcon className="w-4 h-4 text-warning" />
                              </Button>
                          )}
                          
                          {/* Verifikasi (Change Status) */}
                          {onVerify && (
                              <Button isIconOnly size="sm" variant="light" onPress={() => onVerify(item)}>
                                   <BadgeCheck className="w-4 h-4 text-success" />
                              </Button>
                          )}

                          {/* Signature & Print & Delete */}
                          <Dropdown>
                              <DropdownTrigger>
                                  <Button isIconOnly size="sm" variant="light">
                                      <MoreVerticalIcon className="w-4 h-4 text-default-500" />
                                  </Button>
                              </DropdownTrigger>
                              <DropdownMenu aria-label="More Actions">
                                  {/* Signature - if not pending */}
                                  {item.status !== 'pending' && onSignature ? (
                                      <DropdownItem key="signature" startContent={<FileSignature className="w-4 h-4" />} onPress={() => onSignature(item)}>
                                          Tanda Tangan
                                      </DropdownItem>
                                  ) : null as any}
                                  
                                  {/* Print - if not pending */}
                                  {item.status !== 'pending' && onPrint ? (
                                      <DropdownItem key="print" startContent={<PrinterIcon className="w-4 h-4" />} onPress={() => onPrint(item)}>
                                          Cetak
                                      </DropdownItem>
                                  ) : null as any}

                                  {onDelete && (
                                       <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2Icon className="w-4 h-4" />} onPress={() => onDelete(item)}>
                                          Hapus
                                       </DropdownItem>
                                  )}
                              </DropdownMenu>
                          </Dropdown>
                      </>
                  )}

                  {role === 'student' && (
                      <>
                           {/* Edit - only if pending */}
                           {onEdit && (
                              <Button isIconOnly size="sm" variant="light" isDisabled={item.status !== 'pending' && item.status !== 'rejected'} onPress={() => onEdit(item)}>
                                  <PencilIcon className="w-4 h-4 text-default-500" />
                              </Button>
                           )}

                           {/* Print - only if approved */}
                            {item.status === 'approved' && onPrint && (
                               <Button isIconOnly size="sm" variant="light" onPress={() => onPrint(item)}>
                                   <PrinterIcon className="w-4 h-4 text-default-500" />
                               </Button>
                           )}

                           {/* Delete - only if pending */}
                           {item.status === 'pending' && onDelete && (
                               <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => onDelete(item)}>
                                   <Trash2Icon className="w-4 h-4" />
                               </Button>
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