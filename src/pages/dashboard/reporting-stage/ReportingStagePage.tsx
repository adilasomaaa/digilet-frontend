import { useReportingStage } from "@/hooks/useReportingStage";
import { 
  reportingStageColumns, 
  reportingStageFormFields, 
  reportingStageDisplayFields 
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import InputModal from "@/components/dashboard/InputModal";
import ShowModal from "@/components/dashboard/ShowModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { useParams } from "react-router";
import { parseDate } from "@internationalized/date";

const ReportingStagePage = () => {
  const {reportingPeriodeId} = useParams()
  const {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    handleConfirmDelete, form, onSubmit
  } = useReportingStage(reportingPeriodeId);

  return (
    <div>
      <DashboardBreadcrumbs />
      <h1 className="text-2xl font-semibold my-4">Kelola Tahapan Laporan</h1>
      
      <DataTable
        data={items}
        isLoading={isLoading}
        columns={ reportingStageColumns }
        paginationInfo={paginationInfo}
        setPaginationInfo={setPaginationInfo}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
         sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        onAddNew={() => { 
          form.reset({
            stageName: "",
            startDate: null,
            endDate: null,
          }); 
          setEditingItem(null); 
          setIsModalOpen(true); 
        }}
        onEditItem={(item) => 
          { 
            setEditingItem(item); 
            const formattedData = {
                ...item,
                startDate: item.startDate ? parseDate(item.startDate.split('T')[0]) : null,
                endDate: item.endDate ? parseDate(item.endDate.split('T')[0]) : null,
              };
            form.reset(formattedData); 
            setIsModalOpen(true); 
          }
        }
        onViewItem={(item) => { setViewingItem(item); setIsViewModalOpen(true); }}
        onDeleteItem={(item) => { setDeletingItem(item); setIsDeleteModalOpen(true); }}
      />

      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Tahapan Laporan" : "Tambah Tahapan Laporan"}
        fields={ reportingStageFormFields }
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
        title="Detail Tahapan Laporan"
        data={viewingItem}
        fields={ reportingStageDisplayFields}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Tahapan Laporan"
        message={`Apakah Anda yakin ingin menghapus "${deletingItem?.stageName}"?`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default ReportingStagePage;