import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentLetterSchema } from "@/schemas/StudentLetterSchema";
import { studentLetterService } from "@/services/StudentLetterService";
import type { SortDescriptor } from "@heroui/react";
import type { StudentLetter } from "@/models";
import { useNavigate, useParams } from "react-router";

export const useStudentLetter = () => {
  const [items, setItems] = useState<StudentLetter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState<StudentLetter | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<StudentLetter | null>(null);
  const [viewingItem, setViewingItem] = useState<StudentLetter | null>(null);
  const [deletingItem, setDeletingItem] = useState<StudentLetter | null>(null);

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
    resolver: zodResolver(studentLetterSchema),
    mode: "onChange",
  });

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await studentLetterService.index({
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
      if (editingItem) {
        await studentLetterService.update(Number(editingItem.id), formData);
      } else {
        await studentLetterService.create(formData);
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
      await studentLetterService.delete(deletingItem.id);
      setIsDeleteModalOpen(false);
      setDeletingItem(null);
      fetchItems();
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchItem = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const response = await studentLetterService.show(Number(id));
      setItem(response.data);
    } catch (error) {
      console.error("Gagal mengambil data surat");
      navigate("/dashboard/student-letter/history");
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  const onUpdate = async (formData: any) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await studentLetterService.update(Number(id), formData);
      console.log("Berhasil memperbarui surat");
      navigate("/dashboard/student-letter/history");
    } catch (error) {
      console.error("Gagal memperbarui surat");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onVerify = async (formData: any) => {
      if (!id) return;
      setIsSubmitting(true);
      try {
          await studentLetterService.verify(Number(id), formData);
          navigate("/dashboard/student-letter");
      } catch (error) {
          console.error("Gagal memverifikasi surat");
      } finally {
          setIsSubmitting(false);
      }
  }

  return {
    items, isLoading, isSubmitting, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue, filterState, setFilterState,
    sortDescriptor, setSortDescriptor,
    isModalOpen, setIsModalOpen, isViewModalOpen, setIsViewModalOpen,
    isDeleteModalOpen, setIsDeleteModalOpen,
    editingItem, setEditingItem, viewingItem, setViewingItem, deletingItem, setDeletingItem,
    form, onSubmit, fetchItems, handleConfirmDelete, item,
    onUpdate,
    onVerify,
    refresh: fetchItems
  };
};