import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button, Card, CardBody, Spinner } from '@heroui/react';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import LetterTemplate from '@/components/LetterTemplate';
import { useStudentLetter } from '@/hooks/useStudentLetter';

const StudentLetterPreview: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const letterRef = useRef<HTMLDivElement>(null);
  const { 
    letterData, 
    fetchLetterData, 
    handleDownloadPDF, 
    handlePrint, 
    isLoading: loading, 
    isGenerating: generating, 
    error 
  } = useStudentLetter(undefined, { fetchOnMount: false });

  useEffect(() => {
    if (token) {
      fetchLetterData(token);
    }
  }, [token, fetchLetterData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" label="Memuat data surat..." />
      </div>
    );
  }

  if (error || !letterData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-danger">Error: {error || 'Data tidak ditemukan'}</p>
        <Button onPress={() => navigate(-1)} startContent={<ArrowLeft />}>
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <Card className="mb-4">
        <CardBody>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                onPress={() => navigate(-1)}
                variant="light"
                startContent={<ArrowLeft size={18} />}
              >
                Kembali
              </Button>
              <h1 className="text-xl">
                Preview Surat: <span className=' font-semibold'>{letterData.letterNumber}</span>
              </h1>
            </div>
            <div className="flex gap-2">
              <Button
                onPress={() => handlePrint(letterRef.current!)}
                variant="flat"
                color="primary"
                startContent={<Printer size={18} />}
                isLoading={generating}
                isDisabled={generating}
              >
                Cetak
              </Button>
              <Button
                onPress={() => handleDownloadPDF(letterRef.current!)}
                variant="solid"
                color="primary"
                startContent={<Download size={18} />}
                isLoading={generating}
                isDisabled={generating}
              >
                {generating ? 'Membuat PDF...' : 'Download PDF'}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody className="p-8">
          <div className="bg-white">
            <LetterTemplate ref={letterRef} data={letterData} />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentLetterPreview;
