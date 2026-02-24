import { Button, Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { ArrowLeftCircle } from 'lucide-react'
import { Link } from 'react-router'

interface ReportingPeriodeTableProps {
    item: any
    isLoading: boolean
}

const ReportingPeriodeTable = ({item, isLoading}: ReportingPeriodeTableProps) => {
    
  return (
    <div>
        <div className='flex items-center gap-2 mb-4'>
            <Button as={Link} to="/dashboard/reporting-periode" color='default' variant='light' startContent={<ArrowLeftCircle />}></Button>
            <div className='text-lg font-semibold'>Detail Periode Pelaporan</div>
        </div>

        <Table aria-label="Tabel Detail Periode Pelaporan" removeWrapper>
            <TableHeader>
                <TableColumn>NAMA PERIODE</TableColumn>
                <TableColumn>SASARAN</TableColumn>
                <TableColumn>RUANG LINGKUP</TableColumn>
                <TableColumn>INSTITUSI</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Data tidak ditemukan"} isLoading={isLoading} loadingContent={<Spinner />}>
                <TableRow key="1">
                    <TableCell>{item?.name || "-"}</TableCell>
                    <TableCell>
                        <Chip size="sm" variant="solid" color="primary">
                            {item?.targetUser === "student" ? "Mahasiswa" : "Tenaga Pendidik"}
                        </Chip>
                    </TableCell>
                    <TableCell>
                        <Chip size="sm" variant="faded" color="primary">
                            {item?.scope === "faculty" ? "Fakultas" : "Program Studi"}
                        </Chip>
                    </TableCell>
                    <TableCell>{item?.institution.name || "-"}</TableCell>
                    
                </TableRow>
            </TableBody>
        </Table>
    </div>
  )
}

export default ReportingPeriodeTable