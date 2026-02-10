import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { useState, useEffect } from 'react';
import type { Node } from '@/models';
import { env } from '@/lib/env';

interface FilePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  node: Node | null;
}

const FilePreviewModal = ({ isOpen, onClose, node }: FilePreviewModalProps) => {
  const [linkContent, setLinkContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLinkContent = async () => {
      if (node?.type === 'link' && node.path) {
        try {
          setLoading(true);
          const response = await fetch(`${env.apiBaseUrl}/${node.path}`);
          const text = await response.text();
          setLinkContent(text);
        } catch (error) {
          console.error('Error fetching link content:', error);
          setLinkContent('Error loading content');
        } finally {
          setLoading(false);
        }
      }
    };

    if (isOpen && node) {
      fetchLinkContent();
    }
  }, [isOpen, node]);

  if (!node) return null;

  const getFileUrl = (path: string) => `${env.apiBaseUrl}/${path}`;

  const renderContent = () => {
    switch (node.type) {
      case 'image':
        return (
          <div className='flex justify-center items-center'>
            <img
              src={getFileUrl(node.path!)}
              alt={node.name}
              className='max-w-full max-h-[70vh] object-contain'
            />
          </div>
        );

      case 'pdf':
        return (
          <iframe
            src={getFileUrl(node.path!)}
            className='w-full h-[70vh] border-0'
            title={node.name}
          />
        );

      case 'link':
        return (
          <div className='space-y-4'>
            {loading ? (
              <p className='text-center text-gray-500'>Loading...</p>
            ) : (
              <div className='bg-gray-50 p-4 rounded-lg'>
                <pre className='whitespace-pre-wrap break-words font-mono text-sm'>
                  {linkContent}
                </pre>
              </div>
            )}
          </div>
        );

      default:
        return <p>Preview not available</p>;
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size={node.type === 'link' ? '2xl' : '5xl'}
      scrollBehavior='inside'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          <h3 className='text-lg font-semibold'>{node.name}</h3>
          {node.size && (
            <p className='text-sm text-gray-500 font-normal'>
              Size: {(parseInt(node.size) / 1024).toFixed(2)} KB
            </p>
          )}
        </ModalHeader>
        <ModalBody>
          {renderContent()}
        </ModalBody>
        <ModalFooter>
          <Button color='default' variant='light' onPress={onClose}>
            Tutup
          </Button>
          {node.path && node.type !== 'link' && (
            <Button
              color='primary'
              as='a'
              href={getFileUrl(node.path)}
              download={node.name}
            >
              Download
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilePreviewModal;
