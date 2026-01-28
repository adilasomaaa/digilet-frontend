import { Button, Card, CardHeader, Chip, Listbox, ListboxItem } from '@heroui/react'
import { ArrowLeftCircle } from 'lucide-react';
import React, { useState } from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router'
import { studentLetterNavColumn } from './nav';
import * as LucideIcons from "lucide-react";
import { useStudentLetter } from '@/hooks/useStudentLetter';
import { env } from '@/lib/env';
import ChangeStatusModal from '@/components/dashboard/ChangeStatusModal';
import { studentLetterService } from '@/services/StudentLetterService';

export const ListboxWrapper = ({children} : {children: React.ReactNode}) => (
  <div className="w-full  border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

const IconWrapper = ({ name, className }: { name: string; className?: string }) => {
  const LucideIcon = (LucideIcons as any)[name];
  if (!LucideIcon) return null;
  return (
    <div className={`p-1 rounded-lg bg-primary/10 text-primary ${className}`}>
      <LucideIcon size={18} />
    </div>
  );
};

const statusMap: Record<string, { color: "warning" | "primary" | "success" | "danger" | "secondary"; label: string }> = {
    pending: { color: "warning", label: "Menunggu" },
    waiting_signature: { color: "secondary", label: "Menunggu Tanda Tangan" },
    approved: { color: "success", label: "Disetujui" },
    rejected: { color: "danger", label: "Ditolak" },
};

const StudentLetterTemplate = () => {
    const { studentLetterId } = useParams<{ studentLetterId: string }>();
    const navItems = studentLetterNavColumn(studentLetterId)
    const location = useLocation();
    const [isChangeStatusModalOpen, setIsChangeStatusModalOpen] = useState(false);
    const [itemToChangeStatus, setItemToChangeStatus] = useState<any>(null);

    const {item, isLoading, refresh} = useStudentLetter(Number(studentLetterId));

    const handlePrint = (item: any) => {
        window.open(`${env.apiBaseUrl}api/student-letter-submission/print-pdf/${item.token}`, '_blank');
    };

    const handleChangeStatus = (item: any) => {
      setItemToChangeStatus(item);
      setIsChangeStatusModalOpen(true);
  }

    const onConfirmChangeStatus = async (status: string) => {
          if (!itemToChangeStatus) return;
          try {
              await studentLetterService.changeStatus(itemToChangeStatus.id, status);
              if (refresh) await refresh();
              setIsChangeStatusModalOpen(false);
          } catch (error) {
              console.error("Failed to change status", error);
          }
      }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="col-span-1 flex gap-4 flex-col">
            <Button as={Link} to="/dashboard/student-letter" variant='flat' className='w-full'>
                <ArrowLeftCircle></ArrowLeftCircle> Kembali
            </Button>
            <ListboxWrapper>
                <Listbox aria-label="Listbox menu with descriptions" variant="flat">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.to;
                        return (
                            <ListboxItem key={item.key}
                                href={item.to}
                                color={isActive ? "primary" : "default"}
                                variant={isActive ? "solid" : "flat"}
                                className={isActive ? "text-white bg-primary" : ""}
                                startContent={
                                item.icon && <IconWrapper name={item.icon as string} className={isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"} />
                                }>
                                {item.label}
                            </ListboxItem>
                        );
                    })}
                </Listbox>
            </ListboxWrapper>
        </div>
        <div className='col-span-4 flex flex-col gap-4'>
            <Card shadow="sm" className="border-none">
                <CardHeader className="flex justify-between items-center p-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold">{item?.name || 'Memuat...'}</h2>
                        <div className='flex gap-2 items-center'>
                            <span className="text-tiny text-default-400">{item?.letterNumber || 'Belum memiliki nomor surat'} </span>
                            <Chip variant="flat" size="sm" color={item?.status ? statusMap[item.status].color : "default"}>{item?.status ? statusMap[item.status].label : 'Memuat...'} </Chip>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button onPress={() => handleChangeStatus(item)} variant="flat" color="warning" startContent={<LucideIcons.CheckCircle size={14} />}>
                            Ubah Status
                        </Button>
                        <Button onPress={() => handlePrint(item)} variant="solid" color="primary" startContent={<LucideIcons.PrinterIcon size={14} />}>
                            Cetak
                        </Button>
                    </div>
                </CardHeader>
            </Card>
            <Outlet context={{ item, isLoading, refresh }}></Outlet>
        </div>
        <ChangeStatusModal
          isOpen={isChangeStatusModalOpen}
          onClose={() => setIsChangeStatusModalOpen(false)}
          onConfirm={onConfirmChangeStatus}
          currentStatus={itemToChangeStatus?.status}
      />
    </div>
  )
}

export default StudentLetterTemplate