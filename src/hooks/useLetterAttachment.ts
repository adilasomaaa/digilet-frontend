import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { letterAttachmentSchema } from "@/schemas/LetterAttachmentSchema";
import { letterAttachmentService } from "@/services/LetterAttachmentService";
import type { SortDescriptor } from "@heroui/react";
import type { LetterAttachment } from "@/models";

export const useLetterAttachment = (studentSubmissionLetterId?: string, generalSubmissionLetterId?: string) => {
  const [items, setItems] = useState<LetterAttachment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LetterAttachment | null>(null);
  const [viewingItem, setViewingItem] = useState<LetterAttachment | null>(null);
  const [deletingItem, setDeletingItem] = useState<LetterAttachment | null>(null);

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
    resolver: zodResolver(letterAttachmentSchema),
    mode: "onChange",
  });

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await letterAttachmentService.index({
        page: paginationInfo.page,
        limit: paginationInfo.limit,
        search: filterValue,
        studentLetterSubmissionId: studentSubmissionLetterId ? Number(studentSubmissionLetterId) : undefined,
        generalLetterSubmissionId: generalSubmissionLetterId ? Number(generalSubmissionLetterId) : undefined,
      });
      setItems(response.data[0]);
      setPaginationInfo(response.meta!);
    } finally {
      setIsLoading(false);
    }
  }, [paginationInfo.page, paginationInfo.limit, filterValue, studentSubmissionLetterId, generalSubmissionLetterId]);

  useEffect(() => {
    const timer = setTimeout(fetchItems, 500);
    return () => clearTimeout(timer);
  }, [fetchItems]);

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      await letterAttachmentService.upsert(formData);
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
      await letterAttachmentService.delete(deletingItem.id);
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
  };
};