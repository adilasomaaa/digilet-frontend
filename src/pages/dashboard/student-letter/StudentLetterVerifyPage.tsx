import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Spinner,
  Divider,
  Select,
  SelectItem,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { ArrowLeft, SaveIcon } from "lucide-react";
import { useStudentLetter } from "@/hooks/useStudentLetter";
import { env } from "@/lib/env";

const StudentLetterVerifyPage = () => {
  const navigate = useNavigate();
  const { item, isLoading, isSubmitting, onVerify } = useStudentLetter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const attributes = [];
    if (item?.letterAttributeSubmissions) {
       for(const submission of item.letterAttributeSubmissions) {
           const inputName = `attr_${submission.letterAttribute.id}`;
           if (data[inputName]) {
               attributes.push({
                   attributeId: submission.letterAttribute.id,
                   content: data[inputName]
               });
           }
       }
    }

    const payload = {
        letterNumber: data.letterNumber,
        letterDate: data.letterDate,
        signatureType: data.signatureType,
        attributes: JSON.stringify(attributes), 
    };

    onVerify(payload);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-full">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!item) {
      return (
          <div className="p-6">
              <div>Data tidak ditemukan</div>
          </div>
      )
  }

  return (
    <div>
        <div className="flex items-center gap-4 my-6">
        <Button isIconOnly variant="flat" onPress={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="text-2xl font-bold">Verifikasi Surat: {item?.letter.letterName}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-col gap-2 items-start">
            <h2 className="text-lg font-semibold">Detail Pengajuan</h2>
            <p className="text-small text-default-500">
              Detail pengajuan surat
            </p>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-500">Mahasiswa</label>
              <p>{item.student.fullname} ({item.student.nim})</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-500">Nama Surat</label>
              <p>{item.letter.letterName}</p>
            </div>
             <div>
              <label className="text-sm font-semibold text-gray-500">Tanggal Pengajuan</label>
              <p>{new Date(item.createdAt).toLocaleDateString("id-ID")}</p>
            </div>
            <Divider />
            <div>
               <h3 className="font-semibold mb-2">Dokumen Pendukung</h3>
                <ul className="list-disc list-inside">
                    {item.documentSubmissions.map(doc => (
                        <li key={doc.id}>
                            <span className="font-medium">{doc.letterDocument.documentName}:</span>{" "}
                             <a href={`${env.apiBaseUrl}/${doc.filePath}`} target="_blank" className="text-blue-500 hover:underline">Download</a>
                        </li>
                    ))}
                </ul>
            </div>
          </CardBody>
        </Card>

        {/* Right Column: Verify Form */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-col gap-2 items-start">
            <h2 className="text-lg font-bold">Verifikasi Surat</h2>
            <p className="text-small text-default-500">Verifikasi formulir untuk memverifikasi pengajuan surat</p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
               <div>
                  <Input 
                      label="Nomor Surat" 
                      variant="bordered"
                      placeholder="Masukkan Nomor Surat" 
                      isRequired
                      {...register("letterNumber", { required: true })}
                  />
               </div>
               <div>
                  <Input 
                      type="date"
                      label="Tanggal Surat" 
                      variant="bordered"
                      placeholder="Pilih Tanggal Surat" 
                      isRequired
                      {...register("letterDate", { required: true })}
                  />
               </div>
               <div>
                  <Select
                    {...register("signatureType", { required: "Tipe Tanda Tangan" })}
                    label="Tipe Tanda Tangan"
                    placeholder="Pilih tipe tanda tangan..."
                    variant="bordered"
                    isRequired
                  >
                    <SelectItem key="barcode">Barcode</SelectItem>
                    <SelectItem key="digital">Digital</SelectItem>
                  </Select>
               </div>

              <Divider />

              {/* Editable Attributes */}
              <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Perbarui Atribut (Jika perlu)</h3>
                  {item.letterAttributeSubmissions.map((submission) => (
                      <div key={submission.id}>
                          <Input 
                            label={submission.letterAttribute.attributeName} // Use raw attributeName
                            placeholder={submission.letterAttribute.placeholder}
                            defaultValue={submission.content}
                            {...register(`attr_${submission.letterAttribute.id}`, { required: submission.letterAttribute.isRequired })}
                          />
                      </div>
                  ))}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                  <Button as={Link} to="/dashboard/student-letter" variant="light">Batal</Button>
                  <Button type="submit" color="primary" isLoading={isSubmitting}><SaveIcon></SaveIcon> Verifikasi & Setujui</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default StudentLetterVerifyPage;