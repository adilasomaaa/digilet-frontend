import type { Column } from "@/components/dashboard/DataTable";
import type { DisplayFieldConfig, FormFieldConfig } from "@/types";
import { Link } from "react-router";
import { QRCodeSVG } from "qrcode.react";
import { addToast, Button } from "@heroui/react";
import { CopyCheckIcon, Download } from "lucide-react";
import { useRef } from "react";

const QRDownloadButton = ({ link, fileName }: { link: string, fileName: string }) => {
  const qrRef = useRef<SVGSVGElement>(null);

  const downloadQRCode = () => {
    const svg = qrRef.current;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 300; // Original source is 150 but we upscale for better quality
      canvas.height = 300;
      if (ctx) {
        ctx.fillStyle = "white"; // Add white background
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, 300, 300);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `QR-${fileName}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  const copyLinkQRCode = (link: string) => {
    navigator.clipboard.writeText(link);
    addToast({
      title: "Link berhasil disalin",
      color: "success",
      
    })
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="p-2 bg-white rounded-lg border border-default-200">
        <QRCodeSVG ref={qrRef} value={link} size={150} level="H" />
      </div>
      <div className="flex items-center flex-row gap-2">
        <Button
          size="sm"
          variant="flat"
          color="primary"
          startContent={<Download size={14} />}
          onPress={downloadQRCode}
        >
          Download QR
        </Button>
        <Button
          size="sm"
          variant="ghost"
          color="primary"
          startContent={<CopyCheckIcon size={14} />}
          onPress={() => copyLinkQRCode(link)}
        >
          Copy Link
        </Button>

      </div>
    </div>
  );
};

export const activityColumns: Column<any>[] = [
  {
    name: "Nama", uid: "activityName", sortable: true, defaultVisible: true, renderCell: (item) => (
      <Link to={`/dashboard/activity/${item.id}`} className="text-blue-500 hover:underline">{item.activityName}</Link>
    )
  },
  {
    name: "Tanggal Pelaksanaan", uid: "implementationDate", sortable: true, defaultVisible: true, renderCell: (item) => {
      return new Date(item.implementationDate).toLocaleString()
    }
  },
  { name: "Target", uid: "target", sortable: true, defaultVisible: true },
  { name: "ACTIONS", uid: "actions", defaultVisible: true },
];

export const activityFormFields: FormFieldConfig[] = [
  { key: "activityName", label: "Nama Kegiatan", type: "text", placeholder: "Masukkan nama kegiatan...", isRequired: true },
  { key: "description", label: "Deskripsi", type: "textarea", placeholder: "Deskripsi...", isRequired: true },
  { key: "implementationDate", label: "Tanggal", type: "date", isRequired: true },
  { key: "location", label: "Lokasi (Teks)", type: "text", isRequired: true },
  { key: "coordinates", label: "Titik Koordinat Geofencing", type: "coordinate-picker", placeholder: "Contoh: -6.123, 106.123" },
  {
    key: "target",
    label: "Target",
    type: "select",
    options: [
      { label: "Mahasiswa", value: "student" },
      { label: "Dosen", value: "lecturer" }
    ],
    isRequired: true
  },
  {
    key: "category",
    label: "Kategori",
    type: "select",
    options: [
      { label: "Fakultas", value: "faculty" },
      { label: "Prodi", value: "study_program" }
    ],
    isRequired: true
  },
];

export const activityDisplayFields: DisplayFieldConfig<any>[] = [
  { key: "activityName", label: "Nama Kegiatan" },
  { key: "uniqueCode", label: "Kode Unik" },
  { key: "target", label: "Target" },
  { key: "coordinates", label: "Titik Koordinat (Geofencing)" },
  {
    key: "qrCode",
    label: "QR Code Absensi",
    render: (data: any) => {
      const link = window.location.origin + "/activity/attend/" + data.uniqueCode;
      return <QRDownloadButton link={link} fileName={data.activityName} />;
    }
  }
];