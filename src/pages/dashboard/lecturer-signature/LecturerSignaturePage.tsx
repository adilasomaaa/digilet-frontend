import { 
  lecturerSignatureColumns, 
  lecturerSignatureFormFields, 
  lecturerSignatureDisplayFields 
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import InputModal from "@/components/dashboard/InputModal";
import ShowModal from "@/components/dashboard/ShowModal";
import ConfirmationModal from "@/components/dashboard/ConfirmationModal";
import { useLetterSignature } from "@/hooks/useLetterSignature";
import { useMemo, useState } from "react";

const LecturerSignaturePage = () => {
  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue, filterState, setFilterState,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    editingItem, viewingItem, setViewingItem,
    form, onSubmit, handleResetSignature
  } = useLetterSignature();

  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [signatureIdToReset, setSignatureIdToReset] = useState<number | null>(null);
  const [isResetting, setIsResetting] = useState(false);

  const handleResetClick = (id: number) => {
    setSignatureIdToReset(id);
    setIsResetModalOpen(true);
  };

  const onConfirmReset = async () => {
      if (signatureIdToReset !== null) {
          setIsResetting(true);
          await handleResetSignature(signatureIdToReset);
          setIsResetting(false);
          setIsResetModalOpen(false);
          setSignatureIdToReset(null);
      }
  };

  const columns = useMemo(() => lecturerSignatureColumns(
      (item) => { setViewingItem(item); setIsViewModalOpen(true); },
      (item) => handleResetClick(item.id),
    ), []);
  

  return (
    <div>
      <DashboardBreadcrumbs />
      <h1 className="text-2xl font-semibold my-4">Riwayat Tanda Tangan Surat</h1>
      
      <DataTable
        data={items}
        isLoading={isLoading}
        columns={columns}
        paginationInfo={paginationInfo}
        setPaginationInfo={setPaginationInfo}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        filterState={filterState}
        setFilterState={setFilterState}
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        onViewItem={(item) => { setViewingItem(item); setIsViewModalOpen(true); }}
      />

      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Institusi" : "Tambah Institusi"}
        fields={lecturerSignatureFormFields}
        register={form.register}
        onSubmit={form.handleSubmit(onSubmit)}
        errors={form.formState.errors}
        setValue={form.setValue}
        watch={form.watch}
        isLoading={isSubmitting}
      />

      <ShowModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detail Institusi"
        data={viewingItem}
        fields={lecturerSignatureDisplayFields}
      />

      <ConfirmationModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={onConfirmReset}
        title="Reset Tanda Tangan"
        message="Apakah Anda yakin ingin mereset tanda tangan ini? Tindakan ini tidak dapat dibatalkan."
        isLoading={isResetting}
        color="warning"
        confirmLabel="Ya, Reset"
      />
    </div>
  );
};

export default LecturerSignaturePage;