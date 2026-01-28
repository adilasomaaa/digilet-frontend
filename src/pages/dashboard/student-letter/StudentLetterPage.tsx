import { useNavigate } from "react-router";
import { useStudentLetter } from "@/hooks/useStudentLetter";
import { 
  studentLetterColumns 
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import ShowModal from "@/components/dashboard/ShowModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { useMemo, useState } from "react";
import { Button, Chip, Tooltip } from "@heroui/react";
import { env } from "@/lib/env";
import { CopyIcon, EyeIcon, RotateCcw } from "lucide-react";
import ShareModal from "@/components/dashboard/ShareModal";
import { letterSignatureService } from "@/services/LetterSignatureService";
import { studentLetterService } from "@/services/StudentLetterService";
import ChangeStatusModal from "@/components/dashboard/ChangeStatusModal";

const StudentLetterPage = () => {
  const navigate = useNavigate();
  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue,
    sortDescriptor, setSortDescriptor,
    isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    viewingItem, setViewingItem, deletingItem, setDeletingItem,
    handleConfirmDelete, refresh
  } = useStudentLetter();

  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [selectedLetterForSig, setSelectedLetterForSig] = useState<any>(null);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [activeToken, setActiveToken] = useState("");
  const [itemToShare, setItemToShare] = useState("");
  const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);
  const [itemToChangeStatus, setItemToChangeStatus] = useState<any>(null);

  const handleVerify = (item: any) => {
      navigate(`/dashboard/student-letter/verify/${item.id}`);
  }

  const handleChangeStatus = (item: any) => {
      setItemToChangeStatus(item);
      setIsChangeStatusModalOpen(true);
  }

  const handleSignature = (item: any) => {
      setSelectedLetterForSig(item);
      setIsSignatureModalOpen(true);
  }

  const handlePrint = (item: any) => {
      window.open(`${env.apiBaseUrl}api/student-letter-submission/print-pdf/${item.token}`, '_blank');
  }

  const handleCopyLink = (token: string, code: string) => {
    setActiveToken(`${env.baseUrl}signature/verify/${token}`);
    setItemToShare(code);
    setIsCopyModalOpen(true);
  };

  const handleResetSignature = async (sigId: number) => {
    try {
      await letterSignatureService.reset(sigId);
      if (typeof refresh === 'function') {
        await refresh();
      }
      setIsSignatureModalOpen(false);
    }catch(error) {
      console.log(error);
    }
  };

  const onConfirmChangeStatus = async (status: string) => {
      if (!itemToChangeStatus) return;
      try {
          await studentLetterService.changeStatus(itemToChangeStatus.id, status);
          if (refresh) await refresh();
          setIsChangeStatusModalOpen(false);
      } catch (error) {
          console.error("Failed to change status", error);
      }
  }

  const columns = useMemo(() => studentLetterColumns(
    (item) => { setViewingItem(item); setIsViewModalOpen(true); },
    handleVerify,
    handleChangeStatus,
    handleSignature,
    handlePrint,
    (item) => { setDeletingItem(item); setIsDeleteModalOpen(true); },
    'personnel'
  ), [handleVerify, handleChangeStatus, handleSignature, handlePrint]);

  return (
    <div>
      <DashboardBreadcrumbs />
      <h1 className="text-2xl font-semibold my-4">Kelola Pengajuan Surat</h1>

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
          { key: "letterDate", label: "Tanggal Surat", render: (value) => value.letterDate ? new Date(value.letterDate).toLocaleDateString() : '-' },
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
                variant="flat"
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

      <ShowModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        title="Status & Akses Tanda Tangan"
        data={selectedLetterForSig}
        fields={selectedLetterForSig?.letterSignatures?.map((sig: any) => ({
          label: `${sig.letterSignatureTemplate.official.name}`,
          render: () => (
            <>
              <div className="flex items-center justify-between w-full p-2 border rounded-lg border-default-100">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{sig.letterSignatureTemplate.official.occupation}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <Chip
                      size="sm"
                      color={sig.verifiedAt ? "success" : "warning"}
                      variant="flat"
                    >
                      {sig.verifiedAt ? "Sudah Ditandatangani" : "Menunggu"}
                    </Chip>
                    {sig.verifiedAt && (
                      <span className="text-[10px] text-default-400">
                        {new Date(sig.verifiedAt).toLocaleString()}
                      </span>
                    )}
                  </div>
                  { sig.verifiedAt &&
                    <Button size="sm" variant="solid" color="danger" className="w-full my-2" startContent={<RotateCcw />} onPress={() => handleResetSignature(sig.id)}> Reset Tanda Tangan</Button>
                  }
                </div>

                <Tooltip content="Salin Tautan Tanda Tangan">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    color="primary"
                    onPress={() => handleCopyLink(sig.token, sig.code)}
                  >
                    <CopyIcon size={14} />
                  </Button>
                </Tooltip>
              </div>
            </>
          )
        }))}
      />

       <ShareModal
        isOpen={isCopyModalOpen}
        onClose={() => setIsCopyModalOpen(false)}
        title="Tautan Tanda Tangan Elektronik"
        description="Bagikan tautan ini kepada pejabat terkait untuk melakukan tanda tangan."
        shareLink={activeToken}
        code={itemToShare}
      />

      <ChangeStatusModal
          isOpen={isChangeStatusModalOpen}
          onClose={() => setIsChangeStatusModalOpen(false)}
          onConfirm={onConfirmChangeStatus}
          currentStatus={itemToChangeStatus?.status}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Pengajuan Surat"
        message={`Apakah Anda yakin ingin menghapus pengajuan "${deletingItem?.name}"?`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default StudentLetterPage;