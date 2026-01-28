import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Spinner, Chip, Button, ButtonGroup } from "@heroui/react";
import { Users, FileText, CheckCircle, Briefcase, FileSignature, Clock, ChevronLeft, ChevronRight, PenTool } from 'lucide-react';
import { dashboardService } from "@/services/DashboardService";
import type { DashboardStats, ChartData, RecentLetter, RecentSignature } from "@/services/DashboardService";
import { useAuth } from "@/context/AuthContext";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: number, icon: any, color: string }) => (
    <Card className="border-none shadow-sm">
        <CardBody className="flex flex-row items-center gap-4 p-6">
            <div className={`p-3 rounded-full ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
            <div className="flex flex-col">
                <span className="text-small text-default-500">{title}</span>
                <span className="text-2xl font-bold">{value}</span>
            </div>
        </CardBody>
    </Card>
);

const DashboardPage = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [recentLetters, setRecentLetters] = useState<RecentLetter[]>([]);
    const [recentSignatures, setRecentSignatures] = useState<RecentSignature[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(recentLetters.length / itemsPerPage);
    const paginatedLetters = recentLetters.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, chartsRes, recentRes, signaturesRes] = await Promise.all([
                    dashboardService.getStats(),
                    dashboardService.getCharts(),
                    dashboardService.getRecentPending(),
                    dashboardService.getRecentSignatures()
                ]);
                setStats(statsRes.data);
                setChartData(chartsRes.data);
                setRecentLetters(recentRes.data);
                setRecentSignatures(signaturesRes.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div className="flex justify-center items-center h-[50vh]"><Spinner /></div>;
    }

    const isAdmin = user?.userRoles?.name === 'admin';

    return (
        <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {isAdmin ? (
                    <>
                        <StatCard 
                            title="Total Mahasiswa" 
                            value={stats?.totalStudents || 0} 
                            icon={Users} 
                            color="bg-primary" 
                        />
                        <StatCard 
                            title="Total Surat Umum" 
                            value={stats?.totalGeneralLetters || 0} 
                            icon={FileText} 
                            color="bg-secondary" 
                        />
                        <StatCard 
                            title="Surat Mahasiswa Disetujui" 
                            value={stats?.totalStudentLettersAccepted || 0} 
                            icon={CheckCircle} 
                            color="bg-success" 
                        />
                        <StatCard 
                            title="Total Pejabat" 
                            value={stats?.totalOfficials || 0} 
                            icon={Briefcase} 
                            color="bg-warning" 
                        />
                    </>
                ) : (
                    <>
                        <StatCard 
                            title="Surat Mahasiswa Disetujui" 
                            value={stats?.totalStudentLettersAccepted || 0} 
                            icon={CheckCircle} 
                            color="bg-success" 
                        />
                        <StatCard 
                            title="Jenis Surat" 
                            value={stats?.totalLetterTypes || 0} 
                            icon={FileSignature} 
                            color="bg-primary" 
                        />
                        <StatCard 
                            title="Surat Umum Dibuat" 
                            value={stats?.totalGeneralLetters || 0} 
                            icon={FileText} 
                            color="bg-secondary" 
                        />
                         <StatCard 
                            title="Jumlah Mahasiswa" 
                            value={stats?.totalStudents || 0} 
                            icon={Users} 
                            color="bg-warning" 
                        />
                    </>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <Card className="border-none shadow-sm lg:col-span-3">
                    <CardBody className="p-4">
                        <h3 className="text-lg font-semibold mb-4">Statistik Penerimaan Surat</h3>
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={chartData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                    <XAxis 
                                        dataKey="date" 
                                        tick={{fill: '#6B7280', fontSize: 12}}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(val) => new Date(val).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                    />
                                    <YAxis 
                                        tick={{fill: '#6B7280', fontSize: 12}}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend />
                                    <Line 
                                        type="monotone" 
                                        dataKey="general" 
                                        name="Surat Umum" 
                                        stroke="#ec4899" 
                                        strokeWidth={3}
                                        dot={{r: 4, strokeWidth: 0}}
                                        activeDot={{r: 6}} 
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="student" 
                                        name="Surat Mahasiswa" 
                                        stroke="#10b981" 
                                        strokeWidth={3}
                                        dot={{r: 4, strokeWidth: 0}}
                                        activeDot={{r: 6}} 
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </CardBody>
                </Card>

                <div className="lg:col-span-2 flex flex-col gap-4">
                    <Card className="border-none shadow-sm flex-1">
                        <CardHeader className="border-b border-default-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold">Pengajuan Terbaru (Pending)</h3>
                            {totalPages > 1 && (
                                <ButtonGroup size="sm" variant="flat">
                                    <Button 
                                        isIconOnly 
                                        isDisabled={currentPage === 0}
                                        onPress={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                    >
                                        <ChevronLeft size={16} />
                                    </Button>
                                    <Button 
                                        isIconOnly 
                                        isDisabled={currentPage >= totalPages - 1}
                                        onPress={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                    >
                                        <ChevronRight size={16} />
                                    </Button>
                                </ButtonGroup>
                            )}
                        </CardHeader>
                        <CardBody className="p-0">
                            {paginatedLetters.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-6 text-default-500">
                                    <Clock size={40} className="mb-2 opacity-50" />
                                    <p className="text-sm">Tidak ada pengajuan pending</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-default-200">
                                    {paginatedLetters.map((letter) => (
                                        <div key={letter.id} className="p-3 hover:bg-default-50 transition-colors">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-sm truncate">{letter.letter.letterName}</h4>
                                                    <p className="text-xs text-default-500 mt-1">{letter.student.fullname}</p>
                                                    <p className="text-xs text-default-400">{letter.student.nim}</p>
                                                </div>
                                                <Chip size="sm" color="warning" variant="flat">
                                                    Pending
                                                </Chip>
                                            </div>
                                            <p className="text-xs text-default-400 mt-2">
                                                {new Date(letter.createdAt).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardBody>
                    </Card>

                    <Card className="border-none shadow-sm flex-1">
                        <CardHeader className="border-b border-default-200">
                            <h3 className="text-lg font-semibold">Tanda Tangan Terbaru</h3>
                        </CardHeader>
                        <CardBody className="p-0">
                            {recentSignatures.length === 0 ? (
                                <div className="flex flex-col items-center justify-center p-6 text-default-500">
                                    <PenTool size={40} className="mb-2 opacity-50" />
                                    <p className="text-sm">Belum ada tanda tangan</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-default-200">
                                    {recentSignatures.map((signature) => (
                                        <div key={signature.id} className="p-3 hover:bg-default-50 transition-colors">
                                            <div className="flex items-start gap-3">
                                                <div className="p-2 rounded-full bg-success/10">
                                                    <PenTool size={16} className="text-success" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-sm">{signature.letterSignatureTemplate.official.name}</h4>
                                                    <p className="text-xs text-default-500">{signature.letterSignatureTemplate.official.occupation}</p>
                                                    <p className="text-xs text-default-400 mt-1">
                                                        {signature.studentLetterSubmission?.letter.letterName || 
                                                         signature.generalLetterSubmission?.letter.letterName}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-default-400 mt-2 ml-10">
                                                {new Date(signature.verifiedAt).toLocaleDateString('id-ID', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;