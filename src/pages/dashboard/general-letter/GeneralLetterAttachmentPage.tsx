import { useLetterAttachment } from "@/hooks/useLetterAttachment";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import { Button, Card, CardBody, Spinner, Select, SelectItem } from "@heroui/react";
import Editor from "@/components/dashboard/Editor";
import { SaveIcon } from "lucide-react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

const GeneralLetterAttachmentPage = () => {
  const {generalLetterId} = useParams();
  const {
    items, isLoading, isSubmitting, onSubmit
  } = useLetterAttachment(undefined, generalLetterId);

  const [data, setData] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (items) {
      setData(items.content);
      setIsVisible(items.isVisible);
    } else if (!isLoading && !items) {
      setData("");
      setIsVisible(false);
    }
  }, [items, isLoading]);

  if (isLoading) return <Spinner/>;

  return (
    <div>
      <DashboardBreadcrumbs />

      <div className="flex justify-between items-center gap-4 my-4">
        <h1 className="text-2xl font-semibold my-4">Lampiran Surat</h1>
        <div className="flex justify-end mt-4 gap-4 items-center">
          <div className="w-48">
            <Select 
              label="Tampilkan Lampiran"
              size="sm"
              selectedKeys={[isVisible ? "true" : "false"]}
              onChange={(e) => setIsVisible(e.target.value === "true")}
            >
              <SelectItem key="false">Tidak</SelectItem>
              <SelectItem key="true">Ya</SelectItem>
            </Select>
          </div>
          <Button
            color="primary" 
            isLoading={isSubmitting} 
            onPress={() => onSubmit({ content: data, isVisible, generalLetterSubmissionId: Number(generalLetterId) })}
          >
            <SaveIcon size={16} />
            Simpan Template Lampiran
          </Button>
        </div>
      </div>
        <Card>
          <CardBody>
            <Editor
              value={data} 
              onChange={(data) => setData(data)}
              disabled={!isVisible} 
            />
          </CardBody>
        </Card>
    </div>
  );
};

export default GeneralLetterAttachmentPage;