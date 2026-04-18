import { useGeneralLetter } from "@/hooks/useGeneralLetter";
import { 
  generalLetterColumns,   
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import ShowModal from "@/components/dashboard/ShowModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { useNavigate } from "react-router";
import { useMemo, useState } from "react";
import { Button, Chip, Tooltip } from "@heroui/react";
import { CopyIcon, RotateCcw } from "lucide-react";
import ShareModal from "@/components/dashboard/ShareModal";
import { env } from "@/lib/env";
import { letterSignatureService } from "@/services/LetterSignatureService";

const GeneralLetterPage = () => {
  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue,
    sortDescriptor, setSortDescriptor,
    setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    handleConfirmDelete, form, refresh
  } = useGeneralLetter();

  const navigate = useNavigate();
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [selectedLetterForSig, setSelectedLetterForSig] = useState<any>(null);

  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
  const [activeToken, setActiveToken] = useState("");
  const [itemToShare, setItemToShare] = useState("");

  const handleCopyLink = (token: string, code: string) => {
    setActiveToken(`${env.baseUrl}signature/verify/${token}`);
    setItemToShare(code);
    setIsCopyModalOpen(true);
  };

  const handlePrint = (item: any) => {
    navigate(`/dashboard/general-letter/preview/${item.token}`)
  };

  const handleSignatureStatus = (item: any) => {
    setSelectedLetterForSig(item.letterSignatures.length > 0 ? item.letterSignatures : null);
    setIsSignatureModalOpen(true);
  };

  const handleResetSignature = async (item: any) => {
    try {
      await letterSignatureService.reset(item);
      if (typeof refresh === 'function') {
        await refresh(); 
      }
      setIsSignatureModalOpen(false);
    }catch(error) {
      console.log(error);
    }
  };

  const columns = useMemo(() => generalLetterColumns(
    (item) => { setViewingItem(item); setIsViewModalOpen(true); },
    handlePrint,
    handleSignatureStatus,
    (item) => { setDeletingItem(item); setIsDeleteModalOpen(true); }
  ), []);

  return (
    <div>
      <DashboardBreadcrumbs />
      <h1 className="text-2xl font-semibold my-4">Kelola Surat Umum</h1>
      
      <DataTable
        data={items}
        isLoading={isLoading}
        columns={ columns }
        paginationInfo={paginationInfo}
        setPaginationInfo={setPaginationInfo}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        onAddNew={() => { navigate(`/dashboard/general-letter/submission`) }}
        onEditItem={(item) => { setEditingItem(item); form.reset(item); setIsModalOpen(true); }}
        onViewItem={(item) => { setViewingItem(item); setIsViewModalOpen(true); }}
        onDeleteItem={(item) => { setDeletingItem(item); setIsDeleteModalOpen(true); }}
      />

      <ShowModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detail Surat Umum"
        data={viewingItem}
        fields={[
          { key: "name", label: "Perihal" },
          { key: "letter.letterName", label: "Template" },
          { key: "letterNumber", label: "Nomor Surat" },
          { key: "letter.letterDate", label: "Tanggal Surat", render: (value) => new Date(value.letterDate).toLocaleDateString() },
          ...(viewingItem?.letterAttributeSubmissions?.map((attr: any) => ({
            key: `letterAttributeSubmissions.${viewingItem.letterAttributeSubmissions.indexOf(attr)}.content`,
            label: attr.letterAttribute.label
          })) || [])
        ]}
      />

      <ShowModal
        isOpen={isSignatureModalOpen}
        onClose={() => setIsSignatureModalOpen(false)}
        title="Status & Akses Tanda Tangan"
        data={selectedLetterForSig}
        fields={selectedLetterForSig?.map((sig: any) => ({
          label: `${sig.official.name}`,
          render: () => (
            <>
              <div className="flex items-center justify-between w-full p-2 border rounded-lg border-default-100">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{sig.official.occupation}</span>
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
                    onPress={() => handleCopyLink(sig.token, sig.code)} // Mengambil token UUID dari DB
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

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Surat Umum"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.name}"?`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default GeneralLetterPage;