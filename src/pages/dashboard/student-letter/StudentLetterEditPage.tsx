import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Spinner,
  Divider,
  Chip
} from "@heroui/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { env } from "@/lib/env";
import { SaveIcon } from "lucide-react";
import { useStudentLetter } from "@/hooks/useStudentLetter";

const statusMap: Record<string, { color: "warning" | "primary" | "success" | "danger" | "secondary"; label: string }> = { 
                    pending: { color: "warning", label: "Menunggu" },
                    waiting_signature: { color: "secondary", label: "Menunggu Tanda Tangan" },
                    approved: { color: "success", label: "Disetujui" },
                    rejected: { color: "danger", label: "Ditolak" },
                }

const StudentLetterEditPage = () => {
  const { item, isLoading, isSubmitting, onUpdate } = useStudentLetter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    const formData = new FormData();
    
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

    const documents = [];
    if (item?.documentSubmissions) {
      for (const submission of item.documentSubmissions) {
          const inputName = `doc_${submission.letterDocument.id}`;
          const fileList = data[inputName];
          if (fileList && fileList.length > 0) {
              formData.append("documents", fileList[0]);
              documents.push({
                  letterDocumentId: submission.letterDocument.id,
              });
          }
      }
    }

    formData.append("attributes", JSON.stringify(attributes));
    formData.append("documents", JSON.stringify(documents));

    onUpdate(formData);
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
    <div className="p-6">
        <div className="flex flex-col py-4">
          <h1 className="text-xl font-bold">Perbarui Pengajuan Surat</h1>
          <p className="text-small text-default-500">
            Perbarui formulir untuk memperbarui pengajuan surat
          </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Letter Info */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold">Informasi Surat</h2>
            <p className="text-small text-default-500">
            Informasi mengenai surat yang diajukan
          </p>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-500">Nama Surat</label>
              <p>{item.letter.letterName}</p>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-500">Nomor Surat</label>
              <p>{item.letterNumber || "-"}</p>
            </div>
             <div>
              <label className="text-sm font-semibold text-gray-500">Tanggal Pengajuan</label>
              <p>{new Date(item.createdAt).toLocaleDateString("id-ID")}</p>
            </div>
            <div className="flex gap-2 flex-col">
                <label className="text-sm font-semibold text-gray-500">Status</label>
                    <Chip
                    color={statusMap[item.status].color}
                    className="text-xs font-medium"
                    >
                    {statusMap[item.status].label}
                    </Chip>
            </div>
            <Divider />
            <div>
               <h3 className="font-semibold mb-2">Dokumen Saat Ini</h3>
                <ul className="list-disc list-inside">
                    {item.documentSubmissions.map(doc => (
                        <li key={doc.id}>
                            <span className="font-medium">{doc.letterDocument.documentName}:</span>{" "}
                             <a href={`${env.apiBaseUrl}${doc.filePath}`} target="_blank" className="text-blue-500 hover:underline">Download</a>
                        </li>
                    ))}
                </ul>
            </div>
          </CardBody>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold">Edit Data</h2>
            <p className="text-small text-default-500">
            Edit formulir untuk memperbarui pengajuan surat
          </p>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Attributes Form */}
              <div className="space-y-4">
                  <h3 className="font-semibold text-gray-700">Atribut Surat</h3>
                  {item.letterAttributeSubmissions.map((submission) => (
                      <div key={submission.id}>
                          <Input 
                            variant="bordered"
                            label={submission.letterAttribute.attributeName}
                            placeholder={submission.letterAttribute.placeholder}
                            defaultValue={submission.content}
                            {...register(`attr_${submission.letterAttribute.id}`, { required: submission.letterAttribute.isRequired })}
                          />
                      </div>
                  ))}
              </div>
              
              <Divider />

              <div className="space-y-4">
                 <h3 className="font-semibold text-gray-700">Update Dokumen</h3>
                 {item.documentSubmissions.map((submission) => (
                      <div key={submission.id}>
                          <label className="text-sm text-gray-600 block mb-1">
                              {submission.letterDocument.documentName} 
                              {submission.letterDocument.isRequired && <span className="text-red-500">*</span>}
                              <span className="text-xs text-gray-400 ml-1">(Biarkan kosong jika tidak ingin mengubah)</span>
                          </label>
                          <input 
                            type="file"
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            accept={submission.letterDocument.fileType === 'pdf' ? 'application/pdf' : 'image/*'}
                            {...register(`doc_${submission.letterDocument.id}`)}
                          />
                      </div>
                 ))}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                  <Button as={Link} to="/dashboard/student-letter/history" variant="light">Batal</Button>
                  <Button type="submit" color="primary" isLoading={isSubmitting}><SaveIcon /> Simpan Perubahan</Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default StudentLetterEditPage;