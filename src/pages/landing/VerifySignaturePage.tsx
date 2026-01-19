import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { 
  Card, CardBody, CardHeader, Button, Divider, 
  Chip, Skeleton, Alert,
  InputOtp
} from "@heroui/react";
import { QRCodeSVG } from "qrcode.react";
import SignatureCanvas from "react-signature-canvas";
import { CheckCircle2, PenTool, Printer, ArrowLeft, RotateCcw, Lock, KeyRound } from "lucide-react";
import { letterSignatureService } from "@/services/LetterSignatureService";
import type { LetterSignature } from "@/models/letter_signature";
import Logo from '@/assets/logo.png'

const VerifySignaturePage = () => {
  const { token } = useParams();
  const sigCanvas = useRef<SignatureCanvas>(null);

  const [data, setData] = useState<LetterSignature | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [otpValue, setOtpValue] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const qrRef = useRef<HTMLDivElement>(null);

    const handleSaveBarcode = async () => {
        setIsSubmitting(true);
        try {
            const svg = qrRef.current?.querySelector("svg");
            if (!svg) return;

            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();
            
            img.onload = async () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx?.drawImage(img, 0, 0);
            const barcodeBase64 = canvas.toDataURL("image/png");
            
            if(data) {
                await letterSignatureService.update(data.id, { 
                signature: barcodeBase64, 
                verifiedAt: new Date().toISOString(), 
                letterSignatureTemplateId: data.letterSignatureTemplateId 
                });
                window.location.reload();
            }
            };
            img.src = "data:image/svg+xml;base64," + btoa(svgData);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerifyCode = () => {
      if (!data) return;
      
      const correctCode = data.code?.toString().padStart(6, '0');
      
      if (otpValue === correctCode) {
        setIsVerified(true);
        setOtpError(false);
      } else {
        setOtpError(true);
        setOtpValue(""); // Reset input jika salah
      }
    };

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

  const handleSaveSignature = async () => {
    if (sigCanvas.current?.isEmpty()) return alert("Silakan tanda tangan terlebih dahulu");
    
    setIsSubmitting(true);
    try {
      const canvas = sigCanvas.current?.getCanvas();
        const signatureBase64 = canvas?.toDataURL("image/png");

        if(data) {
        await letterSignatureService.update(data.id, { 
            signature: signatureBase64, 
            verifiedAt: new Date().toISOString(), 
            letterSignatureTemplateId: data.letterSignatureTemplateId 
        });
        window.location.reload();
        }
    } catch (error) {
        console.error(error);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (isLoading) return <Skeleton className="h-96 w-full rounded-lg" />;
  if (!data) return <Alert color="danger" title="Data tidak ditemukan atau token tidak valid" />;
  
  const signatureType = data.generalLetterSubmission?.signatureType || data.studentLetterSubmission?.signatureType;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="mb-6 flex justify-between items-center">
        <img src={Logo} width={100} className='my-4'/>
        <Chip color={data.verifiedAt ? "success" : "warning"} variant="flat">
          {data.verifiedAt ? "Terverifikasi" : "Menunggu Tanda Tangan"}
        </Chip>
      </div>

        
            <Card className="mb-6">
                <CardHeader className="flex flex-col items-start px-6 pt-6">
                    <h2 className="text-xl font-bold">Tanda Tangan Pengajuan Surat</h2>
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
                                    <p className="text-default-400">Nomor Surat</p>
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
                            </div>
                            {data.generalLetterSubmission && data.generalLetterSubmission?.letterAttributeSubmissions.length > 0 && (
                                <>
                                    <h3 className="text-lg font-bold mb-2">Detail Pengajuan Surat</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        {data.generalLetterSubmission.letterAttributeSubmissions.map((attr) => (
                                            <div key={attr.id}>
                                                <p className="text-default-400">{attr.letterAttribute.attributeName}</p>
                                                <p className="font-medium">{attr.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                     ) : (
                        <>
                            <div>
                                <p className="text-default-400">Jenis Surat</p>
                                <p className="font-medium">{data.studentLetterSubmission?.letter.letterName}</p>
                            </div>
                            <div>
                                <p className="text-default-400">Tanggal Pengajuan</p>
                                <p className="font-medium">{new Date(data.studentLetterSubmission?.letterDate || '-').toLocaleDateString('id-ID')}</p>
                            </div>
                            <div>
                                <p className="text-default-400">Perihal</p>
                                <p className="font-medium">{data.studentLetterSubmission?.name}</p>
                            </div>
                            <div>
                                <p className="text-default-400">Tanggal Pengajuan</p>
                                <p className="font-medium">{new Date(data.studentLetterSubmission?.letterDate || '-').toLocaleDateString('id-ID')}</p>
                            </div>
                        </>
                    )}
                <Divider />
                <div>
                    <p className="text-sm text-default-400 mb-2">Penanda Tangan</p>
                    <p className="font-bold text-lg">{data.letterSignatureTemplate.official.name}</p>
                    <p className="text-default-500">{data.letterSignatureTemplate.official.occupation}</p>
                </div>
                </CardBody>
            </Card>

      <Card>
        <CardBody className="p-6">
          {data.signature ? (
            <div className="flex flex-col items-center text-center gap-4 py-4">
              <CheckCircle2 size={64} className="text-success" />
              <h2 className="text-2xl font-bold">Dokumen Terverifikasi</h2>
              <p className="text-default-600">Dokumen ini telah ditandatangani secara digital oleh:</p>
              <Chip size="lg" color="primary" variant="flat" className="font-bold uppercase text-lg h-12 px-6">
                {data.letterSignatureTemplate.official.name}
              </Chip>
              <p className="text-xs text-default-400 mt-4 italic">NIP: {data.letterSignatureTemplate.official.nip}</p>
            </div>
          ) : !isVerified ? (
            <div className="flex flex-col items-center gap-6 py-6">
              <div className="bg-primary-50 p-4 rounded-full">
                <Lock size={32} className="text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold">Masukkan Kode Verifikasi</h3>
                <p className="text-sm text-default-500">Silakan masukkan 6 digit kode verifikasi untuk mengakses tanda tangan.</p>
              </div>

              <InputOtp
                length={6} 
                value={otpValue} 
                onValueChange={setOtpValue}
                variant="bordered"
                color={otpError ? "danger" : "primary"}
              />
              {otpError && <p className="text-tiny text-danger">Kode verifikasi yang Anda masukkan salah.</p>}

              <Button 
                color="primary" 
                size="lg" 
                className="w-full mt-2 font-bold"
                startContent={<KeyRound size={20} />}
                onPress={handleVerifyCode}
                isDisabled={otpValue.length < 6}
              >
                Verifikasi Kode
              </Button>
            </div>
          ) : (
            <div className="space-y-6 py-4 animate-in fade-in duration-500">
              <div className="bg-success-50 p-3 rounded-lg flex items-center gap-3">
                <CheckCircle2 className="text-success" size={20} />
                <span className="text-sm text-success-700 font-medium">Identitas Terverifikasi</span>
              </div>

              {(() => {
                const submission = data.generalLetterSubmission || data.studentLetterSubmission;
                const sigType = submission?.signatureType;

                return (
                  <>
                    <div className="text-center">
                      <p className="text-default-700 font-medium">Jenis Tanda Tangan:</p>
                      <Chip color="secondary" variant="dot" className="mt-1">
                        {sigType === 'digital' ? 'Signature Pad (Goresan)' : 'QR-Code (Otomatis)'}
                      </Chip>
                    </div>

                    {sigType !== 'digital' ? (
                      <div className="flex flex-col items-center">
                          <div ref={qrRef} className="p-4 border-2 border-dashed border-default-300 rounded-2xl bg-white mb-6">
                              <QRCodeSVG value={window.location.href} size={200} level="H" />
                          </div>
                          <Button 
                            fullWidth 
                            color="primary" 
                            size="lg"
                            isLoading={isSubmitting}
                            startContent={<CheckCircle2 size={18}/>}
                            onPress={handleSaveBarcode}
                          >
                            Konfirmasi & Simpan Barcode
                          </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="border-2 border-default-300 rounded-xl bg-white overflow-hidden w-full shadow-inner">
                          <SignatureCanvas 
                            ref={sigCanvas}
                            penColor="black"
                            canvasProps={{ className: "w-full h-64 cursor-crosshair" }}
                          />
                        </div>
                        <div className="flex gap-2 mt-4 w-full">
                          <Button 
                            fullWidth 
                            variant="flat" 
                            startContent={<RotateCcw size={18}/>}
                            onPress={() => sigCanvas.current?.clear()}
                          >
                            Ulangi
                          </Button>
                          <Button 
                            fullWidth 
                            color="primary" 
                            isLoading={isSubmitting}
                            startContent={<CheckCircle2 size={18}/>}
                            onPress={handleSaveSignature}
                          >
                            Simpan Tanda Tangan
                          </Button>
                        </div>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default VerifySignaturePage;