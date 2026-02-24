import { useParams } from "react-router";
import { useReportingStage } from "@/hooks/useReportingStage";
import StudentReportList from "@/components/dashboard/StudentReportList";
import LecturerReportList from "@/components/dashboard/LecturerReportList";
import { Spinner } from "@heroui/react";
import { useAuth } from "@/context/AuthContext";

const ReportingSubmissionPage = () => {
  const { reportingStageId } = useParams<{reportingPeriodeId: string, reportingStageId: string}>();
  const auth = useAuth();
  
  const { item, isLoadingItem } = useReportingStage(undefined, reportingStageId);

  if (isLoadingItem) {
      return <div className="flex justify-center p-10"><Spinner /></div>
  }

  const targetUser = item?.reportingPeriode?.targetUser;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Daftar Pengajuan Laporan</h1>
      
      {targetUser === 'student' && reportingStageId && (
          <StudentReportList reportingStageId={reportingStageId} />
      )}

      {targetUser === 'lecturer' && reportingStageId && (
          <LecturerReportList reportingStageId={reportingStageId} validatorId={auth.user?.official?.id} />
      )}
      
      {!targetUser && (
          <div>Data tahapan tidak ditemukan.</div>
      )}
    </div>
  );
};

export default ReportingSubmissionPage;