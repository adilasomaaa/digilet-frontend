import { Breadcrumbs, BreadcrumbItem } from '@heroui/react';
import { Home } from 'lucide-react';
import type { Breadcrumb } from '@/models';

interface BreadcrumbNavProps {
  breadcrumbs: Breadcrumb[];
  onNavigate: (folderId: number | null) => void;
}

const BreadcrumbNav = ({ breadcrumbs, onNavigate }: BreadcrumbNavProps) => {
  return (
    <Breadcrumbs size='lg' className='mb-4'>
      <BreadcrumbItem
        onClick={() => onNavigate(null)}
        className='cursor-pointer hover:text-primary'
      >
        <Home size={18} />
      </BreadcrumbItem>
      {breadcrumbs && breadcrumbs.map((breadcrumb, index) => (
        <BreadcrumbItem
          key={breadcrumb.id}
          onClick={() => index < breadcrumbs.length - 1 ? onNavigate(breadcrumb.id) : null}
          className={index < breadcrumbs.length - 1 ? 'cursor-pointer hover:text-primary' : ''}
        >
          {breadcrumb.name}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default BreadcrumbNav;
