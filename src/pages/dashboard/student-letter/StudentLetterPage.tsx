import { useStudentLetter } from "@/hooks/useStudentLetter";
import { 
  studentLetterColumns, 
  studentLetterFormFields, 
  studentLetterDisplayFields 
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import InputModal from "@/components/dashboard/InputModal";
import ShowModal from "@/components/dashboard/ShowModal";
import DeleteModal from "@/components/dashboard/DeleteModal";

const StudentLetterPage = () => {
  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue, filterState, setFilterState,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    handleConfirmDelete, form, onSubmit
  } = useStudentLetter();

  return (
    <div>
      <DashboardBreadcrumbs />
      <h1 className="text-2xl font-semibold my-4">Kelola Pengajuan Surat</h1>
      
      <DataTable
        data={items}
        isLoading={isLoading}
        columns={ studentLetterColumns }
        paginationInfo={paginationInfo}
        setPaginationInfo={setPaginationInfo}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
         sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        onEditItem={(item) => { setEditingItem(item); form.reset(item); setIsModalOpen(true); }}
        onViewItem={(item) => { setViewingItem(item); setIsViewModalOpen(true); }}
        onDeleteItem={(item) => { setDeletingItem(item); setIsDeleteModalOpen(true); }}
      />

      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Pengajuan Surat" : "Tambah Pengajuan Surat"}
        fields={ studentLetterFormFields }
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
        title="Detail Pengajuan Surat"
        data={viewingItem}
        fields={ studentLetterDisplayFields}
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

export default StudentLetterPage;