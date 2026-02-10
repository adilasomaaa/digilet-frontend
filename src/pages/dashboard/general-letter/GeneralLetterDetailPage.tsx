import { Button, Card, CardBody, CardHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { Edit2, Loader2, Redo2Icon, Archive } from "lucide-react";
import { Link, useOutletContext, useParams } from "react-router"
import type { GeneralLetter, GeneralLetterCarbonCopyPayload } from "@/models";
import InputModal from "@/components/dashboard/InputModal";
import { useForm } from "react-hook-form";
import { carbonCopyFormFields } from "./config";
import { useGeneralLetter } from "@/hooks/useGeneralLetter";
import FolderPickerModal from "@/components/archive/FolderPickerModal";
import { nodesService } from "@/services/NodesService";
import { useState } from "react";

const GeneralLetterDetailPage = () => {
    const { generalLetterId } = useParams<{ generalLetterId: string }>();
    const { item, isLoading, refresh } = useOutletContext<{ item: GeneralLetter | null, isLoading: boolean, refresh: () => void }>();

    const { isModalOpen, setIsModalOpen, isSubmitting, onSubmitCarbonCopy } = useGeneralLetter();

    const copyForm = useForm<GeneralLetterCarbonCopyPayload>({
        defaultValues: {
            carbonCopy: item?.carbonCopy || ''
        }
    });

    const [folderPickerOpen, setFolderPickerOpen] = useState(false);
    const [saving, setSaving] = useState(false);

    const handleSaveToArchive = async (folderId: number | null) => {
        try {
            setSaving(true);
            const pdfPath = `api/general-letter-submission/${item?.token}/print-pdf`;
            const fileName = `Surat_${item?.letterNumber}_${new Date().toISOString().split('T')[0]}.pdf`;
            await nodesService.saveLetterPdf(pdfPath, fileName, folderId || undefined);
            alert('PDF berhasil disimpan ke arsip');
            setFolderPickerOpen(false);
        } catch (error) {
            alert('Gagal menyimpan PDF ke arsip');
        } finally {
            setSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="mt-4 text-default-500">Memuat detail surat...</p>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-default-500">
                Data tidak ditemukan
            </div>
        );
    }

    return (
        <>
        <Card shadow="sm" className="border-none">
            <CardHeader className="flex justify-between items-center px-6 pt-6 mb-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold text-lg">Detail Surat</h3>
                    <span className="text-tiny text-default-400">Perbarui surat dengan mengklik tombol di kanan</span>
                </div>
                <div className="flex gap-2">
                    <Button 
                        color="secondary" 
                        variant="flat"
                        startContent={<Redo2Icon size={14} />}
                        onPress={() => {
                            copyForm.reset({ carbonCopy: item?.carbonCopy || '' });
                            setIsModalOpen(true);
                        }}
                    >
                        Tembusan
                    </Button>
                    <Button 
                        color="primary" 
                        variant="flat"
                        startContent={<Archive size={14} />}
                        onPress={() => setFolderPickerOpen(true)}
                    >
                        Simpan ke Arsip
                    </Button>
                    <Button 
                        as={Link} 
                        to={`/dashboard/general-letter/${generalLetterId}/edit`} 
                        color="warning" 
                        variant="flat"
                        startContent={<Edit2 size={14} />}
                    >
                        Perbarui Surat
                    </Button>
                </div>
            </CardHeader>
            <CardBody className="px-6 pb-6 pt-0">
                <Table hideHeader removeWrapper aria-label="Detail Surat Table">
                    <TableHeader>
                        <TableColumn>LABEL</TableColumn>
                        <TableColumn>VALUE</TableColumn>
                    </TableHeader>
                    <TableBody>
                        <TableRow key="name">
                            <TableCell className="font-medium w-1/3 text-default-600">Nama Pengajuan</TableCell>
                            <TableCell>{item.name}</TableCell>
                        </TableRow>
                        <TableRow key="letterNumber">
                            <TableCell className="font-medium text-default-600">Nomor Surat</TableCell>
                            <TableCell>{item.letterNumber}</TableCell>
                        </TableRow>
                        <TableRow key="letterDate">
                            <TableCell className="font-medium text-default-600">Tanggal Surat</TableCell>
                            <TableCell>{new Date(item.letterDate).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</TableCell>
                        </TableRow>
                        <TableRow key="signatureType">
                            <TableCell className="font-medium text-default-600">Tipe Tanda Tangan</TableCell>
                            <TableCell className="capitalize">{item.signatureType}</TableCell>
                        </TableRow>
                        <TableRow key="institution">
                            <TableCell className="font-medium text-default-600">Lembaga / Prodi</TableCell>
                            <TableCell>{item.institution?.name}</TableCell>
                        </TableRow>

                        <TableRow key="createdAt">
                            <TableCell className="font-medium text-default-600">Dibuat Pada</TableCell>
                            <TableCell>{new Date(item.createdAt).toLocaleString('id-ID')}</TableCell>
                        </TableRow>
                        <TableRow key="updatedAt">
                            <TableCell className="font-medium text-default-600">Terakhir Diupdate</TableCell>
                            <TableCell>{new Date(item.updatedAt).toLocaleString('id-ID')}</TableCell>
                        </TableRow>

                        <TableRow key="divider-attributes">
                            <TableCell colSpan={2} className="bg-default-100/50 font-bold text-default-700 py-2 my-4">
                                Detail Pengajuan
                            </TableCell>
                        </TableRow>

                        {/* Dynamic Attributes */}
                        <>
                            {(item.letterAttributeSubmissions ?? []).map((attr) => (
                                <TableRow key={`attr-${attr.id}`}>
                                    <TableCell className="font-medium text-default-600">
                                        {attr.letterAttribute?.label || "Atribut Tambahan"}
                                    </TableCell>
                                    <TableCell>{attr.content}</TableCell>
                                </TableRow>
                            ))}
                        </>
                    </TableBody>
                </Table>
            </CardBody>
        </Card>

        <InputModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Perbarui Tembusan"
            isLoading={isSubmitting}
            onSubmit={copyForm.handleSubmit((data) => onSubmitCarbonCopy(+generalLetterId!, data, refresh))}
            register={copyForm.register}
            errors={copyForm.formState.errors}
            setValue={copyForm.setValue}
            watch={copyForm.watch}
            fields={carbonCopyFormFields}
        />

        <FolderPickerModal
            isOpen={folderPickerOpen}
            onClose={() => setFolderPickerOpen(false)}
            onSelect={handleSaveToArchive}
            loading={saving}
        />
        </>
    )
}

export default GeneralLetterDetailPage