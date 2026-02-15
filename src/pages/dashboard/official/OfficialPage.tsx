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
import ImportModal from "@/components/dashboard/ImportModal";
import TemplateDosen from "@/assets/templates/import-dosen.xlsx?url";

const OfficialPage = () => {
  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    handleConfirmDelete, form, onSubmit, handleExport,
    setIsImportModalOpen, isImportModalOpen, isImportLoading, handleImport
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
        onExport={() => handleExport()}
        onImport={() => setIsImportModalOpen(true)}
        sortDescriptor={sortDescriptor}
        showExport={true}
        showImport={true}
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

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import Data Dosen"
        templateUrl={TemplateDosen}
        isLoading={isImportLoading}
        extraFields={[
          {
            key: "studyProgramId",
            label: "Program Studi Tujuan",
            options: allItems
          }
        ]}
        onConfirm={(file, extraData) => handleImport(file, extraData.studyProgramId)}
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