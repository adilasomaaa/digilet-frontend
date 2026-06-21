import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportingStageSchema } from "@/schemas/ReportingStageSchema";
import { reportingStageService } from "@/services/ReportingStageService";
import type { SortDescriptor } from "@heroui/react";
import type { ReportingStage } from "@/models";

export const useReportingStage = (reportingPeriodeId?: string, id?: string) => {
  const [items, setItems] = useState<ReportingStage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [item, setItem] = useState<ReportingStage | null>(null);
  const [isLoadingItem, setIsLoadingItem] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ReportingStage | null>(null);
  const [viewingItem, setViewingItem] = useState<ReportingStage | null>(null);
  const [deletingItem, setDeletingItem] = useState<ReportingStage | null>(null);

  const [filterValue, setFilterValue] = useState("");
  const [filterState, setFilterState] = useState<Record<string, any>>({});
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1, limit: 10, totalData: 0, totalPages: 1,
  });

  const form = useForm({
    resolver: zodResolver(reportingStageSchema),
    mode: "onChange",
  });

  const fetchItemById = useCallback(async () => {
    if (!id) return;
    setIsLoadingItem(true);
    try {
      const response = await reportingStageService.show(Number(id));
      setItem(response.data);
    } catch (error) {
      console.error("Gagal mengambil data periode:", error);
    } finally {
      setIsLoadingItem(false);
    }
  }, [id]);
  
  
  const fetchItems = useCallback(async () => {
    if (!reportingPeriodeId) return;
    setIsLoading(true);
    try {
      const response = await reportingStageService.index({
        page: paginationInfo.page,
        limit: paginationInfo.limit,
        search: filterValue,
        reportingPeriodeId
      });
      setItems(response.data);
      setPaginationInfo(response.meta!);
    } finally {
      setIsLoading(false);
    }
  }, [paginationInfo.page, paginationInfo.limit, filterValue, reportingPeriodeId]);

  useEffect(() => {
    const timer = setTimeout(fetchItems, 500);
    return () => clearTimeout(timer);
  }, [fetchItems]);

  useEffect(() => {
    if (id) {
      fetchItemById();
    }
  }, [id, fetchItemById]);


  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const payload = {
        reportingPeriodeId,
        ...formData,
        startDate: formData.startDate ? formData.startDate.toString() : null,
        endDate: formData.endDate ? formData.endDate.toString() : null,
      }
      if (editingItem) {
        await reportingStageService.update(Number(editingItem.id), payload);
      } else {
        await reportingStageService.create(payload);
      }
      setIsModalOpen(false);
      fetchItems();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setIsSubmitting(true);
    try {
      await reportingStageService.delete(deletingItem.id);
      setIsDeleteModalOpen(false);
      setDeletingItem(null);
      fetchItems();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue, filterState, setFilterState,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    form, onSubmit, fetchItems, handleConfirmDelete,
    item, isLoadingItem
  };
};