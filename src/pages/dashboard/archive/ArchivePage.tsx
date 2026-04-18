import { useState, useEffect } from 'react';
import { Button, Spinner, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, ButtonGroup } from '@heroui/react';
import { FolderPlus, Trash2, Plus, Grid3x3, List, Link, Image, File } from 'lucide-react';
import { useNavigate } from 'react-router';
import { nodesService } from '@/services/NodesService';
import BreadcrumbNav from '@/components/archive/BreadcrumbNav';
import NodeCard from '@/components/archive/NodeCard';
import NodeListItem from '@/components/archive/NodeListItem';
import CreateFolderModal from '@/components/archive/CreateFolderModal';
import CreateLinkModal from '@/components/archive/CreateLinkModal';
import UploadFileModal from '@/components/archive/UploadFileModal';
import FilePreviewModal from '@/components/archive/FilePreviewModal';
import RenameModal from '@/components/archive/RenameModal';
import DeleteModal from '@/components/dashboard/DeleteModal';
import type { Breadcrumb, Node } from '@/models';

const ArchivePage = () => {
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [createFolderOpen, setCreateFolderOpen] = useState(false);
  const [createLinkOpen, setCreateLinkOpen] = useState(false);
  const [uploadImageOpen, setUploadImageOpen] = useState(false);
  const [uploadPdfOpen, setUploadPdfOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const loadNodes = async (folderId: number | null = null) => {
    try {
      setLoading(true);
      const response = await nodesService.index({ parentId: folderId || undefined });
      setNodes(response.data);
      
      // Load breadcrumbs if in a folder
      if (folderId) {
        const crumbs = await nodesService.breadcrumbs(folderId);
        // Extract data from response if wrapped
        setBreadcrumbs(Array.isArray(crumbs) ? crumbs : crumbs.data || []);
      } else {
        setBreadcrumbs([]);
      }
    } catch (error) {
      console.error('Error loading nodes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNodes(currentFolderId);
  }, [currentFolderId]);

  const handleNavigate = (folderId: number | null) => {
    setCurrentFolderId(folderId);
  };

  const handleOpenNode = (node: Node) => {
    if (node.type === 'folder') {
      setCurrentFolderId(node.id);
    } else {
      // For files, open preview modal
      setSelectedNode(node);
      setPreviewOpen(true);
    }
  };

  const handleCreateFolder = async (name: string) => {
    try {
      await nodesService.createFolder({
        name,
        parentId: currentFolderId || undefined,
      });
      await loadNodes(currentFolderId);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const handleCreateLink = async (name: string, content: string) => {
    try {
      await nodesService.createLink({
        name,
        content,
        parentId: currentFolderId || undefined,
      });
      await loadNodes(currentFolderId);
    } catch (error) {
      console.error('Error creating link:', error);
    }
  };

  const handleUploadImage = async (file: File) => {
    try {
      await nodesService.uploadImage(file, currentFolderId || undefined);
      await loadNodes(currentFolderId);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleUploadPdf = async (file: File) => {
    try {
      await nodesService.uploadPdf(file, currentFolderId || undefined);
      await loadNodes(currentFolderId);
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  const handleRename = (node: Node) => {
    setSelectedNode(node);
    setRenameModalOpen(true);
  };

  const handleRenameSubmit = async (id: number, name: string) => {
    try {
      await nodesService.rename(id, { name });
      await loadNodes(currentFolderId);
    } catch (error) {
      console.error('Error renaming node:', error);
    }
  };

  const handleDelete = (node: Node) => {
    setSelectedNode(node);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedNode) {
      try {
        await nodesService.softDelete(selectedNode.id);
        await loadNodes(currentFolderId);
        setDeleteModalOpen(false);
        setSelectedNode(null);
      } catch (error) {
        console.error('Error deleting node:', error);
      }
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Arsip</h1>
        <div className='flex gap-2'>
          <Dropdown>
            <DropdownTrigger>
              <Button color='primary' startContent={<Plus size={18} />}>
                Tambah
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key='folder'
                startContent={<FolderPlus size={18} />}
                onPress={() => setCreateFolderOpen(true)}
              >
                Folder
              </DropdownItem>
              <DropdownItem
                key='link'
                startContent={<Link size={18} />}
                onPress={() => setCreateLinkOpen(true)}
              >
                Link/Catatan
              </DropdownItem>
              <DropdownItem
                key='image'
                onPress={() => setUploadImageOpen(true)}
                startContent={<Image size={18} />}
              >
                Upload Gambar
              </DropdownItem>
              <DropdownItem
                key='pdf'
                startContent={<File size={18} />}
                onPress={() => setUploadPdfOpen(true)}
              >
                Upload PDF
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button
            color='default'
            variant='flat'
            startContent={<Trash2 size={18} />}
            onPress={() => navigate('/dashboard/archive/trash')}
          >
            Sampah
          </Button>
        </div>
      </div>

      <div className='flex justify-between items-center gap-4 mb-4'>
        <BreadcrumbNav breadcrumbs={breadcrumbs} onNavigate={handleNavigate} />
        
        <ButtonGroup size='sm'>
          <Button
            isIconOnly
            variant={viewMode === 'grid' ? 'solid' : 'light'}
            color={viewMode === 'grid' ? 'primary' : 'default'}
            onPress={() => setViewMode('grid')}
          >
            <Grid3x3 size={18} />
          </Button>
          <Button
            isIconOnly
            variant={viewMode === 'list' ? 'solid' : 'light'}
            color={viewMode === 'list' ? 'primary' : 'default'}
            onPress={() => setViewMode('list')}
          >
            <List size={18} />
          </Button>
        </ButtonGroup>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-64'>
          <Spinner size='lg' />
        </div>
      ) : nodes.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-64 text-gray-500'>
          <p>Folder kosong</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {nodes.map((node) => (
            <NodeCard
              key={node.id}
              node={node}
              onOpen={handleOpenNode}
              onRename={handleRename}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className='space-y-0'>
          {nodes.map((node) => (
            <NodeListItem
              key={node.id}
              node={node}
              onOpen={handleOpenNode}
              onRename={handleRename}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CreateFolderModal
        isOpen={createFolderOpen}
        onClose={() => setCreateFolderOpen(false)}
        onSubmit={handleCreateFolder}
      />

      <CreateLinkModal
        isOpen={createLinkOpen}
        onClose={() => setCreateLinkOpen(false)}
        onSubmit={handleCreateLink}
      />

      <UploadFileModal
        isOpen={uploadImageOpen}
        onClose={() => setUploadImageOpen(false)}
        type='image'
        onSubmit={handleUploadImage}
      />

      <UploadFileModal
        isOpen={uploadPdfOpen}
        onClose={() => setUploadPdfOpen(false)}
        type='pdf'
        onSubmit={handleUploadPdf}
      />

      <FilePreviewModal
        isOpen={previewOpen}
        onClose={() => {
          setPreviewOpen(false);
          setSelectedNode(null);
        }}
        node={selectedNode}
      />

      <RenameModal
        isOpen={renameModalOpen}
        onClose={() => {
          setRenameModalOpen(false);
          setSelectedNode(null);
        }}
        node={selectedNode}
        onSubmit={handleRenameSubmit}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedNode(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Hapus Item"
        message={`Apakah Anda yakin ingin menghapus <strong>"${selectedNode?.name}"</strong>?`}
        isLoading={false}
      />
    </div>
  );
};

export default ArchivePage;
