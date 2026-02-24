import LecturerReportContainer from '@/components/dashboard/LecturerReportContainer';
import LecturerProfileCard from '@/components/dashboard/LecturerProfileCard';

const LecturerDashboardPage = () => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-7 flex flex-col gap-6">
                <LecturerReportContainer />
            </div>

            <div className="lg:col-span-3">
                <LecturerProfileCard />
            </div>
        </div>
    );
};

export default LecturerDashboardPage;