import ReportingPeriodeTable from '@/components/dashboard/ReportingPeriodeTable'
import { Outlet, useParams } from 'react-router'
import { useReportingPeriode } from '@/hooks/useReportingPeriode'
import { Divider } from '@heroui/react'

const ReportingPeriodeTemplate = () => {
    const {reportingPeriodeId} = useParams<{reportingPeriodeId: string}>()
    const {item, isLoadingItem} = useReportingPeriode(reportingPeriodeId);
  return (
    <div className='flex flex-col gap-8'>
        <ReportingPeriodeTable item={item} isLoading={isLoadingItem}></ReportingPeriodeTable>
        <Divider/>
        <Outlet/>
    </div>
  )
}

export default ReportingPeriodeTemplate