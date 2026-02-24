import { Button, Card, CardBody, CardHeader, Chip, Divider, Skeleton } from '@heroui/react'
import { ArrowLeftCircle } from 'lucide-react'
import { useNavigate } from 'react-router'

interface ReportingSubmissionTableProps {
    item: any
    isLoading: boolean
}

const ReportingSubmissionTable = ({item, isLoading}: ReportingSubmissionTableProps) => {
    const navigate = useNavigate()
    if (isLoading) {
        return <Skeleton className="rounded-lg">
            <div className="h-60 rounded-lg bg-default-300"></div>
        </Skeleton>
    }

  return (
    <Card className='w-full'>
        <CardHeader className="flex gap-3">
             <Button onPress={() => navigate(-1)} isIconOnly variant='light' startContent={<ArrowLeftCircle size={24} />}></Button>
             <div className="flex flex-col">
                <p className="text-md font-bold">Detail Pengajuan</p>
                <p className="text-small text-default-500">Informasi Tahapan</p>
             </div>
        </CardHeader>
        <Divider/>
        <CardBody className='flex flex-col gap-4'>
            <div>
                <span className='text-tiny text-default-500 uppercase font-bold'>Nama Periode</span>
                <div className='text-small font-semibold'>{item?.reportingPeriode?.name || "-"}</div>
            </div>
            <div>
                <span className='text-tiny text-default-500 uppercase font-bold'>Sasaran</span>
                <div className='mt-1'>
                    <Chip size="sm" variant="solid" color="primary">
                        {item?.reportingPeriode?.targetUser === "student" ? "Mahasiswa" : "Tenaga Pendidik"}
                    </Chip>
                </div>
            </div>
             <div>
                <span className='text-tiny text-default-500 uppercase font-bold'>Ruang Lingkup</span>
                <div className='mt-1'>
                    <Chip size="sm" variant="faded" color="primary">
                        {item?.reportingPeriode?.scope === "faculty" ? "Fakultas" : "Program Studi"}
                    </Chip>
                </div>
            </div>
             <div>
                <span className='text-tiny text-default-500 uppercase font-bold'>Tahapan</span>
                <div className='text-small'>{item?.stageName || "-"}</div>
            </div>
             <div>
                <span className='text-tiny text-default-500 uppercase font-bold'>Institusi</span>
                <div className='text-small'>{item?.reportingPeriode?.institution?.name || "-"}</div>
            </div>
             <div>
                <span className='text-tiny text-default-500 uppercase font-bold'>Tanggal Mulai</span>
                <div className='text-small'>{item?.startDate ? new Date(item.startDate).toLocaleDateString() : "-"}</div>
            </div>
             <div>
                <span className='text-tiny text-default-500 uppercase font-bold'>Tanggal Selesai</span>
                <div className='text-small'>{item?.endDate ? new Date(item.endDate).toLocaleDateString() : "-"}</div>
            </div>
        </CardBody>
    </Card>
  )
}

export default ReportingSubmissionTable