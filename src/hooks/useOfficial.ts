import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { officialSchema } from "@/schemas/OfficialSchema";
import { officialService } from "@/services/OfficialService";
import type { SortDescriptor } from "@heroui/react";
import type { Official } from "@/models";

export const useOfficial = ({
  fetchTable = true,
  fetchDropdown = false,
} = {}) => {
  const [allItems, setAllItems] = useState<any[]>([]);
  const [items, setItems] = useState<Official[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ... (state declarations)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Official | null>(null);
  const [viewingItem, setViewingItem] = useState<Official | null>(null);
  const [deletingItem, setDeletingItem] = useState<Official | null>(null);

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
    resolver: zodResolver(officialSchema),
    mode: "onChange",
  });

  const fetchItems = useCallback(async () => {
    if (!fetchTable) return;
    setIsLoading(true);
    try {
      const response = await officialService.index({
        page: paginationInfo.page,
        limit: paginationInfo.limit,
        search: filterValue,
      });
      setItems(response.data);
      setPaginationInfo(response.meta!);
    } finally {
      setIsLoading(false);
    }
  }, [paginationInfo.page, paginationInfo.limit, filterValue, fetchTable]);

  const fetchAllItems = useCallback(async () => {
    if (!fetchDropdown) return;
    setIsLoading(true);
    try {
      const response = await officialService.index({
        page: 1,
        limit: 100,
      });
      const options = response.data.map((official) => ({
        label: official.name,
        value: official.id,
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
      if (editingItem) {
        await officialService.update(Number(editingItem.id), formData);
      } else {
        await officialService.create(formData);
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
      await officialService.delete(deletingItem.id);
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
    fetchAllItems,
    allItems,
  };
};
