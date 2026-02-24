import { useState } from 'react';
import { Button, Tabs, Tab, Skeleton, Accordion, AccordionItem, Chip } from "@heroui/react";
import { useReportingPeriode } from "@/hooks/useReportingPeriode";
import { Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router';
import DashboardBreadcrumbs from '@/components/dashboard/Breadcrumbs';

const LecturerVerifyReport = () => {
    const [selectedTab, setSelectedTab] = useState<string>("student");
    const { items, isLoading } = useReportingPeriode(undefined, { verifyTarget: selectedTab as 'student' | 'lecturer' });
    const navigate = useNavigate();

    const handleTabChange = (key: React.Key) => {
        setSelectedTab(key as string);
    };

    return (
        <div className="flex flex-col gap-4">
             <div className="flex justify-between items-center">
                <DashboardBreadcrumbs />
            </div>
            <h2 className="text-xl font-bold mb-4">Verifikasi Laporan</h2>
            <Tabs 
                aria-label="Options" 
                color="primary" 
                variant="underlined"
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full ",
                    tab: "max-w-fit px-0 h-12",
                    tabContent: "group-data-[selected=true]:text-primary"
                }}
                selectedKey={selectedTab}
                onSelectionChange={handleTabChange}
            >
                <Tab key="student" title="Laporan Mahasiswa">
                    <div className="mt-4 flex flex-col gap-3">
                        {isLoading ? (
                            <div className="flex flex-col gap-2">
                                <Skeleton className="rounded-lg h-12 w-full" />
                                <Skeleton className="rounded-lg h-12 w-full" />
                                <Skeleton className="rounded-lg h-12 w-full" />
                            </div>
                        ) : items.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                Tidak ada periode pelaporan yang perlu diverifikasi.
                            </div>
                        ) : (
                            <Accordion variant="splitted">
                                {items.map((periode) => (
                                    <AccordionItem 
                                        key={periode.id} 
                                        aria-label={periode.name} 
                                        title={
                                            <div className="flex items-center gap-2">
                                                <Calendar size={18} />
                                                <span className='font-semibold'>{periode.name}</span>
                                                <Chip size="sm" variant="flat" color="primary">{periode?.reportingStages?.length} Tahapan</Chip>
                                            </div>
                                        }
                                        subtitle={periode.description}
                                    >
                                        <div className="flex flex-col gap-2 pb-2">
                                            {periode?.reportingStages?.map((stage) => (
                                                <div key={stage.id} className="flex justify-between items-center p-3 rounded-lg border border-default-200 hover:bg-default-50 transition-colors">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-small">{stage.stageName}</span>
                                                        <span className="text-tiny text-default-400">
                                                            {new Date(stage.startDate).toLocaleDateString("id-ID")} - {new Date(stage.endDate).toLocaleDateString("id-ID")}
                                                        </span>
                                                    </div>
                                                    <Button 
                                                        size="sm" 
                                                        color="primary" 
                                                        variant="flat" 
                                                        endContent={<ChevronRight size={14} />}
                                                        onPress={() => navigate(`/dashboard/reporting-periode/${periode.id}/reporting-stage/${stage.id}/reporting-submission`)}
                                                    >
                                                        Lihat Pengajuan
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                    </div>
                </Tab>
                <Tab key="lecturer" title="Laporan Dosen">
                        <div className="mt-4 flex flex-col gap-3">
                        {isLoading ? (
                                <div className="flex flex-col gap-2">
                                <Skeleton className="rounded-lg h-12 w-full" />
                                <Skeleton className="rounded-lg h-12 w-full" />
                                <Skeleton className="rounded-lg h-12 w-full" />
                            </div>
                        ) : items.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                Tidak ada periode pelaporan dosen yang perlu diverifikasi.
                            </div>
                        ) : (
                            <Accordion variant="splitted">
                                {items.map((periode) => (
                                    <AccordionItem 
                                        key={periode.id} 
                                        aria-label={periode.name} 
                                            title={
                                            <div className="flex items-center gap-2">
                                                <Calendar size={18} />
                                                <span className='font-semibold'>{periode.name}</span>
                                                    <Chip size="sm" variant="flat" color="secondary">{periode?.reportingStages?.length} Tahapan</Chip>
                                            </div>
                                        }
                                        subtitle={periode.description}
                                    >
                                            <div className="flex flex-col gap-2 pb-2">
                                            {periode?.reportingStages?.map((stage) => (
                                                <div key={stage.id} className="flex justify-between items-center p-3 rounded-lg border border-default-200 hover:bg-default-50 transition-colors">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-small">{stage.stageName}</span>
                                                        <span className="text-tiny text-default-400">
                                                            {new Date(stage.startDate).toLocaleDateString("id-ID")} - {new Date(stage.endDate).toLocaleDateString("id-ID")}
                                                        </span>
                                                    </div>
                                                        <Button 
                                                        size="sm" 
                                                        color="secondary" 
                                                        variant="flat" 
                                                        endContent={<ChevronRight size={14} />}
                                                        onPress={() => navigate(`/dashboard/reporting-periode/${periode.id}/reporting-stage/${stage.id}/reporting-submission`)}
                                                    >
                                                        Lihat Pengajuan
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        )}
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default LecturerVerifyReport;