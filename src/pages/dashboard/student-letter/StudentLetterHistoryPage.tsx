import { useNavigate } from "react-router";
import { useStudentLetter } from "@/hooks/useStudentLetter";
import { 
  studentLetterColumns, 
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import ShowModal from "@/components/dashboard/ShowModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { Chip } from "@heroui/react";
import { env } from "@/lib/env";
import { EyeIcon } from "lucide-react";
import { useMemo } from "react";

const StudentLetterHistoryPage = () => {
  const navigate = useNavigate();
  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue,
    sortDescriptor, setSortDescriptor,
    isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    viewingItem, setViewingItem, deletingItem, setDeletingItem,
    handleConfirmDelete
  } = useStudentLetter();

  const handleEdit = (item: any) => {
      navigate(`/dashboard/student-letter/edit/${item.id}`);
  }

  const handlePrint = (item: any) => {
      window.open(`${env.apiBaseUrl}api/student-letter-submission/print-pdf/${item.token}`, '_blank');
  }

  const columns = useMemo(() => studentLetterColumns(
      (item) => { setViewingItem(item); setIsViewModalOpen(true); },
      handleEdit,
      undefined,
      undefined,
      handlePrint,
      (item) => { setDeletingItem(item); setIsDeleteModalOpen(true); },
      'student'
  ), [navigate]);

  return (
    <div>
      <DashboardBreadcrumbs />
      <h1 className="text-2xl font-semibold my-4">Riwayat Pengajuan Surat</h1>
      
      <DataTable
        data={items}
        isLoading={isLoading}
        columns={columns}
        paginationInfo={paginationInfo}
        setPaginationInfo={setPaginationInfo}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
      />

      <ShowModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detail Pengajuan Surat"
        data={viewingItem}
        fields={[
          { key: "name", label: "Perihal" },
          { key: "letterNumber", label: "Nomor Surat" },
          { key: "letter.institution.name", label: "Tujuan Surat" },
          { key: "createdAt", label: "Tanggal Pengajuan", render: (value) => new Date(value.createdAt).toLocaleDateString() },
          { key: "status", label: "Status", render: (item) => {
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
            }
          },
          ...(viewingItem?.letterAttributeSubmissions?.map((attr: any) => ({
            key: `letterAttributeSubmissions.${viewingItem.letterAttributeSubmissions.indexOf(attr)}.content`,
            label: attr.letterAttribute.label
          })) || []),
          ...(viewingItem?.documentSubmissions?.map((doc: any, index: number) => ({
            key: `documentSubmissions.${index}.filePath`,
            label: doc.letterDocument.documentName,
            render: () => (
              <a
                href={`${env.apiBaseUrl}${doc.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white p-2 rounded-lg hover:bg-primary/80 bg-primary flex items-center gap-2 w-fit"
              >
                <EyeIcon className="w-4 h-4" />
                Lihat File
              </a>
            ),
          })) || [])
        ]}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Pengajuan Surat"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.name}"?`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default StudentLetterHistoryPage;