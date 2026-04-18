import { useState } from 'react';
import DataTable from "@/components/dashboard/DataTable";
import type { Column } from "@/components/dashboard/DataTable";
import { useStudentReport } from "@/hooks/useStudentReport";
import type { StudentReport } from '@/models';
import { Chip, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/react";
import { CheckCircle, Clock } from "lucide-react";

const AdminStudentReportTable = ({ reportingStageId }: { reportingStageId: string }) => {
    const { 
        items: reports, 
        isLoading, 
        paginationInfo, 
        setPaginationInfo, 
        setFilterValue, 
        filterValue,
    } = useStudentReport(reportingStageId);

    const [viewingItem, setViewingItem] = useState<StudentReport | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);

    const handleViewDetail = (report: StudentReport) => {
        setViewingItem(report);
        setIsViewModalOpen(true);
    };

    const columns: Column<StudentReport>[] = [
        { name: "Nama Mahasiswa", uid: "student.fullname", sortable: true, defaultVisible: true },
        { name: "NIM", uid: "student.nim", sortable: true, defaultVisible: true },
        { name: "Tanggal Pengajuan", uid: "createdAt", sortable: true, defaultVisible: true },
        { name: "Dosen Pembimbing", uid: "official.name", sortable: true, defaultVisible: true },
        { name: "Status", uid: "status", sortable: true, defaultVisible: true },
        { name: "Aksi", uid: "actions", defaultVisible: true },
    ];

    const renderCell = (item: StudentReport, columnKey: React.Key) => {
        switch (columnKey) {
            case "student.fullname":
                return item.student?.fullname || '-';
            case "student.nim":
                return item.student?.nim || '-';
            case "createdAt":
                return new Date(item.createdAt).toLocaleString();
            case "official.name":
                return item.official?.name || '-';
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
        renderCell: (item: StudentReport) =>  renderCell(item, col.uid)
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
                            <ModalHeader className="flex flex-col gap-1">Detail Laporan Mahasiswa</ModalHeader>
                            <ModalBody>
                                {viewingItem && (
                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="font-semibold text-small">Nama</div>
                                            <div className="col-span-2 text-small">: {viewingItem.student.fullname} ({viewingItem.student.nim})</div>
                                            
                                            <div className="font-semibold text-small">Tahapan</div>
                                            <div className="col-span-2 text-small">: {viewingItem.reportingStage.stageName}</div>
                                            
                                            <div className="font-semibold text-small">Dosen</div>
                                            <div className="col-span-2 text-small">: {viewingItem.official.name}</div>

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

export default AdminStudentReportTable;
