import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { lecturerReportService } from "@/services/LecturerReportService";
import type { SortDescriptor } from "@heroui/react";
import type { LecturerReport, LecturerReportCreatePayload } from "@/models/lecturer_report";

const lecturerReportSchema = z.object({
  reportingStageId: z.number(),
  validatorId: z.number(),
  content: z.string().min(1, "Konten laporan tidak boleh kosong"),
  notes: z.string().optional(),
  documentProved: z.any().optional(),
});

export const useLecturerReport = (reportingStageId?: string, validatorId?: string | number, reporterId?: string | number) => {
    const [items, setItems] = useState<LecturerReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    
    const [editingItem, setEditingItem] = useState<LecturerReport | null>(null);
    const [viewingItem, setViewingItem] = useState<LecturerReport | null>(null);
    const [deletingItem, setDeletingItem] = useState<LecturerReport | null>(null);

    const [filterValue, setFilterValue] = useState("");
    const [isVerifiedFilter, setIsVerifiedFilter] = useState<boolean | null>(null);
    const [paginationInfo, setPaginationInfo] = useState({
        page: 1, limit: 10, totalData: 0, totalPages: 1,
    });
     const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "createdAt",
        direction: "descending",
    });


    const form = useForm({
        resolver: zodResolver(lecturerReportSchema),
        mode: "onChange",
    });

    const buildParams = useCallback(() => {
        const params: any = {
            page: paginationInfo.page,
            limit: paginationInfo.limit,
            search: filterValue,
            validatorId: validatorId,
            reporterId: reporterId,
        };
        if (reportingStageId) {
            params.reportingStageId = reportingStageId;
        }
        if (isVerifiedFilter !== null) {
            params.isVerified = isVerifiedFilter;
        }
        return params;
    }, [paginationInfo.page, paginationInfo.limit, filterValue, reportingStageId, validatorId, reporterId, isVerifiedFilter]);

    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await lecturerReportService.index(buildParams());
            setItems(response.data);
            setPaginationInfo(response.meta);
        } catch (error) {
            console.error("Failed to fetch lecturer reports:", error);
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
            if (editingItem) {
                await lecturerReportService.update(editingItem.id, formData as LecturerReportCreatePayload);
            } else {
                await lecturerReportService.create(formData as LecturerReportCreatePayload);
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
            await lecturerReportService.delete(deletingItem.id);
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
