import { Button, Card, CardBody, Chip, Listbox, ListboxItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { ArrowLeftCircle, BookIcon, Icon } from 'lucide-react';
import React from 'react'
import { Link, Outlet, useLocation, useParams } from 'react-router'
import { navColumn } from './nav';
import * as LucideIcons from "lucide-react";
import { useLetter } from '@/hooks/useLetter';
import LetterTable from '@/components/dashboard/LetterTable';

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

const LetterTemplate = () => {
    const { letterId } = useParams<{ letterId: string }>();
    const navItems = navColumn(letterId)
    const location = useLocation();
    const {item, isLoading} = useLetter(letterId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-5">
        <div className="col-span-1 flex gap-4 flex-col">
            <Button as={Link} to="/dashboard/letter" variant='flat' className='w-full'>
                <ArrowLeftCircle></ArrowLeftCircle> Kembali
            </Button>
            <ListboxWrapper>
                <Listbox aria-label="Listbox menu with descriptions" variant="flat">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.to;
                        return (
                            <ListboxItem key={item.key}
                                as={Link}
                                to={item.to}
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
            <Card>
                <CardBody>
                    {item &&
                        <LetterTable
                        item={item} isLoading={isLoading}></LetterTable>
                    }
                </CardBody>
            </Card>
            <Outlet></Outlet>
        </div>
    </div>
  )
}

export default LetterTemplate