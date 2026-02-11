import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { 
  Card, CardBody, CardHeader, Button, Divider, 
  Chip, Skeleton, Alert
} from "@heroui/react";
import { DownloadIcon } from "lucide-react";
import { letterSignatureService } from "@/services/LetterSignatureService";
import type { LetterSignature } from "@/models/letter_signature";
import Logo from '@/assets/logo.png'
import { env } from "@/lib/env";

const DetailSignaturePage = () => {
  const { token } = useParams();

  const [data, setData] = useState<LetterSignature | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSignatureDetail = async () => {
      try {
        const response = await letterSignatureService.findByToken(token!);
        const data = response.data
        setData(data);
      } catch (error) {
        console.error("Token tidak valid", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSignatureDetail();
  }, [token]);


  if (isLoading) return <Skeleton className="h-96 w-full rounded-lg" />;
  if (!data) return <Alert color="danger" title="Data tidak ditemukan atau token tidak valid" />;

  const isVerified = !!data.verifiedAt;
  

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6 flex justify-between items-center">
        <img src={Logo} width={100} className='my-4'/>
        <Button variant="solid" color="primary" className="flex items-center gap-2" onPress={() => {
          const link = document.createElement('a');
          if(data.generalLetterSubmission){
            link.href = `${env.apiBaseUrl}api/general-letter-submission/print-pdf/${data.generalLetterSubmission.token}`;
            link.target = '_blank';
            link.setAttribute('download', `${data.generalLetterSubmission.letter.letterName}.pdf`);
          }else {
            link.href = `${env.apiBaseUrl}api/student-letter-submission/print-pdf/${data.studentLetterSubmission?.token}`;
            link.target = '_blank';
            link.setAttribute('download', `${data.studentLetterSubmission?.letter.letterName}.pdf`);
          }
          link.click();
        }}>
          <DownloadIcon className="w-4 h-4 mr-2" />
          Download Surat
        </Button>
      </div>

        
            <Card className="mb-6">
                <CardHeader className="flex flex-col items-start px-6 pt-6">
                    <h2 className="text-xl font-bold">Surat UMGO Tanda Tangan Sertifikat</h2>
                    <p className="text-default-400">Dokumen ini benar dan tercatat dalam jejak audit kami</p>
                </CardHeader>
                <CardBody className="px-6 pb-6 gap-4">
                    {data && data.generalLetterSubmission ? (
                        <>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-default-400">Jenis Surat</p>
                                    <p className="font-medium">{data.generalLetterSubmission.letter.letterName}</p>
                                </div>
                                <div>
                                    <p className="text-default-400">Nomor Sasdsaurat</p>
                                    <p className="font-medium">{data.generalLetterSubmission.letterNumber}</p>
                                </div>
                                <div>
                                    <p className="text-default-400">Perihal</p>
                                    <p className="font-medium">{data.generalLetterSubmission.name}</p>
                                </div>
                                <div>
                                    <p className="text-default-400">Tanggal Pengajuan</p>
                                    <p className="font-medium">{new Date(data.generalLetterSubmission.letterDate).toLocaleDateString('id-ID')}</p>
                                </div>
                                <div>
                                    <p className="text-default-400">Diajukan Oleh</p>
                                    <p className="font-medium">{data.generalLetterSubmission.user.name}</p>
                                </div>
                                <div>
                                    <p className="text-default-400">Tipe Tanda Tangan</p>
                                    <p className="font-medium">{data.generalLetterSubmission.signatureType}</p>
                                </div>
                            </div>
                        </>
                     ) : (
                        <>
                            <div>
                                <p className="text-default-400">Jenis Surat</p>
                                <p className="font-medium">{data.studentLetterSubmission?.letter.letterName}</p>
                            </div>
                            <div>
                                <p className="text-default-400">Tanggal Pengajuan</p>
                                <p className="font-medium">{new Date(data.studentLetterSubmission?.letterDate || '').toLocaleDateString('id-ID') }</p>
                            </div>
                            <div>
                                <p className="text-default-400">Perihal</p>
                                <p className="font-medium">{data.studentLetterSubmission?.name}</p>
                            </div>
                            <div>
                                <p className="text-default-400">Tanggal Pengajuan</p>
                                <p className="font-medium">{new Date(data.studentLetterSubmission?.letterDate || '').toLocaleDateString('id-ID')}</p>
                            </div>
                        </>
                    )}
                <Divider />
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <p className="text-sm text-default-400 mb-2">Penanda Tangan</p>
                        <p className="font-bold text-lg">{data.official.name}</p>
                        <p className="text-default-500">{data.official.occupation}</p>
                    </div>
                    <div>
                        <p className="text-sm text-default-400 mb-2">Status</p>
                        <Chip color={isVerified ? "success" : "warning"} variant="flat">
                        {isVerified ? "Terverifikasi" : "Menunggu Tanda Tangan"}
                        </Chip>
                    </div>
                    <div>
                        <p className="text-sm text-default-400 mb-2">Tanggal Tanda Tangan</p>
                        <p className="font-bold text-lg">
                        {data.verifiedAt ? 
                            new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
                            .format(new Date(data.verifiedAt)) 
                            : "-"}
                        </p>
                    </div>
                </div>
                </CardBody>
            </Card>
    </div>
  );
};

export default DetailSignaturePage;