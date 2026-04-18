import { useLetterAttribute } from "@/hooks/useLetterAttribute";
import { 
  letterAttributeColumns, 
  letterAttributeFormFields, 
  letterAttributeDisplayFields 
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import InputModal from "@/components/dashboard/InputModal";
import ShowModal from "@/components/dashboard/ShowModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { useParams } from "react-router";

const LetterAttributePage = () => {
  const {letterId} = useParams()
  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue, 
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    handleConfirmDelete, form, onSubmit
  } = useLetterAttribute(letterId);

  return (
    <div>
      <DashboardBreadcrumbs />
      <h1 className="text-2xl font-semibold my-4">Kelola Atribut Surat</h1>
      
      <DataTable
        data={items}
        isLoading={isLoading}
        columns={ letterAttributeColumns }
        paginationInfo={paginationInfo}
        setPaginationInfo={setPaginationInfo}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
         sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        onAddNew={() => { form.reset({
            attributeName: "",
            placeholder:"",
            label:"",
            isRequired: false,
            isVisible: false,
            isEditable: false
          }); 
          setEditingItem(null); 
          setIsModalOpen(true); 
        }}
        onEditItem={(item) => { setEditingItem(item); form.reset(item); setIsModalOpen(true); }}
        onViewItem={(item) => { setViewingItem(item); setIsViewModalOpen(true); }}
        onDeleteItem={(item) => { setDeletingItem(item); setIsDeleteModalOpen(true); }}
      />

      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Atribut Surat" : "Tambah Atribut Surat"}
        fields={ letterAttributeFormFields }
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
        title="Detail Atribut Surat"
        data={viewingItem}
        fields={ letterAttributeDisplayFields}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Atribut Surat"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.attributeName}"?`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default LetterAttributePage;