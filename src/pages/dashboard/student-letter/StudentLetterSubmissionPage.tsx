import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  Card,
  CardFooter,
  CardHeader,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
  addToast,
} from "@heroui/react";
import { letterService } from "@/services/LetterService";
import type { Letter } from "@/models";
import { Save } from "lucide-react";
import { studentLetterService } from "@/services/StudentLetterService";

type SubmissionForm = {
  letterId: number;
  signatureType: "digital" | "barcode";
  attributes: { attributeId: number; content: string }[];
  documents: { letterDocumentId: number; file: FileList }[];
};

const StudentLetterSubmissionPage = () => {
  const navigate = useNavigate();
  // const { user } = useAuth(); // removed unused
  const [letters, setLetters] = useState<Letter[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [isLoadingLetters, setIsLoadingLetters] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SubmissionForm>({
    defaultValues: {
      signatureType: "digital",
      attributes: [],
      documents: [],
    },
  });

  const watchLetterId = watch("letterId");

  useEffect(() => {
    fetchLetters();
  }, []);

  useEffect(() => {
    if (watchLetterId) {
      fetchLetterDetails(Number(watchLetterId));
    } else {
      setSelectedLetter(null);
    }
  }, [watchLetterId]);

  const fetchLetters = async () => {
    setIsLoadingLetters(true);
    try {
      const response = await letterService.index({ limit: 100 });
      setLetters(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingLetters(false);
    }
  };

  const fetchLetterDetails = async (id: number) => {
    try {
      const response = await letterService.show(id);
      setSelectedLetter(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data: SubmissionForm) => {
    if (!selectedLetter) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("letterId", String(data.letterId));
    formData.append("signatureType", data.signatureType);
    
    // Process Attributes
    const attributes = selectedLetter.letterAttributes?.map((attr) => {
       const submittedAttr = data.attributes?.find(a => Number(a.attributeId) === attr.id);
       return {
         attributeId: attr.id,
         content: submittedAttr?.content || "",
       };
    });

    if (attributes) {
      formData.append("attributes", JSON.stringify(attributes));
    }

    const documentMetadata: any[] = [];
    
     selectedLetter.letterDocuments?.forEach((doc) => {
       const submittedDoc = data.documents?.find(d => Number(d.letterDocumentId) === doc.id);
       if (submittedDoc && submittedDoc.file && submittedDoc.file.length > 0) {
         documentMetadata.push({ letterDocumentId: doc.id });
         formData.append("documents", submittedDoc.file[0]); 
       }
    });
    
    if(documentMetadata.length > 0) {
        formData.append("documents", JSON.stringify(documentMetadata));
    }
    
    try {
      await studentLetterService.create(formData);
      navigate("/dashboard/student-letter/history");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
        <div className="flex flex-col py-4">
          <h1 className="text-xl font-bold">Buat Pengajuan Surat</h1>
          <p className="text-small text-default-500">
            Isi formulir untuk mengajukan surat baru
          </p>
        </div>
       <Card className="border-none shadow-sm">
        <CardBody className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <Select
                    label="Pilih Surat"
                    placeholder="Pilih jenis surat"
                    isLoading={isLoadingLetters}
                    variant="bordered"
                    {...register("letterId", { required: "Surat harus dipilih" })}
                    errorMessage={errors.letterId?.message}
                    isInvalid={!!errors.letterId}
                >
                    {letters.map((letter) => (
                        <SelectItem key={letter.id} textValue={letter.letterName}>
                            {letter.letterName}
                        </SelectItem>
                    ))}
                </Select>

            </div>

            {selectedLetter && (
                <>
                   {selectedLetter.letterAttributes && selectedLetter.letterAttributes.length > 0 && (
                       <div>
                           <h3 className="text-lg font-semibold mb-3">Atribut Surat</h3>
                           <div className="grid grid-cols-1 gap-4">
                               {selectedLetter.letterAttributes.map((attr, index) => (
                                   <div key={attr.id}>
                                        <input
                                            type="hidden"
                                            {...register(`attributes.${index}.attributeId` as const)}
                                            value={attr.id}
                                        />
                                        <Input
                                            label={attr.label}
                                            placeholder={attr.placeholder}
                                            variant="bordered"
                                            isRequired={attr.isRequired}
                                            type={attr.type === "number" ? "number" : "text"}
                                            {...register(`attributes.${index}.content` as const, {
                                                required: attr.isRequired ? "Wajib diisi" : false
                                            })}
                                            isInvalid={!!errors.attributes?.[index]?.content}
                                            errorMessage={errors.attributes?.[index]?.content?.message}
                                        />
                                   </div>
                               ))}
                           </div>
                       </div>
                   )}

                   {selectedLetter.letterDocuments && selectedLetter.letterDocuments.length > 0 && (
                       <div>
                           <h3 className="text-lg font-semibold mb-3">Dokumen Persyaratan</h3>
                           <div className="grid grid-cols-1 gap-4">
                               {selectedLetter.letterDocuments.map((doc, index) => (
                                   <div key={doc.id} className="border border-gray-100 p-4 rounded-lg">
                                       <p className="font-medium mb-2">{doc.documentName} {doc.isRequired && <span className="text-danger">*</span>}</p>
                                        <input
                                            type="hidden"
                                            {...register(`documents.${index}.letterDocumentId` as const)}
                                            value={doc.id}
                                        />
                                       <input
                                            type="file"
                                            className="block w-full text-sm text-slate-500
                                              file:mr-4 file:py-2 file:px-4
                                              file:rounded-full file:border-0
                                              file:text-sm file:font-semibold
                                              file:bg-primary-50 file:text-primary
                                              hover:file:bg-primary-100"
                                            accept={doc.fileType === "pdf" ? ".pdf" : "image/*"} // Simplification
                                            {...register(`documents.${index}.file` as const, {
                                                required: doc.isRequired ? "Dokumen wajib diupload" : false
                                            })}
                                       />
                                       <p className="text-tiny text-default-500 mt-1">Format file: {doc.fileType}</p>
                                       {errors.documents?.[index]?.file && (
                                           <p className="text-tiny text-danger mt-1">{errors.documents[index]?.file?.message}</p>
                                       )}
                                   </div>
                               ))}
                           </div>
                       </div>
                   )}
                </>
            )}

            <div className="flex justify-end gap-3 mt-4">
              <Button 
                color="primary" 
                type="submit" 
                size="lg"
                isLoading={isSubmitting}
                startContent={!isSubmitting && <Save size={20} />}
              >
                Ajukan Surat
              </Button>
            </div>
          </form>
        </CardBody>
        <CardFooter>
            
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentLetterSubmissionPage;