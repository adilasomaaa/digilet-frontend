import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentSchema } from "@/schemas/StudentSchema";
import { studentService } from "@/services/StudentService";
import type { SortDescriptor } from "@heroui/react";
import type { Student } from "@/models";

export const useStudent = () => {
  const [items, setItems] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isImportLoading, setIsImportLoading] = useState(false);
  const [isExportLoading, setIsExportLoading] = useState(false);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const handleExport = async (studyProgramId?: string) => {
    try {
      const blob = await studentService.export({ studyProgramId });
      const url = window.URL.createObjectURL(blob); // Pastikan ini Blob dari fetcher.ts
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `data-mahasiswa-${new Date().getTime()}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const handleImport = async (file: File, institutionId: number) => {
    setIsImportLoading(true);
    try {
      await studentService.import(file, institutionId);
      setIsImportModalOpen(false);
      fetchItems();
    } finally {
      setIsImportLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Student | null>(null);
  const [viewingItem, setViewingItem] = useState<Student | null>(null);
  const [deletingItem, setDeletingItem] = useState<Student | null>(null);

  const [filterValue, setFilterValue] = useState("");
  const [filterState, setFilterState] = useState<Record<string, any>>({});
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "fullname",
    direction: "ascending",
  });
  const [paginationInfo, setPaginationInfo] = useState({
    page: 1,
    limit: 10,
    totalData: 0,
    totalPages: 1,
  });

  const form = useForm({
    resolver: zodResolver(studentSchema),
    mode: "onChange",
  });

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await studentService.index({
        page: paginationInfo.page,
        limit: paginationInfo.limit,
        search: filterValue,
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
        birthday: formData.birthday ? formData.birthday.toString() : null,
      };
      if (editingItem) {
        await studentService.update(Number(editingItem.id), payload);
      } else {
        await studentService.create(payload);
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
      await studentService.delete(deletingItem.id);
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
    handleExport,
    handleImport,
    isImportLoading,
    isExportLoading,
    setIsImportModalOpen,
    isImportModalOpen,
  };
};
