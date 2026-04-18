import { useActivityParticipant } from "@/hooks/useActivityParticipant";
import {
  activityParticipantColumns,
  activityParticipantFormFields,
  activityParticipantDisplayFields
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import InputModal from "@/components/dashboard/InputModal";
import ShowModal from "@/components/dashboard/ShowModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { useParams, Link } from "react-router";
import { Button, Card, CardBody } from "@heroui/react";
import { CheckCircle, FileText, Download, ArrowLeftCircle } from "lucide-react";
import React from "react";
import ActivityInfoTable from "@/components/dashboard/activity/ActivityInfoTable";

const ActivityParticipantPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    items, activity, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, setDeletingItem,
    handleConfirmDelete, form, onSubmit, handleVerify, handleVerifyBulk,
    handleExportExcel, handleExportPdf
  } = useActivityParticipant(id);

  const columnsWithVerify = React.useMemo(() => {
    return activityParticipantColumns.map(col => {
      if (col.uid === 'actions') {
        return {
          ...col,
          renderCell: (item: any) => (
            <div className="flex items-center gap-2">
              {!item.isVerified && (
                <Button
                  isIconOnly
                  size="sm"
                  color="success"
                  variant="flat"
                  onPress={() => handleVerify(item.id)}
                  title="Verifikasi"
                >
                  <CheckCircle className="w-4 h-4" />
                </Button>
              )}
            </div>
          )
        };
      }
      return col;
    });
  }, [handleVerify]);

  return (
    <div className="flex flex-col gap-4">
      <DashboardBreadcrumbs />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-1 flex flex-col gap-4">
          <Button as={Link} to="/dashboard/activity" variant='flat' color="primary" className='w-full'>
            <ArrowLeftCircle /> Kembali
          </Button>

          <Card className="shadow-sm border-none bg-primary/5">
            <CardBody className="p-4">
              <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wider">Statistik Peserta</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-default-500">Total</span>
                  <span className="text-sm font-bold">{paginationInfo.totalData}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-default-500">Terverifikasi</span>
                  <span className="text-sm font-bold text-success">{items.filter(i => i.isVerified).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-default-500">Pending</span>
                  <span className="text-sm font-bold text-warning">{items.filter(i => !i.isVerified).length}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="col-span-4 flex flex-col gap-6">
          <Card className='shadow-sm border-none'>
            <CardBody>
              <ActivityInfoTable activity={activity} isLoading={isLoading} />
            </CardBody>
          </Card>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-default-700">Daftar Kehadiran Peserta</h2>
              <div className="flex gap-2">
                <Button
                  variant="flat"
                  color="success"
                  size="sm"
                  onPress={() => handleVerifyBulk(items.map(i => i.id))}
                  isLoading={isSubmitting}
                  startContent={<CheckCircle className="w-4 h-4" />}
                >
                  Verifikasi Semua Peserta
                </Button>
                <Button
                  variant="flat"
                  color="primary"
                  size="sm"
                  onPress={handleExportExcel}
                  isLoading={isSubmitting}
                  startContent={<Download className="w-4 h-4" />}
                >
                  Excel
                </Button>
                <Button
                  variant="flat"
                  color="secondary"
                  size="sm"
                  onPress={handleExportPdf}
                  isLoading={isSubmitting}
                  startContent={<FileText className="w-4 h-4" />}
                >
                  PDF
                </Button>
              </div>
            </div>

            <DataTable
              data={items}
              isLoading={isLoading}
              columns={columnsWithVerify}
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
          </div>
        </div>
      </div>

      <InputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Peserta Kegiatan" : "Tambah Peserta Kegiatan"}
        fields={activityParticipantFormFields}
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
        title="Detail Peserta Kegiatan"
        data={viewingItem}
        fields={activityParticipantDisplayFields}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Hapus Peserta Kegiatan"
        message={`Apakah Anda yakin ingin menghapus absensi ini?`}
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default ActivityParticipantPage;