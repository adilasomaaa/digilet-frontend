import { Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Button, addToast } from '@heroui/react';
import { CalendarIcon, MapPinIcon, TargetIcon, Download, CopyCheckIcon } from 'lucide-react';
import { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface ActivityInfoTableProps {
    activity: any;
    isLoading: boolean;
}

const ActivityInfoTable = ({ activity, isLoading }: ActivityInfoTableProps) => {
    const qrRef = useRef<SVGSVGElement>(null);

    const link = activity ? window.location.origin + "/activity/attend/" + activity.uniqueCode : "";

    const downloadQRCode = () => {
        const svg = qrRef.current;
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = 300;
            canvas.height = 300;
            if (ctx) {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, 300, 300);
                const pngFile = canvas.toDataURL("image/png");
                const downloadLink = document.createElement("a");
                downloadLink.download = `QR-${activity.activityName}.png`;
                downloadLink.href = pngFile;
                downloadLink.click();
            }
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    const copyLinkQRCode = () => {
        navigator.clipboard.writeText(link);
        addToast({
            title: "Link berhasil disalin",
            color: "success",
        });
    };

    return (
        <div className="flex flex-col gap-4">
            <div className='flex items-center gap-2 mb-4'>
                <TargetIcon className="text-primary" />
                <div className='text-lg font-semibold'>Detail Informasi Kegiatan</div>
            </div>

            <Table aria-label="Tabel Detail Kegiatan" removeWrapper>
                <TableHeader>
                    <TableColumn>NAMA KEGIATAN</TableColumn>
                    <TableColumn>TANGGAL</TableColumn>
                    <TableColumn>LOKASI</TableColumn>
                    <TableColumn>TARGET</TableColumn>
                    <TableColumn>QR CODE</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"Data tidak ditemukan"} isLoading={isLoading} loadingContent={<Spinner />}>
                    <TableRow key="1">
                        <TableCell className="font-semibold">{activity?.activityName || "-"}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-1">
                                <CalendarIcon size={14} className="text-default-400" />
                                {activity?.implementationDate ? new Date(activity.implementationDate).toLocaleDateString('id-ID') : "-"}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-1">
                                <MapPinIcon size={14} className="text-default-400" />
                                {activity?.location || "-"}
                            </div>
                        </TableCell>
                        <TableCell>
                            <Chip size="sm" variant="flat" color="secondary" className="uppercase">
                                {activity?.target === 'student' ? 'Mahasiswa' : 'Dosen'}
                            </Chip>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2">
                                <div className="p-1 bg-white rounded border border-default-200">
                                    <QRCodeSVG ref={qrRef} value={link} size={60} level="M" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <Button size="sm" isIconOnly variant="light" onPress={downloadQRCode} title="Download QR">
                                        <Download size={14} />
                                    </Button>
                                    <Button size="sm" isIconOnly variant="light" onPress={copyLinkQRCode} title="Salin Link">
                                        <CopyCheckIcon size={14} />
                                    </Button>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default ActivityInfoTable;
