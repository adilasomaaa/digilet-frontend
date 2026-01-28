import { Card, CardBody, Button } from "@heroui/react";
import { FileText, Plus } from 'lucide-react';
import { useNavigate } from 'react-router';

const SubmitLetterBanner = () => {
    const navigate = useNavigate();

    return (
        <Card className="border-none shadow-sm bg-gradient-to-br from-primary-50 to-secondary-50">
            <CardBody className="flex flex-row items-center justify-between p-6">
                <div className="flex items-center gap-4">
                    <div className="p-4 rounded-full bg-primary/10">
                        <FileText size={32} className="text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-1">Buat Pengajuan Surat Baru</h3>
                        <p className="text-sm text-default-600">
                            Ajukan surat sesuai kebutuhan Anda dengan mudah dan cepat
                        </p>
                    </div>
                </div>
                <Button 
                    color="primary" 
                    size="lg"
                    startContent={<Plus size={20} />}
                    onPress={() => navigate('/dashboard/student-letter/submission')}
                    className="min-w-[160px]"
                >
                    Ajukan Surat
                </Button>
            </CardBody>
        </Card>
    );
};

export default SubmitLetterBanner;
