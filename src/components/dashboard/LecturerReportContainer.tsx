
import { useState } from 'react';
import { Card, CardBody, Listbox, ListboxItem, Button, Chip, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { useReportingPeriode } from "@/hooks/useReportingPeriode";
import { useLecturerReport } from "@/hooks/useLecturerReport";
import { useOfficial } from "@/hooks/useOfficial";
import { PlusCircle, FileText, CheckCircle, Edit, Trash2 } from "lucide-react";
import InputModal from "@/components/dashboard/InputModal";
import DeleteModal from "@/components/dashboard/DeleteModal";
import type { FormFieldConfig } from "@/types";
import type { LecturerReport } from '@/models';
import { env } from '@/lib/env';
import AvailableReports from "./reports/AvailableReports";
import MyLecturerReports from "./reports/MyLecturerReports";
import { useAuth } from '@/context/AuthContext';


const LecturerReportContainer = ({ reportingStageId }: { reportingStageId?: string }) => {
    const hasStageId = !!reportingStageId;
    const initialKey = hasStageId ? "my_reports" : "available";
    const [selectedKey, setSelectedKey] = useState<Set<React.Key>>(new Set([initialKey]));
    const selectedValue = Array.from(selectedKey)[0];
    const auth = useAuth();

    // Hooks
    const { 
        items: periodes, 
        isLoading: isLoadingPeriodes,
        filterValue: periodeFilterValue,
        setFilterValue: setPeriodeFilterValue,
        paginationInfo: periodePaginationInfo,
        setPaginationInfo: setPeriodePaginationInfo
    } = useReportingPeriode(undefined, { targetUser: 'lecturer' });

    const { items: officials } = useOfficial(); 
    const { 
        items: reports, 
        isLoading: isLoadingReports,
        onSubmit: submitReport,
        isSubmitting,
        form,
        setIsModalOpen, isModalOpen,
        setIsViewModalOpen, isViewModalOpen,
        setIsDeleteModalOpen, isDeleteModalOpen,
        editingItem, setEditingItem,
        viewingItem, setViewingItem,
        setDeletingItem,
        handleConfirmDelete,
        filterValue: reportFilterValue,
        setFilterValue: setReportFilterValue,
        paginationInfo: reportPaginationInfo,
        setPaginationInfo: setReportPaginationInfo
    } = useLecturerReport(reportingStageId, undefined, auth.user?.official?.id);

    const [selectedStage, setSelectedStage] = useState<any>(null);

    // Handlers
    const handleCreateClick = (stage: any) => {
        setSelectedStage(stage);
        setEditingItem(null);
        form.reset({
            reportingStageId: stage?.id || (reportingStageId ? Number(reportingStageId) : undefined),
            validatorId: undefined,
            content: '',
            documentProved: undefined
        });
        setIsModalOpen(true);
    };

    const handleCreateNewClick = () => {
         setEditingItem(null);
         form.reset({
            reportingStageId: reportingStageId ? Number(reportingStageId) : undefined,
            validatorId: undefined,
            content: '',
            documentProved: undefined
        });
        setIsModalOpen(true);
    }

    const handleViewDetail = (report: LecturerReport) => {
        setViewingItem(report);
        setIsViewModalOpen(true);
    };

    const handleEditClick = () => {
        if (viewingItem) {
            setEditingItem(viewingItem);
            setIsViewModalOpen(false);
            form.reset({
            reportingStageId: viewingItem.reportingStageId,
            validatorId: viewingItem.validatorId,
            content: viewingItem.content,
        });
            setIsModalOpen(true);
        }
    };

    const handleDeleteClick = () => {
        if (viewingItem) {
            setDeletingItem(viewingItem);
            setIsViewModalOpen(false);
            setIsDeleteModalOpen(true);
        }
    };

    const officialOptions = officials.map(o => ({ value: o.id, label: o.name }));

    const formFields: FormFieldConfig[] = [
        { key: "content", label: "Isi Laporan", type: "textarea", isRequired: true, placeholder: "Tuliskan isi laporan anda..." },
        { key: "documentProved", label: "Bukti Dokumen", type: "upload", isRequired: false },
        { key: "validatorId", label: "Validator", type: "select", options: officialOptions, isRequired: true, placeholder: "Pilih Validator" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-3">
                <Card>
                    <CardBody className="p-2">
                        <Listbox 
                            aria-label="Menu Laporan" 
                            onSelectionChange={(keys) => setSelectedKey(keys as any)} 
                            selectionMode="single"
                            selectedKeys={selectedKey as any}
                            disallowEmptySelection
                        >
                            {!hasStageId ? <ListboxItem key="available" startContent={<FileText size={20} />}>Laporan Tersedia</ListboxItem> : null}
                            <ListboxItem key="my_reports" startContent={<CheckCircle size={20} />}>Laporan Saya</ListboxItem>
                        </Listbox>
                    </CardBody>
                </Card>
                {hasStageId && (
                     <Button 
                        className="w-full mt-4" 
                        color="primary" 
                        startContent={<PlusCircle size={16} />} 
                        onPress={handleCreateNewClick}
                    >
                        Buat Laporan Baru
                    </Button>
                )}
            </div>
            <div className="md:col-span-9">
                {selectedValue === "available" && !hasStageId && (
                    <AvailableReports 
                        periodes={periodes} 
                        isLoadingPeriodes={isLoadingPeriodes} 
                        handleCreateClick={handleCreateClick}
                        filterValue={periodeFilterValue}
                        setFilterValue={setPeriodeFilterValue}
                        paginationInfo={periodePaginationInfo}
                        setPaginationInfo={setPeriodePaginationInfo}
                    />
                )}
                {selectedValue === "my_reports" && (
                    <MyLecturerReports 
                        reports={reports} 
                        isLoadingReports={isLoadingReports} 
                        onViewDetail={handleViewDetail}
                        filterValue={reportFilterValue}
                        setFilterValue={setReportFilterValue}
                        paginationInfo={reportPaginationInfo}
                        setPaginationInfo={setReportPaginationInfo}
                    />
                )}
            </div>

            {/* Input Modal */}
            <InputModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingItem ? "Edit Laporan" : `Buat Laporan: ${selectedStage?.stageName || ''}`}
                fields={formFields}
                onSubmit={form.handleSubmit(submitReport)}
                isLoading={isSubmitting}
                register={form.register}
                errors={form.formState.errors}
                setValue={form.setValue}
                watch={form.watch}
            />

            {/* Detail Modal */}
            <Modal isOpen={isViewModalOpen} onOpenChange={() => setIsViewModalOpen(false)} placement="center" size="lg">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Detail Laporan</ModalHeader>
                            <ModalBody>
                                {viewingItem && (
                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="font-semibold text-small">Tahapan</div>
                                            <div className="col-span-2 text-small">: {viewingItem.reportingStage.stageName}</div>
                                            
                                            <div className="font-semibold text-small">Periode</div>
                                            <div className="col-span-2 text-small">: {viewingItem.reportingStage.reportingPeriode?.name}</div>

                                            <div className="font-semibold text-small">Validator</div>
                                            <div className="col-span-2 text-small">: {viewingItem.validator.name}</div>

                                            <div className="font-semibold text-small">Tanggal Diajukan</div>
                                            <div className="col-span-2 text-small">: {new Date(viewingItem.createdAt).toLocaleString()}</div>

                                            <div className="font-semibold text-small">Status</div>
                                            <div className="col-span-2 text-small">
                                                <Chip color={viewingItem.verifiedAt ? "success" : "warning"} variant="flat" size="sm">
                                                    {viewingItem.verifiedAt ? "Disetujui" : "Menunggu Verifikasi"}
                                                </Chip>
                                            </div>

                                            <div className="font-semibold text-small">Bukti Dokumen</div>
                                            <div className="col-span-2 text-small">
                                                {viewingItem.documentProved ? (
                                                    <a href={`${env.apiBaseUrl}/${viewingItem.documentProved}`} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                                                        Lihat Dokumen
                                                    </a>
                                                ) : '-'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-small mb-1">Isi Laporan:</div>
                                            <div className="p-3 rounded-md bg-default-50 text-small max-h-60 overflow-y-auto" dangerouslySetInnerHTML={{ __html: viewingItem.content }} />
                                        </div>
                                        {viewingItem.verifiedAt && (
                                            <div>
                                                <div className="font-semibold text-small mb-1">Catatan Validator:</div>
                                                <div className="p-3 rounded-md bg-default-50 text-small max-h-60 overflow-y-auto" dangerouslySetInnerHTML={{ __html: viewingItem.notes || '-' }} />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </ModalBody>
                             <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Tutup
                                </Button>
                                {viewingItem && !viewingItem.verifiedAt && (
                                    <>
                                        <Button color="warning" variant="flat" onPress={handleEditClick} startContent={<Edit size={16} />}>
                                            Edit
                                        </Button>
                                        <Button color="danger" variant="flat" onPress={handleDeleteClick} startContent={<Trash2 size={16} />}>
                                            Hapus
                                        </Button>
                                    </>
                                )}
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            {/* Delete Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Hapus Laporan"
                message="Apakah anda yakin ingin menghapus laporan ini? Tindakan ini tidak dapat dibatalkan."
                isLoading={isSubmitting}
            />
        </div>
    );
};

export default LecturerReportContainer;
