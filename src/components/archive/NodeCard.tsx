import { Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { Folder, FileText, Image as ImageIcon, FileType, MoreVertical } from 'lucide-react';
import type { Node } from '@/models';
import { env } from '@/lib/env';

interface NodeCardProps {
  node: Node;
  onOpen: (node: Node) => void;
  onRename: (node: Node) => void;
  onDelete: (node: Node) => void;
}

const getNodeIcon = (type: Node['type']) => {
  switch (type) {
    case 'folder':
      return <Folder size={40} className='text-primary' />;
    case 'link':
      return <FileText size={40} className='text-blue-500' />;
    case 'image':
      return <ImageIcon size={40} className='text-green-500' />;
    case 'pdf':
      return <FileType size={40} className='text-red-500' />;
  }
};

const NodeCard = ({ node, onOpen, onRename, onDelete }: NodeCardProps) => {
  const getThumbnail = () => {
    if (node.type === 'image' && node.path) {
      return (
        <img
          src={`${env.apiBaseUrl}/${node.path}`}
          alt={node.name}
          className='w-full h-32 object-cover'
        />
      );
    }
    return (
      <div className='flex items-center justify-center h-32'>
        {getNodeIcon(node.type)}
      </div>
    );
  };

  return (
    <Card
      className='cursor-pointer hover:shadow-lg transition-shadow'
      isPressable
      onPress={() => onOpen(node)}
    >
      <CardBody className='p-0'>
        {getThumbnail()}
        <div className='p-3 flex justify-between items-center'>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium truncate'>{node.name}</p>
            {node.size && (
              <p className='text-xs text-gray-500'>
                {(parseInt(node.size) / 1024).toFixed(2)} KB
              </p>
            )}
          </div>
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
      </CardBody>
    </Card>
  );
};

export default NodeCard;
