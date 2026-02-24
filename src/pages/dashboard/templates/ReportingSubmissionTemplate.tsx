import { Outlet, useParams } from 'react-router'

import ReportingSubmissionTable from '@/components/dashboard/ReportingSubmissionTable'
import { useReportingStage } from '@/hooks/useReportingStage'

const ReportingSubmissionTemplate = () => {
    const {reportingStageId} = useParams<{reportingStageId: string}>()
    const {item, isLoadingItem} = useReportingStage(undefined, reportingStageId);
  return (
    <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        <div className="md:col-span-3">
             <ReportingSubmissionTable item={item} isLoading={isLoadingItem}></ReportingSubmissionTable>
        </div>
        <div className="md:col-span-9">
            <Outlet/>
        </div>
    </div>
  )
}

export default ReportingSubmissionTemplate