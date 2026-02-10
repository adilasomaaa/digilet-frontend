import { Card, CardBody } from '@heroui/react';
import { Folder, FileText, Image as ImageIcon, FileType, MoreVertical } from 'lucide-react';
import type { Node } from '@/models';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';

interface NodeListItemProps {
  node: Node;
  onOpen: (node: Node) => void;
  onRename: (node: Node) => void;
  onDelete: (node: Node) => void;
}

const getNodeIcon = (type: Node['type']) => {
  switch (type) {
    case 'folder':
      return <Folder size={24} className='text-primary' />;
    case 'link':
      return <FileText size={24} className='text-blue-500' />;
    case 'image':
      return <ImageIcon size={24} className='text-green-500' />;
    case 'pdf':
      return <FileType size={24} className='text-red-500' />;
  }
};

const NodeListItem = ({ node, onOpen, onRename, onDelete }: NodeListItemProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card
      className='cursor-pointer hover:shadow-md transition-shadow mb-2 w-full'
      isPressable
      onPress={() => onOpen(node)}
    >
      <CardBody className='p-4'>
        <div className='flex items-center gap-4'>
          {/* Icon */}
          <div className='flex-shrink-0'>{getNodeIcon(node.type)}</div>

          {/* Name */}
          <div className='flex-1 min-w-0'>
            <p className='font-medium truncate'>{node.name}</p>
          </div>

          {/* Owner */}
          <div className='hidden md:block w-32 flex-shrink-0'>
            <p className='text-sm text-gray-600 truncate'>
              {node.owner?.name || 'Unknown'}
            </p>
          </div>

          {/* Size */}
          <div className='hidden sm:block w-24 flex-shrink-0 text-right'>
            {node.size ? (
              <p className='text-sm text-gray-500'>
                {(parseInt(node.size) / 1024).toFixed(2)} KB
              </p>
            ) : (
              <p className='text-sm text-gray-500'>-</p>
            )}
          </div>

          {/* Modified Date */}
          <div className='hidden lg:block w-32 flex-shrink-0 text-right'>
            <p className='text-sm text-gray-500'>{formatDate(node.updatedAt)}</p>
          </div>

          {/* Actions */}
          <div className='flex-shrink-0'>
            <Dropdown>
              <DropdownTrigger>
                <button
                  className='p-1 hover:bg-gray-100 rounded'
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical size={18} />
                </button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key='rename' onPress={() => onRename(node)}>
                  Ubah Nama
                </DropdownItem>
                <DropdownItem key='delete' onPress={() => onDelete(node)} className='text-danger'>
                  Hapus
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default NodeListItem;
