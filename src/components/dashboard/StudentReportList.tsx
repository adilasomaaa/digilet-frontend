import { useState, useMemo } from 'react';
import { useStudentReport } from "@/hooks/useStudentReport";
import type { StudentReport } from '@/models';
import { 
    Chip, 
    Button, 
    Accordion, 
    AccordionItem, 
    Skeleton, 
    Input, 
    Select, 
    SelectItem,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody
} from "@heroui/react";
import { 
    CheckCircle, 
    Clock, 
    Trash2, 
    Download, 
    ShieldCheck, 
    SearchIcon, 
    FileSpreadsheet,
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon
} from "lucide-react";
import DeleteModal from "@/components/dashboard/DeleteModal";
import VerificationModal, { type VerifyFormData } from "@/components/dashboard/VerificationModal";
import { studentReportService } from "@/services/StudentReportService";
import { env } from '@/lib/env';

const StudentReportList = ({ reportingStageId, officialId }: { reportingStageId: string, officialId?: string | number }) => {
    // Fetch up to 1000 reports to display on the calendar
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
        setPaginationInfo
    } = useStudentReport(reportingStageId, officialId, 1000);

    const [verifyingItem, setVerifyingItem] = useState<StudentReport | null>(null);
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    // Calendar Navigation State
    const [currentDate, setCurrentDate] = useState(new Date());
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Day details Modal State
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [isDayModalOpen, setIsDayModalOpen] = useState(false);

    const handleDeleteClick = (report: StudentReport) => {
        setDeletingItem(report);
        setIsDeleteModalOpen(true);
    };

    const handleVerifyClick = (report: StudentReport) => {
        setVerifyingItem(report);
        setIsVerifyModalOpen(true);
    };

    const handleVerifySubmit = async (data: VerifyFormData) => {
        if (!verifyingItem) return;
        setIsVerifying(true);
        try {
            await studentReportService.verify(verifyingItem.id, data);
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
            const params = buildParams();
            delete params.page;
            delete params.limit;
            await studentReportService.exportExcel(params);
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

    // Helper: format Date object to YYYY-MM-DD local string
    const getLocalDateString = (dateStr: string) => {
        const d = new Date(dateStr);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const date = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${date}`;
    };

    // Group reports by date
    const reportsByDate = useMemo(() => {
        return reports.reduce((acc: Record<string, StudentReport[]>, report) => {
            const dateStr = getLocalDateString(report.createdAt);
            if (!acc[dateStr]) {
                acc[dateStr] = [];
            }
            acc[dateStr].push(report);
            return acc;
        }, {});
    }, [reports]);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    // Calendar Grid Calculation
    const calendarCells = useMemo(() => {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0: Sunday, 1: Monday, etc.

        // Prev month days for padding
        const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
        const paddingDays = [];
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            paddingDays.push({
                day: prevMonthDays - i,
                isCurrentMonth: false,
                dateStr: null
            });
        }

        // Current month days
        const currentDays = [];
        for (let i = 1; i <= daysInMonth; i++) {
            const monthStr = String(currentMonth + 1).padStart(2, '0');
            const dayStr = String(i).padStart(2, '0');
            currentDays.push({
                day: i,
                isCurrentMonth: true,
                dateStr: `${currentYear}-${monthStr}-${dayStr}`
            });
        }

        // Next month days for padding (to total 42 grid cells: 6 rows * 7 days)
        const totalCells = paddingDays.length + currentDays.length;
        const nextMonthPadding = 42 - totalCells;
        const nextDays = [];
        for (let i = 1; i <= nextMonthPadding; i++) {
            nextDays.push({
                day: i,
                isCurrentMonth: false,
                dateStr: null
            });
        }

        return [...paddingDays, ...currentDays, ...nextDays];
    }, [currentYear, currentMonth]);

    const monthNames = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const todayStr = useMemo(() => {
        const d = new Date();
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const date = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${date}`;
    }, []);

    const currentMonthReportsCount = useMemo(() => {
        return reports.filter(report => {
            const d = new Date(report.createdAt);
            return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
        }).length;
    }, [reports, currentYear, currentMonth]);

    // Get reports for the selected day in Modal
    const selectedDayReports = useMemo(() => {
        if (!selectedDate) return [];
        return reportsByDate[selectedDate] || [];
    }, [selectedDate, reportsByDate]);

    const handleDayClick = (dateStr: string | null) => {
        if (!dateStr) return;
        const dayReports = reportsByDate[dateStr] || [];
        if (dayReports.length > 0) {
            setSelectedDate(dateStr);
            setIsDayModalOpen(true);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
               {[1, 2, 3].map((i) => (
                   <Skeleton key={i} className="rounded-lg h-24 w-full" />
               ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
             {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between gap-4 items-end bg-content1 p-4 rounded-xl shadow-sm border border-divider">
                <Input
                    isClearable
                    className="w-full md:max-w-[40%]"
                    placeholder="Cari laporan mahasiswa..."
                    startContent={<SearchIcon className="w-4 h-4 text-default-400" />}
                    value={filterValue}
                    onClear={() => setFilterValue('')}
                    onValueChange={(val) => setFilterValue(val)}
                />
                <div className="flex items-center gap-3 flex-wrap w-full md:w-auto justify-end">
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
                        className="font-semibold"
                        startContent={!isExporting && <FileSpreadsheet size={16} />}
                    >
                        Export Excel
                    </Button>
                </div>
            </div>

            {/* Calendar Component */}
            <div className="bg-content1 rounded-2xl p-6 shadow-md border border-divider flex flex-col gap-6">
                {/* Calendar Header */}
                <div className="flex justify-between items-center border-b border-divider pb-4">
                    <div className="flex items-center gap-2">
                        <CalendarIcon className="text-primary w-5 h-5" />
                        <h2 className="text-xl font-bold text-foreground">
                            {monthNames[currentMonth]} {currentYear}
                        </h2>
                        <Chip size="sm" variant="flat" color="primary" className="ml-2 font-medium">
                            {currentMonthReportsCount} Laporan
                        </Chip>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            isIconOnly
                            variant="flat"
                            size="sm"
                            onPress={handlePrevMonth}
                            aria-label="Bulan sebelumnya"
                        >
                            <ChevronLeft size={18} />
                        </Button>
                        <Button
                            variant="flat"
                            size="sm"
                            onPress={() => setCurrentDate(new Date())}
                            className="font-medium"
                        >
                            Hari Ini
                        </Button>
                        <Button
                            isIconOnly
                            variant="flat"
                            size="sm"
                            onPress={handleNextMonth}
                            aria-label="Bulan berikutnya"
                        >
                            <ChevronRight size={18} />
                        </Button>
                    </div>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-2 text-center text-small font-semibold text-default-500 border-b border-divider/50 pb-2">
                    <div>Min</div>
                    <div>Sen</div>
                    <div>Sel</div>
                    <div>Rab</div>
                    <div>Kam</div>
                    <div>Jum</div>
                    <div>Sab</div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2 sm:gap-3 min-h-[350px]">
                    {calendarCells.map((cell, idx) => {
                        const dayReports = cell.dateStr ? (reportsByDate[cell.dateStr] || []) : [];
                        const isToday = cell.dateStr === todayStr;
                        const hasReports = dayReports.length > 0;
                        const hasPending = dayReports.some(r => !r.verifiedAt);
                        
                        let cellBg = "bg-default-50/50 hover:bg-default-100/50 text-default-600 border-default-100";
                        let ringColor = "";

                        if (cell.isCurrentMonth) {
                            if (hasReports) {
                                if (hasPending) {
                                    // There are pending verification reports
                                    cellBg = "bg-warning-50 hover:bg-warning-100 text-warning-700 border-warning-200 cursor-pointer shadow-sm shadow-warning-100/50";
                                } else {
                                    // All reports are verified
                                    cellBg = "bg-success-50 hover:bg-success-100 text-success-700 border-success-200 cursor-pointer shadow-sm shadow-success-100/50";
                                }
                            } else {
                                cellBg = "bg-default-50 hover:bg-default-100 text-default-500 border-default-100";
                            }
                        } else {
                            // Non-current month
                            cellBg = "bg-transparent text-default-300 border-transparent pointer-events-none";
                        }

                        if (isToday) {
                            ringColor = "ring-2 ring-primary ring-offset-2 ring-offset-background";
                        }

                        return (
                            <div
                                key={idx}
                                onClick={() => handleDayClick(cell.dateStr)}
                                className={`flex flex-col justify-between p-2 rounded-xl border min-h-[64px] transition-all duration-200 ${cellBg} ${ringColor}`}
                            >
                                <span className={`text-sm font-bold ${!cell.isCurrentMonth && 'text-default-300'}`}>
                                    {cell.day}
                                </span>
                                
                                {cell.isCurrentMonth && hasReports && (
                                    <div className="flex flex-col gap-1 mt-1">
                                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-background/80 text-inherit text-center inline-block self-end">
                                            {dayReports.length} Lapor
                                        </span>
                                        <div className="flex gap-1 justify-end">
                                            {dayReports.filter(r => r.verifiedAt).length > 0 && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                                            )}
                                            {hasPending && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse"></span>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Calendar Legend */}
                <div className="flex gap-6 flex-wrap border-t border-divider pt-4 justify-center sm:justify-start text-xs text-default-500 font-medium">
                    <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-warning-50 border border-warning-200 inline-block"></span>
                        <span>Ada laporan menunggu verifikasi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-success-50 border border-success-200 inline-block"></span>
                        <span>Semua laporan terverifikasi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-default-50 border border-default-100 inline-block"></span>
                        <span>Tidak ada laporan</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded border border-primary ring-2 ring-primary inline-block"></span>
                        <span>Hari ini</span>
                    </div>
                </div>
            </div>

            {/* Modal for Day Reports */}
            <Modal 
                isOpen={isDayModalOpen} 
                onClose={() => setIsDayModalOpen(false)}
                size="3xl"
                scrollBehavior="inside"
                backdrop="blur"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <span className="text-lg font-bold text-foreground font-sans">Laporan Tanggal {selectedDate ? new Date(selectedDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}</span>
                        <span className="text-xs text-default-400 font-normal">Menampilkan {selectedDayReports.length} laporan dari mahasiswa</span>
                    </ModalHeader>
                    <ModalBody className="pb-6">
                        <div className="flex flex-col gap-4">
                            {selectedDayReports.map((report) => (
                                <Accordion key={report.id} variant="splitted" className="px-0">
                                    <AccordionItem 
                                        key={report.id} 
                                        aria-label={report.student.fullname}
                                        title={
                                            <div className="flex justify-between items-center pr-4">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-foreground text-sm sm:text-base">{report.student.fullname}</span>
                                                    <span className="text-tiny text-default-400">{report.student.nim}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Chip
                                                        color={report.verifiedAt ? "success" : "warning"}
                                                        variant="flat"
                                                        size="sm"
                                                        startContent={report.verifiedAt ? <CheckCircle size={12}/> : <Clock size={12}/>}
                                                    >
                                                        {report.verifiedAt ? "Disetujui" : "Menunggu"}
                                                    </Chip>
                                                </div>
                                            </div>
                                        }
                                    >
                                        <div className="flex flex-col gap-4 pb-2">
                                            {/* Validator Information */}
                                            {report.officialId && (
                                                <div className="flex items-center gap-2 bg-default-50 p-3 rounded-lg border border-default-100">
                                                    <span className="font-semibold text-small">Validator:</span>
                                                    <span className="text-small text-default-600">{report.official.name}</span>
                                                </div>
                                            )}

                                            {/* Content */}
                                            <div className="p-4 rounded-lg bg-default-50/50 border border-default-100">
                                                <div className="font-semibold mb-2 text-default-700">Isi Laporan</div>
                                                <div dangerouslySetInnerHTML={{ __html: report.content }} className="prose prose-sm max-w-none text-default-600" />
                                            </div>

                                            {/* Document */}
                                            {report.documentProved && (
                                                <div className="flex items-center gap-2 bg-default-50 p-3 rounded-lg border border-default-100">
                                                    <span className="font-semibold text-small">Bukti Dokumen:</span>
                                                    <a 
                                                        href={`${env.apiBaseUrl}/${report.documentProved}`} 
                                                        target="_blank" 
                                                        rel="noreferrer" 
                                                        className="text-primary text-small hover:underline flex items-center gap-1 font-medium"
                                                    >
                                                        <Download size={14} /> Lihat Dokumen
                                                    </a>
                                                </div>
                                            )}

                                            <div className="flex justify-end gap-2 mt-2">
                                                {!report.verifiedAt && (
                                                    <Button 
                                                        color="primary" 
                                                        onPress={() => handleVerifyClick(report)}
                                                        startContent={<ShieldCheck size={16} />}
                                                        size="sm"
                                                    >
                                                        Verifikasi
                                                    </Button>
                                                )}
                                                <Button 
                                                    color="danger" 
                                                    variant="flat" 
                                                    onPress={() => handleDeleteClick(report)}
                                                    startContent={<Trash2 size={16} />}
                                                    size="sm"
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        </div>
                                    </AccordionItem>
                                </Accordion>
                            ))}
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* Verification Modal */}
            <VerificationModal 
                isOpen={isVerifyModalOpen}
                onClose={() => setIsVerifyModalOpen(false)}
                onVerify={handleVerifySubmit}
                isLoading={isVerifying}
                title="Verifikasi Laporan Mahasiswa"
            />

            {/* Delete Confirmation Modal */}
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

export default StudentReportList;
