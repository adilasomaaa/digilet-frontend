import { Card, CardBody, CardHeader, Button, Chip, Divider, Input, Pagination } from "@heroui/react";
import { Search, Edit, Printer, Trash2, FileText, EyeIcon, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { StudentLetter } from '@/models/student_letter';
import { env } from '@/lib/env';
import ShowModal from './ShowModal';
import DeleteModal from './DeleteModal';

interface StudentLetterListProps {
    submissions: StudentLetter[];
    isLoading: boolean;
    isDeleting: boolean;
    searchQuery: string;
    currentPage: number;
    totalPages: number;
    isViewModalOpen: boolean;
    isDeleteModalOpen: boolean;
    viewingItem: StudentLetter | null;
    deletingItem: StudentLetter | null;
    onSearchChange: (query: string) => void;
    onPageChange: (page: number) => void;
    onViewDetail: (item: StudentLetter) => void;
    onDeleteClick: (item: StudentLetter) => void;
    onConfirmDelete: () => void;
    onCloseViewModal: () => void;
    onCloseDeleteModal: () => void;
}

const StudentLetterList = ({
    submissions,
    isLoading,
    isDeleting,
    searchQuery,
    currentPage,
    totalPages,
    isViewModalOpen,
    isDeleteModalOpen,
    viewingItem,
    deletingItem,
    onSearchChange,
    onPageChange,
    onViewDetail,
    onDeleteClick,
    onConfirmDelete,
    onCloseViewModal,
    onCloseDeleteModal,
}: StudentLetterListProps) => {
    const navigate = useNavigate();

    const handlePrint = (token: string) => {
        navigate(`/dashboard/student-letter/preview/${token}`)
    };

    const statusColorMap = {
        pending: 'warning',
        waiting_signature: 'secondary',
        approved: 'success',
        rejected: 'danger',
    } as const;

    const statusLabelMap = {
        pending: 'Menunggu',
        waiting_signature: 'Menunggu Tanda Tangan',
        approved: 'Disetujui',
        rejected: 'Ditolak',
    };

    return (
        <>
            <Card className="border-none shadow-sm">
                <CardHeader className="border-b border-default-200 px-6 py-4">
                    <div className="flex justify-between items-center w-full gap-4">
                        <h2 className="text-xl font-bold">Daftar Pengajuan Surat</h2>
                        <Input
                            placeholder="Cari surat..."
                            value={searchQuery}
                            onValueChange={onSearchChange}
                            startContent={<Search size={18} className="text-default-400" />}
                            className="max-w-xs"
                            size="sm"
                        />
                    </div>
                </CardHeader>
                <CardBody className="p-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-12">
                            <p className="text-default-500">Memuat...</p>
                        </div>
                    ) : submissions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-default-500">
                            <FileText size={64} className="mb-4 opacity-50" />
                            <p className="text-lg font-medium">Belum ada pengajuan surat</p>
                            <p className="text-sm mt-1">Buat pengajuan surat pertama Anda</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {submissions.map((letter) => (
                                    <Card key={letter.id} className="border border-default-200 shadow-none hover:shadow-md transition-shadow">
                                        <CardBody className="p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-base mb-1 truncate">
                                                        {letter.letter?.letterName || letter.name}
                                                    </h4>
                                                    <p className="text-xs text-default-500">
                                                        {letter.letterNumber || 'Nomor belum tersedia'}
                                                    </p>
                                                </div>
                                                <Chip 
                                                    size="sm" 
                                                    color={statusColorMap[letter.status as keyof typeof statusColorMap]} 
                                                    variant="flat"
                                                >
                                                    {statusLabelMap[letter.status as keyof typeof statusLabelMap]}
                                                </Chip>
                                            </div>

                                            <Divider className="my-3" />

                                            <div className="space-y-2 mb-3">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-default-500">Diajukan:</span>
                                                    <span className="font-medium">
                                                        {new Date(letter.createdAt).toLocaleDateString('id-ID', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                {letter.letterDate && (
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-default-500">Tanggal surat:</span>
                                                        <span className="font-medium">
                                                            {new Date(letter.letterDate).toLocaleDateString('id-ID', {
                                                                day: '2-digit',
                                                                month: 'short',
                                                                year: 'numeric'
                                                            })}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex gap-2 mt-4">
                                                {letter.status === 'pending' && (
                                                    <>
                                                        <Button
                                                            size="sm"
                                                            variant="flat"
                                                            color="warning"
                                                            startContent={<Edit size={14} />}
                                                            onPress={() => navigate(`/dashboard/student-letter/edit/${letter.id}`)}
                                                            className="flex-1"
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="flat"
                                                            color="danger"
                                                            startContent={<Trash2 size={14} />}
                                                            onPress={() => onDeleteClick(letter)}
                                                            className="flex-1"
                                                        >
                                                            Hapus
                                                        </Button>
                                                    </>
                                                )}
                                                {letter.status === 'approved' && (
                                                    <Button
                                                        size="sm"
                                                        variant="flat"
                                                        color="primary"
                                                        startContent={<Printer size={14} />}
                                                        onPress={() => handlePrint(letter.token)}
                                                        className="flex-1"
                                                    >
                                                        Cetak
                                                    </Button>
                                                )}
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    color="default"
                                                    startContent={<Eye size={14} />}
                                                    onPress={() => onViewDetail(letter)}
                                                    className="flex-1"
                                                >
                                                    Detail
                                                </Button>
                                            </div>
                                        </CardBody>
                                    </Card>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center mt-6">
                                    <Pagination
                                        total={totalPages}
                                        page={currentPage}
                                        onChange={onPageChange}
                                        showControls
                                    />
                                </div>
                            )}
                        </>
                    )}
                </CardBody>
            </Card>

            <ShowModal
                isOpen={isViewModalOpen}
                onClose={onCloseViewModal}
                title="Detail Pengajuan Surat"
                data={viewingItem}
                fields={[
                    { key: "name", label: "Perihal" },
                    { key: "letterNumber", label: "Nomor Surat" },
                    { key: "letter.letterName", label: "Jenis Surat" },
                    { 
                        key: "createdAt", 
                        label: "Tanggal Pengajuan", 
                        render: (item) => new Date(item.createdAt).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })
                    },
                    { 
                        key: "status", 
                        label: "Status", 
                        render: (item) => {
                            const status = item.status || "pending";
                            return (
                                <Chip
                                    variant="flat"
                                    color={statusColorMap[status as keyof typeof statusColorMap]}
                                    className="text-xs font-medium"
                                >
                                    {statusLabelMap[status as keyof typeof statusLabelMap]}
                                </Chip>
                            );
                        }
                    },
                    ...(viewingItem?.letterAttributeSubmissions?.map((attr: any) => ({
                        key: `letterAttributeSubmissions.${viewingItem.letterAttributeSubmissions.indexOf(attr)}.content`,
                        label: attr.letterAttribute.label
                    })) || []),
                    ...(viewingItem?.documentSubmissions?.map((doc: any, index: number) => ({
                        key: `documentSubmissions.${index}.filePath`,
                        label: doc.letterDocument.documentName,
                        render: () => (
                            <a
                                href={`${env.apiBaseUrl}${doc.filePath}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white p-2 rounded-lg hover:bg-primary/80 bg-primary flex items-center gap-2 w-fit"
                            >
                                <EyeIcon className="w-4 h-4" />
                                Lihat File
                            </a>
                        ),
                    })) || [])
                ]}
            />

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={onCloseDeleteModal}
                onConfirm={onConfirmDelete}
                title="Hapus Pengajuan Surat"
                message={`Apakah Anda yakin ingin menghapus "<strong>${deletingItem?.name}</strong>"?`}
                isLoading={isDeleting}
            />
        </>
    );
};

export default StudentLetterList;
