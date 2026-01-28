import { useLetterTemplate } from "@/hooks/useLetterTemplate";
import { 
  letterTemplateDisplayFields 
} from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import ShowModal from "@/components/dashboard/ShowModal";
import { useParams } from "react-router";
import Editor from "@/components/dashboard/Editor";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, Spinner, useDisclosure } from "@heroui/react";
import { HelpCircle, SaveIcon } from "lucide-react";
import PlaceholderHelperModal from "@/components/dashboard/PlaceholderHelperModal";

const LetterTemplatePage = () => {
  const {letterId} = useParams();
  const {
    items, isLoading, isSubmitting,isViewModalOpen, setIsViewModalOpen,
    viewingItem, onSubmit
  } = useLetterTemplate(letterId);

  const [data, setData] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (items?.content) {
      setData(items.content);
    } else if (!isLoading && !items) {
      setData("Template masih kosong");
    }
  }, [items, isLoading]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <DashboardBreadcrumbs />
      <div className="flex justify-between items-center gap-4 my-4">
        <h1 className="text-2xl font-semibold my-4">Kelola Template Surat</h1>
        <div className="flex justify-end mt-4 gap-4">
          <Button 
            variant="flat" 
            color="secondary" 
            startContent={<HelpCircle size={18}/>}
            onPress={onOpen}
          >
            Bantuan Variabel
          </Button>
          <Button
            color="primary" 
            isLoading={isSubmitting} 
            onPress={() => onSubmit({ content: data })}
          >
            <SaveIcon size={16} />
            Simpan Template
          </Button>
        </div>
      </div>
      <Card>
        <CardBody>
          <Editor
            value={data} 
            onChange={(data) => setData(data)} 
          />
        </CardBody>
      </Card>
      <PlaceholderHelperModal
        isOpen={isOpen} 
        onClose={onClose} 
        dynamicAttributes={items?.letter?.letterAttributes || []} 
      />
      <ShowModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Detail Template Surat"
        data={viewingItem}
        fields={ letterTemplateDisplayFields}
      />
    </div>
  );
};

export default LetterTemplatePage;
