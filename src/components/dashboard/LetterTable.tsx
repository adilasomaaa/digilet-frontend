import { Chip, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { BookIcon } from 'lucide-react'

interface LetterTableProps {
    item: any
    isLoading: boolean
}

const LetterTable = ({item, isLoading}: LetterTableProps) => {
    
  return (
    <div>
        <div className='flex items-center gap-2 mb-4'>
            <BookIcon />
            <div className='text-lg font-semibold'>Detail Informasi Surat</div>
        </div>

        <Table aria-label="Tabel Detail Surat" removeWrapper>
            <TableHeader>
                <TableColumn>NAMA SURAT</TableColumn>
                <TableColumn>KATEGORI</TableColumn>
                <TableColumn>NOMOR REFERENSI</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Data tidak ditemukan"} isLoading={isLoading} loadingContent={<Spinner />}>
                <TableRow key="1">
                    <TableCell>{item?.letterName || "-"}</TableCell>
                    <TableCell>
                        <Chip size="sm" variant="flat" color="primary">
                            {item?.category || "-"}
                        </Chip>
                    </TableCell>
                    <TableCell>{item?.referenceNumber || "-"}</TableCell>
                    
                </TableRow>
            </TableBody>
        </Table>
    </div>
  )
}

export default LetterTable