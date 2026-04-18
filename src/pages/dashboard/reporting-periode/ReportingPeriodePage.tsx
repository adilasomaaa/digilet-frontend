import { useReportingPeriode } from "@/hooks/useReportingPeriode";
import { 
  reportingPeriodeColumns, 
  reportingPeriodeFormFields, 
  reportingPeriodeDisplayFields 
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import InputModal from "@/components/dashboard/InputModal";
import ShowModal from "@/components/dashboard/ShowModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { useInstitution } from "@/hooks/useInstitution";
import { useMemo } from "react";

const ReportingPeriodePage = () => {
  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    handleConfirmDelete, form, onSubmit
  } = useReportingPeriode();

  const { allItems } = useInstitution({ fetchTable: false, fetchDropdown: true });
      
  const dynamicFormFields = useMemo(() => {
    return reportingPeriodeFormFields.map((field) => {
      if (field.key === "institutionId") {
        return { ...field, options: allItems };
      }
      return field;
    });
  }, [allItems]);


  return (
    <div>
      <DashboardBreadcrumbs />
      <h1 className="text-2xl font-semibold my-4">Kelola Periode Laporan</h1>
      
      <DataTable
        data={items}
        isLoading={isLoading}
        columns={ reportingPeriodeColumns }
        paginationInfo={paginationInfo}
        setPaginationInfo={setPaginationInfo}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
         sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        onAddNew={() => { 
          form.reset({
            name: "",
            description: "",
            targetUser: "",
            scope: "",
          }); 
          setEditingItem(null); 
          setIsModalOpen(true); 
        }}
        onEditItem={(item) => { 
          setEditingItem(item); 
          form.reset(item); 
          setIsModalOpen(true); 
        }}
        onViewItem={(item) => { setViewingItem(item); setIsViewModalOpen(true); }}
        onDeleteItem={(item) => { setDeletingItem(item); setIsDeleteModalOpen(true); }}
      />

      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Periode Laporan" : "Tambah Periode Laporan"}
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
        title="Detail Periode Laporan"
        data={viewingItem}
        fields={ reportingPeriodeDisplayFields}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Periode Laporan"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.name}"?`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default ReportingPeriodePage;