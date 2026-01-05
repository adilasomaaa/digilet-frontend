import { useStudent } from "@/hooks/useStudent";
import { 
  studentColumns, 
  studentFormFields, 
  studentDisplayFields 
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import InputModal from "@/components/dashboard/InputModal";
import ShowModal from "@/components/dashboard/ShowModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { useStudyProgram } from "@/hooks/useStudyProgram";
import { useMemo, useState } from "react";
import { parseDate } from "@internationalized/date";
import ImportModal from "@/components/dashboard/ImportModal";
import TemplateMahasiswa from "@/assets/templates/import-mahasiswa.xlsx?url";

const StudentPage = () => {
  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue, filterState, setFilterState,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    handleConfirmDelete, form, onSubmit, handleExport,
    setIsImportModalOpen, isImportModalOpen, isImportLoading, handleImport
  } = useStudent();

  const { allItems } = useStudyProgram()
    
  const dynamicFormFields = useMemo(() => {
    return studentFormFields.map((field) => {
      if (field.key === "studyProgramId") {
        return { ...field, options: allItems };
      }
      return field;
    });
  }, [allItems]);

  return (
    <div>
      <DashboardBreadcrumbs />
      <h1 className="text-2xl font-semibold my-4">Kelola Mahasiswa</h1>
      
      <DataTable
        data={items}
        isLoading={isLoading}
        columns={ studentColumns }
        paginationInfo={paginationInfo}
        setPaginationInfo={setPaginationInfo}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortDescriptor={sortDescriptor}
        showExport={true}
        showImport={true}
        onExport={() => handleExport()}
        onImport={() => setIsImportModalOpen(true)}
        setSortDescriptor={setSortDescriptor}
        onAddNew={() => { form.reset(); setEditingItem(null); setIsModalOpen(true); }}
        onEditItem={(item) => { 
          setEditingItem(item); 
          const formattedData = {
            ...item,
            birthday: item.birthday ? parseDate(item.birthday.split('T')[0]) : null,
            email: item.user?.email 
          };
          form.reset(formattedData); 
          setIsModalOpen(true); 
        }}
        onViewItem={(item) => { setViewingItem(item); setIsViewModalOpen(true); }}
        onDeleteItem={(item) => { setDeletingItem(item); setIsDeleteModalOpen(true); }}
      />

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        title="Import Data Mahasiswa"
        templateUrl={TemplateMahasiswa}
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
        title={editingItem ? "Edit Mahasiswa" : "Tambah Mahasiswa"}
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
        title="Detail Mahasiswa"
        data={viewingItem}
        fields={ studentDisplayFields}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Mahasiswa"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.fullname}"?`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default StudentPage;