import { useMyActivity } from "@/hooks/useMyActivity";
import { myActivityColumns } from "./config";
import DashboardBreadcrumbs from "@/components/dashboard/Breadcrumbs";
import DataTable from "@/components/dashboard/DataTable";
import { Card, CardBody } from "@heroui/react";
import { LayoutListIcon } from "lucide-react";

const StudentActivityPage = () => {
  const {
    items, isLoading, paginationInfo, setPaginationInfo,
    filterValue, setFilterValue,
    sortDescriptor, setSortDescriptor,
  } = useMyActivity();

  return (
    <div className="flex flex-col gap-4">
      <DashboardBreadcrumbs />
      
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-default-700">Kegiatan Saya</h1>
      </div>

      <Card className="shadow-sm border-none">
        <CardBody className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <LayoutListIcon size={20} />
            </div>
            <div>
               <h2 className="text-lg font-semibold">Riwayat Kehadiran</h2>
               <p className="text-xs text-default-500">Daftar kegiatan yang telah Anda hadiri sebagai peserta.</p>
            </div>
          </div>

          <DataTable
            data={items}
            isLoading={isLoading}
            columns={myActivityColumns}
            paginationInfo={paginationInfo}
            setPaginationInfo={setPaginationInfo}
            filterValue={filterValue}
            setFilterValue={setFilterValue}
            sortDescriptor={sortDescriptor}
            setSortDescriptor={setSortDescriptor}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default StudentActivityPage;
