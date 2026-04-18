import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { letterDocumentSchema } from "@/schemas/LetterDocumentSchema";
import { letterDocumentService } from "@/services/LetterDocumentService";
import type { SortDescriptor } from "@heroui/react";
import type { LetterDocument } from "@/models";

export const useLetterDocument = (letterId?: string) => {
  const [items, setItems] = useState<LetterDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LetterDocument | null>(null);
  const [viewingItem, setViewingItem] = useState<LetterDocument | null>(null);
  const [deletingItem, setDeletingItem] = useState<LetterDocument | null>(null);

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
    resolver: zodResolver(letterDocumentSchema),
    mode: "onChange",
  });

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await letterDocumentService.index({
        page: paginationInfo.page,
        limit: paginationInfo.limit,
        search: filterValue,
        letterId: letterId,
      });
      setItems(response.data);
      setPaginationInfo(response.meta!);
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
        letterId: letterId,
      };
      if (editingItem) {
        await letterDocumentService.update(Number(editingItem.id), payload);
      } else {
        await letterDocumentService.create(payload);
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
      await letterDocumentService.delete(deletingItem.id);
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
