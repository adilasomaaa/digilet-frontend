import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { letterTemplateSchema } from "@/schemas/LetterTemplateSchema";
import { letterTemplateService } from "@/services/LetterTemplateService";
import type { SortDescriptor } from "@heroui/react";
import type { LetterTemplate } from "@/models";

export const useLetterTemplate = (letterId?: string) => {
  const [items, setItems] = useState<LetterTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LetterTemplate | null>(null);
  const [viewingItem, setViewingItem] = useState<LetterTemplate | null>(null);
  const [deletingItem, setDeletingItem] = useState<LetterTemplate | null>(null);

  const [filterValue, setFilterValue] = useState("");
  const [filterState, setFilterState] = useState<Record<string, any>>({});
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    limit: 10,
    totalData: 0,
    totalPages: 1,
  });

  const form = useForm({
    resolver: zodResolver(letterTemplateSchema),
    mode: "onChange",
  });

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await letterTemplateService.index({
        page: paginationInfo.page,
        limit: paginationInfo.limit,
        search: filterValue,
        letterId,
      });
      setItems(response.data[0]);
    } finally {
      setIsLoading(false);
    }
  }, [paginationInfo.page, paginationInfo.limit, filterValue]);

  useEffect(() => {
    const timer = setTimeout(fetchItems, 500);
    return () => clearTimeout(timer);
  }, [fetchItems]);

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        letterId,
      };
      await letterTemplateService.upsert(payload);
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
      await letterTemplateService.delete(deletingItem.id);
      setIsDeleteModalOpen(false);
      setDeletingItem(null);
      fetchItems();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    items,
    isLoading,
    isSubmitting,
    paginationInfo,
    setPaginationInfo,
    filterValue,
    setFilterValue,
    filterState,
    setFilterState,
    sortDescriptor,
    setSortDescriptor,
    isModalOpen,
    setIsModalOpen,
    isViewModalOpen,
    setIsViewModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    editingItem,
    setEditingItem,
    viewingItem,
    setViewingItem,
    deletingItem,
    setDeletingItem,
    form,
    onSubmit,
    fetchItems,
    handleConfirmDelete,
  };
};
