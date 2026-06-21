import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { studentReportService } from "@/services/StudentReportService";
import type { SortDescriptor } from "@heroui/react";
import type { StudentReport, StudentReportCreatePayload } from "@/models/student_report";

const studentReportSchema = z.object({
  reportingStageId: z.number(),
  officialId: z.number(),
  content: z.string().min(1, "Konten laporan tidak boleh kosong"),
  documentProved: z.any().optional(),
  createdAt: z.any().optional(),
  isCustomDate: z.boolean().optional(),
});

export const useStudentReport = (reportingStageId?: string, officialId?: string | number, initialLimit: number = 10) => {
    const [items, setItems] = useState<StudentReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const [editingItem, setEditingItem] = useState<StudentReport | null>(null);
    const [viewingItem, setViewingItem] = useState<StudentReport | null>(null);
    const [deletingItem, setDeletingItem] = useState<StudentReport | null>(null);

    const [filterValue, setFilterValue] = useState("");
    const [isVerifiedFilter, setIsVerifiedFilter] = useState<boolean | null>(null);
    const [paginationInfo, setPaginationInfo] = useState({
        page: 1, limit: initialLimit, totalData: 0, totalPages: 1,
    });
     const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "createdAt",
        direction: "descending",
    });


    const form = useForm({
        resolver: zodResolver(studentReportSchema),
        mode: "onChange",
    });

    const buildParams = useCallback(() => {
        const params: any = {
            page: paginationInfo.page,
            limit: paginationInfo.limit,
            search: filterValue,
        };
        if (reportingStageId) params.reportingStageId = reportingStageId;
        if (officialId) params.officialId = officialId;
        if (isVerifiedFilter !== null) params.isVerified = isVerifiedFilter;
        return params;
    }, [paginationInfo.page, paginationInfo.limit, filterValue, reportingStageId, officialId, isVerifiedFilter]);

    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await studentReportService.index(buildParams());
            setItems(response.data);
            setPaginationInfo(response.meta);
        } catch (error) {
            console.error("Failed to fetch student reports:", error);
        } finally {
            setIsLoading(false);
        }
    }, [buildParams]);

     useEffect(() => {
        const timer = setTimeout(fetchItems, 500);
        return () => clearTimeout(timer);
    }, [fetchItems]);


    const onSubmit = async (formData: any) => {
        setIsSubmitting(true);
        try {
            const payload = { ...formData };
            if (payload.isCustomDate && payload.createdAt) {
                if (typeof payload.createdAt.toString === 'function') {
                    payload.createdAt = payload.createdAt.toString();
                }
            } else {
                delete payload.createdAt;
            }
            delete payload.isCustomDate;

            if (editingItem) {
                await studentReportService.update(editingItem.id, payload as StudentReportCreatePayload);
            } else {
                await studentReportService.create(payload as StudentReportCreatePayload);
            }
            setIsModalOpen(false);
            fetchItems();
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

     const handleConfirmDelete = async () => {
        if (!deletingItem) return;
        setIsSubmitting(true);
        try {
            await studentReportService.delete(deletingItem.id);
            setIsDeleteModalOpen(false);
            setDeletingItem(null);
            fetchItems();
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
        filterValue, setFilterValue,
        isVerifiedFilter, setIsVerifiedFilter,
        buildParams,
        sortDescriptor, setSortDescriptor,
        isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
        isDeleteModalOpen, setIsDeleteModalOpen,
        editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
        form, onSubmit, fetchItems, handleConfirmDelete
    };
};
