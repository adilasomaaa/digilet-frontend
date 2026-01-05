import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studyProgramSchema } from "@/schemas/StudyProgramSchema";
import { studyProgramService } from "@/services/StudyProgramService";
import type { SortDescriptor } from "@heroui/react";
import type { StudyProgram } from "@/models";

export const useStudyProgram = () => {
  const [allItems, setAllItems] = useState<any[]>([]);
  const [items, setItems] = useState<StudyProgram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StudyProgram | null>(null);
  const [viewingItem, setViewingItem] = useState<StudyProgram | null>(null);
  const [deletingItem, setDeletingItem] = useState<StudyProgram | null>(null);

  const [filterValue, setFilterValue] = useState("");
  const [filterState, setFilterState] = useState<
    Record<string, Selection | string>
  >({});
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "nama_program_studi",
    direction: "ascending",
  });
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    limit: 10,
    totalData: 0,
    totalPages: 1,
  });

  const form = useForm({
    resolver: zodResolver(studyProgramSchema),
    mode: "onChange",
  });

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const tipeValue =
        filterState.tipe instanceof Set && filterState.tipe.size > 0
          ? Array.from(filterState.tipe).join(",")
          : undefined;

      const response = await studyProgramService.index({
        page: paginationInfo.page,
        limit: paginationInfo.limit,
        search: filterValue,
        tipe: tipeValue,
      });
      setItems(response.data);
      setPaginationInfo(response.meta!);
    } finally {
      setIsLoading(false);
    }
  }, [paginationInfo.page, paginationInfo.limit, filterValue, filterState]);

  const fetchAllItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await studyProgramService.index({
        page: 1,
        limit: 100,
      });
      const options = response.data.map((prodi) => ({
        label: prodi.name,
        value: prodi.id,
      }));
      setAllItems(options);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(fetchItems, 500);
    return () => clearTimeout(timer);
  }, [fetchItems]);

  useEffect(() => {
    fetchAllItems();
  }, [fetchAllItems]);

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      if (editingItem) {
        await studyProgramService.update(Number(editingItem.id), formData);
      } else {
        await studyProgramService.create(formData);
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
      await studyProgramService.delete(deletingItem.id);

      setIsDeleteModalOpen(false);
      setDeletingItem(null);

      fetchItems();
    } catch (error) {
      console.error("Gagal menghapus data:", error);
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
    fetchAllItems,
    allItems,
  };
};
