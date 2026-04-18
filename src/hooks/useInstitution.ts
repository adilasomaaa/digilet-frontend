import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SortDescriptor } from "@heroui/react";
import type { Institution } from "@/models";
import { institutionSchema } from "@/schemas/InstitutionSchema";
import { institutionService } from "@/services/InstitutionService";

export const useInstitution = ({
  fetchTable = true,
  fetchDropdown = false,
} = {}) => {
  const [allItems, setAllItems] = useState<any[]>([]);
  const [items, setItems] = useState<Institution[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ... (state declarations)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Institution | null>(null);
  const [viewingItem, setViewingItem] = useState<Institution | null>(null);
  const [deletingItem, setDeletingItem] = useState<Institution | null>(null);

  const [filterValue, setFilterValue] = useState("");
  const [filterState, setFilterState] = useState<
    Record<string, Selection | string>
  >({});
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
    resolver: zodResolver(institutionSchema),
    mode: "onChange",
  });

  const fetchItems = useCallback(async () => {
    if (!fetchTable) return;
    setIsLoading(true);
    try {
      const tipeValue =
        filterState.tipe instanceof Set && filterState.tipe.size > 0
          ? Array.from(filterState.tipe).join(",")
          : undefined;

      const response = await institutionService.index({
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
  }, [paginationInfo.page, paginationInfo.limit, filterValue, filterState, fetchTable]);

  const fetchAllItems = useCallback(async () => {
    if (!fetchDropdown) return;
    setIsLoading(true);
    try {
      const response = await institutionService.index({
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
  }, [fetchDropdown]);

  useEffect(() => {
    if (fetchTable) {
        const timer = setTimeout(fetchItems, 500);
        return () => clearTimeout(timer);
    }
  }, [fetchItems, fetchTable]);

  useEffect(() => {
    if (fetchDropdown) {
        fetchAllItems();
    }
  }, [fetchAllItems, fetchDropdown]);

  const onSubmit = async (formData: any) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        parentId: formData.parentId ? Number(formData.parentId) : undefined,
      };
      if (editingItem) {
        await institutionService.update(Number(editingItem.id), payload);
      } else {
        await institutionService.create(payload);
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
      await institutionService.delete(deletingItem.id);

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
