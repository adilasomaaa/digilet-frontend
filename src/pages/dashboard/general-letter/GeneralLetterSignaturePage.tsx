import { useState } from 'react'
import { useOutletContext, useParams } from 'react-router'
import type { GeneralLetter, LetterSignature } from '@/models'
import { useLetterSignature } from '@/hooks/useLetterSignature';
import { Button, Card, CardBody, Chip, Skeleton } from '@heroui/react';
import ShareModal from '@/components/dashboard/ShareModal';
import { env } from '@/lib/env';
import { Share2, CheckCircle2, Clock, RotateCcw } from 'lucide-react';
import { letterSignatureService } from '@/services/LetterSignatureService';

const GeneralLetterSignaturePage = () => {
    const { generalLetterId } = useParams<{ generalLetterId: string }>();
    const { item: _ } = useOutletContext<{ item: GeneralLetter | null, isLoading: boolean }>();

    const { items, isLoading, refresh } = useLetterSignature(undefined, generalLetterId);
    
    const [selectedSignature, setSelectedSignature] = useState<LetterSignature | null>(null);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    const handleShare = (signature: LetterSignature) => {
        setSelectedSignature(signature);
        setIsShareModalOpen(true);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
               {[1, 2, 3].map((i) => (
                   <Skeleton key={i} className="rounded-lg h-24 w-full" />
               ))}
            </div>
        )
    }

     const handleResetSignature = async (sigId: number) => {
        try {
            await letterSignatureService.reset(sigId);
            if (typeof refresh === 'function') {
            await refresh();
            }
        }catch(error) {
            console.log(error);
        }
    };

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-default-500 border-2 border-dashed border-default-200 rounded-lg">
                <p>Belum ada daftar tanda tangan.</p>
            </div>
        )
    }

  return (
    <div className="flex flex-col gap-4">
        {items.map((signature) => (
            <Card key={signature.id} className="shadow-sm border-default-100">
                <CardBody className="flex flex-row justify-between items-center p-4">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-medium">
                                {signature.letterSignatureTemplate.official.name}
                            </h4>
                            {signature.verifiedAt ? (
                                <Chip size="sm" color="success" variant="flat" startContent={<CheckCircle2 size={12} />}>
                                    Sudah Ditandatangani
                                </Chip>
                            ) : (
                                <Chip size="sm" color="warning" variant="flat" startContent={<Clock size={12} />}>
                                    Menunggu
                                </Chip>
                            )}
                        </div>
                        <p className="text-small text-default-500">
                            {signature.letterSignatureTemplate.official.occupation}
                        </p>
                        <p className="text-tiny text-default-400">
                            NIP: {signature.letterSignatureTemplate.official.nip}
                        </p>
                    </div>
                    <div>
                         { signature.verifiedAt ? (
                            <Button size="sm" variant="flat" color="danger" startContent={<RotateCcw size={14} />} onPress={() => handleResetSignature(signature.id)}> Reset Tanda Tangan</Button>
                            ) : (
                                <Button 
                                    color="primary" 
                                    variant="flat" 
                                    size="sm"
                                    startContent={<Share2 size={14} />}
                                    onPress={() => handleShare(signature)}
                                >
                                    Bagikan
                                </Button>
                            )
                        }
                    </div>
                </CardBody>
            </Card>
        ))}

        {selectedSignature && (
            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                title="Bagikan Tanda Tangan"
                description={`Bagikan tautan ini kepada ${selectedSignature.letterSignatureTemplate.official.name} untuk melakukan tanda tangan.`}
                shareLink={`${env.baseUrl}signature/verify/${selectedSignature.token}`}
                code={selectedSignature.code}
            />
        )}
    </div>
    
  )
}

export default GeneralLetterSignaturePage