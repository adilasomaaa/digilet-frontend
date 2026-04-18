import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button, Card, CardBody } from '@heroui/react';
import { Download, CopyCheckIcon } from 'lucide-react';
import { addToast } from '@heroui/react';
import Logo from '@/assets/logo.png';

interface ActivityHeaderTemplateProps {
  activity: any;
}

const ActivityHeaderTemplate: React.FC<ActivityHeaderTemplateProps> = ({ activity }) => {
  const qrRef = useRef<SVGSVGElement>(null);

  if (!activity) return null;

  const link = window.location.origin + "/activity/attend/" + activity.uniqueCode;

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
    <Card className="mb-6 shadow-sm border-none bg-white font-serif">
      <CardBody className="p-8">
        <div className="flex items-center border-b-4 border-double border-black pb-4 mb-6">
          <img src={Logo} alt="Logo" className="w-20 mr-6" />
          <div className="flex-1 text-center pr-20">
            <h1 className="text-xl font-bold uppercase leading-tight">Universitas Muhammadiyah Gorontalo</h1>
            <h2 className="text-2xl font-bold uppercase leading-tight">Fakultas Agama Islam</h2>
            <p className="text-xs italic">Alamat: Jl. Prof. Dr. Mansoer Pateda No. 1 Desa Pentadio Timur Telp. (0435) 881136, 881135</p>
            <p className="text-xs italic">Fax. (0435) 881135 Gorontalo 96212 Website: http://fai.umgo.ac.id/</p>
          </div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold underline uppercase">DAFTAR HADIR PESERTA KEGIATAN</h3>
        </div>

        <div className="flex justify-between items-start gap-8">
          <div className="flex-1 space-y-2">
            <table className="w-full text-sm">
              <tbody>
                <tr>
                  <td className="w-32 font-bold py-1">Nama Kegiatan</td>
                  <td className="w-4 py-1">:</td>
                  <td className="py-1">{activity.activityName}</td>
                </tr>
                <tr>
                  <td className="font-bold py-1">Tanggal</td>
                  <td className="py-1">:</td>
                  <td className="py-1">{new Date(activity.implementationDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</td>
                </tr>
                <tr>
                  <td className="font-bold py-1">Lokasi</td>
                  <td className="py-1">:</td>
                  <td className="py-1">{activity.location || '-'}</td>
                </tr>
                <tr>
                  <td className="font-bold py-1">Kategori</td>
                  <td className="py-1">:</td>
                  <td className="py-1 uppercase">{activity.category === 'faculty' ? 'Fakultas' : 'Prodi'}</td>
                </tr>
                <tr>
                  <td className="font-bold py-1">Target Peserta</td>
                  <td className="py-1">:</td>
                  <td className="py-1 uppercase">{activity.target === 'student' ? 'Mahasiswa' : 'Dosen'}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center gap-3 pr-4">
            <div className="p-2 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <QRCodeSVG ref={qrRef} value={link} size={150} level="H" />
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="flat" color="primary" isIconOnly onPress={downloadQRCode}>
                <Download size={16} />
              </Button>
              <Button size="sm" variant="flat" color="secondary" isIconOnly onPress={copyLinkQRCode}>
                <CopyCheckIcon size={16} />
              </Button>
            </div>
            <p className="text-[10px] text-gray-400 text-center max-w-[150px] break-all italic">{link}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default ActivityHeaderTemplate;
