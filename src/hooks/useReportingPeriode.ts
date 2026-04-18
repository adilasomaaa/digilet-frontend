import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportingPeriodeSchema } from "@/schemas/ReportingPeriodeSchema";
import { reportingPeriodeService } from "@/services/ReportingPeriodeService";
import type { SortDescriptor } from "@heroui/react";
import type { ReportingPeriode } from "@/models";

export const useReportingPeriode = (id?: string, params?: { verifyTarget?: 'student' | 'lecturer', targetUser?: 'student' | 'lecturer' }) => {
  const [items, setItems] = useState<ReportingPeriode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [item, setItem] = useState<ReportingPeriode | null>(null);
  const [isLoadingItem, setIsLoadingItem] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ReportingPeriode | null>(null);
  const [viewingItem, setViewingItem] = useState<ReportingPeriode | null>(null);
  const [deletingItem, setDeletingItem] = useState<ReportingPeriode | null>(null);

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
    resolver: zodResolver(reportingPeriodeSchema),
    mode: "onChange",
  });

  const fetchItemById = useCallback(async () => {
      if (!id) return;
      setIsLoadingItem(true);
      try {
        const response = await reportingPeriodeService.show(Number(id));
        setItem(response.data);
      } catch (error) {
        console.error("Gagal mengambil data periode:", error);
      } finally {
        setIsLoadingItem(false);
      }
    }, [id]);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await reportingPeriodeService.index({
        page: paginationInfo.page,
        limit: paginationInfo.limit,
        search: filterValue,
        ...params
      });
      setItems(response.data);
      setPaginationInfo(response.meta!);
    } finally {
      setIsLoading(false);
    }
  }, [paginationInfo.page, paginationInfo.limit, filterValue, params?.verifyTarget]);

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
      if (editingItem) {
        await reportingPeriodeService.update(Number(editingItem.id), formData);
      } else {
        await reportingPeriodeService.create(formData);
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
      await reportingPeriodeService.delete(deletingItem.id);
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
    form, onSubmit, fetchItems, handleConfirmDelete, fetchItemById,
    item, isLoadingItem
  };
};