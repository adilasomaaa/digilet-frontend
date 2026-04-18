import { Skeleton, Accordion, AccordionItem, Card, CardBody, Button, Input, Pagination, Tooltip } from "@heroui/react";
import { Calendar, PlusCircle, SearchIcon } from "lucide-react";
import type { ReportingPeriode } from "@/models";

interface AvailableReportsProps {
    periodes: ReportingPeriode[];
    isLoadingPeriodes: boolean;
    handleCreateClick: (stage: any) => void;
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

const AvailableReports = ({
    periodes,
    isLoadingPeriodes,
    handleCreateClick,
    filterValue,
    setFilterValue,
    paginationInfo,
    setPaginationInfo
}: AvailableReportsProps) => {

    if (isLoadingPeriodes) {
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
                    <h2 className="text-xl font-bold">Laporan Tersedia</h2>
                    <p className="text-small text-default-400">Berikut adalah laporan yang tersedia</p>
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

            <Accordion variant="splitted">
                {periodes.map((periode) => (
                    <AccordionItem key={periode.id} aria-label={periode.name} title={periode.name} subtitle={periode.description}>
                        <div className="flex flex-col gap-4">
                            {periode.reportingStages?.map((stage: any) => {
                                const now = new Date();
                                const startDate = new Date(stage.startDate);
                                const endDate = new Date(stage.endDate);
                                const isReportPeriodActive = now >= startDate && now <= endDate;

                                return (
                                    <Card key={stage.id} shadow="sm">
                                        <CardBody className="border-none shadow-sm flex flex-row justify-between items-center shadow-none">
                                            <div className="flex flex-col">
                                                <div className="font-semibold">{stage.stageName}</div>
                                                <div className="text-tiny text-default-500 flex items-center gap-2">
                                                    <Calendar size={14} />
                                                    {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                                                </div>
                                            </div>
                                            <Tooltip content={!isReportPeriodActive ? "Di luar periode pelaporan" : "Buat Laporan"} color={isReportPeriodActive ? "default" : "danger"} placement="top">
                                                <div className="block">
                                                    <Button
                                                        size="sm"
                                                        color={isReportPeriodActive ? "primary" : "default"}
                                                        onPress={() => isReportPeriodActive && handleCreateClick(stage)}
                                                        startContent={<PlusCircle size={16} />}
                                                        isDisabled={!isReportPeriodActive}
                                                        title={!isReportPeriodActive ? "Di luar periode pelaporan" : "Buat Laporan"}
                                                    >
                                                        Buat Laporan
                                                    </Button>
                                                </div>
                                            </Tooltip>
                                        </CardBody>
                                    </Card>
                                );
                            })}
                            {(!periode.reportingStages || periode.reportingStages.length === 0) && (
                                <div className="text-center text-default-500">Belum ada tahapan laporan.</div>
                            )}
                        </div>
                    </AccordionItem>
                ))}
            </Accordion>

            {periodes.length === 0 && !isLoadingPeriodes && (
                <div className="text-center text-default-500 py-10">
                    Belum ada periode laporan tersedia.
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

export default AvailableReports;
