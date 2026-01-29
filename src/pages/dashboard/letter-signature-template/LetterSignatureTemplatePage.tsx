import { useLetterSignatureTemplate } from "@/hooks/useLetterSignatureTemplate";
import { 
  letterSignatureTemplateColumns, 
  letterSignatureTemplateFormFields, 
  letterSignatureTemplateDisplayFields 
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import InputModal from "@/components/dashboard/InputModal";
import ShowModal from "@/components/dashboard/ShowModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { useOfficial } from "@/hooks/useOfficial";
import { useMemo } from "react";
import { useParams } from "react-router";

const LetterSignatureTemplatePage = () => {
  const {letterId} = useParams()

  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    handleConfirmDelete, form, onSubmit
  } = useLetterSignatureTemplate(letterId);

  const { allItems } = useOfficial({ fetchTable: false, fetchDropdown: true });

  const dynamicFormFields = useMemo(() => {
    return letterSignatureTemplateFormFields.map((field) => {
      if (field.key === "officialId") {
        return { ...field, options: allItems };
      }
      return field;
    });
  }, [allItems, editingItem]);

  return (
    <div>
      <DashboardBreadcrumbs />
      <h1 className="text-2xl font-semibold my-4">Kelola Template Tanda Tangan</h1>
      
      <DataTable
        data={items}
        isLoading={isLoading}
        columns={ letterSignatureTemplateColumns }
        paginationInfo={paginationInfo}
        setPaginationInfo={setPaginationInfo}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
         sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        onAddNew={() => { form.reset(); setEditingItem(null); setIsModalOpen(true); }}
        onEditItem={(item) => { setEditingItem(item); form.reset(item); setIsModalOpen(true); }}
        onViewItem={(item) => { setViewingItem(item); setIsViewModalOpen(true); }}
        onDeleteItem={(item) => { setDeletingItem(item); setIsDeleteModalOpen(true); }}
      />

      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Template Tanda Tangan" : "Tambah Template Tanda Tangan"}
        fields={ dynamicFormFields }
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
        title="Detail Template Tanda Tangan"
        data={viewingItem}
        fields={ letterSignatureTemplateDisplayFields}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Template Tanda Tangan"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.official.name}"?`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default LetterSignatureTemplatePage;