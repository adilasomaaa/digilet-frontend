import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from '@heroui/react';
import { nodesService } from '@/services/NodesService';
import type { Node, Breadcrumb } from '@/models';
import BreadcrumbNav from './BreadcrumbNav';

interface FolderPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (folderId: number | null) => Promise<void>;
  loading?: boolean;
}

const FolderPickerModal = ({ isOpen, onClose, onSelect, loading = false }: FolderPickerModalProps) => {
  const [folders, setFolders] = useState<Node[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [loadingFolders, setLoadingFolders] = useState(false);

  const loadFolders = async (folderId: number | null = null) => {
    try {
      setLoadingFolders(true);
      const params: any = {};
      if (folderId !== null) {
        params.parentId = folderId;
      }
      const response = await nodesService.index(params);
      // Filter only folders
      const folderNodes = response.data.filter((node: Node) => node.type === 'folder');
      setFolders(folderNodes);
    } catch (error) {
      console.error('Error loading folders:', error);
    } finally {
      setLoadingFolders(false);
    }
  };

  const loadBreadcrumbs = async (folderId: number | null) => {
    if (folderId === null) {
      setBreadcrumbs([]);
      return;
    }

    try {
      const response = await nodesService.breadcrumbs(folderId);
      // Handle both array and wrapped response
      const breadcrumbData = Array.isArray(response) ? response : (response as any).data || [];
      setBreadcrumbs(breadcrumbData);
    } catch (error) {
      console.error('Error loading breadcrumbs:', error);
      setBreadcrumbs([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadFolders(currentFolderId);
      loadBreadcrumbs(currentFolderId);
    }
  }, [isOpen, currentFolderId]);

  const handleNavigate = (folderId: number | null) => {
    setCurrentFolderId(folderId);
  };

  const handleFolderClick = (folder: Node) => {
    setCurrentFolderId(folder.id);
  };

  const handleSave = async () => {
    await onSelect(currentFolderId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
      <ModalContent>
        <ModalHeader>
          <h3>Pilih Folder Tujuan</h3>
        </ModalHeader>
        <ModalBody>
          <div className='mb-4'>
            <BreadcrumbNav breadcrumbs={breadcrumbs} onNavigate={handleNavigate} />
          </div>

          {loadingFolders ? (
            <div className='flex justify-center items-center h-48'>
              <Spinner />
            </div>
          ) : folders.length === 0 ? (
            <div className='flex justify-center items-center h-48 text-gray-500'>
              <p>Tidak ada folder di sini</p>
            </div>
          ) : (
            <div className='space-y-2 max-h-96 overflow-y-auto'>
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => handleFolderClick(folder)}
                  className='w-full p-3 text-left hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2'
                >
                  <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' />
                  </svg>
                  <span className='font-medium'>{folder.name}</span>
                </button>
              ))}
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant='light' onPress={onClose}>
            Batal
          </Button>
          <Button color='primary' onPress={handleSave} isLoading={loading}>
            Simpan di sini
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FolderPickerModal;
