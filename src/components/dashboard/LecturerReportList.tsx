import { useState } from 'react';
import { useLecturerReport } from "@/hooks/useLecturerReport";
import type { LecturerReport } from '@/models';
import { Chip, Button, Accordion, AccordionItem, Skeleton, Input, Pagination, Select, SelectItem } from "@heroui/react";
import { CheckCircle, Clock, Trash2, ShieldCheck, Download, SearchIcon, FileSpreadsheet } from "lucide-react";
import DeleteModal from "@/components/dashboard/DeleteModal";
import { lecturerReportService } from '@/services/LecturerReportService';
import VerificationModal, { type VerifyFormData } from "@/components/dashboard/VerificationModal";
import { env } from '@/lib/env';

const LecturerReportList = ({ reportingStageId, validatorId, reporterId }: { reportingStageId: string, validatorId?: string | number, reporterId?: string | number }) => {
    const { 
        items: reports, 
        isLoading, 
        isSubmitting: isDeleting,
        setDeletingItem,
        handleConfirmDelete,
        setIsDeleteModalOpen,
        isDeleteModalOpen,
        fetchItems,
        filterValue, setFilterValue,
        isVerifiedFilter, setIsVerifiedFilter,
        buildParams,
        paginationInfo, setPaginationInfo
    } = useLecturerReport(reportingStageId, validatorId, reporterId);

    const [verifyingItem, setVerifyingItem] = useState<LecturerReport | null>(null);
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    const handleDeleteClick = (report: LecturerReport) => {
        setDeletingItem(report);
        setIsDeleteModalOpen(true);
    };

    const handleVerifyClick = (report: LecturerReport) => {
        setVerifyingItem(report);
        setIsVerifyModalOpen(true);
    };

    const handleVerifySubmit = async (data: VerifyFormData) => {
        if (!verifyingItem) return;
        setIsVerifying(true);
        try {
            await lecturerReportService.verify(verifyingItem.id, data);
            await fetchItems();
            setIsVerifyModalOpen(false);
            setVerifyingItem(null);
        } catch (error) {
            console.error(error);
        } finally {
            setIsVerifying(false);
        }
    };

    const handleExport = async () => {
        setIsExporting(true);
        try {
            // Build export params without pagination
            const params = buildParams();
            delete params.page;
            delete params.limit;
            await lecturerReportService.exportExcel(params);
        } catch (error) {
            console.error('Export failed:', error);
        } finally {
            setIsExporting(false);
        }
    };

    const handleStatusFilterChange = (value: string) => {
        if (value === 'true') setIsVerifiedFilter(true);
        else if (value === 'false') setIsVerifiedFilter(false);
        else setIsVerifiedFilter(null);
        setPaginationInfo(prev => ({ ...prev, page: 1 }));
    };

    if (isLoading) {
            return (
                <div className="flex flex-col gap-4">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="rounded-lg h-24 w-full" />
                    ))}
                </div>
            )
        }

    return (
        <div className="flex flex-col gap-4">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 items-end bg-background p-1">
                <Input
                    isClearable
                    className="w-full sm:max-w-[40%]"
                    placeholder="Cari laporan..."
                    startContent={<SearchIcon className="w-4 h-4" />}
                    value={filterValue}
                    onClear={() => setFilterValue('')}
                    onValueChange={(val) => setFilterValue(val)}
                />
                <div className="flex items-center gap-2 flex-wrap">
                    <Select
                        size="sm"
                        className="w-44"
                        placeholder="Filter Status"
                        selectedKeys={isVerifiedFilter === null ? ['all'] : [String(isVerifiedFilter)]}
                        onSelectionChange={(keys) => handleStatusFilterChange([...keys][0] as string)}
                        aria-label="Filter status verifikasi"
                    >
                        <SelectItem key="all">Semua Status</SelectItem>
                        <SelectItem key="false">Belum Diverifikasi</SelectItem>
                        <SelectItem key="true">Sudah Diverifikasi</SelectItem>
                    </Select>
                    <Button
                        size="sm"
                        color="success"
                        variant="flat"
                        isLoading={isExporting}
                        onPress={handleExport}
                        startContent={!isExporting && <FileSpreadsheet size={16} />}
                    >
                        Export Excel
                    </Button>
                    <div className="flex items-center gap-2">
                        <label className="text-small text-default-400">Rows per page:</label>
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={(e) => setPaginationInfo(prev => ({ ...prev, limit: Number(e.target.value), page: 1 }))}
                            value={paginationInfo.limit}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                </div>
            </div>

             {reports.map((report) => (
                <Accordion key={report.id} variant="splitted" className="px-0">
                    <AccordionItem 
                        key={report.id} 
                        aria-label={report.reporter.name}
                        title={
                            <div className="flex justify-between items-center pr-4">
                                <div className="flex flex-col">
                                    <span className="font-semibold">{report.reporter.name}</span>
                                    <span className="text-tiny text-default-400">Validator: {report.validator.name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                     <span className="text-tiny text-default-400">{new Date(report.createdAt).toLocaleDateString()}</span>
                                     <Chip
                                        color={report.verifiedAt ? "success" : "warning"}
                                        variant="flat"
                                        size="sm"
                                        startContent={report.verifiedAt ? <CheckCircle size={14}/> : <Clock size={14}/>}
                                    >
                                        {report.verifiedAt ? "Verified" : "Pending"}
                                    </Chip>
                                </div>
                            </div>
                        }
                    >
                        <div className="flex flex-col gap-4 pb-2">
                             {/* Validator Information */}
                            {report.validatorId && (
                                <div className="flex items-center gap-2 bg-default-50 p-3 rounded-lg">
                                    <span className="font-semibold text-small">Validator:</span>
                                    <span className="text-small">{report.validator.name}</span>
                                </div>
                            )}

                             {/* Content */}
                             <div className="p-4 rounded-lg bg-default-50">
                                <div className="font-semibold mb-2">Isi Laporan</div>
                                <div dangerouslySetInnerHTML={{ __html: report.content }} className="prose prose-sm max-w-none" />
                             </div>

                             {/* Document */}
                             {report.documentProved && (
                                <div className="flex items-center gap-2 bg-default-50 p-3 rounded-lg ">
                                    <span className="font-semibold text-small">Bukti Dokumen:</span>
                                    <a 
                                        href={`${env.apiBaseUrl}/uploads/documents/${report.documentProved}`} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="text-primary text-small hover:underline flex items-center gap-1"
                                    >
                                        <Download size={16} /> Lihat Dokumen
                                    </a>
                                </div>
                             )}
                            
                             {/* Verification Info if already verified */}
                             {report.verifiedAt && (
                                <div className="bg-success-50 p-4 rounded-lg border border-success-200">
                                    <div className="flex items-center gap-2 text-success-700 font-semibold mb-2">
                                        <ShieldCheck size={18} /> Laporan Diverifikasi
                                    </div>
                                    <div className="text-small text-default-600">
                                        <div>Oleh: {report.validator.name}</div>
                                        <div>Pada: {new Date(report.verifiedAt).toLocaleString()}</div>
                                        {report.notes && <div className="mt-2 text-default-500 italic">"{report.notes}"</div>}
                                    </div>
                                </div>
                             )}

                             <div className="flex justify-end gap-2 mt-2 pt-4">
                                 {!report.verifiedAt && (
                                     <Button 
                                        color="primary" 
                                        onPress={() => handleVerifyClick(report)}
                                        startContent={<ShieldCheck size={16} />}
                                    >
                                        Verifikasi
                                    </Button>
                                 )}
                                <Button 
                                    color="danger" 
                                    variant="flat" 
                                    onPress={() => handleDeleteClick(report)}
                                    startContent={<Trash2 size={16} />}
                                >
                                    Hapus Laporan
                                </Button>
                             </div>
                        </div>
                    </AccordionItem>
                </Accordion>
             ))}

            {reports.length === 0 && !isLoading && (
                 <div className="text-center text-default-500 py-10">
                    Belum ada laporan dosen.
                </div>
            )}

            {/* Pagination Controls */}
             <div className="py-2 px-2 flex justify-between items-center bg-background">
                <span className="text-small text-default-400">
                    Total {paginationInfo.totalData} items
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={paginationInfo.page}
                    total={paginationInfo.totalPages}
                    onChange={(page) => setPaginationInfo(prev => ({ ...prev, page }))}
                />
            </div>

            <VerificationModal 
                isOpen={isVerifyModalOpen}
                onClose={() => setIsVerifyModalOpen(false)}
                onVerify={handleVerifySubmit}
                isLoading={isVerifying}
                defaultNotes={verifyingItem?.notes || ""}
            />

             <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Hapus Laporan"
                message="Apakah anda yakin ingin menghapus laporan ini? Tindakan ini tidak dapat dibatalkan."
                isLoading={isDeleting}
            />
        </div>
    );
};

export default LecturerReportList;
