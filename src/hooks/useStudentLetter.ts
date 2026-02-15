import { useState, useEffect, useCallback } from "react";
import { generatePDF, printPDF } from "@/utils/pdfGenerator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentLetterSchema } from "@/schemas/StudentLetterSchema";
import { studentLetterService } from "@/services/StudentLetterService";
import type { SortDescriptor } from "@heroui/react";
import type { StudentLetter } from "@/models";
import { useNavigate, useParams } from "react-router";

export const useStudentLetter = (
  studentLetterId?: number | string,
  options: { fetchOnMount?: boolean } = { fetchOnMount: true }
) => {
  const [items, setItems] = useState<StudentLetter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const id = studentLetterId || params.id || params.studentLetterId;

  const [letterData, setLetterData] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
    if (id || options.fetchOnMount === false) return;
    const timer = setTimeout(fetchItems, 500);
    return () => clearTimeout(timer);
  }, [fetchItems, id, options.fetchOnMount]);

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

  const onSubmitCarbonCopy = async (id: number, formData: any, onSuccess?: () => void) => {
      setIsSubmitting(true);
      try {
        await studentLetterService.updateCarbonCopy(id, formData);
        setIsModalOpen(false);
        if (onSuccess) {
          onSuccess();
        } else {
          fetchItems();
        }
      } catch (error) {
        console.error(error);
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
      // navigate("/dashboard/student-letter/history");
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
          navigate(-1);
      } catch (error) {
          console.error("Gagal memverifikasi surat");
      } finally {
          setIsSubmitting(false);
      }
  }

  const fetchLetterData = useCallback(async (token: string) => {
    setIsLoading(true);
    try {
      const response = await studentLetterService.getLetterData(token);
      setLetterData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDownloadPDF = async (element: HTMLElement) => {
    if (!element || !letterData) return;
    try {
      setIsGenerating(true);
      const filename = `${letterData.letterNumber || 'surat'}.pdf`;
      await generatePDF(element, filename);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Gagal membuat PDF. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = async (element: HTMLElement) => {
    if (!element) return;
    try {
      setIsGenerating(true);
      await printPDF(element);
    } catch (err) {
      console.error('Error printing PDF:', err);
      alert('Gagal mencetak PDF. Silakan coba lagi.');
    } finally {
      setIsGenerating(false);
    }
  };

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
    refresh: id ? fetchItem : fetchItems,
    fetchItem,
    onSubmitCarbonCopy,
    
    // Preview related
    letterData,
    fetchLetterData,
    handleDownloadPDF,
    handlePrint,
    isGenerating,
    error
  };
};