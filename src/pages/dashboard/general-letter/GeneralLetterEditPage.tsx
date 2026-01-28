import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { 
  Card, CardBody, Input, Button, 
  Skeleton, CardHeader,
  Select,
  SelectItem
} from "@heroui/react";
import { Save, ArrowLeft, Loader2 } from "lucide-react";

import { useLetter } from "@/hooks/useLetter"; 
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import { generalLetterService } from "@/services/GeneralLetterService";
import type { GeneralLetter } from "@/models";

const GeneralLetterEditPage = () => {
  const navigate = useNavigate();
  const { generalLetterId } = useParams(); 
  const { item: data, isLoading: isLoadingData, refresh } = useOutletContext<{ item: GeneralLetter | null, isLoading: boolean, refresh: () => void }>();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [letterId, setLetterId] = useState<number | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const { item: letter, isLoading: isLoadingAttr } = useLetter(letterId?.toString() || "");

  useEffect(() => {
    if (data) {
        setLetterId(data.letterId);

        const attributeValues: any = {};
        data.letterAttributeSubmissions.forEach((attrSub: any) => {
          attributeValues[`attr_${attrSub.letterAttributeId}`] = attrSub.content;
        });

        reset({
          letterNumber: data.letterNumber,
          name: data.name,
          signatureType: data.signatureType,
          letterDate: data.letterDate ? data.letterDate.split('T')[0] : "",
          ...attributeValues
        });
    }
  }, [data, reset]);

  const onFormSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const attributesPayload = letter?.letterAttributes?.map((attr: any) => ({
        attributeId: attr.id,
        content: data[`attr_${attr.id}`]
      })) || [];

      const payload = {
        letterNumber: data.letterNumber,
        name: data.name,
        signatureType: data.signatureType,
        letterDate: data.letterDate,
        attributes: attributesPayload
      };

      await generalLetterService.update(Number(generalLetterId), payload);
      navigate(`/dashboard/general-letter/${generalLetterId}/detail`);
      refresh();
    } catch (error) {
      console.error("Gagal memperbarui surat:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="mt-4 text-default-500">Memuat data surat...</p>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <DashboardBreadcrumbs />
      
      <div className="flex items-center gap-4 my-6">
        <Button isIconOnly variant="flat" onPress={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">Edit Surat: {letter?.letterName}</h1>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Informasi Utama */}
        <Card className="shadow-sm border-default-100">
          <CardHeader className="px-6 pt-6 flex flex-col items-start">
            <h3 className="font-semibold text-lg">Informasi Utama Surat</h3>
            <p className="text-xs text-default-400 italic">Jenis surat tidak dapat diubah.</p>
          </CardHeader>
          <CardBody className="gap-4 p-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                {...register("letterNumber")}
                label="Nomor Surat"
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

        {/* Atribut Tambahan */}
        {isLoadingAttr ? (
          <Skeleton className="h-40 w-full rounded-lg" />
        ) : (
          letter?.letterAttributes && letter.letterAttributes.length > 0 && (
            <Card className="shadow-sm border-default-100">
              <CardHeader className="px-6 pt-6">
                <h3 className="font-semibold text-lg">Atribut Tambahan</h3>
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
                    placeholder={attr.placeholder}
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
            Update Surat
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GeneralLetterEditPage;