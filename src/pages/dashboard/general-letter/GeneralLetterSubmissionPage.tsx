import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { 
  Card, CardBody, Input, Button, 
  Skeleton, CardHeader, Select, SelectItem,
} from "@heroui/react";
import { Save, ArrowLeft, FileText } from "lucide-react";

import { useLetter } from "@/hooks/useLetter"; 
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import { generalLetterService } from "@/services/GeneralLetterService";

const GeneralLetterSubmissionPage = () => {
  const navigate = useNavigate();
  const { letterId: urlLetterId } = useParams();
  
  const [selectedLetterId, setSelectedLetterId] = useState<string>(urlLetterId || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { items: allLetters, isLoading: isLoadingLetters } = useLetter();
  
  const { item: letter, isLoading: isLoadingAttr } = useLetter(selectedLetterId);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleLetterChange = (id: string) => {
    setSelectedLetterId(id);
    reset();
  };

  const onFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const attributesPayload = letter?.letterAttributes?.map((attr: any) => ({
        attributeId: attr.id,
        content: data[`attr_${attr.id}`]
      })) || [];

      const payload = {
        letterId: Number(selectedLetterId),
        letterNumber: data.letterNumber,
        name: data.name,
        letterDate: data.letterDate,
        signatureType: data.signatureType,
        attributes: attributesPayload
      };

      generalLetterService.create(payload);
      navigate("/dashboard/general-letter");

    } catch (error) {
      console.error("Gagal menyimpan surat:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <DashboardBreadcrumbs />
      
      <div className="flex items-center justify-between my-6">
        <div className="flex items-center gap-4">
          <Button isIconOnly variant="flat" onPress={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold">Buat Surat Umum</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <Card className="border-none shadow-sm bg-default-50">
          <CardBody className="p-6">
            <Select
              label="Pilih Template Surat"
              placeholder="Pilih jenis surat yang ingin dibuat"
              variant="bordered"
              selectedKeys={selectedLetterId ? [selectedLetterId] : []}
              isLoading={isLoadingLetters}
              onChange={(e) => handleLetterChange(e.target.value)}
              isRequired
              startContent={<FileText className="text-default-400" size={20} />}
            >
              {(allLetters || []).map((l: any) => (
                <SelectItem key={l.id} textValue={l.letterName}>
                  {l.letterName}
                </SelectItem>
              ))}
            </Select>
          </CardBody>
        </Card>

        {selectedLetterId && (
          <>
            <Card className="shadow-sm border-default-100">
              <CardHeader className="px-6 pt-6">
                <h3 className="font-semibold text-lg">Informasi Utama Surat</h3>
              </CardHeader>
              <CardBody className="gap-4 p-6 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    {...register("letterNumber")}
                    label="Nomor Surat"
                    placeholder="Contoh: 001/UMGO/2026"
                    variant="bordered"
                    isRequired
                  />
                  <Input
                    {...register("letterDate", { required: "Tanggal wajib diisi" })}
                    type="date"
                    label="Tanggal Surat"
                    variant="bordered"
                    isRequired
                    isInvalid={!!errors.letterDate}
                    errorMessage={errors.letterDate?.message as string}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    {...register("name", { required: "Perihal wajib diisi" })}
                    label="Perihal / Nama Pengajuan"
                    placeholder="Masukkan perihal surat..."
                    variant="bordered"
                    isRequired
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message as string}
                  />
                  <Select
                    {...register("signatureType", { required: "Tipe Tanda Tangan" })}
                    label="Tipe Tanda Tangan"
                    placeholder="Pilih tipe tanda tangan..."
                    variant="bordered"
                    isRequired
                    isInvalid={!!errors.signatureType}
                    errorMessage={errors.signatureType?.message as string}
                  >
                    <SelectItem key="barcode">Barcode</SelectItem>
                    <SelectItem key="digital">Digital</SelectItem>
                  </Select>

                </div>
              </CardBody>
            </Card>

            {isLoadingAttr ? (
              <Card className="p-6 space-y-4">
                <Skeleton className="h-10 w-full rounded-lg" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </Card>
            ) : (
              letter?.letterAttributes && letter?.letterAttributes?.length > 0 && (
                <Card className="shadow-sm border-default-100">
                  <CardHeader className="px-6 pt-6">
                    <h3 className="font-semibold text-lg">Atribut Tambahan ({letter.letterName})</h3>
                  </CardHeader>
                  <CardBody className="gap-6 p-6 pt-2">
                    {letter.letterAttributes.map((attr: any) => (
                      <Input
                        key={attr.id}
                        {...register(`attr_${attr.id}`, { 
                          required: attr.isRequired ? `${attr.label} wajib diisi` : false 
                        })}
                        type={attr.type}
                        label={attr.label}
                        placeholder={attr.placeholder || `Masukkan ${attr.label}...`}
                        variant="faded"
                        color="primary"
                        isRequired={attr.isRequired}
                        isInvalid={!!errors[`attr_${attr.id}`]}
                        errorMessage={errors[`attr_${attr.id}`]?.message as string}
                      />
                    ))}
                  </CardBody>
                </Card>
              )
            )}

            <div className="flex justify-end gap-3 mt-4">
              <Button variant="light" onPress={() => navigate(-1)}>
                Batal
              </Button>
              <Button 
                color="primary" 
                type="submit" 
                size="lg"
                isLoading={isSubmitting}
                startContent={!isSubmitting && <Save size={20} />}
                className="px-8"
              >
                Simpan & Buat Surat
              </Button>
            </div>
          </>
        )}
      </form>

    </div>
  );
};

export default GeneralLetterSubmissionPage;