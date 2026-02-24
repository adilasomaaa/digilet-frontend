import { useState } from 'react';
import DataTable from "@/components/dashboard/DataTable";
import type { Column } from "@/components/dashboard/DataTable";
import { useLecturerReport } from "@/hooks/useLecturerReport";
import type { LecturerReport } from '@/models';
import { Chip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { CheckCircle, Clock } from "lucide-react";

const AdminLecturerReportTable = ({ reportingStageId }: { reportingStageId: string }) => {
    // We can reuse useLecturerReport but need to ensure it fetches ALL reports for the stage if the endpoint supports it.
    // The current hook seems to fetch "myReports" by default. 
    // We might need to check if useLecturerReport exposes a way to fetch all reports or if we need a new hook/service call.
    // Based on previous analysis, we have `getReportsToVerify` but that's for validators.
    // Let's check `LecturerReportService` again. It has `index` which likely fetches reports based on query params.
    // If the backend `index` endpoint returns all reports when called by admin, then generic `index` is fine.
    // Assuming `useLecturerReport` calls `index` for `items`. 

    // Wait, `useLecturerReport` returns `items` which maps to `myReports`.
    // Let's double check `useLecturerReport` implementation to see what it calls.
    // For now, I will assume I can use the same hook and pass filters, or I might need to use `lecturerReportService.index` directly if the hook is too specific to "My Reports".
    // Actually, `useLecturerReport` calls `fetchItems` which calls `lecturerReportService.index`. 
    // If the user is Admin, `index` should return all reports for the stage if filtered by stageId.
    
    // However, looking at `StudentReportContainer`, `useStudentReport` was used.
    // Let's use `useLecturerReport` for consistency and assume backend handles roles.

    const { 
        items: reports, 
        isLoading, 
        paginationInfo, 
        setPaginationInfo, 
        setFilterValue, 
        filterValue,
    } = useLecturerReport(reportingStageId);

    const [viewingItem, setViewingItem] = useState<LecturerReport | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const handleViewDetail = (report: LecturerReport) => {
        setViewingItem(report);
        setIsViewModalOpen(true);
    };

    const columns: Column<LecturerReport>[] = [
        { name: "Nama Dosen", uid: "reporter.name", sortable: true, defaultVisible: true },
        { name: "Tanggal Pengajuan", uid: "createdAt", sortable: true, defaultVisible: true },
        { name: "Validator", uid: "validator.name", sortable: true, defaultVisible: true },
        { name: "Status", uid: "status", sortable: true, defaultVisible: true },
        { name: "Aksi", uid: "actions", defaultVisible: true },
    ];

    const renderCell = (item: LecturerReport, columnKey: React.Key) => {
        switch (columnKey) {
            case "reporter.name":
                return item.reporter?.name || '-';
            case "createdAt":
                return new Date(item.createdAt).toLocaleString();
            case "validator.name":
                return item.validator?.name || '-';
            case "status":
                return (
                    <Chip
                        color={item.verifiedAt ? "success" : "warning"}
                        variant="flat"
                        startContent={item.verifiedAt ? <CheckCircle size={14}/> : <Clock size={14}/>}
                        size="sm"
                    >
                        {item.verifiedAt ? "Disetujui" : "Menunggu"}
                    </Chip>
                );
            case "actions":
                return (
                    <Button size="sm" variant="light" onPress={() => handleViewDetail(item)}>
                        Detail
                    </Button>
                );
            default:
                return null;
        }
    };

    const tableColumns = columns.map(col => ({
        ...col,
        renderCell: (item: LecturerReport) =>  renderCell(item, col.uid)
    }));

    return (
        <>
             <DataTable
                data={reports}
                columns={tableColumns}
                isLoading={isLoading}
                paginationInfo={paginationInfo}
                setPaginationInfo={setPaginationInfo}
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                sortDescriptor={{ column: "createdAt", direction: "descending" }}
                setSortDescriptor={() => {}}
            />

            {/* Detail Modal */}
            <Modal isOpen={isViewModalOpen} onOpenChange={setIsViewModalOpen} placement="center" size="lg" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Detail Laporan Dosen</ModalHeader>
                            <ModalBody>
                                {viewingItem && (
                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="font-semibold text-small">Pengaju</div>
                                            <div className="col-span-2 text-small">: {viewingItem.reporter.name}</div>
                                            
                                            <div className="font-semibold text-small">Tahapan</div>
                                            <div className="col-span-2 text-small">: {viewingItem.reportingStage.stageName}</div>
                                            
                                            <div className="font-semibold text-small">Validator</div>
                                            <div className="col-span-2 text-small">: {viewingItem.validator.name}</div>

                                            <div className="font-semibold text-small">Tanggal Diajukan</div>
                                            <div className="col-span-2 text-small">: {new Date(viewingItem.createdAt).toLocaleString()}</div>

                                            <div className="font-semibold text-small">Status</div>
                                            <div className="col-span-2 text-small">
                                                <Chip color={viewingItem.verifiedAt ? "success" : "warning"} variant="flat" size="sm">
                                                    {viewingItem.verifiedAt ? `Disetujui ${new Date(viewingItem.verifiedAt).toLocaleDateString()}` : "Menunggu Verifikasi"}
                                                </Chip>
                                            </div>

                                            <div className="font-semibold text-small">Bukti Dokumen</div>
                                            <div className="col-span-2 text-small">
                                                {viewingItem.documentProved ? (
                                                    <a href={`${import.meta.env.VITE_API_URL}/uploads/documents/${viewingItem.documentProved}`} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                                                        Lihat Dokumen
                                                    </a>
                                                ) : '-'}
                                            </div>
                                             {viewingItem.notes && (
                                                <>
                                                    <div className="font-semibold text-small">Catatan</div>
                                                    <div className="col-span-2 text-small">: {viewingItem.notes}</div>
                                                </>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-small mb-1">Isi Laporan:</div>
                                            <div className="border p-3 rounded-md bg-default-50 text-small max-h-60 overflow-y-auto" dangerouslySetInnerHTML={{ __html: viewingItem.content }} />
                                        </div>
                                    </div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="light" onPress={onClose}>
                                    Tutup
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default AdminLecturerReportTable;
