import { useState, useEffect } from 'react';
import { studentLetterService } from '@/services/StudentLetterService';
import type { StudentLetter } from '@/models/student_letter';

export const useStudentDashboard = () => {
    const [submissions, setSubmissions] = useState<StudentLetter[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [searchInput, setSearchInput] = useState(''); // User input
    const [searchQuery, setSearchQuery] = useState(''); // Debounced search query
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 4; // 2 columns x 3 rows

    // Modal states
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [viewingItem, setViewingItem] = useState<StudentLetter | null>(null);
    const [deletingItem, setDeletingItem] = useState<StudentLetter | null>(null);

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(searchInput);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchInput]);

    useEffect(() => {
        fetchSubmissions();
    }, [currentPage, searchQuery]);

    const fetchSubmissions = async () => {
        setIsLoading(true);
        try {
            const response = await studentLetterService.index({ 
                page: currentPage, 
                limit,
                search: searchQuery 
            });
            setSubmissions(response.data);
            setTotalPages(response.meta.totalPages);
        } catch (error) {
            console.error("Failed to fetch submissions", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!deletingItem) return;
        
        setIsDeleting(true);
        try {
            await studentLetterService.delete(deletingItem.id);
            setIsDeleteModalOpen(false);
            setDeletingItem(null);
            await fetchSubmissions();
        } catch (error) {
            console.error("Failed to delete", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSearch = (query: string) => {
        setSearchInput(query);
        setCurrentPage(1); // Reset to first page on new search
    };

    const handleViewDetail = (item: StudentLetter) => {
        setViewingItem(item);
        setIsViewModalOpen(true);
    };

    const handleDeleteClick = (item: StudentLetter) => {
        setDeletingItem(item);
        setIsDeleteModalOpen(true);
    };

    return {
        // Data
        submissions,
        isLoading,
        isDeleting,
        searchQuery: searchInput, // Return the input value for the search field
        currentPage,
        totalPages,
        
        // Modal states
        isViewModalOpen,
        setIsViewModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        viewingItem,
        deletingItem,
        
        // Handlers
        setCurrentPage,
        handleSearch,
        handleViewDetail,
        handleDeleteClick,
        handleConfirmDelete,
        refetch: fetchSubmissions,
    };
};
