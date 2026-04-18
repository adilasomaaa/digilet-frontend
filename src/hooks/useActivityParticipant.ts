import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { activityParticipantSchema } from "@/schemas/ActivityParticipantSchema";
import { activityParticipantService } from "@/services/ActivityParticipantService";
import { activityService } from "@/services/ActivityService";
import type { SortDescriptor } from "@heroui/react";
import type { ActivityParticipant } from "@/models";

export const useActivityParticipant = (activityId?: string) => {
  const [items, setItems] = useState<ActivityParticipant[]>([]);
  const [activity, setActivity] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ActivityParticipant | null>(null);
  const [viewingItem, setViewingItem] = useState<ActivityParticipant | null>(null);
  const [deletingItem, setDeletingItem] = useState<ActivityParticipant | null>(null);

  const [filterValue, setFilterValue] = useState("");
  const [filterState, setFilterState] = useState<Record<string, any>>({});
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1, limit: 10, totalData: 0, totalPages: 1,
  });

  const form = useForm({
    resolver: zodResolver(activityParticipantSchema),
    mode: "onChange",
  });

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      if (activityId && !activity) {
          const actRes = await activityService.show(Number(activityId));
          setActivity(actRes.data);
      }

      const response = await activityParticipantService.index({
        page: paginationInfo.page,
        limit: paginationInfo.limit,
        search: filterValue,
        activityId: activityId,
      });
      setItems(response.data);
      setPaginationInfo(response.meta!);
    } finally {
      setIsLoading(false);
    }
  }, [paginationInfo.page, paginationInfo.limit, filterValue, activityId, activity]);

  useEffect(() => {
    const timer = setTimeout(fetchItems, 500);
    return () => clearTimeout(timer);
  }, [fetchItems]);

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await activityParticipantService.update(Number(editingItem.id), formData);
      } else {
        await activityParticipantService.create(formData);
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
      await activityParticipantService.delete(deletingItem.id);
      setIsDeleteModalOpen(false);
      setDeletingItem(null);
      fetchItems();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerify = async (id: number) => {
    setIsSubmitting(true);
    try {
      await activityParticipantService.verify(id);
      fetchItems();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyBulk = async (ids: number[]) => {
    setIsSubmitting(true);
    try {
      await activityParticipantService.verifyBulk(ids);
      fetchItems();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportExcel = async () => {
    if (!activityId) return;
    setIsSubmitting(true);
    try {
      await activityParticipantService.exportExcel(Number(activityId));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExportPdf = async () => {
    if (!activityId) return;
    setIsSubmitting(true);
    try {
      await activityParticipantService.exportPdf(Number(activityId));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    items, activity, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue, filterState, setFilterState,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    form, onSubmit, fetchItems, handleConfirmDelete, handleVerify, handleVerifyBulk,
    handleExportExcel, handleExportPdf
  };
};