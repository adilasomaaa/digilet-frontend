import { useOfficial } from "@/hooks/useOfficial";
import { 
  officialColumns, 
  officialFormFields, 
  officialDisplayFields 
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import InputModal from "@/components/dashboard/InputModal";
import ShowModal from "@/components/dashboard/ShowModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import DataTable from "@/components/dashboard/DataTable";
import { useMemo } from "react";
import { useInstitution } from "@/hooks/useInstitution";

const OfficialPage = () => {
  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    handleConfirmDelete, form, onSubmit
  } = useOfficial({ fetchTable: true, fetchDropdown: false });

  const { allItems } = useInstitution({ fetchTable: false, fetchDropdown: true });

  const dynamicFormFields = useMemo(() => {
    return officialFormFields.map((field) => {
      if (field.key === "institutionId") {
        return { ...field, options: allItems };
      }
      return field;
    });
  }, [allItems]);

  return (
    <div>
      <DashboardBreadcrumbs />
      <h1 className="text-2xl font-semibold my-4">Kelola Dosen</h1>
      
      <DataTable
        data={items}
        isLoading={isLoading}
        columns={ officialColumns }
        paginationInfo={paginationInfo}
        setPaginationInfo={setPaginationInfo}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        onAddNew={() => { 
          form.reset({
            name: "",
            institutionId: undefined,
            occupation: "",
            nip: "",
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
        title={editingItem ? "Edit Pimpinan" : "Tambah Pimpinan"}
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
        title="Detail Pimpinan"
        data={viewingItem}
        fields={ officialDisplayFields}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Pimpinan"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.name}"?`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default OfficialPage;