import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import SubmitLetterBanner from '@/components/dashboard/SubmitLetterBanner';
import StudentLetterList from '@/components/dashboard/StudentLetterList';
import StudentProfileCard from '@/components/dashboard/StudentProfileCard';

const StudentDashboardPage = () => {
    const {
        submissions,
        isLoading,
        isDeleting,
        searchQuery,
        currentPage,
        totalPages,
        isViewModalOpen,
        setIsViewModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        viewingItem,
        deletingItem,
        setCurrentPage,
        handleSearch,
        handleViewDetail,
        handleDeleteClick,
        handleConfirmDelete,
    } = useStudentDashboard();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-7 flex flex-col gap-6">
                <SubmitLetterBanner />
                
                <StudentLetterList
                    submissions={submissions}
                    isLoading={isLoading}
                    isDeleting={isDeleting}
                    searchQuery={searchQuery}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    isViewModalOpen={isViewModalOpen}
                    isDeleteModalOpen={isDeleteModalOpen}
                    viewingItem={viewingItem}
                    deletingItem={deletingItem}
                    onSearchChange={handleSearch}
                    onPageChange={setCurrentPage}
                    onViewDetail={handleViewDetail}
                    onDeleteClick={handleDeleteClick}
                    onConfirmDelete={handleConfirmDelete}
                    onCloseViewModal={() => setIsViewModalOpen(false)}
                    onCloseDeleteModal={() => setIsDeleteModalOpen(false)}
                />
            </div>

            <div className="lg:col-span-3">
                <StudentProfileCard />
            </div>
        </div>
    );
};

export default StudentDashboardPage;
