import { Skeleton, Card, CardBody, Chip, Input, Pagination } from "@heroui/react";
import { CheckCircle, Clock, SearchIcon } from "lucide-react";
import type { StudentReport } from '@/models';

interface MyReportsProps {
    reports: StudentReport[];
    isLoadingReports: boolean;
    onViewDetail: (report: StudentReport) => void;
    filterValue: string;
    setFilterValue: (value: string) => void;
    paginationInfo: {
        page: number;
        limit: number;
        totalData: number;
        totalPages: number;
    };
    setPaginationInfo: React.Dispatch<React.SetStateAction<any>>;
}

const MyReports = ({ 
    reports, 
    isLoadingReports,
    onViewDetail,
    filterValue,
    setFilterValue,
    paginationInfo,
    setPaginationInfo
}: MyReportsProps) => {

    if (isLoadingReports) {
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
            <div className="flex flex-col sm:flex-row justify-between gap-3 bg-background p-1 items-center">
                <div className="flex flex-col items-start gap-2">
                    <h2 className="text-xl font-bold">Laporan Saya</h2>
                    <p className="text-small text-default-400">Berikut adalah laporan yang telah dibuat</p>
                </div>
                <Input
                    isClearable
                    className="w-full sm:max-w-[40%]"
                    placeholder="Cari periode..."
                    startContent={<SearchIcon className="w-4 h-4" />}
                    value={filterValue}
                    onClear={() => setFilterValue('')}
                    onValueChange={(val) => setFilterValue(val)}
                />
            </div>

            <div className="flex flex-col gap-3">
                {reports.map((report) => (
                    <Card key={report.id} isPressable onPress={() => onViewDetail(report)}>
                        <CardBody>
                            <div className="flex justify-between items-start">
                                <div className="flex flex-col gap-1 items-start">
                                    <div className="font-bold text-lg">{report.reportingStage.stageName}</div>
                                    <div className="text-small text-default-500">
                                        Periode: {report.reportingStage.reportingPeriode?.name}
                                    </div>
                                    <div className="text-small">
                                        Dosen: {report.official.name}
                                    </div>
                                     <div className="text-tiny text-default-400 mt-2">
                                         Diajukan: {new Date(report.createdAt).toLocaleString()}
                                    </div>
                                </div>
                                <Chip
                                    color={report.verifiedAt ? "success" : "warning"}
                                    variant="flat"
                                    startContent={report.verifiedAt ? <CheckCircle size={14}/> : <Clock size={14}/>}
                                >
                                    {report.verifiedAt ? `Disetujui ${new Date(report.verifiedAt).toLocaleDateString()}` : "Menunggu Verifikasi"}
                                </Chip>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {reports.length === 0 && !isLoadingReports && (
                 <div className="text-center text-default-500 py-10">
                    Belum ada laporan yang dibuat.
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
                    onChange={(page) => setPaginationInfo((prev: any) => ({ ...prev, page }))}
                />
            </div>
        </div>
    );
};

export default MyReports;
