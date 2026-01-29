import { usePersonnel } from "@/hooks/usePersonnel";
import { 
  personnelColumns, 
  personnelFormFields, 
  personnelDisplayFields 
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import InputModal from "@/components/dashboard/InputModal";
import ShowModal from "@/components/dashboard/ShowModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { useMemo } from "react";
import { useInstitution } from "@/hooks/useInstitution";

const PersonnelPage = () => {
  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    handleConfirmDelete, form, onSubmit
  } = usePersonnel();

  const { allItems } = useInstitution({ fetchTable: false, fetchDropdown: true });
  
  const dynamicFormFields = useMemo(() => {
    return personnelFormFields.map((field) => {
      if (field.key === "institutionId") {
        return { ...field, options: allItems };
      }
      return field;
    });
  }, [allItems]);

  return (
    <div>
      <DashboardBreadcrumbs />
      <h1 className="text-2xl font-semibold my-4">Kelola Personnel</h1>
      
      <DataTable
        data={items}
        isLoading={isLoading}
        columns={ personnelColumns }
        paginationInfo={paginationInfo}
        setPaginationInfo={setPaginationInfo}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        onAddNew={() => { form.reset({
          name: "",
          position: "",
          email: "",
          institutionId: undefined,
        }); setEditingItem(null); setIsModalOpen(true); }}
        onEditItem={(item) => { 
          setEditingItem(item);
          const dataForForm = {
            ...item,
            email: item.user?.email || item.email, 
          };

          form.reset(dataForForm);
          setIsModalOpen(true);
         }}
        onViewItem={(item) => { setViewingItem(item); setIsViewModalOpen(true); }}
        onDeleteItem={(item) => { setDeletingItem(item); setIsDeleteModalOpen(true); }}
      />

      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Personnel" : "Tambah Personnel"}
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
        title="Detail Personnel"
        data={viewingItem}
        fields={ personnelDisplayFields}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Personnel"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.name}"?`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default PersonnelPage;