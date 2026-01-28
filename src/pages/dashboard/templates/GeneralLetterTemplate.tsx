import { Button, Card, CardHeader, Listbox, ListboxItem } from '@heroui/react'
import { ArrowLeftCircle } from 'lucide-react';
import React from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router'
import { generalLetterNavColumn } from './nav';
import * as LucideIcons from "lucide-react";
import { useGeneralLetter } from '@/hooks/useGeneralLetter';
import { env } from '@/lib/env';

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

const GeneralLetterTemplate = () => {
    const { generalLetterId } = useParams<{ generalLetterId: string }>();
    const navItems = generalLetterNavColumn(generalLetterId)
    const location = useLocation();

    const {item, isLoading, refresh} = useGeneralLetter(Number(generalLetterId));

    const handlePrint = (item: any) => {
        window.open(`${env.apiBaseUrl}api/general-letter-submission/${item.token}/print-pdf`, '_blank');
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="col-span-1 flex gap-4 flex-col">
            <Button as={Link} to="/dashboard/general-letter" variant='flat' className='w-full'>
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
                    <div className="flex flex-col">
                        <h2 className="text-lg font-semibold">{item?.name || 'Memuat...'}</h2>
                        <span className="text-tiny text-default-400">{item?.letterNumber || 'Memuat...'} </span>
                    </div>
                    <div className="flex gap-2">
                        <Button onPress={() => handlePrint(item)} variant="solid" color="primary" startContent={<LucideIcons.PrinterIcon size={14} />}>
                            Cetak
                        </Button>
                    </div>
                </CardHeader>
            </Card>
            <Outlet context={{ item, isLoading, refresh }}></Outlet>
        </div>
    </div>
  )
}

export default GeneralLetterTemplate